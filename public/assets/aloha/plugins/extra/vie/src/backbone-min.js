// Backbone.js 0.3.3
// (c) 2010 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://documentcloud.github.com/backbone
(function(){var e;e=typeof exports!="undefined"?exports:this.Backbone={},e.VERSION="0.3.3";var t=this._;!t&&typeof require!="undefined"&&(t=require("underscore")._);var n=this.jQuery||this.Zepto;e.emulateHTTP=!1,e.emulateJSON=!1,e.Events={bind:function(e,t){return this._callbacks||(this._callbacks={}),(this._callbacks[e]||(this._callbacks[e]=[])).push(t),this},unbind:function(e,t){var n;if(e){if(n=this._callbacks)if(t){n=n[e];if(!n)return this;for(var r=0,i=n.length;r<i;r++)if(t===n[r]){n.splice(r,1);break}}else n[e]=[]}else this._callbacks={};return this},trigger:function(e){var t,n,r,i;if(!(n=this._callbacks))return this;if(t=n[e]){r=0;for(i=t.length;r<i;r++)t[r].apply(this,Array.prototype.slice.call(arguments,1))}if(t=n.all){r=0;for(i=t.length;r<i;r++)t[r].apply(this,arguments)}return this}},e.Model=function(e,n){e||(e={}),this.defaults&&(e=t.extend({},this.defaults,e)),this.attributes={},this._escapedAttributes={},this.cid=t.uniqueId("c"),this.set(e,{silent:!0}),this._previousAttributes=t.clone(this.attributes),n&&n.collection&&(this.collection=n.collection),this.initialize(e,n)},t.extend(e.Model.prototype,e.Events,{_previousAttributes:null,_changed:!1,initialize:function(){},toJSON:function(){return t.clone(this.attributes)},get:function(e){return this.attributes[e]},escape:function(e){var t;return(t=this._escapedAttributes[e])?t:(t=this.attributes[e],this._escapedAttributes[e]=(t==null?"":t).replace(/&(?!\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"))},set:function(e,n){n||(n={});if(!e)return this;e.attributes&&(e=e.attributes);var r=this.attributes,i=this._escapedAttributes;if(!n.silent&&this.validate&&!this._performValidation(e,n))return!1;"id"in e&&(this.id=e.id);for(var s in e){var o=e[s];t.isEqual(r[s],o)||(r[s]=o,delete i[s],n.silent||(this._changed=!0,this.trigger("change:"+s,this,o,n)))}return!n.silent&&this._changed&&this.change(n),this},unset:function(e,t){t||(t={});var n={};return n[e]=void 0,!t.silent&&this.validate&&!this._performValidation(n,t)?!1:(delete this.attributes[e],delete this._escapedAttributes[e],t.silent||(this._changed=!0,this.trigger("change:"+e,this,void 0,t),this.change(t)),this)},clear:function(e){e||(e={});var t=this.attributes,n={};for(attr in t)n[attr]=void 0;if(!e.silent&&this.validate&&!this._performValidation(n,e))return!1;this.attributes={},this._escapedAttributes={};if(!e.silent){this._changed=!0;for(attr in t)this.trigger("change:"+attr,this,void 0,e);this.change(e)}return this},fetch:function(t){t||(t={});var n=this,r=h(t.error,n,t);return(this.sync||e.sync)("read",this,function(e){if(!n.set(n.parse(e),t))return!1;t.success&&t.success(n,e)},r),this},save:function(t,n){n||(n={});if(t&&!this.set(t,n))return!1;var r=this,i=h(n.error,r,n),s=this.isNew()?"create":"update";return(this.sync||e.sync)(s,this,function(e){if(!r.set(r.parse(e),n))return!1;n.success&&n.success(r,e)},i),this},destroy:function(t){t||(t={});var n=this,r=h(t.error,n,t);return(this.sync||e.sync)("delete",this,function(e){n.collection&&n.collection.remove(n),t.success&&t.success(n,e)},r),this},url:function(){var e=c(this.collection);return this.isNew()?e:e+(e.charAt(e.length-1)=="/"?"":"/")+this.id},parse:function(e){return e},clone:function(){return new this.constructor(this)},isNew:function(){return!this.id},change:function(e){this.trigger("change",this,e),this._previousAttributes=t.clone(this.attributes),this._changed=!1},hasChanged:function(e){return e?this._previousAttributes[e]!=this.attributes[e]:this._changed},changedAttributes:function(e){e||(e=this.attributes);var n=this._previousAttributes,r=!1,i;for(i in e)t.isEqual(n[i],e[i])||(r=r||{},r[i]=e[i]);return r},previous:function(e){return!e||!this._previousAttributes?null:this._previousAttributes[e]},previousAttributes:function(){return t.clone(this._previousAttributes)},_performValidation:function(e,t){var n=this.validate(e);return n?(t.error?t.error(this,n):this.trigger("error",this,n,t),!1):!0}}),e.Collection=function(e,n){n||(n={}),n.comparator&&(this.comparator=n.comparator,delete n.comparator),this._boundOnModelEvent=t.bind(this._onModelEvent,this),this._reset(),e&&this.refresh(e,{silent:!0}),this.initialize(e,n)},t.extend(e.Collection.prototype,e.Events,{model:e.Model,initialize:function(){},toJSON:function(){return this.map(function(e){return e.toJSON()})},add:function(e,n){if(t.isArray(e))for(var r=0,i=e.length;r<i;r++)this._add(e[r],n);else this._add(e,n);return this},remove:function(e,n){if(t.isArray(e))for(var r=0,i=e.length;r<i;r++)this._remove(e[r],n);else this._remove(e,n);return this},get:function(e){return e==null?null:this._byId[e.id!=null?e.id:e]},getByCid:function(e){return e&&this._byCid[e.cid||e]},at:function(e){return this.models[e]},sort:function(e){e||(e={});if(!this.comparator)throw Error("Cannot sort a set without a comparator");return this.models=this.sortBy(this.comparator),e.silent||this.trigger("refresh",this,e),this},pluck:function(e){return t.map(this.models,function(t){return t.get(e)})},refresh:function(e,t){return e||(e=[]),t||(t={}),this._reset(),this.add(e,{silent:!0}),t.silent||this.trigger("refresh",this,t),this},fetch:function(t){t||(t={});var n=this,r=h(t.error,n,t);return(this.sync||e.sync)("read",this,function(e){n.refresh(n.parse(e)),t.success&&t.success(n,e)},r),this},create:function(t,n){var r=this;return n||(n={}),t instanceof e.Model?t.collection=r:t=new this.model(t,{collection:r}),t.save(null,{success:function(e,t){r.add(e),n.success&&n.success(e,t)},error:n.error})},parse:function(e){return e},chain:function(){return t(this.models).chain()},_reset:function(){this.length=0,this.models=[],this._byId={},this._byCid={}},_add:function(t,n){n||(n={}),t instanceof e.Model||(t=new this.model(t,{collection:this}));var r=this.getByCid(t);if(r)throw Error(["Can't add the same model to a set twice",r.id]);return this._byId[t.id]=t,this._byCid[t.cid]=t,t.collection=this,this.models.splice(this.comparator?this.sortedIndex(t,this.comparator):this.length,0,t),t.bind("all",this._boundOnModelEvent),this.length++,n.silent||t.trigger("add",t,this,n),t},_remove:function(e,t){return t||(t={}),e=this.getByCid(e)||this.get(e),e?(delete this._byId[e.id],delete this._byCid[e.cid],delete e.collection,this.models.splice(this.indexOf(e),1),this.length--,t.silent||e.trigger("remove",e,this,t),e.unbind("all",this._boundOnModelEvent),e):null},_onModelEvent:function(e,t){e==="change:id"&&(delete this._byId[t.previous("id")],this._byId[t.id]=t),this.trigger.apply(this,arguments)}}),t.each(["forEach","each","map","reduce","reduceRight","find","detect","filter","select","reject","every","all","some","any","include","invoke","max","min","sortBy","sortedIndex","toArray","size","first","rest","last","without","indexOf","lastIndexOf","isEmpty"],function(n){e.Collection.prototype[n]=function(){return t[n].apply(t,[this.models].concat(t.toArray(arguments)))}}),e.Controller=function(e){e||(e={}),e.routes&&(this.routes=e.routes),this._bindRoutes(),this.initialize(e)};var r=/:([\w\d]+)/g,i=/\*([\w\d]+)/g;t.extend(e.Controller.prototype,e.Events,{initialize:function(){},route:function(n,r,i){e.history||(e.history=new e.History),t.isRegExp(n)||(n=this._routeToRegExp(n)),e.history.route(n,t.bind(function(e){e=this._extractParameters(n,e),i.apply(this,e),this.trigger.apply(this,["route:"+r].concat(e))},this))},saveLocation:function(t){e.history.saveLocation(t)},_bindRoutes:function(){if(this.routes)for(var e in this.routes){var t=this.routes[e];this.route(e,t,this[t])}},_routeToRegExp:function(e){return e=e.replace(r,"([^/]*)").replace(i,"(.*?)"),RegExp("^"+e+"$")},_extractParameters:function(e,t){return e.exec(t).slice(1)}}),e.History=function(){this.handlers=[],this.fragment=this.getFragment(),t.bindAll(this,"checkUrl")};var s=/^#*/;t.extend(e.History.prototype,{interval:50,getFragment:function(e){return(e||window.location).hash.replace(s,"")},start:function(){var e=document.documentMode;if(e=n.browser.msie&&(!e||e<=7))this.iframe=n('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;return"onhashchange"in window&&!e?n(window).bind("hashchange",this.checkUrl):setInterval(this.checkUrl,this.interval),this.loadUrl()},route:function(e,t){this.handlers.push({route:e,callback:t})},checkUrl:function(){var e=this.getFragment();e==this.fragment&&this.iframe&&(e=this.getFragment(this.iframe.location));if(e==this.fragment||e==decodeURIComponent(this.fragment))return!1;this.iframe&&(window.location.hash=this.iframe.location.hash=e),this.loadUrl()},loadUrl:function(){var e=this.fragment=this.getFragment();return t.any(this.handlers,function(t){if(t.route.test(e))return t.callback(e),!0})},saveLocation:function(e){e=(e||"").replace(s,""),this.fragment!=e&&(window.location.hash=this.fragment=e,this.iframe&&e!=this.getFragment(this.iframe.location)&&(this.iframe.document.open().close(),this.iframe.location.hash=e))}}),e.View=function(e){this._configure(e||{}),this._ensureElement(),this.delegateEvents(),this.initialize(e)};var o=/^(\w+)\s*(.*)$/;t.extend(e.View.prototype,e.Events,{tagName:"div",$:function(e){return n(e,this.el)},initialize:function(){},render:function(){return this},remove:function(){return n(this.el).remove(),this},make:function(e,t,r){return e=document.createElement(e),t&&n(e).attr(t),r&&n(e).html(r),e},delegateEvents:function(e){if(e||(e=this.events)){n(this.el).unbind();for(var r in e){var i=e[r],s=r.match(o),u=s[1];s=s[2],i=t.bind(this[i],this),s===""?n(this.el).bind(u,i):n(this.el).delegate(s,u,i)}}},_configure:function(e){this.options&&(e=t.extend({},this.options,e)),e.model&&(this.model=e.model),e.collection&&(this.collection=e.collection),e.el&&(this.el=e.el),e.id&&(this.id=e.id),e.className&&(this.className=e.className),e.tagName&&(this.tagName=e.tagName),this.options=e},_ensureElement:function(){if(!this.el){var e={};this.id&&(e.id=this.id),this.className&&(e["class"]=this.className),this.el=this.make(this.tagName,e)}}});var u=function(e,t){var n=l(this,e,t);return n.extend=u,n};e.Model.extend=e.Collection.extend=e.Controller.extend=e.View.extend=u;var a={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};e.sync=function(t,r,i,s){var o=a[t];t=t==="create"||t==="update"?JSON.stringify(r.toJSON()):null,r={url:c(r),type:o,contentType:"application/json",data:t,dataType:"json",processData:!1,success:i,error:s},e.emulateJSON&&(r.contentType="application/x-www-form-urlencoded",r.processData=!0,r.data=t?{model:t}:{}),e.emulateHTTP&&(o==="PUT"||o==="DELETE")&&(e.emulateJSON&&(r.data._method=o),r.type="POST",r.beforeSend=function(e){e.setRequestHeader("X-HTTP-Method-Override",o)}),n.ajax(r)};var f=function(){},l=function(e,n,r){var i;return i=n&&n.hasOwnProperty("constructor")?n.constructor:function(){return e.apply(this,arguments)},f.prototype=e.prototype,i.prototype=new f,n&&t.extend(i.prototype,n),r&&t.extend(i,r),i.prototype.constructor=i,i.__super__=e.prototype,i},c=function(e){if(!e||!e.url)throw Error("A 'url' property or function must be specified");return t.isFunction(e.url)?e.url():e.url},h=function(e,t,n){return function(r){e?e(t,r):t.trigger("error",t,r,n)}}})();