/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */
(function(){tinymce.create("tinymce.plugins.AdvancedImagePlugin",{init:function(e,t){e.addCommand("mceAdvImage",function(){if(e.dom.getAttrib(e.selection.getNode(),"class","").indexOf("mceItem")!=-1)return;e.windowManager.open({file:t+"/image.htm",width:480+parseInt(e.getLang("advimage.delta_width",0)),height:385+parseInt(e.getLang("advimage.delta_height",0)),inline:1},{plugin_url:t})}),e.addButton("image",{title:"advimage.image_desc",cmd:"mceAdvImage"})},getInfo:function(){return{longname:"Advanced image",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/advimage",version:tinymce.majorVersion+"."+tinymce.minorVersion}}}),tinymce.PluginManager.add("advimage",tinymce.plugins.AdvancedImagePlugin)})();