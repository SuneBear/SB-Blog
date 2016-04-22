if (!window.getComputedStyle) {
  window.getComputedStyle = function(c, d) {
    this.el = c;
    this.getPropertyValue = function(a) {
      var b = /(\-([a-z]){1})/g;
      if (a == 'float') a = 'styleFloat';
      if (b.test(a)) {
        a = a.replace(b, function() {
          return arguments[2].toUpperCase()
        })
      }
      return c.currentStyle[a] ? c.currentStyle[a] : null
    };
    return this
  }
}
var device = {
  touch: false,
  mobile: false,
  over: '',
  out: '',
  retina: false,
  transitions: false,
  android: false
};

function registerDevice() {
  var a = '@2x';
  var b = (window.devicePixelRatio === undefined) ? 1 : window.devicePixelRatio;
  if (b > 1) {
    document.getElementsByTagName('html')[0].className += ' retina';
    device.retina = true
  }
  device.transitions = Modernizr.csstransitions;
  device.transforms = Modernizr.csstransforms;
  device.transforms3d = Modernizr.csstransforms3d;
  device.animations = Modernizr.cssanimations;
  device.preserve3d = Modernizr.csstransformspreserve3d;
  if ((navigator.userAgent.toLowerCase().indexOf('android') != -1)) device.android = true;
  if ((navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('BlackBerry') != -1) || (navigator.userAgent.indexOf('Windows Phone') != -1) || (navigator.userAgent.toLowerCase().indexOf('android') != -1) && (navigator.userAgent.toLowerCase().indexOf('mobile') != -1)) {
    document.getElementsByTagName('html')[0].className += ' mobile';
    device.mobile = true
  }
  if ((navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('BlackBerry') != -1) || (navigator.userAgent.indexOf('Windows Phone') != -1) || (navigator.userAgent.toLowerCase().indexOf('android') != -1) || (navigator.userAgent.indexOf('iPad') != -1)) {
    document.getElementsByTagName('html')[0].className += ' touchscreen';
    device.touch = true
  }
  if (device.touch) {
    device.over = window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart";
    device.out = window.navigator.msPointerEnabled ? "MSPointerUp" : "touchend";
    device.instaClick = window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart";
    device.touchMove = window.navigator.msPointerEnabled ? "MSPointerMove" : "touchmove"
  } else {
    device.over = 'mouseenter';
    device.out = 'mouseleave';
    device.instaClick = 'click'
  }
  if (!device.touch) {
    document.getElementsByTagName('html')[0].className += ' desktop'
  }
}
registerDevice();
(function($) {
  $.fn.smartAnimate = function(e, f, g, h) {
    var i = this;
    var j = device.transitions;
    this.setTransition = function(a, b, c, d) {
      if (j) {
        this.setCSSTimes($(a), c);
        $(a).addClass('css-anim').css(b);
        clearTimeout($(a).data('css-timeout'));
        $(a).data('css-timeout', setTimeout(function() {
            i.setCSSTimes($(a), 0);
            if (d) {
              d(a, h);
            }
          },
          Math.max(c, 50)))
      } else {
        $(a).stop(true).animate(b, c,
          function() {
            i.setCSSTimes($(a), 0);
            if (d) {
              d(a, h);
            }
          })
      }
    };
    this.setCSSTimes = function(a, b) {
      $(a).css('-webkit-transition-duration', b * 0.001 + 's').css('-moz-transition-duration', b * 0.001 + 's').css('-ms-transition-duration', b * 0.001 + 's').css('-o-transition-duration', b * 0.001 + 's').css('transition-duration', b * 0.001 + 's')
    };
    $(this).each(function() {
      i.setTransition(this, e, f, g)
    });
    return this;
  }
})(jQuery);

function getSuperTransition(a) {
  var b = {
    noTranslate: false,
    x: null,
    y: null,
    units: 'px',
    leftOffset: 0,
    topOffset: 0,
    z: null,
    rotateX: null,
    rotateY: null,
    scale: null,
    timing: 'ease-out'
  };
  a = $.extend(b, a);
  var c = '';
  if (a.rotateX !== null) {
    c += 'rotateX(' + a.rotateX + 'deg) ';
  }
  if (a.rotateY !== null) {
    c += 'rotateY(' + a.rotateY + 'deg) ';
  }
  if (a.rotate !== null && a.rotate !== undefined) {
    c += 'rotate(' + a.rotate + 'deg) ';
  }
  if (a.scale !== null) {
    c += 'scale(' + a.scale + ') ';
  }
  if (device.transforms && device.animations && !a.noTranslate) {
    if (a.x === null) {
      a.x = 0;
    }
    if (a.y === null) {
      a.y = 0;
    }
    if (a.x !== null) {
      c += 'translateX(' + (parseInt(a.x, 10) - parseInt(a.leftOffset, 10)) + a.units + ') ';
    }
    if (a.y !== null) {
      c += 'translateY(' + (parseInt(a.y, 10) - parseInt(a.topOffset, 10)) + a.units + ') ';
    }
    if (a.z !== null) {
      c += 'translateZ(' + a.z + ') ';
    }
    return {
      transform: c,
      transitionTimingFunction: a.timing
    }
  } else {
    return {
      left: a.x + a.units,
      top: a.y + a.units,
      transform: c,
      transitionTimingFunction: a.timing
    }
  }
}

function NCFishery(a, b) {
  var t = this,
    compiler = {
      str: ''
    },
    tmp = [],
    layer = {
      list: []
    },
    itemDefaults = {
      direction: "clockwise",
      module: "fish",
      w: 0,
      height: 0,
      x: 0,
      y: 0,
      minY: 0,
      maxY: 0
    },
    module = {
      fish: NCModuleFish
    };
  t.init = function() {
    t.createDisplay();
    t.initFish()
  };
  t.createDisplay = function() {
    compiler.str = '';
    t.createFish();
    $('.fishery', a).html(compiler.str);
    compiler.str = '';
  };
  t.createFish = function() {
    compiler.str = '';
    for (var i = 0,
        il = b.fish.length; i < il; i++) {
      tmp.uid = 'cn-fsh-id-' + i;
      tmp.d = $.extend({},
        itemDefaults, b.fish[i]);
      tmp.module = (module[tmp.d.module] !== undefined ? new module[tmp.d.module](tmp.d, tmp.uid, compiler, a) : null);
      if (tmp.module !== null) {
        layer.list.push({
          id: tmp.uid,
          item: tmp.module
        });
      }
    }
  };
  t.initFish = function() {
    for (var i = 0,
        il = layer.list.length; i < il; i++) {
      layer.list[i].item.init();
    }
  };
  t.activate = function() {
    t.activateFish()
  };
  t.deactivate = function() {
    t.deactivateFish()
  };
  t.activateFish = function() {
    for (var i = 0,
        il = layer.list.length; i < il; i++) {
      layer.list[i].item.activate();
    }
  };
  t.deactivateFish = function() {
    for (var i = 0,
        il = layer.list.length; i < il; i++) {
      layer.list[i].item.deactivate();
    }
  };
  t.init()
  t.activate();
}

function NCModuleFish(a, b, c, d) {
  var t = this,
    fish = {
      elementWidth: 350,
      timeout: null,
      startDelay: 5000,
      time: (device.transforms && device.transitions ? 5000 : 2000),
      delay: 5000,
      minY: a.minY,
      maxY: a.maxY,
      startRotation: a.direction === 'clockwise' ? -180 : 180,
      endRotation: a.direction === 'clockwise' ? 180 : -180
    };
  t.display = null;
  c.str += '<div id="' + b + '" class="fish-element"> <div class="center"> <div class="spin"> <div class="fish-dsp"><div class="sp fish" style="top:-' + Math.floor(a.h * 0.5) + 'px; left:-' + Math.floor(a.w * 0.5) + 'px; width:' + a.w + 'px; height:' + a.h + 'px; background-position:-' + a.x + 'px -' + a.y + 'px;"></div></div> </div> </div> </div>';
  t.init = function() {
    t.display = $('#' + b, d);
    if (device.transforms && device.transitions) {
      $('.spin', t.display).smartAnimate(getSuperTransition({
        rotate: fish.startRotation
      }), 0)
    } else {
      $('.spin', t.display).smartAnimate(getSuperTransition({
        y: 100
      }), 0)
    }
  };
  t.activate = function() {
    t.startFish()
  };
  t.deactivate = function() {
    t.stopFish()
  };
  t.startFish = function() {
    clearTimeout(fish.timeout);
    fish.timeout = setTimeout(t.splash, fish.startDelay + (Math.floor(Math.random() * 1000)));
  };
  t.stopFish = function() {
    clearTimeout(fish.timeout)
  };
  t.splash = function() {
    fish.posX = Math.floor($(window).width() * 0.1) + Math.floor(Math.random() * $(window).width() * 0.8) - (fish.elementWidth * 0.5);
    fish.posY = fish.minY + Math.floor(Math.random() * (fish.maxY - fish.minY));
    $(t.display).css({
      left: fish.posX + 'px',
      top: fish.posY + '%'
    });
    if (device.transforms && device.transitions) {
      t.fullSplash()
    } else {
      t.simpleSplash()
    }
    clearTimeout(fish.timeout);
    fish.timeout = setTimeout(t.splash, fish.time + (!device.transforms ? fish.time : 0) + fish.delay + (Math.floor(Math.random() * 1000)));
  };
  t.fullSplash = function() {
    $('.spin', t.display).smartAnimate(getSuperTransition({
        rotate: fish.startRotation
      }), 0,
      function() {
        $('.spin', t.display).smartAnimate(getSuperTransition({
          rotate: fish.endRotation
        }), fish.time)
      })
  };
  t.simpleSplash = function() {
    $('.spin', t.display).smartAnimate(getSuperTransition({
        y: 100,
        x: -50
      }), 0,
      function() {
        $('.spin', t.display).smartAnimate(getSuperTransition({
            y: 30,
            x: 0
          }), fish.time,
          function() {
            $('.spin', t.display).smartAnimate(getSuperTransition({
                y: 100,
                x: 50
              }), fish.time,
              function() {})
          })
      })
  }
}

function NVVehicle(c, d) {
  var t = this,
    tmp = [],
    status = {
      active: false
    },
    vehicle = {
      timeout: null,
      start: d.direction == 'left' ? 100 : 0,
      end: d.direction == 'left' ? 0 : 100
    },
    effects = {};
  t.display = [];
  t.functional = [];
  t.init = function() {
    t.display = $('#' + d.id);
    t.initFunctionalLayers();
    t.addEffects()
  };
  t.initFunctionalLayers = function() {};
  t.addEffects = function() {
    $.each(d.data.effects,
      function(a, b) {
        switch (b) {
          case 'rock':
            effects.rock = {
              timeout: null
            };
            t.display.on(device.over,
              function() {
                t.effectRock()
              });
            break;
          case 'floaty':
            effects.floaty = {
              timeout: null
            };
            effects.floaty.timeout = setTimeout(function() {
                $('.v-ot', t.display).addClass('effect-floaty')
              },
              Math.floor(Math.random() * 500));
            break;
          case 'loopdaloop':
            effects.loopdaloop = {
              looping: false
            };
            $('.v-ot', t.display).addClass('effect-loopdaloop');
            t.display.on(device.over,
              function() {
                t.effectLoopDaLoop()
              });
            break;
          default:
            break
        }
      })
  };
  t.effectRock = function() {
    if (!status.active) {
      return false;
    }
    track('event', 'Nottageville', 'Boat rocked');
    if (!$('.v-dsp', t.display).hasClass('effect-rock')) {
      $('.v-dsp', t.display).addClass('effect-rock');
      clearTimeout(effects.rock.timeout);
      effects.rock.timeout = setTimeout(function() {
          $('.v-dsp', t.display).removeClass('effect-rock')
        },
        4000)
    }
  };
  t.effectLoopDaLoop = function() {
    if (effects.loopdaloop.looping) {
      return false;
    }
    track('event', 'Nottageville', 'Plane flipped');
    effects.loopdaloop.looping = true;
    $('.v-ot', t.display).smartAnimate(getSuperTransition({
        rotate: d.direction == 'left' ? -360 : 360
      }), 3000,
      function() {
        $('.v-ot', t.display).smartAnimate(getSuperTransition({
          rotate: 0
        }), 0);
        effects.loopdaloop.looping = false;
      })
  };
  t.activate = function() {
    if (status.active) {
      return false;
    }
    status.active = true;
    t.run(false)
  };
  t.deactivate = function() {
    status.active = false;
    clearTimeout(vehicle.timeout)
  };
  t.run = function(a) {
    $(t.display, d.display).hide();
    clearTimeout(vehicle.timeout);
    vehicle.timeout = setTimeout(function() {
        tmp.speed = (d.transition.speed * 3) * t.display.width() + Math.floor(Math.random() * 300);
        $(t.display, d.display).show().smartAnimate(getSuperTransition({
            x: vehicle.start,
            units: '%'
          }), 0,
          function() {
            $(t.display, d.display).smartAnimate(getSuperTransition({
              x: vehicle.end,
              units: '%',
              timing: 'linear'
            }), tmp.speed)
          });
        clearTimeout(vehicle.timeout);
        vehicle.timeout = setTimeout(function() {
            t.run(false)
          },
          tmp.speed + d.transition.minDelay + Math.floor(Math.random() * d.transition.targetDelay))
      },
      a ? 0 : d.transition.minDelay + Math.floor(Math.random() * d.transition.targetDelay))
  }
}
