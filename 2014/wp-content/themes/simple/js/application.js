$(function(){
//s background
var bgimg = [
"/2014/wp-content/themes/simple/images/bg/1.jpg",
"/2014/wp-content/themes/simple/images/bg/4.jpg"
];
bgimg.sort(function(){return Math.random()>0.5?-1:1;});
$.backstretch(bgimg, {fade: 23000, duration: 7000});
//e background
//s logo
$("#logo").hover(
function(){
$(this).css("opacity",0);
$("#logo2").css({opacity: '0.9',}).removeClass('rotate-360');
},
function(){
$("#logo2").addClass('rotate-360');
$(this).css("opacity",1);
}
)
//e logo
//s backtop
;(function(e){e.scrollUp=function(t){var n={scrollName:"scrollUp",topDistance:300,topSpeed:300,animation:"fade",animationInSpeed:200,animationOutSpeed:200,scrollText:"Scroll to top",scrollImg:false,activeOverlay:false};var r=e.extend({},n,t),i="#"+r.scrollName;e("<a/>",{id:r.scrollName,href:"#top",title:r.scrollText}).appendTo("body");if(!r.scrollImg){e(i).text(r.scrollText)}e(i).css({display:"none",position:"fixed","z-index":"2147483647"});if(r.activeOverlay){e("body").append("<div id='"+r.scrollName+"-active'></div>");e(i+"-active").css({position:"absolute",top:r.topDistance+"px",width:"100%","border-top":"1px dotted "+r.activeOverlay,"z-index":"2147483647"})}e(window).scroll(function(){switch(r.animation){case"fade":e(e(window).scrollTop()>r.topDistance?e(i).fadeIn(r.animationInSpeed):e(i).fadeOut(r.animationOutSpeed));break;case"slide":e(e(window).scrollTop()>r.topDistance?e(i).slideDown(r.animationInSpeed):e(i).slideUp(r.animationOutSpeed));break;default:e(e(window).scrollTop()>r.topDistance?e(i).show(0):e(i).hide(0))}});e(i).click(function(t){e("html, body").animate({scrollTop:0},r.topSpeed);t.preventDefault()})}})(jQuery);
$.scrollUp({
scrollName: 'scrollUp', // Element ID
topDistance: '300', // Distance from top before showing element (px)
topSpeed: 800, // Speed back to top (ms)
animation: 'slide', // Fade, slide, none
animationInSpeed: 400, // Animation in speed (ms)
animationOutSpeed: 400, // Animation out speed (ms)
scrollText: '', // Text for element
activeOverlay: false  // Set CSS color to display scrollUp active point, e.g '#00FFFF'
});
//e backtop
//s image alt display
var $s=$('.con'),lb=$s.find('a:has(img)')
if(lb.length){
$(".con a:has(img)").children("img").each(function(){
var imgl = $(this).attr("alt");
var imgwidth= $(this).width()
$(this).parent("a").css({"position":"relative","display":"block"}).attr({"title":imgl,"rel":"lightbox"}).append("<span class='imgcaption' >"+imgl+"</span>");
})
}
//e image alt display
//s slimbox2
var $s=$('.con'),lb=$s.find('a:has(img)');
if(lb.length){
$(".con a:has(img)").filter(function() {
return /\.(jpg|png|gif)$/i.test(this.href);
}).slimbox();
}
//e slimbox2
//s section show

function clickToggle (options) {
var elem     = options.elem,					//触发元素
list         = options.list,					//隐藏列表
callback     = options.callback,				//显示后回调
callbackHide = options.callbackHide,			//隐藏后回调
lock         = false;							//隐藏锁定，默认否
(function() {
elem.on('keydown click', function(e) {
var $this = $(this);
//非a标签添加 tabIndex，聚焦用
if($this[0].tagName.toLowerCase() !== 'a') {
$this.attr('tabindex', '0');
}
//点击触发
if( (e.type === 'keydown' && e.keyCode === 13) || (e.type === 'keydown' && e.keyCode === 27) || e.type === 'click') {
e.preventDefault();

if(list.is(':visible')) {
list.slideUp();
elem.removeClass('active');
}else{
list.slideDown();
elem.addClass('active');
}

}else {
$('.J_dropDownList').slideUp();
if(e.type === 'keydown' && e.keyCode === 40) {
list.attr('tabindex','0').addClass('J_dropDownList').slideDown();
list.focus();
}
}
//回调
if(!list.filter(':hidden').length) {
lock = false;
callback && callback(elem, list);
}
});
$(document.body).on('mousedown',function(e) {
//判断点击对象 隐藏列表
if(list.is(':visible') && e.target!=list[0] && !$.contains(list[0],e.target) && !$.contains(elem[0],e.target)) {
list.slideUp();
elem.focus();
elem.removeClass('active');
callbackHide && callbackHide(elem, list);
}
});
list.on('keydown',function(e) {
if(e.keyCode === 27) {
list.slideUp();
elem.focus();
}
});
list.on('mouseenter', function(e){
//鼠标进入，锁定
lock = true;
}).on('mouseleave', function(){
//鼠标离开，触发元素聚焦，解除锁定
elem.focus();
lock = false;
});
})();
}

clickToggle({elem : $('#topsection'),				//点击元素
list : $('#about .sidebar')})


//e section show
/*s tip*/
$(".tip").tipTip({
"delay":200
})
/*e tip*/
});