/**
* deferredImg
* v1.0.0
* 2016-09-05 12:57:41 PM 
*/ 

/**
* amd stylez
*/
define('_deferredImg', ['jQuery'], function($) { 
	
	
if(!jQuery().inView){
	$.fn.inView=function(p){ 
		
		var r = false,
			a = $(window);
			
		if(this.length > 0){
		
			var t = this.offset() === null ? 0 : this.offset().top, // top of the $el
				b = t+this.height(); // bottom of the $el
			
			p = p === undefined ? a.height() : p; // padding for viewport, to consider things in view, default to 1 viewport height
			
			r = ((a.scrollTop() + a.height()) + p) >= t && (a.scrollTop() - p) <= b ? true : false;
		}
		
		return r;
	}
};
/**
* deferredImg (https://github.com/beechertrouble/deferredImg) 
* a venue-based img loader ...
* by beechertrouble (http://beechbot.com)
* v0.0.1
*
* requires : 
* jQuery 
* inView
*/
var _deferredImg = (function(_w, $) {

	'use strict';
			
	var _deferredImg = (function() {

		var _pub = {},
			selector,
			origin = {},
			callbacks = {},
			bind
			;
		
		_pub.doCallback = function(event) {
								
			var func = callbacks[event];
				
			if(func !== undefined && typeof callbacks[event] == 'function')
				func();
				
		};
		
		// ....
				
		_pub.init = function(args) {
												
			args = args !== undefined ? args : {};
			args.selector = args.selector !== undefined ? args.selector : '._deferredImg';
			args.viewPad = args.viewPad !== undefined ? args.viewPad : 500;
			
			if(args.callbacks === undefined)
				args.callbacks = {};
			
			callbacks = {
				init : args.callbacks.init !== undefined ? args.callbacks.init : null,
				loading : args.callbacks.loading !== undefined ? args.callbacks.loading : null,
				loaded : args.callbacks.loaded !== undefined ? args.callbacks.loaded : null
			};
			
			_pub.args = args;
			
			_pub.load();
											
			_pub.doCallback('init');
					
		};
		
		_pub.load = function($targets, force) {
			
			$targets = $targets !== undefined ? $targets : $(_pub.args.selector + ':not(._deferredImg_loading,._deferredImg_loaded)');
			force = force !== undefined ? force : false;
			
			$targets.each(function(){
				
				var target = $(this);
				
				// skip these ...
				if(!target.inView(_pub.args.viewPad) && !force) 
					return true;
									
				target.addClass('_deferredImg_loading');	
				
				var markup = _pub.getNoscriptMarkup(target);
				
				// remove noscript
				// markup.attr('alt', '');
				target.find('noscript').remove();
				
				markup.one('load', function(e){
					target.removeClass('_deferredImg_loading').addClass('_deferredImg_loaded');
					_pub.doCallback('loaded');
				});
				
				target.prepend(markup);
				
			});
						
		};
		
		_pub.getNoscriptMarkup = function(target) {
			
			var noscript = target.find('noscript').text();
			return $(noscript);
			
		};	
				
		return _pub;
			
	})();
	
	return _deferredImg;
		
})(window, jQuery || $);
        
        return _deferredImg;
        
});