$(document).ready(function() {
	
	console.log('docready!');
	
	_deferredImg.init({
		callbacks : {
			init : function(passMe) { console.log('init <> : ', passMe); },
			loading : function(passMe) { console.log('loading ... : ', passMe); },
			loaded : function(passMe) { console.log('loaded! : ', passMe); }
		}
	});

});
