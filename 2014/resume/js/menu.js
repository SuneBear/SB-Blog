function menu(b, c) {
	var t = this,
		status = {
			menuTimeout: null,
			menuOpen: false
		},
		dimensions = {
			btnSize: 35
		},
		transition = {
			menuTime: 300
		},
		anim = {
			transitionTime: 300
		};
	t.menu = {
		open: false
	};
	t.init = function() {
		t.prepareUI();
		t.addListeners()
	};
	t.prepareUI = function() {
		$('.l-btn').each(function() {
			if (!$('.btn-bottom', this).length) $(this).prepend('<div class="btn-bottom"></div><div class="l"></div><div class="r"></div><div class="m"></div>')
		})
	};
	t.addListeners = function() {
		if (!device.touch) $(b).on(device.over, '.btn, .l-btn', t.slideButtonOver).on(device.out, '.btn, .l-btn', t.slideButtonOut);
		if (!device.touch) $(b).on(device.over, '.a-btn', function() {
			$(this).addClass('hover')
		}).on(device.out, '.a-btn', function() {
			$(this).removeClass('hover')
		});
		$('header .nav-options a').on('click', function() {
			t.closeMenu()
		});
		$(b).on(device.instaClick, '.go-menu', t.openMenu);
		$(b).on(device.instaClick, '.go-close-menu', function() {
			t.closeMenu();
			return false
		});
		$(b).on(device.over, '.spin-btn', t.spinButtonOver).on(device.out, '.spin-btn', t.spinButtonOut);
		if (device.touch) {
			$('a').on(device.over, function() {
				$(this).addClass('link-over')
			});
			$('a').on(device.out, function() {
				$(this).removeClass('link-over')
			})
		}
	};
	t.openMenu = function(e) {
		if (e !== undefined) e.stopPropagation();
		if (status.menuOpen) return false;
		status.menuOpen = true;
		$('#ui-header .header-nav', b).show();
		$('#ui-header .header-nav', b).css(getSuperTransition({
			y: -(($('#ui-header .header-nav .display', b).outerHeight() * 1.5) + 30)
		}));
		$('#ui-header .header-nav', b).show().smartAnimate(getSuperTransition({
			y: -(($('#ui-header .header-nav .display', b).outerHeight() * 1.5) + 30)
		}), 0, function() {
			$('#ui-header .header-nav', b).show().smartAnimate(getSuperTransition({
				y: 0,
				timing: 'cubic-bezier(0.175, 0.885, 0.32, 1.1)'
			}), transition.menuTime, function() {
				$('#ui-header .statuses', b).show().smartAnimate(getSuperTransition({
					x: dimensions.btnSize,
					timing: 'cubic-bezier(0.175, 0.885, 0.32, 1.1)'
				}), transition.menuTime, function() {})
			})
		});
		clearTimeout(status.menuTimeout);
		status.menuTimeout = setTimeout(function() {
			$('#ui-header .statuses', b).show().smartAnimate(getSuperTransition({
				x: dimensions.btnSize,
				timing: 'cubic-bezier(0.175, 0.885, 0.32, 1.1)'
			}), transition.menuTime)
		}, transition.menuTime);
		return false
	};
	t.closeMenu = function(e) {
		if (e !== undefined) e.stopPropagation();
		if (!status.menuOpen) return false;
		status.menuOpen = false;
		$('#ui-header .header-nav', b).smartAnimate(getSuperTransition({
			y: -(($('#ui-header .header-nav .display', b).outerHeight() * 1.5) + 30),
			timing: 'cubic-bezier(0.175, 0.885, 0.32, 1.1)'
		}), transition.menuTime, function() {});
		clearTimeout(status.menuTimeout);
		status.menuTimeout = setTimeout(function() {
			$('#ui-header .statuses', b).smartAnimate(getSuperTransition({
				x: 0,
				timing: 'cubic-bezier(0.175, 0.885, 0.32, 1.1)'
			}), transition.menuTime, function() {
				$('#ui-header .header-nav', b).hide()
			})
		}, transition.menuTime);
		return false
	};
	t.update = function(a) {
		$('.home-status .home-display', b).smartAnimate(getSuperTransition({
			x: a === 1 ? -dimensions.btnSize : 0,
			timing: 'cubic-bezier(0.175, 0.885, 0.32, 1.1)'
		}), transition.menuTime);
		if (a === 0) {} else {}
	};
	t.slideButtonOver = function() {
		if ($(this).hasClass('disabled')) return false;
		$('.btn-bottom', this).smartAnimate(getSuperTransition({
			y: -$(this).height()
		}), 100)
	};
	t.slideButtonOut = function() {
		$('.btn-bottom', this).smartAnimate(getSuperTransition({
			y: 0
		}), 300)
	};
	t.spinButtonOver = function() {
		$('.btn-top', this).smartAnimate(getSuperTransition({
			rotate: 90
		}), 200)
	};
	t.spinButtonOut = function() {
		$('.btn-top', this).smartAnimate(getSuperTransition({
			rotate: 0
		}), 200)
	};
	t.updateDimensions = function() {
		if (!status.menuOpen) {
			$('#ui-header .header-nav', b).smartAnimate(getSuperTransition({
				y: -$('#ui-header .header-nav .display', b).outerHeight() * 1.1
			}), 0)
		}
		if (footerPopup.active) t.updateFooterPopup()
	};
	t.enable = function() {
		$('header', b).show();
		$('header .shift', b).smartAnimate(getSuperTransition({
			y: -100
		}), 0, function() {
			$('header .shift', b).smartAnimate(getSuperTransition({
				y: 0
			}), anim.transitionTime)
		})
	};
	t.init()
}