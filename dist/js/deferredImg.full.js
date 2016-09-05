/**
* deferredImg
* v1.0.0
* 2016-09-05 12:57:41 PM 
*/ 

/**
* this is really just a wrap to contain the other required libraries
*/
var _deferredImg = (function(_w, $) {
	
	
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
* endedEvents
* adds events for when expensive evnts (like scroll and resize) have ended
*/
;(function($, W) {

	'use strict';

	/**
	 * for AMD, don't redefine this!  (need to maintain globals and plugins)
	 */
	if (W.endedEvents)
		return;
	
	$ = $;
	var D = document,
		endedEvents = {
			isScrollStopped : true,
			isResizedStopped : true,
			scrollTimer : undefined,
			resizeTimer : undefined
		},
		scrollStopped = function() {
			
			W.endedEvents.isScrollStopped = true;
			
			if($ !== undefined)
				$(W).trigger('scrollStopped');
							
		},
		resizeStopped =  function() {
			
			W.endedEvents.isResizedStopped = true;
			
			if($ !== undefined)
				$(W).trigger('resizeStopped');
							
		};
		
		endedEvents.init = function(throttle, $jquery) {
			
			if($jquery !== undefined)
				$ = $jquery;
			
			// you need support for addEventListener ....
			if(!D.addEventListener || typeof D.addEventListener == 'undefined') return;
			
			// how often should we chck to see if the event has stopped ? ...
			endedEvents.throttle = throttle === undefined ? 150 : throttle;
			
			W.addEventListener("scroll", function() {
				
				W.endedEvents.isScrollStopped = false;
				clearTimeout(W.endedEvents.scrollTimer);
				W.endedEvents.scrollTimer = setTimeout( scrollStopped , endedEvents.throttle );
					
			});
			
			W.addEventListener("resize", function() {
				
				W.endedEvents.isResizedStopped = false;
				clearTimeout(W.endedEvents.resizeTimer);
				W.endedEvents.resizeTimer = setTimeout( resizeStopped , endedEvents.throttle );
					
			});
			
			if($ !== undefined)
				$.event.props.push(['scrollStopped', 'resizeStopped']);
		
		};
		
	/**
	 * Apply the ikelos function to the supplied scope (window)
	 */
	W.endedEvents = endedEvents;

})(jQuery || $, window);

/**
 * Expose endedEvents as an AMD
 */
if (typeof define === "function") 
	define("endedEvents", [], function () { return endedEvents; } );

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
		
})(window, jQuery);