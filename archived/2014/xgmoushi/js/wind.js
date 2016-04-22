/*===================
@name:整站核心JS
@use:异步JS加载，增加速度
@author:phpwind团队 
===================*/
;(function(doc) {

    var head = doc.documentElement,
        isHeadReady,
        isDomReady,
        domWaiters = [],
        queue = [],        // waiters for the "head ready" event
        handlers = {},     // user functions waiting for events
        scripts = {},      // loadable scripts in different states
        isAsync = doc.createElement("script").async === true || "MozAppearance" in doc.documentElement.style || window.opera;

    /*** public API ***/
    var head_var = window.head_conf && head_conf.head || "Wind",
         api = window[head_var] = (window[head_var] || function() { api.ready.apply(null, arguments); });

    // states
    var PRELOADED = 1,
        PRELOADING = 2,
        LOADING = 3,
        LOADED = 4;


    // Method 1: simply load and let browser take care of ordering
    if (isAsync) {
        api.js = function() {

            var args = arguments,
                 fn = args[args.length -1],
                 els = {};

            if (!isFunc(fn)) { fn = null; }

            each(args, function(el, i) {

                if (el != fn) {
                    el = getScript(el);
                    els[el.name] = el;

                    load(el, fn && i == args.length -2 ? function() {
                        if (allLoaded(els)) { one(fn); }

                    } : null);
                }
            });

            return api;
        };


    // Method 2: preload with text/cache hack
    } else {

        api.js = function() {

            var args = arguments,
                rest = [].slice.call(args, 1),
                next = rest[0];

            // wait for a while. immediate execution causes some browsers to ignore caching
            if (!isHeadReady) {
                queue.push(function()  {
                    api.js.apply(null, args);
                });
                return api;
            }

            // multiple arguments
            if (next) {

                // load
                each(rest, function(el) {
                    if (!isFunc(el)) {
                        preload(getScript(el));
                    }
                });

                // execute
                load(getScript(args[0]), isFunc(next) ? next : function() {
                    api.js.apply(null, rest);
                });


            // single script
            } else {
                load(getScript(args[0]));
            }

            return api;
        };
    }

    api.ready = function(key, fn) {

        // DOM ready check: head.ready(document, function() { });
        if (key == doc) {
            if (isDomReady) { one(fn);  }
            else { domWaiters.push(fn); }
            return api;
        }

        // shift arguments
        if (isFunc(key)) {
            fn = key;
            key = "ALL";
        }

        // make sure arguments are sane
        if (typeof key != 'string' || !isFunc(fn)) { return api; }

        var script = scripts[key];

        // script already loaded --> execute and return
        if (script && script.state == LOADED || key == 'ALL' && allLoaded() && isDomReady) {
            one(fn);
            return api;
        }

        var arr = handlers[key];
        if (!arr) { arr = handlers[key] = [fn]; }
        else { arr.push(fn); }
        return api;
    };


    // perform this when DOM is ready
    api.ready(doc, function() {
        if (allLoaded()) {
            each(handlers.ALL, function(fn) {
                one(fn);
            });
        }

        if (api.feature) {
            api.feature("domloaded", true);
        }
    });


    /*** private functions ***/


    // call function once
    function one(fn) {
        if (fn._done) { return; }
        fn();
        fn._done = 1;
    }


    function toLabel(url) {
        var els = url.split("/"),
             name = els[els.length -1],
             i = name.indexOf("?");

        return i != -1 ? name.substring(0, i) : name;
    }


    function getScript(url) {

        var script;

        if (typeof url == 'object') {
            for (var key in url) {
                if (url[key]) {
                    script = { name: key, url: url[key] };
                }
            }
        } else {
            script = { name: toLabel(url),  url: url };
        }

        var existing = scripts[script.name];
        if (existing && existing.url === script.url) { return existing; }

        scripts[script.name] = script;
        return script;
    }


    function each(arr, fn) {
        if (!arr) { return; }

        // arguments special type
        if (typeof arr == 'object') { arr = [].slice.call(arr); }

        // do the job
        for (var i = 0; i < arr.length; i++) {
            fn.call(arr, arr[i], i);
        }
    }

    function isFunc(el) {
        return Object.prototype.toString.call(el) == '[object Function]';
    }

    function allLoaded(els) {

        els = els || scripts;

        var loaded;

        for (var name in els) {
            if (els.hasOwnProperty(name) && els[name].state != LOADED) { return false; }
            loaded = true;
        }

        return loaded;
    }


    function onPreload(script) {
        script.state = PRELOADED;

        each(script.onpreload, function(el) {
            el.call();
        });
    }

    function preload(script, callback) {

        if (script.state === undefined) {

            script.state = PRELOADING;
            script.onpreload = [];

            scriptTag({ src: script.url, type: 'cache'}, function()  {
                onPreload(script);
            });
        }
    }

    function load(script, callback) {

        if (script.state == LOADED) {
            return callback && callback();
        }

        if (script.state == LOADING) {
            return api.ready(script.name, callback);
        }

        if (script.state == PRELOADING) {
            return script.onpreload.push(function() {
                load(script, callback);
            });
        }

        script.state = LOADING;

        scriptTag(script.url, function() {

            script.state = LOADED;

            if (callback) { callback(); }

            // handlers for this script
            each(handlers[script.name], function(fn) {
                one(fn);
            });

            // everything ready
            if (allLoaded() && isDomReady) {
                each(handlers.ALL, function(fn) {
                    one(fn);
                });
            }
        });
    }


    function scriptTag(src, callback) {

        var s = doc.createElement('script');
        s.type = 'text/' + (src.type || 'javascript');
        s.src = src.src || src;
        s.async = false;

        s.onreadystatechange = s.onload = function() {

            var state = s.readyState;

            if (!callback.done && (!state || /loaded|complete/.test(state))) {
                callback.done = true;
                callback();
            }
        };

        // use body if available. more safe in IE
        (doc.body || head).appendChild(s);
    }

    /*
        The much desired DOM ready check
        Thanks to jQuery and http://javascript.nwbox.com/IEContentLoaded/
    */

    function fireReady() {
        if (!isDomReady) {
            isDomReady = true;
            each(domWaiters, function(fn) {
                one(fn);
            });
        }
    }

    // W3C
    if (window.addEventListener) {
        doc.addEventListener("DOMContentLoaded", fireReady, false);

        // fallback. this is always called
        window.addEventListener("load", fireReady, false);

    // IE
    } else if (window.attachEvent) {

        // for iframes
        doc.attachEvent("onreadystatechange", function()  {
            if (doc.readyState === "complete" ) {
                fireReady();
            }
        });


        // avoid frames with different domains issue
        var frameElement = 1;

        try {
            frameElement = window.frameElement;

        } catch(e) {}


        if (!frameElement && head.doScroll) {

            (function() {
                try {
                    head.doScroll("left");
                    fireReady();

                } catch(e) {
                    setTimeout(arguments.callee, 1);
                    return;
                }
            })();
        }

        // fallback
        window.attachEvent("onload", fireReady);
    }


    // enable document.readyState for Firefox <= 3.5
    if (!doc.readyState && doc.addEventListener) {
        doc.readyState = "loading";
        doc.addEventListener("DOMContentLoaded", handler = function () {
            doc.removeEventListener("DOMContentLoaded", handler, false);
            doc.readyState = "complete";
        }, false);
    }

    /*
        We wait for 300 ms before script loading starts. for some reason this is needed
        to make sure scripts are cached. Not sure why this happens yet. A case study:

        https://github.com/headjs/headjs/issues/closed#issue/83
    */
    setTimeout(function() {
        isHeadReady = true;
        each(queue, function(fn) { fn(); });

    }, 300);

    // browser type & version
    var ua = navigator.userAgent.toLowerCase();

    ua = /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version)?[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        !/compatible/.test( ua ) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec( ua ) || [];


    if (ua[1] == 'msie') {
        ua[1] = 'ie';
        ua[2] = document.documentMode || ua[2];
    }

    api.browser = { version: ua[2] };
    api.browser[ua[1]] = true;

    // IE specific
    if (api.browser.ie) {
        // HTML5 support
        each("abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video".split("|"), function(el) {
            doc.createElement(el);
        });
    }

})(document);

/*********Wind JS*********/
/*
 * 防止浏览器不支持console报错
 */
if(!window.console) {
    window.console = {};
    var funs = ["profiles", "memory", "_commandLineAPI", "debug", "error", "info", "log", "warn", "dir", "dirxml", "trace", "assert", "count", "markTimeline", "profile", "profileEnd", "time", "timeEnd", "timeStamp", "group", "groupCollapsed", "groupEnd"];
    for(var i = 0;i < funs.length; i++) {
        console[funs[i]] = function() {};
    }
}

/*
*解决ie6下不支持背景缓存
*/
Wind.ready(function() {
	if (!+'\v1' && !('maxHeight' in document.body.style)) {
		try{
			document.execCommand("BackgroundImageCache", false, true);
		}catch(e){}
	}
});

/*
*wind core
*/
;(function(win) {
	var root = win.GV.JS_ROOT || location.origin, //在core.js加载之前定义GV.JS_ROOT
		ver = win.GV.JS_VERSION || '9.0beta',
		//定义常用JS组件别名，使用别名加载
		alias = {
            common             : 'common',
            jquery             : 'jquery',
			jplayer            : 'jplayer',
			cycle2             : 'cycle2',
			playlist           : 'playlist',
            lettering          : 'lettering',
            textillate         : 'textillate'
	
		},
		alias_css = {
			colorPicker	: 'ui_libs/colorPicker/style',
			datePicker	: 'ui_libs/datePicker/style',
			chosen		: 'ui_libs/chosen/chosen'
		};

	//add suffix and version
	for(var i in alias) {
		if (alias.hasOwnProperty(i)) {
			alias[i] = root + alias[i] +'.js?v=' + ver;
		}
	}

	for(var i in alias_css) {
		if (alias_css.hasOwnProperty(i)) {
			alias_css[i] = root + alias_css[i] +'.css?v=' + ver;
		}
	}

	//css loader
	win.Wind = win.Wind || {};
    //!TODO old webkit and old firefox does not support
	Wind.css = function(alias/*alias or path*/,callback) {
		var url = alias_css[alias] ? alias_css[alias] : alias
		var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = link.onreadystatechange = function() {//chrome link无onload事件
            var state = link.readyState;
            if (callback && !callback.done && (!state || /loaded|complete/.test(state))) {
                callback.done = true;
                callback();
            }
        }
        document.getElementsByTagName('head')[0].appendChild(link);
	};

	//Using the alias to load the script file
	Wind.use = function() {
		var args = arguments,len = args.length;
        for( var i = 0;i < len;i++ ) {
        	if(typeof args[i] === 'string' && alias[args[i]]) {
        		args[i] = alias[args[i]];
        	}
        }
		Wind.js.apply(null,args);
	};

    //Wind javascript template (author: John Resig http://ejohn.org/blog/javascript-micro-templating/)
    var cache = {};
    Wind.tmpl = function (str, data) {
        var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(str) :
        new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" +
        "with(obj){p.push('" +
        str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return data ? fn(data) : fn;
    };
    //Wind全局功能函数命名空间
    Wind.Util = {}
})(this);

