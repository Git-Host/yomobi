/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/
define(["aloha/jquery","aloha/contenthandlermanager","block/blockmanager"],function(e,t,n){var r=t.createHandler({handleContent:function(t){return typeof t=="string"?t=e("<div>"+t+"</div>"):t instanceof e&&(t=e("<div>").append(t)),t.find('.aloha-block[data-aloha-block-copy-only-block="true"]').length>0&&(t.find(".aloha-block:not([id])").remove(),t.find(".aloha-block + span:empty").remove(),t.find("div:empty").remove(),t.find("br.Apple-interchange-newline").remove(),t.find(".aloha-block").prev("br").remove(),t.find("div > br:only-child").parent().remove()),t.find(".aloha-block").each(function(){var t=e(this),r={},i={};e.each(t[0].attributes,function(e,t){if(t.nodeName==="id")return;t.nodeName.match(/^data-/)?i[t.nodeName.substr(5)]=t.nodeValue:r[t.nodeName]=t.nodeValue});var s=GENTICS.Utils.guid(),o=e("<"+this.tagName+"/>").attr(r).attr("id",s).removeClass("aloha-block-active").removeClass("aloha-block").html(t.html());t.replaceWith(o),window.setTimeout(function(){n._blockify(e("#"+s),i)},50)}),t.html()}});return r});