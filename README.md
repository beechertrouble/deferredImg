# deferredImg
deferredImg, lazy loading images in with noscript fallback


## requirements
- jquery 
- inView
- endedEvents


## generally
- a simple lazy loading notion so that initial page load and render can happen quicker.
- also only load the images that are visible, to ease up on your viewers data usage and make for a less chuggy experience.
- take an image from inside a `noscript` and replace the noscript with the `img` markup.
- do that for only the images that would be visible.
- do that again on a throttled scroll and resize event.
- allow manual trigger of loading. 
- allow some callback hooks.

### markup
- the below example is using `srcset`, but `deferredImg` doesn't care about the particular srcset you provide, or if you use a regular, old-fashioned img and whatnot.
- by default, defferedImg expects the usage of a `padding-top percentage based aspect ratio` approach to hold a space for image before it is loaded. If you prefer a different approach, you'll need to adjust the `css/less`.
- i.e. : 
```html
<div class="_deferredImg" style="padding-top:56.25%;">
	<noscript>
		<img src="ultimateFallbackImageVersionForNoscript.jpg" srcset="smallImageVersionOrWhatever.jpg 560w, mediumImageVersionOrWhatever.jpg 768w, largeImageVersionOrWhatever1024w"  alt="Good alt text for screenreaders"  />
	</noscript>
</div>
```

- will be turned into markup like : 
```html
<div class="_deferredImg _deferredImg_loaded" style="padding-top:56.25%;">
	<img src="ultimateFallbackImageVersionForNoscript.jpg" srcset="smallImageVersionOrWhatever.jpg 560w, mediumImageVersionOrWhatever.jpg 768w, largeImageVersionOrWhatever1024w"  alt="Good alt text for screenreaders"  />
</div>
```

### style things 
- by default, defferedImg expects the usage of a `padding-top percentage based aspect ratio` approach to hold a space for image before it is loaded. If you prefer a different approach, you'll need to adjust the `css/less`.
- less files are included in the `/dist/` dir so that things can be styles with your less flow to match whatever project.
- css minified and unminified are also available.
- there three basic states reflected in the classes : 
    - `_deferredImg` - default style, before image has been loaded
    - `_deferredImg_loading` - you guessed it
    - `_deferredImg_loaded` - yarp


### javascript things
- a few versions of the js are available ( both minified and unminified ): 
	- `deferredImg.full.js` - this has all the required libraries built in ( except jquery of course )
	- `deferredImg.amd.js` - define style for like require.js
	- `deferredImg.main.js` - this expects you already have the required libraries in there and is not amd stylz
- basic usage is automagical - set it and forget it like
```javascript
	
	// probably throw this in your docready
	
	_deferredImg.init();
	
	
```
- you can pass it some args - here's a simple example - might be more args later ...
```javascript
	
	// these are alll optional ...
	var args = {
		selector : '._deferredImg', 
		viewPad : 500, 
		callbacks : {
			init : function(passMe) { console.log('inited', passMe); },
			loading : function(passMe) { console.log('loading', passMe); },
			loaded : function(passMe) { console.log('loaded', passMe); }
		}
	};
	
	_deferredImg.init(args);	
	
```
### optional init params
- `selector` - selector for which elements to load - defaults to `._deferredImg`
- `viewPad` - how far above and below the visible portion of the window should we consider things 'in-view' - defaults to `500`
- `callbacks` - an object with event-keyed functions - see below for explanation


#### callbacks
- each of the below hooks gets passed an object - which we're calling `passMe` above : 
- `init` 
    - passMe : 
    ```javascript
    	passMe.pub; // this is a reference to the _deferredImg object 
    	passMe.args; // this is a reference to the passed and parsed init params/args 
	```
- `loading` 
    - passMe : 
    ```javascript
    	passMe.pub; // this is a reference to the _deferredImg object 
		passMe.target; // this is the element that is being loaded
		passMe.markup; // this markup that will replace the noscript 
	```
- `loaded` 
    - passMe : 
    ```javascript
    	passMe.pub; // this is a reference to the _deferredImg object 
		passMe.target; // this is the element that was loaded
		passMe.markup; // this markup that will replaced the noscript 
	```

### methods
- `init(args)` - see above
- `load($targets, force)` - the stuff 
- `getNoscriptMarkup(target)` - yarp
- 


## todo : 
- 


## maybe : 
- maybe we dont need jquery ?
- callbacks?
- sass support?


