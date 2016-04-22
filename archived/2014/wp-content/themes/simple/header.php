<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title><?php if ( is_home() ) {
        bloginfo('name'); echo " - "; bloginfo('description');
    } elseif ( is_category() ) {
        single_cat_title(); echo " - "; bloginfo('name');
    } elseif (is_single() || is_page() ) {
        single_post_title();
    } elseif (is_search() ) {
        echo "搜索结果"; echo " - "; bloginfo('name');
    } elseif (is_404() ) {
        echo '页面未找到!';
    } else {
        wp_title('',true);
    } ?></title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/style.css"  />
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]-->
<script language="javascript" type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery-1.7.2.min.js"></script>
<script language="javascript" type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/backstretch.js"></script>
<script language="javascript" type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/slimbox2.js"></script>
<script language="javascript" type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/tip.js"></script>
<script language="javascript" type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/application.js"></script>
<?php wp_head(); ?>
</head><body>
<div class="clear_bg"></div>
<div class="body-inner">
 
