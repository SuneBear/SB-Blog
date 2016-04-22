<?php get_header(); ?>
<?php get_sidebar(); ?>
<!-- ====e mian==== -->
<div id="timeline" class="horizontal"></div>
<section id="content" class="post_content" >
<div class="post_item">
<div class="post">
<article>
<header>
<h2><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
</header>
<div class="con">
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>  
<?php the_content(); ?>
<?php endwhile; else: ?>  
<?php endif; ?>
</div>
</article>

<div class="post_comment">
<?php comments_template(); ?>
</div>

</div>

<div class="post_bottom">
<time><?php the_time('Y年n月j日') ?></time> | <a rel="nofollow" href="<?php the_permalink(); ?>#response" title="添加新评论"><?php comments_popup_link('0 条评论', '1 条评论', '% 条评论', '', '评论已关闭'); ?></a>
<span class="premalink">
<a rel="nofollow" href="<?php the_permalink(); ?>" ><?php the_permalink(); ?></a>
</span>
</div>
<div class="post_pre_n_nex">
<div class="post_arrow"></div>
<ul>
<li class="post_pre"><?php previous_post_link('%link', '&laquo;%title', 'TRUE'); ?></li><li class="post_nex"><?php next_post_link('%link', '%title»', TRUE); ?></li></ul>
</div>

</section>
<div class="clear"></div>
<footer id="footer"> 
<div class="copy">
</div>
</footer>
<!-- ====e mian==== -->

<?php get_footer(); ?>