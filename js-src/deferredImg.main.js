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