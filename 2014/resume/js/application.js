/*===================
@name:应用层
@use:实例化库，具体特效代码
@desc:感谢该站用到的所有开源库，因为有它们，才让前端变得更加精彩
@author:Sune
@email:sune@yileit.com
@date:2014-08-02
@list:
>>dev
>>resize
>>monitor
>>global
>>load
>>scrollbar
>>tooltip
>>console.log
>>animate
>>menu&scroll
>>screenA
>>screenB
>>screenC
>>screenD
>>screenE
===================*/

(function() { //closure
  $(function() { //ready

    var links = $('.nav-options').find('li');
    slide = $('.screen');
    button = $('.button');
    mywindow = $(window);
    body = $('body');

    //Sdev
    // $('.loader').css({display: 'none'});
    // $('#ui-header').css({top:0});
    //E

    //Sresize
    $(window).resize(function() {
      var windowHeight = $(window).height();
      $('.screen').height(windowHeight);
      $.waypoints('refresh');
      if (windowHeight < 600 && $(".ZebraDialog").length == 0) {
        $.Zebra_Dialog('屏幕高度需大于600px，并请使用1920x1080(16:9)的分辨率浏览,这样才能获得最佳体验哟', {
          'type': 'error',
          'title': '嗯哼！你的屏幕不够高',
          'overlay_opacity': 0.4
        });
      }
    });
    $(window).trigger('resize');
    //E

    //Smonitor
    var UA = navigator.userAgent.toLowerCase();
    var browerKernel = {
      isTrident: function() {
        if (/trident/i.test(UA)) return true;
        else return false;
      },
      isWebkit: function() {
        if (/webkit/i.test(UA)) return true;
        else return false;
      },
      isGecko: function() {
        if (/gecko/i.test(UA)) return true;
        else return false;
      },
      isPresto: function() {
        if (/presto/i.test(UA)) return true;
        else return false;
      },
      isWebCore: function() {
        if (/webcore/i.test(UA)) return true;
        else return false;
      },
      isMac: function() {
        if (/Mac OS X/i.test(UA)) return true;
        else return false;
      }
    }

    if (!browerKernel.isWebkit() || (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) {
      $.Zebra_Dialog('', {
        'type': 'error',
        'title': '嗯哼！你的浏览器不兼容',
        'message': '请使用webkit内核浏览器进行浏览，不然网页会非常混乱，得不到应有的效果。<br/>推荐<a href="https://www.google.com/intl/zh-CN/chrome/browser/" target="_blank">chrome浏览器</a>'
      });
    }

    document.oncontextmenu = function(event) { //屏蔽默认右键菜单
      if (window.event) {
        event = window.event;
      }
      try {
        var the = event.srcElement;
        if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    }

    //E

    //Sglobal
    function once(fn) {
        return function() {
          try {
            fn.apply(this, arguments);
          } catch (ex) {
            //alert("'this function can only called by once.'");
          } finally {
            fn = null;
          }
        }
      }
      //E

    //Sload

    //NbackgroundAnimate
    $(window).load(function() { // fake load event
      $('.loader').addClass("ready");
      $('.inner').width("100%");
      $('.animal').css("left", "110%");
      setTimeout(function() {
        $('.inner').css({
          top: -10
        });
        $('.loader-top').slideUp(800);
        $('.loader-bottom').slideUp(1000, function() {
          $('.loader').remove();
          screenAAnimate();
          if (mywindow.scrollTop() < mywindow.height()) {
            $('.nav-options li[data-slide="1"]').addClass('active');
          }
        });
        links.filter(".active").trigger('click'); //active scroll event
      }, 1500);
    });
    //E

    //Sscrollbar
    $('html').niceScroll({
      cursorcolor: "#1885e5",
      zIndex: 99998,
      cursorborder: 0,
      horizrailenabled: false,
      cursorborderradius: 0
    }).rail.css('zIndex', 1000);
    //E

    //Stooltip
    $('.tooltip').tooltipster({
      theme: 'tooltipster-blue'
    });
    //E


    //Sconsole.log
    console.log("\n嗯哼！对代码感兴趣？还是对我感兴趣？\n\n欢迎对新奇事物感兴趣的你，若你有意勾搭我←_← \n\n请邮件至 sune@yileit.com 或企鹅 1292117887\n");
    //E


    //Sanimate

    var timeUnit = 500;

    function screenAAnimate() {

      $('.screenA .title .text').textillate({ in : {
          effect: 'bounceIn',
          delay: 100
        }, callback: function() {
          $('.screenA .title').transition({
            scale: 0.3,
            opacity: 0,
            duration: timeUnit
          }, function() {

            //Ssea   通过transition回调控制执行顺序
            $('.parallax-viewport').transition({
                top: '10%',
                duration: timeUnit * 2,
                easing: 'snap'
              }, function() {
                var SoapBubbleMachineNumber1 = $('fn').BubbleEngine({
                  particleSizeMin: 0,
                  particleSizeMax: 60,
                  particleSourceX: $('.bubble').width() / 2 - 500,
                  particleSourceY: $('.bubble').height(),
                  particleDirection: 'center',
                  particleAnimationDuration: 8000,
                  particleAnimationVariance: 3000,
                  particleScatteringX: 2500,
                  particleScatteringY: $(window).height() / 2 - 50,
                  gravity: -150
                });
                var SoapBubbleMachineNumber2 = $('fn').BubbleEngine({
                  particleSizeMin: 0,
                  particleSizeMax: 50,
                  particleSourceX: $('.bubble').width() / 2,
                  particleSourceY: $('.bubble').height(),
                  particleDirection: 'center',
                  particleAnimationDuration: 10000,
                  particleAnimationVariance: 3000,
                  particleScatteringX: 400,
                  particleScatteringY: $(window).height() / 2 - 30,
                  gravity: -100
                });
                var SoapBubbleMachineNumber3 = $('fn').BubbleEngine({
                  particleSizeMin: 0,
                  particleSizeMax: 30,
                  particleSourceX: $('.bubble').width() / 2 + 500,
                  particleSourceY: $('.bubble').height(),
                  particleDirection: 'center',
                  particleAnimationDuration: 12000,
                  particleAnimationVariance: 3000,
                  particleScatteringX: 2500,
                  particleScatteringY: $(window).height() / 2 - 10,
                  gravity: -100
                });
                SoapBubbleMachineNumber1.addBubbles(50);
                SoapBubbleMachineNumber2.addBubbles(20);
                SoapBubbleMachineNumber3.addBubbles(70);
                //Slogo
                $(".fish").addClass('active').transition({
                    delay: timeUnit * 3
                  }, function() {
                    $(".fish").addClass('flipOutY').transition({
                      delay: timeUnit * 1
                    }, function() {
                      $(".logo").transition({
                        perspective: '400px',
                        scale: 0.6
                      }).transition({
                        opacity: 1,
                        rotateY: '180deg'
                      }).transition({
                        scale: 1
                      }).transition({
                        rotateY: 0
                      }, function() {
                        $(this).addClass('animate bounce');
                        $(".logo-fan").addClass('animate rotate');
                        $("#logofish").remove();
                        //Stext
                        $('.textA').textillate({ in : {
                            effect: 'flipInY',
                            delay: 200
                          }, callback: function() {
                            $('.textA .word1 .char1').addClass('translate').addClass("active").textillate({ in : {
                                effect: 'flipInY',
                                delay: 200
                              }
                            });
                            $('.textA .word1 .char2').addClass('translate2').addClass("active").textillate({ in : {
                                effect: 'flipInX',
                                delay: 400
                              }
                            });
                            $('.textA .word1 .char3').addClass('translate3').addClass("active").textillate({ in : {
                                effect: 'bounceIn',
                                delay: 200
                              }
                            });
                            $('.textA .word1 .char4').addClass('translate').addClass("active").textillate({ in : {
                                effect: 'flipInY',
                                delay: 200
                              }
                            });
                          }
                        });
                        $('.textB').textillate({
                          loop: true,
                          in : {
                            effect: 'bounceIn',
                            delay: 300
                          },
                          out: {
                            effect: 'flipOutY',
                            delay: 200
                          }
                        });
                        $('.textC').textillate({ in : {
                            effect: 'fadeInUpBig',
                            delay: 200
                          }, callback: function() {
                            $('.textA').addClass('tada');
                            $('.textC').addClass('rubberBand');
                            //StopNav
                            $("header").transition({
                              top: 0,
                              duration: timeUnit * 4
                            });
                            //E

                            //Stransport
                            $("#vessel-1").transition({
                              x: "2650"
                            }, 80000);
                            $("#vessel-2").transition({
                              x: "2650"
                            }, 120000);
                            $(".nimbus .v-ot").transition({
                              x: "150%"
                            }, 40000);
                            //E

                          }
                        });
                        //E
                      })
                    })
                  })
                  //E

                //SfishShark
                fishery = new NCFishery($('.fishing', $('.screenA')), {
                  "fish": [{
                    "direction": "clockwise",
                    "w": 112,
                    "h": 74,
                    "x": 376,
                    "y": 157,
                    "minY": -5,
                    "maxY": 20
                  }, {
                    "direction": "clockwise",
                    "w": 112,
                    "h": 74,
                    "x": 376,
                    "y": 157,
                    "minY": -5,
                    "maxY": 20
                  }, {
                    "direction": "",
                    "w": 112,
                    "h": 74,
                    "x": 376,
                    "y": 231,
                    "minY": -5,
                    "maxY": 20
                  }]
                });
                //E

              })
              //E

          });
        }
      });
    }

    //NscreenB
    var screenBAnimate = once(function() {
      $('.screenB .title .text').textillate({ in : {
          effect: 'bounceIn',
          delay: 100
        }, callback: function() {
          $('.screenB .title').transition({
            scale: 0.3,
            opacity: 0
          }, function() {
            $(".screenB .bg").transition({
              opacity: 1
            }, timeUnit * 1, function() { //bg
              // $(".screenB .bg").transition({scale:1,duration:timeUnit*2});
              $(".screenB .people-wrap").transition({
                  bottom: 0,
                  scale: 1,
                  duration: timeUnit * 2
                })
                .transition({
                  left: "50%",
                  duration: timeUnit * 2
                }, function() { //people
                  $(".screenB .people-blue").transition({
                    opacity: 0,
                    duration: timeUnit * 2,
                    delay: 1000
                  }, function() {
                    $(".screenB .senses,.screenB .steve-jobs").fadeIn(timeUnit * 2, function() {
                      $(".screenB .people-low-poly").fadeIn(timeUnit * 4, function() {
                        $(".screenB .bg-gap").transition({
                          opacity: 1,
                          bottom: 0,
                          duration: timeUnit * 2
                        });
                        $(".screenB .bg-sea").transition({
                          opacity: 1,
                          duration: timeUnit * 5
                        }, function() {
                          $(this).addClass('bg-breath');
                          $(".screenB .bg-sea2").addClass('bg-breath2');
                          $(".screenB .bg-gray").addClass('bg-move');
                        });

                        $(".screenB .profile-card").transition({
                          top: 45,
                          duration: timeUnit * 2
                        }, function() {
                          $(".screenB .card-info li").each(function(index, val) {
                            $(".screenB .card-info li:eq(" + index + ")").transition({
                              opacity: 1,
                              duration: timeUnit * 2,
                              delay: timeUnit * index
                            })
                          })
                        });

                        $(".screenB .tvshow").transition({
                          top: 45,
                          duration: timeUnit * 2
                        }).transition({
                          delay: 4000
                        }, function() {
                          var tvnoise = $(".screenB .tvnoise");
                          document.getElementById('audiobar').play(); //必须通过原生JS操作DOM
                          document.getElementById('audiobar').volume = .8;
                          $('#audiobar').on('playing', function() {
                            tvnoise.transition({
                              opacity: 0,
                              duration: timeUnit * 2
                            });
                            document.getElementById('airInG').pause();
                          }).on('ended', function() {
                            tvnoise.transition({
                              opacity: 1,
                              duration: timeUnit * 2
                            });
                            if (document.getElementById('airInG').paused == true) {
                              document.getElementById('airInG').play();
                            }
                          })
                        })
                      });
                    });
                  });
                });
            });
          });
        }
      });
    });

    //NscreenC
    var screenCAnimate = once(function() {
      if (!browerKernel.isMac()) {
        $('.code-area div').css({
          'letter-spacing': "1px"
        });
      }

      $('.screenC .title .text').textillate({ in : {
          effect: 'bounceIn',
          delay: 100
        }, callback: function() {
          $('.screenC .title').transition({
            scale: 0.3,
            opacity: 0
          }, function() {
            //code input
            codeInput(function() {
              $(".code-area .b").addClass('active');
              $(".code-area .c").css('display', 'block');
              setTimeout(function() {
                $(".code-area .b span").each(function(index, val) {
                  setTimeout(function() {
                    $(".code-area .b span:eq(" + index + ")").addClass('active');
                  }, 500 * index)
                })
              }, 2000);

              $(".screenC .coding").transition({
                width: "50%",
                left: 0,
                marginLeft: 0,
                delay: timeUnit * 14,
                duration: timeUnit * 2
              }, function() {
                $(".screenC .code-area .b").addClass('active2');
                $(".screenC .code-area span").addClass('active2');

                $(".screenC .bg").transition({
                  opacity: 1,
                  right: 0,
                  duration: timeUnit * 2
                }, function() {

                  $('.screenC .chart').easyPieChart({
                    easing: 'easeOutBounce',
                    barColor: "#225480",
                    lineWidth: 5,
                    animate: 1000,
                    size: 150,
                    onStep: function(from, to, percent) {
                      $(this.el).find('.percent').text(Math.round(percent));
                    }
                  });
                  $('.screenC .design-title').transition({
                    marginTop: "-40%",
                    opacity: 1,
                    duration: timeUnit * 2
                  }, function() {
                    $('.screenC .design-title span').css("border-bottom-width", "2px");
                    $('.screenC .chart').fadeIn('1000', function() {
                      $(".screenC .chart-interactive,.screenC .chart-architect").transition({
                        marginTop: 0,
                        duration: timeUnit * 2
                      }, function() {
                        $(".screenC .chart-interactive").css({
                          marginLeft: -185
                        });
                        $(".screenC .chart-architect").css({
                          marginLeft: 50
                        }).transition({}, function() {
                          $(".screenC .percent,.screenC .label").show('1000');
                          $(".screenC .chart-userinterface").data('easyPieChart').update(20);
                          $(".screenC .chart-architect").data('easyPieChart').update(40);
                          $(".screenC .chart-interactive").data('easyPieChart').update(40);

                        })

                      })

                    });
                  })
                });



              })

            });
          });
        }
      });
    });
    //NscreenD
    var screenDAnimate = once(function() {
      $('.screenD .title .text').textillate({ in : {
          effect: 'bounceIn',
          delay: 100
        }, callback: function() {
          $('.screenD .title').transition({
            scale: 0.3,
            opacity: 0
          }, function() {
            $('.screenD .MouThing').transition({
              opacity: 1,
              height: $(window).height()
            })
            $('.screenD .PlayLife').transition({
              opacity: 1,
              height: $(window).height(),
              delay: 300
            })
            $('.screenD .Infloor').transition({
              opacity: 1,
              height: $(window).height(),
              delay: 600
            })
            $('.screenD .DotaWind').transition({
              opacity: 1,
              height: $(window).height(),
              delay: 1000
            }, function() {
              $(".works-gallery nav a").css("width", "25.5%");
              galleryaddListener(); //run
              $('.screenD .MouThing').trigger('mouseover');
            });
          });
        }
      });
    });
    //NscreenE
    var screenEAnimate = once(function() {
      $('.screenE .title .text').textillate({ in : {
          effect: 'bounceIn',
          delay: 100
        }, callback: function() {
          $('.screenE .title').transition({
            scale: 0.3,
            opacity: 0
          }, function() {
            $('.screenE .bg').transition({
              opacity: 1,
              scale: 1,
              duration: timeUnit * 2
            }, function() {
              $('.screenE .bg-sea').slideDown(1500, 'easeInBounce', function() {
                document.getElementById('airInG').play();
                $('#airInG').on('playing', function() {
                  document.getElementById('audiobar').pause();
                })
                $('.screenE .bg .bg-sea').addClass('bg-scale');
                $('.screenE .contact-bg').transition({
                  opacity: 0.8,
                  duration: timeUnit * 2
                }, function() {
                  $('.screenE .contact-box').slideDown('1500');
                })
              });
            });

          });
        }
      });
    });
    //E

    //Smenu&scroll
    new menu($('body'));
    slide.waypoint(function(direction) { //判断滚动条在第几屏
      dataslide = $(this).attr('data-slide');
      if (direction === 'down') {
        $('.nav-options li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
        $('.nav-options li[data-slide="1"]').removeClass('active');
      } else {
        $('.nav-options li[data-slide="' + dataslide + '"]').removeClass('active').prev().addClass('active')
      }

    });

    function goToByScroll(dataslide) {
      var goal = $('.screen[data-slide="' + dataslide + '"]').offset().top;
      body.animate({
        scrollTop: goal
      }, 500, 'easeInOutQuint', function() {
        setTimeout(function() {
          var currentScreen = $(".nav-options li[class='active']").data('slide');
          if (currentScreen == 2) {
            screenBAnimate();
          } else if (currentScreen == 3) {
            screenCAnimate();
          } else if (currentScreen == 4) {
            screenDAnimate();
          } else if (currentScreen == 5) {
            screenEAnimate();
          };

        }, 100)

      });
    }
    links.click(function(e) {
      e.preventDefault();
      dataslide = $(this).attr('data-slide');
      goToByScroll(dataslide);
    });

    //Nhack scroll
    mywindow.scroll(function(e) { //当滚动条离顶部为0时
      if (mywindow.scrollTop() == 0) {
        $('.nav-options li[data-slide="1"]').addClass('active');
        $('.nav-options li[data-slide="2"]').removeClass('active');
      }
    });
    mywindow.on('mousewheel', function(event) { //滚轮事件
      var $this = $(this),
        timeoutId = $this.data('timeoutId');
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      $this.data('timeoutId', setTimeout(function() {
        $this.removeData('timeoutId');
        $this = null
        if (event.deltaY >= 1) { //up
          links.filter(".active").prev().trigger('click');
        } else if (event.deltaY <= -1) { //down
          links.filter(".active").next().trigger('click');
        }
      }, 200));
      return false;
    }).on('keydown', function(e) { //按键事件
      var $this = $(this),
        timeoutId2 = $this.data('timeoutId2');
      if (timeoutId2) {
        clearTimeout(timeoutId2);
      }
      $this.data('timeoutId2', setTimeout(function() {
        if (!e.target.tagName.match(/input|textarea/i)) {
          if (e.keyCode == 33 || e.keyCode == 34) {
            setTimeout(function() {
              var currentScreen = $(".nav-options li[class='active']").data('slide');
              if (currentScreen == 2) {
                screenBAnimate();
              } else if (currentScreen == 3) {
                screenCAnimate();
              } else if (currentScreen == 4) {
                screenDAnimate();
              }
            }, 100)
          }
          if (e.keyCode == 35) {
            screenEAnimate();
          }
        }
      }, 500));
    })

    //E


    /*====SscreenA====*/

    //Sparallax
    $('.parallax-layer').parallax({}, //海视差分层
      {
        xorigin: "center",
        xparallax: "100%",
        yparallax: "20%"
      }, {
        xparallax: "70%",
        yparallax: "40%"
      }, {
        xparallax: "50%",
        yparallax: "60%"
      });
    //E

    /*====E====*/

    /*====SscreenB====*/


    /*====E====*/

    /*====SscreenC====*/
    function codeInput(callback) {

      requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
          setTimeout(callback, 1000 / 60);
        };

      var codeA = $('.code-area .a'),
        codeB = $('.code-area .b'),
        codeText = codeA.html(),
        len = codeText.length,
        speed = speed || 1,
        count = 0,
        i = 0;

      var write = function() {
        codeB.html(codeText.substring(0, count) + '_');
        if (i % 10 == 0) speed = speed + 2;
        count = count + speed;
      };
      var loopGo = false;
      var loop = function() {
        if (count < len) {
          if (count > 14600 && !loopGo) {
            speed += 20;
            loopGo = true;
          }
          i++;
          write();
          requestAnimationFrame(loop);
        } else { //callback
          if (callback) {
            callback();
          }
        }
      }
      requestAnimationFrame(loop);
    }

    /*====E====*/


    /*====SscreenD====*/
    var galleryDefault = [{
        width: "25.5%",
        left: "0%"
      }, {
        width: "25.5%",
        left: "25%"
      }, {
        width: "25.5%",
        left: "50%"
      }, {
        width: "25.5%",
        left: "75"
      }],
      galleryOpts = [
        [{
          width: "40.5%",
          left: "0%"
        }, {
          width: "30.5%",
          left: "40%"
        }, {
          width: "20.5%",
          left: "70%"
        }, {
          width: "10.5%",
          left: "90%"
        }],
        [{
          width: "10.5%",
          left: "0%"
        }, {
          width: "40.5%",
          left: "10%"
        }, {
          width: "30.5%",
          left: "50%"
        }, {
          width: "20.5%",
          left: "80%"
        }],
        [{
          width: "10.5%",
          left: "0%"
        }, {
          width: "20.5%",
          left: "10%"
        }, {
          width: "40.5%",
          left: "30%"
        }, {
          width: "30.5%",
          left: "70%"
        }],
        [{
          width: "10.5%",
          left: "0%"
        }, {
          width: "20.5%",
          left: "10%"
        }, {
          width: "30.5%",
          left: "30%"
        }, {
          width: "40.5%",
          left: "60%"
        }]
      ],
      actualItem = null,
      galleryOpensDuration = .5,
      totalWidth = 0,
      totalHeight = 0,
      isOpen = !1,
      isWork = !1,
      galleryItems = $(".works-gallery nav > a");
    var timeout = null;
    var galleryOpening = 0;


    var galleryanimate = function(a) {
      a.find(".content").transition({
        opacity: 1
      }, function() {
        a.find("img").transition({
          opacity: 0.2,
          duration: 500
        });
        a.find(".line").transition({
          opacity: 1,
          duration: 200
        }, function() {
          a.find(".ctitle").transition({
            top: 0,
            opacity: 1,
            duration: 400
          }, function() {
            a.find(".year").transition({
              top: 62,
              opacity: 1,
              duration: 400
            }, function() {
              a.find(".ico").transition({
                top: 160,
                opacity: 1,
                duration: 400
              });
            })
          })
        });
      })
    }

    var galleryanimateReverse = function(a) {
      a.find(".content").transition({
        opacity: 0,
        duration: 400
      })
      a.find("img").transition({
        opacity: 0,
        duration: 400
      });
      a.find(".line").transition({
        opacity: 0
      });
      a.find(".ctitle").transition({
        top: 20,
        opacity: 0,
        duration: 200
      });
      a.find(".year").transition({
        top: 38,
        opacity: 0,
        duration: 300
      });
      a.find(".ico").transition({
        top: 230,
        opacity: 0,
        duration: 400
      });
    }

    var galleryOpens = function(c) {
      $.each(c, function(c, g) {
        var h = galleryItems[c];


        if ($(h).data('delay')) clearTimeout($(h).data('delay'));
        $(h).data('delay', setTimeout(function() {

          $(h).transition(g, 300);

          if (c === actualItem.index) {
            $(h).css("z-index", 5);
            galleryanimate($(h));
          } else {
            $(h).css("z-index", 4);
            galleryanimateReverse($(h));
          }

        }, 300));

      })
    }

    var onGalleryItemOver = function(a) {
      var b = a.currentTarget;
      if (b !== actualItem) {
        actualItem = b;
        galleryOpens(galleryOpts[b.index])
      }
    }

    var galleryaddListener = function() {
      var b = this,
        c = null;
      $.each(galleryItems, function(d, e) {
        e.index = d;
        c = $(e);
        c.mouseover(
          $.proxy(onGalleryItemOver, b)
        )
      })
    }

    $(".works-gallery .PlayLife").on('click', function(e) {
      e.preventDefault();
      $.Zebra_Dialog('PlayLife has been closed. If you want to &nbsp;&nbsp;&nbsp;&nbsp;view more information,please contact me.', {
        'type': 'error',
        'title': 'Error',
        'overlay_opacity': 0.4
      });
    })

    /*====E====*/


    /*====SscreenE====*/

    //Ndays ago
    var tstamps = $('.contact-box .days'); // array of comment timestamps
    var timeago = (((new Date()).getTime() - new Date("08/05/2014").getTime()) / 86400000) - 1;
    tstamps.html("<i class='fa fa-calendar'></i>" + Math.round(timeago));


    //Ncontact
    $(".screenE .email").on('click', function() {
      window.open("http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=sune@yileit.com", "_blank");
    })
    $(".screenE .weibo").on('click', function() {
      window.open("http://weibo.com/SuneXiong", "_blank");
    })
    $(".screenE .qq").on('click', function() {
        window.open("http://wpa.qq.com/msgrd?v=3&uin=1292117887&site=qq&menu=yes", "_blank");
      })
      /*====E====*/

  });
})()
