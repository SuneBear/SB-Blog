// Docu : http://wiki.moxiecode.com/index.php/TinyMCE:Create_plugin/3.x#Creating_your_own_plugins

function popupHeight() {
	var pageHeight;
	if (window.ActiveXObject) {
		pageHeight = document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
	}else{
		pageHeight = self.innerHeight;
	}
	return ((pageHeight-80) < 670) ? (pageHeight-80) : 670;
};

(function() {
	tinymce.create("tinymce.plugins.XiamiButton", {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
			ed.addCommand("mceXiami", function() {
				ed.windowManager.open({
					file : url + "/music-search/music-search-mce.php?tab=player",
					width : 670,
					height : popupHeight(),
					inline : 1
				}, {
					plugin_url : url	// Plugin's absolute URL(URL of editor_plugin.js)
				});
			});

			// Register button
			ed.addButton("xiami_button", {
				title : "插入虾米音乐",
				cmd : "mceXiami",
				image : url + '/tbxiami.png'
			});

		},

		createControl : function(n, cm) {
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : "TinyMCE Xiami Music",
				author : "PeeMau & 沙尔拉尼瓦II",
				authorurl : "http://erohentai.xxx/",
				infourl : "http://erohentai.xxx/archives/tinymce-xiami-music.html",
				version : "2.6.1"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add("xiami_button", tinymce.plugins.XiamiButton);
})();