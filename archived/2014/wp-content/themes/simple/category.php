<?php get_header(); ?>
<?php get_sidebar(); ?>
<!-- ====e mian==== -->
<div id="timeline" class="vertical"></div>
<section id="content">
<div class="archivetitle">正在查看有关“<?php echo single_cat_title('', false); ?>”的文章</div>
<?php ?> 
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<div class="post_item">
<article class="post">
<header>
<h2><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
</header>
<div class="con">

<p><a href="<?php the_permalink(); ?>"><img src="<?php $thumb = getFirstImage($post->ID);
if(strlen($thumb) > 0) {
echo $thumb;
} else {
// 显示默认图片或者不做任何事情
} ?>" alt="<?php the_title(); ?>" /></a></p><div class="clearfix"></div>
<p><?php the_excerpt(); ?></p>
</div>
</article>

<div class="post_bottom">
<time><?php the_time('Y年n月j日') ?></time> | <a rel="nofollow" href="http://winysky.com/1202#response" title="添加新评论"><?php comments_popup_link('0 条评论', '1 条评论', '% 条评论', '', '评论已关闭'); ?></a>
<span class="premalink">
<a rel="nofollow" href="<?php the_permalink(); ?>" title="阅读全文「<?php the_title(); ?>」">阅读全文</a>
</span>
</div>
<div class="post_arrow"></div>
</div>
<?php endwhile; ?>
<?php else : ?>
<div class="post_item" style="margin-bottom:35px;">
<article class="post">
<header>
<h2><a href="#" rel="bookmark">未找到</a></h2>
</header>
<div class="con">
<p>没有找到任何文章！</p>			</div>
</article>
<div class="post_bottom">

</div>
</div>


<?php endif; ?>
<div class="nav">
<?php if(function_exists('wp_pagenavi')){ wp_pagenavi(); } else { ?>
<div class="prev"><?php next_posts_link(__('« Previous Entries')) ?></div>
<div class="next"><?php previous_posts_link(__('Next Entries »')) ?></div> <?php } ?>
</div>
</section>
<div class="clear"></div>
<footer id="footer"> 
<div class="copy">
</div>
</footer>
<!-- ====e mian==== -->
<?php get_footer(); ?>