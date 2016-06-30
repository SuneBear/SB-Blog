<?php
// look up for the path
require_once(dirname(__FILE__).'/wpload.php');

global $wp_db_version;
if ($wp_db_version < 8201) {
	// Pre 2.6 compatibility (BY Stephen Rider)
	if ( ! defined( 'WP_CONTENT_URL' ) ) {
		if ( defined( 'WP_SITEURL' ) ) define( 'WP_CONTENT_URL', WP_SITEURL . '/wp-content' );
		else define( 'WP_CONTENT_URL', get_option( 'url' ) . '/wp-content' );
	}
	if ( ! defined( 'WP_CONTENT_DIR' ) ) define( 'WP_CONTENT_DIR', ABSPATH . 'wp-content' );
	if ( ! defined( 'WP_PLUGIN_URL' ) ) define( 'WP_PLUGIN_URL', WP_CONTENT_URL. '/plugins' );
	if ( ! defined( 'WP_PLUGIN_DIR' ) ) define( 'WP_PLUGIN_DIR', WP_CONTENT_DIR . '/plugins' );
}
require_once(ABSPATH.'wp-admin/admin.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title><?php bloginfo('name') ?> &rsaquo; 插入虾米音乐 &#8212; WordPress</title>
	<?php
		// wp_enqueue_style( 'global' );
		// wp_enqueue_style( 'wp-admin' );
		wp_enqueue_style( 'colors' );
		wp_enqueue_style( 'ie' );
		wp_enqueue_style( 'media' );
		do_action('admin_print_styles');
		if ( isset($content_func) && is_string($content_func) )
			do_action( "admin_head_{$content_func}" );
	?>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<?php
		$tinymce_xiami_music_url = WP_PLUGIN_URL.'/'.str_replace(basename( __FILE__),"",plugin_basename(__FILE__)); // get the full url path to your plugin"s directory
	?>
	<script type="text/javascript">window.jQuery || document.write('<script type="text/javascript" src="<?php echo $tinymce_xiami_music_url; ?>inc/jquery-1.8.3.min.js"><\/script>');</script>
	<?php
		echo '<script type="text/javascript" src="'.$tinymce_xiami_music_url.'inc/tinymce_popup.js"></script>'.PHP_EOL;
		echo '<link type="text/css" rel="stylesheet" href="'.$tinymce_xiami_music_url.'inc/music-search.css" />'.PHP_EOL;
		global $wp_version;
		if ( version_compare($wp_version, '3.5', '>=') ) {
			if ( version_compare($wp_version, '3.8', '<') ) {
				echo '<link type="text/css" rel="stylesheet" href="'.$tinymce_xiami_music_url.'inc/buttons.css" />'.PHP_EOL;
			} else {
				echo '<style>#media-upload .widefat {border-bottom-style: solid;}</style>'.PHP_EOL;
			}
		}
		echo '<script type="text/javascript" src="'.$tinymce_xiami_music_url.'inc/music-search.js"></script>'.PHP_EOL;
	?>
</head>
<body id="media-upload" class="wp-admin wp-core-ui" onload="body_onLoad();">
	<div  id="media-upload-header">
		<ul id="sidemenu">
			<li><span><a id="player_Tab" href="music-search-mce.php?tab=player" <?php if (htmlspecialchars($_GET['tab'])=='player') echo 'class="current"'; ?>>插入播放器</a></span></li>
			<li><span><a id="wall_Tab" href="music-search-mce.php?tab=wall" <?php if (htmlspecialchars($_GET['tab'])=='wall') echo 'class="current"'; ?>>插入唱片墙</a></span></li>
		</ul>
	</div>

    <form name="search_Form" id="search_Form" onsubmit="return false;" autocomplete="off" action="#">
		<?php
		switch (htmlspecialchars($_GET['tab'])) {
			case 'player' :
		?>
			<div id="player_Panel" class="panel">
				<fieldset style="margin:5px 0;">
					<table class="describe"><tbody>
						<tr>
							<th valign="top" scope="row" class="label" width="245px" >
								<span class="alignleft"><label for="search_Input">输入歌曲名、专辑名、艺人名</label></span>
								<span class="alignright"><abbr class="required">*</abbr></span>
							</th>
							<td class="field" style="padding-bottom:0;">
								<input type="search" id="search_Input" x-webkit-speech tabindex="10" style="width:280px;" onkeypress="search_Input_onkeypress(event);" />
								<input type="button" class="button" id="search_Bt" value="搜索" onclick="search_Bt_onclick();" />
							</td> 
						</tr>
					</tbody></table>
				</fieldset>

				<fieldset style="height:465px; margin:5px 0 10px;">
					<legend>搜索结果<span id="num_Total"></span></legend>
					<div id="search_Result"><div style="zoom:1;">
						<table class="wp-list-table widefat fixed" cellspacing="0">
							<thead>
							<tr>
								<th scope="col" id="cb" class="column-cb check-column"><input type="checkbox" onclick="selectAll(this);"></th>
								<th scope="col" id="song_name" class="column-song_name">歌名</th>
								<th scope="col" id="artist_name" class="column-artist_name">演唱者</th>
								<th scope="col" id="album_name" class="column-album_name">专辑</th>
							</tr>
							</thead>
							<tbody id="music_List"><span style="display:none;"></span></tbody><!--tbody中必须有内容，不然ie下js出错-->
						</table>
					</div></div>
					<div id="self_set_Pager_ui"></div>
				</fieldset>

				<div style="margin-top:10px;">
					样式选择：<select id="playerStyle_sel" onchange="playerStyle_sel_onChange();">
						<option value="iSingle" selected="selected">歌曲播放器</option>
						<option value="iMulti">歌曲播放列表</option>
						<option value="iDynamic">歌手动态播播</option>
					</select>&nbsp;<img src="images/Question_mark.png" id="ecIcon" alt="样式说明" title="样式说明" onmouseover="ecIcon_onMouseOver();" onmouseout="ecIcon_onMouseOut();" />
					<div id="ecBox" style="display:none;">
						<div id="ecArrow"></div>
						<div id="ecImages"><img src="images/singlePlayer.png" id="playerImage" /></div>
					</div>
					<span id="autoPlay">
						是否自动播放：<select id="autoPlay_sel">
							<option value="nope" selected="selected">否</option>
							<option value="auto">自动播放</option>
							<option value="autoNloop">自动且循环播放</option>
						</select>
						说明：
						<a href="http://erohentai.xxx/archives/tinymce-xiami-music.html#autoPlayNotice1" target="_blank">1</a>
						<a href="http://erohentai.xxx/archives/tinymce-xiami-music.html#autoPlayNotice2" target="_blank">2</a>
						<a href="http://erohentai.xxx/archives/tinymce-xiami-music.html#autoPlayNotice3" target="_blank">3</a>
						<a href="http://erohentai.xxx/archives/tinymce-xiami-music.html#autoPlayNotice4" target="_blank">4</a>
						<a href="http://erohentai.xxx/archives/tinymce-xiami-music.html#autoPlayNotice5" target="_blank">5</a>
						<a href="http://erohentai.xxx/archives/tinymce-xiami-music.html#autoPlayNotice6" target="_blank">6</a>
						...
					</span>
				</div>
			</div>
		<?php
			break;
			case 'wall' :					
		?>
			<div id="wall_Panel" class="panel">
				<fieldset>
					<legend>用户信息</legend>
					<label for="uID">虾米ID：<input id="uID" type="text" value="470304" /></label><br />
					<div style="margin-top:5px;">不知道虾米ID？登录虾米后打开“个人主页”，网址后的那串数字就是。<br />
					比如我的个人主页就是<a href="http://www.xiami.com/u/470304" target="_blank">http://www.xiami.com/u/470304</a>。<br />
					还不知道？去问虾小米吧……<br />
					放心，我对你的隐私还真没性趣。
					</div>
				</fieldset>
				<fieldset>
					<legend>样式选择<a href="http://www.xiami.com/widget/iwall" target="_blank" style="margin-left:10px;">帮助</a></legend>
					方向：<select id="direction_sel">
							<option value="H" selected="selected">横向</option>
							<option value="V">纵向</option>
						</select><br />
					大小：<select id="size_sel">
							<option value="S" selected="selected">小</option>
							<option value="M">中</option>
							<option value="L">大</option>
						</select><br />
					类型：<select id="type_sel">
							<option value="album" selected="selected">我的唱片架</option>
							<option value="artist">我喜欢的艺人</option>
							<option value="collect">我的精选集</option>
							<option value="favcollect">我收藏的精选集</option>
						</select>
				</fieldset>
			</div>
		<?php
			break;
		}
		?>

		<div class="mceActionPanel">
			<input type="checkbox" id="useShortcode_chkbox" checked="checked" /><label for="useShortcode_chkbox">使用Shortcode代码</label>
			<div class="alignright">
				<input type="button" class="button-primary" id="insert" name="insert" value="插入到文章" onclick="insertCode();" />
			</div>
			<div id="gAdSense"></div>
		</div>
	</form>
	<div style="display:none;"><script language="javascript" type="text/javascript" src="http://js.users.51.la/4918389.js"></script></div><!-- 51.la 统计代码，请不要删除！ -->
</body>
</html>