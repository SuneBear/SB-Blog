<?php
/*
Plugin Name: TinyMCE Xiami Music
Plugin URI: http://erohentai.xxx/archives/tinymce-xiami-music.html
Description: Adding a button to media upload area/TinyMCE editor, than you can search and insert Xiami music into your posts easily. 在媒体上传区/TinyMCE编辑器上添加一个按钮，从而让你很容易的在后台搜索并在文章中插入虾米音乐。| If you like this plugin, please rate! I need your support! 如果你喜欢这个插件，请给我投票！我需要你的支持！<a href="http://wordpress.org/extend/plugins/tinymce-xiami-music">Click Here/点击这里</a>
Version: 2.6.1
Author: PeeMau
Author URI: http://erohentai.xxx/

Some code and ideas from Xiami(http://www.xiami.com/) & Discuz(http://www.discuz.net/thread-1971307-1-1.html) & 19lou(http://suzhou.19lou.com/).

Released under the GPL v.2, http://www.gnu.org/copyleft/gpl.html

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.
*/

if ( ! defined('ABSPATH') ) {
	die('Please do not load this file directly.');
}

$tinymce_xiami_music_url = WP_PLUGIN_URL.'/'.str_replace(basename(__FILE__), "", plugin_basename(__FILE__)); // get the full url path to your plugin"s directory
define('TinyMCE_Xiami_Music_URL', $tinymce_xiami_music_url);

// add the shortcode handler for Xiami music
function addXiami($atts, $content = null) {
	extract( shortcode_atts( array(
		"id" => "",
		"ids" => "",
		"aid" => "",
		"uid" => "",
		"direction" => "H",
		"size" => "S",
		"type" => "album",
		"soundfile" => "",
		"autostart" => "yes",
		"loop" => "no",
	), $atts ) );
	if($id != "") {
		if ($autostart == "1") {
			return '<span class="xiami"><embed src="http://www.xiami.com/res/app/img/swf/weibo.swf?dataUrl=http://www.xiami.com/app/player/song/id/'.$id.'/type/7/uid/470304" type="application/x-shockwave-flash" width="440" height="200" wmode="transparent" /></span>';
		} else {
			return '<span class="xiami"><embed src="http://www.xiami.com/widget/470304_'.$id.'/singlePlayer.swf" type="application/x-shockwave-flash" width="257" height="33" wmode="transparent" /></span>';
		}
	}
	if($aid != "") return '<span class="xiami"><embed src="http://www.xiami.com/widget/470304_'.$aid.'_235_346_FF8719_494949/artisthotPlayer.swf" type="application/x-shockwave-flash" width="235" height="346" wmode="opaque" /></span>';
	if($ids != "") {
		if ($autostart != "1") {
			$autostart = "0";
		}
		return '<span class="xiami"><embed src="http://www.xiami.com/widget/470304_'.$ids.'_235_346_FF8719_494949_'.$autostart.'/multiPlayer.swf" type="application/x-shockwave-flash" width="235" height="346" wmode="opaque" /></span>';
	}
	if($uid != "") {
		if ($direction == "H") {
			switch ($size) {
				case "S":
					$width = "451";
					$height = "179";
					break;
				case "M":
					$width = "507";
					$height = "235";
					break;
				case "L":
					$width = "675";
					$height = "235";
					break;
			}
		} else {
			switch ($size) {
				case "S":
					$width = "171";
					$height = "291";
					break;
				case "M":
					$width = "227";
					$height = "403";
					break;
				case "L":
					$width = "227";
					$height = "627";
					break;
			}
		}
		return '<span class="xiami"><embed src="http://www.xiami.com/widget/'.$uid.'_'.$direction.'_'.$size.'_'.$type.'/wallPlayer.swf" type="application/x-shockwave-flash" width="'.$width.'" height="'.$height.'" wmode="transparent" /></span>';
	}
	if($soundfile != "") {
		$music_info_array = explode(" &#8212; ", $content);
		return '<span class="xiami"><embed src="'.TinyMCE_Xiami_Music_URL.'singlePlayer.swf?soundfile='.$soundfile.'&amp;titles='.$music_info_array[0].'&amp;artists='.$music_info_array[1].'&amp;autostart='.$autostart.'&amp;loop='.$loop.'" type="application/x-shockwave-flash" width="290" height="24" wmode="transparent" /></span>';
	}
}
add_shortcode("xiami", "addXiami");

function wp_xiami_xusic_button() {
	$url = TinyMCE_Xiami_Music_URL.'music-search/music-search.php?tab=player&TB_iframe=1&width=670&height=430';
	// check version
	global $wp_version;
	if ( version_compare($wp_version, '3.5', '>=') ) {
		echo '<a href="'.$url.'" class="thickbox" title="插入虾米音乐"><img src="'.TinyMCE_Xiami_Music_URL.'tbxiami.png" alt="插入虾米音乐" /></a>';
	} else {
		echo '<a href="'.$url.'" class="thickbox" title="插入虾米音乐"><img src="'.TinyMCE_Xiami_Music_URL.'mxiami.png" alt="插入虾米音乐" /></a>';
	}
}
add_action("media_buttons", "wp_xiami_xusic_button", 20);

function load_TinyMCE_Xiami_Music() {
	// Don"t bother doing this stuff if the current user lacks permissions
	if ( current_user_can("publish_posts") ) // Super,Admin,Administrator,Editor,Author
		return;

	// Add only in Rich Editor mode
	if ( get_user_option("rich_editing") == "true" ) {
		add_filter("mce_external_plugins", "load_editor_plugin_js");
		add_filter("mce_buttons", "register_xiami_button");
	}
}
 
// Load the TinyMCE plugin : editor_plugin.js (wp2.5)
function load_editor_plugin_js($plugin_array) {
	$plugin_array["xiami_button"] = TinyMCE_Xiami_Music_URL.'editor_plugin.js';
	return $plugin_array;
}
 
// Add Xiami Music Button to TinyMCE
 function register_xiami_button($buttons) {
	array_push($buttons, "|", "xiami_button");
	return $buttons;
}
 
function refresh_TinyMCE_ver($ver) {
	$ver += 3;
	return $ver;
}

// init process for button control
add_filter("tiny_mce_version", "refresh_TinyMCE_ver");
add_action("init", "load_TinyMCE_Xiami_Music");
?>