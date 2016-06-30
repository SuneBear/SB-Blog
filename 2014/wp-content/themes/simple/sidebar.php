<!-- ====s lefter==== -->
<div id="header">
<header id="blog_title">
<div class="logo">
<img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="sune"  id="logo" />
<img src="<?php echo get_template_directory_uri(); ?>/images/logo2.png" alt="sune"  id="logo2"  class="rotate-360" style="opacity:0" />
</div>
<h1><span class="name">SUNE</span></h1>
</header>
<nav id="menu">
<ul class="header-nav">
<li<?php if (is_home()) { echo ' class="current-cat"';} ?>><a title="Home" href="../">首页</a></li>
<li><a href="../resume/"  target="_blank" >简历</a></li>
<?php
$currentcategory = '';
// 以下这行代码用于在导航栏添加页面列表
// 如果你不想添加页面到导航中，
// 请删除16 - 19行代码
wp_list_pages('depth=1&title_li=&sort_column=menu_order');

?>
</ul>
</nav>
<!-- <form action="/search" class="head-search" method="get">
<input id="search-input" type="text" name="s" class="inputbox" value="搜索..." onfocus="if (value =='搜索...'){value =''}" onblur="if (value ==''){value='搜索...'}" x-webkit-speech lang="zh-CN" />
</form> -->
<div class="clear"></div>
</div>
<div id="wrap">
<!-- ====e lefter==== -->