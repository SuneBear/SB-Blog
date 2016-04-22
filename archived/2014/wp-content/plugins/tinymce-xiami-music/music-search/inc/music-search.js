var musicPage = 1;
var keyWord = "";

var BROWSER = {};
var USERAGENT = navigator.userAgent.toLowerCase();
browserVersion({"ie":"msie","firefox":"","chrome":"","opera":"","safari":"","maxthon":"","mozilla":"","webkit":""});
if (BROWSER.safari) {
	BROWSER.firefox = true;
}
BROWSER.opera = BROWSER.opera ? opera.version() : 0;

function browserVersion(types) {
	var other = 1;
	for (i in types) {
		var v = types[i] ? types[i] : i;
		if (USERAGENT.indexOf(v) != -1) {
			var re = new RegExp(v + "(\\/|\\s)([\\d\\.]+)", "ig");
			var matches = re.exec(USERAGENT);
			var ver = matches != null ? matches[2] : 0;
			other = ver !== 0 ? 0 : other;
		}else {
			var ver = 0;
		}
		eval("BROWSER." + i + "= ver");
	}
	BROWSER.other = other;
}

function _attachEvent(obj, evt, func) {
	if (obj.addEventListener) {
		obj.addEventListener(evt, func, false);
	} else if (obj.attachEvent) {
		obj.attachEvent("on" + evt, func);
	}
}

// body onload事件
function body_onLoad() {
	setTimeout(function(){
		try {
			document.getElementById("search_Input").focus();
		} catch(e) {
			document.getElementById("uID").focus();
		}
	}, 200);
}

// 样式选择
function playerStyle_sel_onChange() {
	var playerStyle = document.getElementById("playerStyle_sel").value;
	if (playerStyle == "iSingle") {
		document.getElementById("autoPlay").style.display = "inline";
		document.getElementById("ecBox").style.top = "535px";
		document.getElementById("ecArrow").style.top = "44px";
		document.getElementById("ecImages").style.height = "33px";
		document.getElementById("playerImage").src = "images/singlePlayer.png";
	} else {
		document.getElementById("autoPlay").style.display = "none";
		document.getElementById("ecBox").style.top = "222px";
		document.getElementById("ecArrow").style.top = "357px";
		document.getElementById("ecImages").style.height = "346px";
		document.getElementById("playerImage").src = "images/multiPlayer.png";
	}
}

// ecIcon 鼠标悬停
function ecIcon_onMouseOver() {
	document.getElementById("ecBox").style.display = "block";
}

// ecIcon 鼠标移走
function ecIcon_onMouseOut() {
	document.getElementById("ecBox").style.display = "none";
}

// IsNumeric 函数
function IsNumeric(str) {
	var ValidChars = "0123456789.";
	var IsNumber = true;
	var Char; 
	for (i = 0; i < str.length && IsNumber == true; i++) { 
		Char = str.charAt(i); 
		if (ValidChars.indexOf(Char) == -1) {
			IsNumber = false;
		}
	}
	return IsNumber;   
}

// trim 函数
function trim(str) {
	str = str.replace(/^(\s|\u00A0)+/,"");
	for (var i=str.length-1; i>=0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i+1);
			break;
		}
	}
	return str;
}

// 全选/全不选
function selectAll(obj) {
	var musicInfo = document.getElementsByName("musicInfo");
	for (i = 0; i < musicInfo.length; i++) {musicInfo[i].checked = obj.checked;}  
}

// search_Bt 鼠标点击
function search_Bt_onclick() {
	if ((document.getElementById("search_Input").value != document.getElementById("search_Input").title) && (trim(document.getElementById("search_Input").value) != "")) {
		keyWord = encodeURIComponent(document.getElementById("search_Input").value);
		searchMusicList(1);
	}
}

// search_Input 按Enter搜索
function search_Input_onkeypress(event) {
	var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	if (keyCode == 13) {
		if ((document.getElementById("search_Input").value != document.getElementById("search_Input").title) && (trim(document.getElementById("search_Input").value) != "")) {
			keyWord = encodeURIComponent(document.getElementById("search_Input").value);
			searchMusicList(1);
		} else {
			document.getElementById("search_Input").value = document.getElementById("search_Input").title;
		}
	}
}

function searchMusicList(Page) {
	if (document.getElementById("search_Bt").disabled == false) {
		searchMusicLoading(true);
		musicPage = Page;
		var head = "search_Result";
		var src1 = 'http://api.erohentai.xxx/xiami/search.php?keyword=' + keyWord + '&page=' + musicPage + '&callback=getXiamiData&random=' + new Date().getTime() + '.js';
		var JSONP = document.createElement("script");
		JSONP.type = "text/javascript";
		JSONP.src = src1;
		//在head之后添加js文件
		setTimeout(function(){document.getElementsByTagName("head")[0].appendChild(JSONP)}, 0);
		JSONP.onload = JSONP.onreadystatechange = function() {
			if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
				JSONP.onload = JSONP.onreadystatechange = null; //清内存，防止IE memory leaks
			}
		}
	}
}

function searchMusicLoading(onProgress) {
	if (onProgress == true) {
		document.getElementById("search_Bt").disabled = true;
		document.getElementById("search_Bt").value = "搜索中";
	} else {
		document.getElementById("search_Bt").disabled = false;
		document.getElementById("search_Bt").value = "搜索";
	}
}

function getXiamiData(jsonData) {
	document.getElementById("self_set_Pager_ui").innerHTML = "";
	try {
		document.getElementById("music_List").innerHTML = "";
	} catch(e) { // IE下table的innerHTML只读
		tbody_music_List = document.getElementById("music_List");
		tbody_music_List.parentNode.outerHTML = tbody_music_List.parentNode.outerHTML.replace(tbody_music_List.innerHTML, '<span style="display:none;"></span>');
	}
	var __musicList = "";
	if (jsonData.total == 0) {
		__musicList = '<tr class="alternate" valign="top"><th colspan="4">抱歉，没有找到关于 <font color="red">' + decodeURIComponent(keyWord) + '</font> 的音乐。</th></tr>';
		// return false;
	} else {
		__classIndex = 0; // since WP 3.8
		for (var i in jsonData.results) {
			__className = "";
			if (__classIndex % 2 == 0) {
				__className = "alternate";
			}
			__classIndex++;
			__musicList += '<tr class="' + __className + '" valign="top"><td scope="row" class="check-column"><input type="checkbox" name="musicInfo';
			__musicList += '" song_id="' + jsonData.results[i].song_id;
			__musicList += '" song_name="' + decodeURIComponent(jsonData.results[i].song_name).replace(/\+/g, ' ');
			__musicList += '" artist_id="' + jsonData.results[i].artist_id;
			__musicList += '" artist_name="' + decodeURIComponent(jsonData.results[i].artist_name).replace(/\+/g, ' ');
			__musicList += '" album_id="' + jsonData.results[i].album_id;
			__musicList += '" album_name="' + decodeURIComponent(jsonData.results[i].album_name).replace(/\+/g, ' ');
			__musicList += '" /></td>';
			__musicList += '<td class="song_name column-song_name"><strong><a href="http://www.xiami.com/song/' + jsonData.results[i].song_id + '" target="_blank">' + decodeURIComponent(jsonData.results[i].song_name).replace(/\+/g, ' ') + '</a></strong></td>';
			__musicList += '<td class="artist_name column-artist_name"><a href="http://www.xiami.com/artist/' + jsonData.results[i].artist_id + '" target="_blank">' + decodeURIComponent(jsonData.results[i].artist_name).replace(/\+/g, ' ') + '</a></td>';
			__musicList += '<td class="album_name column-album_name"><a href="http://www.xiami.com/album/' + jsonData.results[i].album_id + '" target="_blank">' + decodeURIComponent(jsonData.results[i].album_name).replace(/\+/g, ' ') + '</a></td></tr>';
		}
		// pager
		if (jsonData.total > 8) {
			document.getElementById("self_set_Pager_ui").innerHTML = pagerView(parseInt(jsonData.total), parseInt(musicPage));
			var obja = document.getElementById("music_pager").getElementsByTagName("A");
			for (i=0; i<obja.length; i++) {
				_attachEvent(obja[i], "click", function(e) {
					e = e ? e : event;
					obj = BROWSER.ie ? event.srcElement : e.target;
					searchMusicList(parseInt(obj.id.replace("page_to_", "")));
				});
			}
		}
	}
	document.getElementById("num_Total").innerHTML = '：共找到 ' + jsonData.total + ' 首歌曲';
	try {
		document.getElementById("music_List").innerHTML = __musicList;
	} catch(e) { // IE下table的innerHTML只读
		tbody_music_List = document.getElementById("music_List");
		tbody_music_List.parentNode.outerHTML = tbody_music_List.parentNode.outerHTML.replace(tbody_music_List.innerHTML, __musicList);
	}
	searchMusicLoading(false);
}

function pagerView(dataCount, currentPage) {
	var __musicListPager = '<div class="pages" id="music_pager"><ul><li class="prevpage"><a href="javascript:void(0);" onFocus="this.blur()" unselectable="on" title="上一页" id="'+ (currentPage <= 1 ? 1 : currentPage - 1) +'">上一页</a></li>';

	var __totalPage = dataCount/8;
	__totalPage = __totalPage > parseInt(__totalPage) ? parseInt(__totalPage) + 1 : parseInt(__totalPage);
	var __forLength = currentPage > 10 ? (currentPage > 1000 ? 2 : 3) : 4;
	var __forStep = 2;
	var __forStart = (__totalPage > 4 && currentPage > __forStep) ? (currentPage < __totalPage - __forLength ? currentPage - __forStep : __totalPage - __forLength) : 1;
	var __forEnd = __forStart + __forLength < __totalPage + 1 ? __forStart + __forLength + 1 : __totalPage + 1;

	if (__totalPage > 4 && currentPage > __forStep + 1) __musicListPager += '<li><a href="javascript:void(0);" onFocus="this.blur()" unselectable="on" title="1" id="page_to_1">1...</a></li>';

	for ( var i = __forStart; i < __forEnd; i++ ) {
		if (currentPage == i) {
			__musicListPager += '<li><a href="javascript:void(0);" onFocus="this.blur()" unselectable="on" title="'+ i +'" id="page_to_'+ i +'" style="background-color:#839B1B; border:1px solid #839B1B;color: #FFFFFF">'+ i +'</a></li>';
		} else {
			__musicListPager += '<li><a href="javascript:void(0);" onFocus="this.blur()" unselectable="on" title="'+ i +'" id="page_to_'+ i +'" >'+ i +'</a></li>';
		}
	}

	if (__forEnd < __totalPage) __musicListPager += '<li><a href="javascript:void(0);" onFocus="this.blur()" unselectable="on" title="'+ __totalPage +'" id="page_to_'+ __totalPage +'">...'+ __totalPage +'</a></li>';

	if (currentPage < __totalPage) {
		currentPage++;
		__musicListPager += '<li class="nextpage"><a href="javascript:void(0);" onFocus="this.blur()" unselectable="on" title="下一页" id="page_to_'+ currentPage +'">下一页</a></li>';
	}
	__musicListPager += '<li class="lastpage"><a href="javascript:void(0);" onFocus="this.blur()" unselectable="on" title="最后一页" id="page_to_'+ __totalPage +'">最后一页</a></li></ul></div>';
	return __musicListPager;
}

// 获得插件目录
function getPluginURL() {
	var i = 0, got = -1, len = document.getElementsByTagName("script").length;
	while ( i <= len && got == -1) {
		var js_url = document.getElementsByTagName("script")[i].src,
			got = js_url.indexOf("music-search.js"); i++;
	}
	return js_url.substr(0, js_url.indexOf("music-search/inc/music-search.js"));
}

// 获得location的值并解密
function getSoundFile(id) {
	var url = getPluginURL() + 'music-search/inc/getlocation.php?id=' + id + '&random=' + new Date().getTime();
	var mp3_URL;
	$.ajax({
		type: "GET",
		url: url,
		async: false,
		error: function(request) {
			alert(request.responseText);
		},
		success: function(data) {
			mp3_URL = JieMi(data);
		}
	});
	if (mp3_URL.indexOf(".mp3") == -1) {
		mp3_URL += ".mp3";
	}
	return mp3_URL;
}

// 解密函数（从反编译某网站flash播放器得到，纯属技术爱好，绝无恶意。局部变量工具自动生成以_loc开头）
// http://bbs.51js.com/viewthread.php?tid=87495
function JieMi(sourceString) {
	var _loc9 = Number(sourceString.charAt(0));
	var _loc7 = sourceString.substring(1);
	var _loc5 = Math.floor(_loc7.length / _loc9);
	var _loc6 = _loc7.length % _loc9;
	var _loc2 = new Array();
	for (var _loc3 = 0; _loc3 < _loc6; ++_loc3) {
		if (_loc2[_loc3] == undefined) {
			_loc2[_loc3] = "";
		} // end if
		_loc2[_loc3] = _loc7.substr((_loc5 + 1) * _loc3, _loc5 + 1);
	} // end of for
	for (var _loc3 = _loc6; _loc3 < _loc9; ++_loc3) {
		_loc2[_loc3] = _loc7.substr(_loc5 * (_loc3 - _loc6) + (_loc5 + 1) * _loc6, _loc5);
	} // end of for
	var _loc4 = "";
	for (var _loc3 = 0; _loc3 < _loc2[0].length; ++_loc3) {
		for (var _loc1 = 0; _loc1 < _loc2.length; ++_loc1) {
			_loc4 = _loc4 + _loc2[_loc1].charAt(_loc3);
		} // end of for
	} // end of for
	_loc4 = unescape(_loc4);
	var _loc8 = "";
	for (var _loc3 = 0; _loc3 < _loc4.length; ++_loc3) {
		if (_loc4.charAt(_loc3) == "^") {
			_loc8 = _loc8 + "0";
			continue;
		} // end if
		_loc8 = _loc8 + _loc4.charAt(_loc3);
	} // end of for //trans ^ to 0
	return (_loc8);
}

function getSelectedCount() {
	var count = 0;
	var musicInfo = document.getElementsByName("musicInfo");
	for (i = 0; i < musicInfo.length; i++) {
		if (musicInfo[i].checked) {
			count++;
		}
	}
	return count;
}

function insertCode() {
	var __player_Tab = document.getElementById("player_Tab");
	var __wall_Tab = document.getElementById("wall_Tab");
	var useShortcode = document.getElementById("useShortcode_chkbox").checked;
	var txt = "";
	if (__player_Tab.className == "current") {	// 插入播放器
		if (getSelectedCount() != 0) {
			var playerStyle = document.getElementById("playerStyle_sel").value;
			var musicInfo = document.getElementsByName("musicInfo");
			if (playerStyle == "iSingle") {	// 歌曲播放器
				var __autoPlay = document.getElementById("autoPlay_sel").value;
				for (i = 0; i < musicInfo.length; i++) {
					if (musicInfo[i].checked) {
						if (__autoPlay == "nope") {	// 不是自动播放
							if (useShortcode) {
								txt += '[xiami id="' + musicInfo[i].attributes["song_id"].nodeValue + '"]' + musicInfo[i].attributes["song_name"].nodeValue + ' -- ' + musicInfo[i].attributes["artist_name"].nodeValue + '[/xiami] ';
							} else {
								txt += '<span class="xiami"><embed src="http://www.xiami.com/widget/470304_' + musicInfo[i].attributes["song_id"].nodeValue + '/singlePlayer.swf" type="application/x-shockwave-flash" width="257" height="33" wmode="transparent" /></span>';
							}
						} else {
							var soundfile = getSoundFile(musicInfo[i].attributes["song_id"].nodeValue);
							if (__autoPlay == "auto") {	// 自动播放
								if (useShortcode) {
									txt += '[xiami soundfile="' + soundfile + '" autostart="yes"]' + musicInfo[i].attributes["song_name"].nodeValue + ' -- ' + musicInfo[i].attributes["artist_name"].nodeValue + '[/xiami] ';
								} else {
									txt += '<span class="xiami"><embed src="https://picbed.sinaapp.com/singlePlayer.swf?soundfile=' + soundfile + '&amp;titles=' + musicInfo[i].attributes["song_name"].nodeValue + '&amp;artists=' + musicInfo[i].attributes["artist_name"].nodeValue + '&amp;autostart=yes" type="application/x-shockwave-flash" width="290" height="24" wmode="transparent" /></span>';
								}
							} else if (__autoPlay == "autoNloop") {	// 自动切循环播放
								if (useShortcode) {
									txt += '[xiami soundfile="' + soundfile + '" autostart="yes" loop="yes"]' + musicInfo[i].attributes["song_name"].nodeValue + ' -- ' + musicInfo[i].attributes["artist_name"].nodeValue + '[/xiami] ';
								} else {
									txt += '<span class="xiami"><embed src="https://picbed.sinaapp.com/singlePlayer.swf?soundfile=' + soundfile + '&amp;titles=' + musicInfo[i].attributes["song_name"].nodeValue + '&amp;artists=' + musicInfo[i].attributes["artist_name"].nodeValue + '&amp;autostart=yes&amp;loop=yes" type="application/x-shockwave-flash" width="290" height="24" wmode="transparent" /></span>';
								}
							}
						}
					}
				}
			} else if (playerStyle == "iMulti") {	// 歌曲播放列表
				var __ids = "";
				for (i = 0; i < musicInfo.length; i++) {
					if (musicInfo[i].checked) {
						__ids += musicInfo[i].attributes["song_id"].nodeValue + ',';
					}
				}
				var __values = "";
				for (i = 0; i < musicInfo.length; i++) {
					if (musicInfo[i].checked) {
						__values += musicInfo[i].attributes["song_name"].nodeValue + ' -- ' + musicInfo[i].attributes["artist_name"].nodeValue + ', ';
					}
				}
				if (useShortcode) {
					txt = '[xiami ids="' + __ids + '"]' + __values + '[/xiami] ';
				} else {
					txt = '<span class="xiami"><embed src="http://www.xiami.com/widget/470304_' + __ids + '_235_346_FF8719_494949/multiPlayer.swf" type="application/x-shockwave-flash" width="235" height="346" wmode="opaque" /></span>';
				}
			} else if (playerStyle == "iDynamic") {	// 歌手动态播播
				for (i = 0; i < musicInfo.length; i++) {
					if (musicInfo[i].checked) {
						if (useShortcode) {
							txt += '[xiami aid="' + musicInfo[i].attributes["artist_id"].nodeValue + '"]' + musicInfo[i].attributes["artist_name"].nodeValue + '的动态播播[/xiami] ';
						} else {
							txt += '<span class="xiami"><embed src="http://www.xiami.com/widget/470304_' + musicInfo[i].attributes["artist_id"].nodeValue + '_235_346_FF8719_494949/artisthotPlayer.swf" type="application/x-shockwave-flash" width="235" height="346" wmode="opaque" /></span>';
						}		
					}
				}
			}
			try {
				tinyMCEPopup.editor.execCommand("mceInsertContent", false, txt);
				tinyMCEPopup.close();
			} catch(e) {
				var win = window.dialogArguments || opener || parent || top;
				win.send_to_editor(txt);
			}
			return false;
		}
	} else if (__wall_Tab.className == "current") {	// 插入唱片墙
		var __uid = document.getElementById("uID").value;
		if (IsNumeric(__uid)) {
			var __direction = document.getElementById("direction_sel").value;
			var __size = document.getElementById("size_sel").value;
			var __type = document.getElementById("type_sel").value;
			if (useShortcode) {
				txt = '[xiami uid="' + __uid + '" direction="' + __direction + '" size="' + __size + '" type="' + __type + '"]虾米用户 ' + __uid + ' 的唱片墙[/xiami] ';
			} else {
				if (__direction == "H") {
					switch (__size) {
						case "S":
							var __width = "451";
							var __height = "179";
							break;
						case "M":
							var __width = "507";
							var __height = "235";
							break;
						case "L":
							var __width = "675";
							var __height = "235";
							break;
					}
				} else {
					switch (__size) {
						case "S":
							var __width = "171";
							var __height = "291";
							break;
						case "M":
							var __width = "227";
							var __height = "403";
							break;
						case "L":
							var __width = "227";
							var __height = "627";
							break;
					}
				}
				txt = '<span class="xiami"><embed src="http://www.xiami.com/widget/' + __uid + '_' + __direction + '_' + __size + '_' + __type + '/wallPlayer.swf" type="application/x-shockwave-flash" width="' + __width + '" height="' + __height + '" wmode="transparent" /></span>';
			}
			try {
				tinyMCEPopup.editor.execCommand("mceInsertContent", false, txt);
				tinyMCEPopup.close();
			} catch(e) {
				var win = window.dialogArguments || opener || parent || top;
				win.send_to_editor(txt);
			}
			return false;
		}
	}
}