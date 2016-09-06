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
var _deferredImg = (function($) {

	'use strict';
			
	var _deferredImg = (function() {

		var _pub = {},
			selector,
			origin = {},
			callbacks = {}
			;
		
		_pub.doCallback = function(event, pass) {
								
			var func = callbacks[event];
			
			pass = pass !== undefined ? pass : { pub : _pub };
				
			if(func !== undefined && typeof callbacks[event] === 'function')
				func(pass);
				
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
														
			_pub.doCallback('init', {
					pub : _pub, 
					args : args
				});
			
			_pub.load();
			
			if(typeof endedEvents === 'object') endedEvents.init();
			
			$(window).on('scrollStopped resizeStopped', function(e){ _pub.load(); });
					
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
				
				target.data('noscript', markup);
				
				_pub.doCallback('loading', {
					pub : _pub,
					target : target,
					markup : markup
				});
				
				// remove noscript
				target.find('noscript').remove();
				
				markup.one('load', function(e){
					target.removeClass('_deferredImg_loading').addClass('_deferredImg_loaded');
					_pub.doCallback('loaded', {
						pub : _pub,
						target : target,
						markup : markup
					});
				});
				
				target.prepend(markup);
				
			});
						
		};
		
		_pub.getNoscriptMarkup = function(target) {
			
			return target.data('noscript') !== undefined ? target.data('noscript') : $(target.find('noscript').text());
			
		};	
				
		return _pub;
			
	})();
	
	return _deferredImg;
		
})(jQuery || $);