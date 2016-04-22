<?php
function getFirstImage($postId) {
 $args = array(
  'numberposts' => 1,
  'order'=> 'ASC',
  'post_mime_type' => 'image',
  'post_parent' => $postId,
  'post_status' => null,
  'post_type' => 'attachment'
 );
 $attachments = get_children($args);
 
 // 如果没有上传图片, 返回空字符串
 if(!$attachments) {
  return '';
 }
 
 // 获取缩略图中的第一个图片, 并组装成 HTML 节点返回
 $image = array_pop($attachments);
 $imageSrc = wp_get_attachment_image_src($image->ID, 'fullsize');
 $imageUrl = $imageSrc[0];
 $html = $imageUrl;
 return $html;
}

function chinese_excerpt($text, $lenth=134) {
    $text = mb_substr($text,0, $lenth);
    return $text;
}
add_filter('the_excerpt', 'chinese_excerpt');
