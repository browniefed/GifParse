var Gif2Sprite = Gif2Sprite || {};

(function(window, document, undefined) {

	Gif2Sprite = function(input) {
		var img = input,
		    canvas = document.createElement('canvas'),
		    context = canvas.getContext('2d'),
		    sprite = {
		    	width: 0,
		    	height: 0,
		    	frames: 0,
		    	flength: 0,
		    	events: []
		    };
		    
		

		function toSprite(combine, callback) {
			var combine = combine || true;
			try {
				file = getFile();
				var parser = new GifParser(new jDataView(file));
				sprite.width = parser.frames.length * document.documentElement.clientWidth;
				sprite.height = document.documentElement.clientHeight;
				sprite.frames = parser.frames.length;
				sprite.step = document.documentElement.clientWidth;
				sprite.flength = Math.round(document.documentElement.clientWidth / sprite.frames);
				merge(parser, callback, sprite);
				return sprite;
			} catch (err) {
				//Handle the error
				console.log(err)
			}
		}

		function merge(p, cb, sprite) {
			canvas.width = (p.img.width * (p.frames.length));
			canvas.height = p.img.height;
			$('.frames').width(canvas.width);
			for(img in p.frames) {
				
				(function(img, p, context, canvas, cb) {
					img = parseInt(img);
					var Imgg = new Image();
					Imgg.onload = function() {
						context.drawImage(this,(img * p.img.width),0);
						$('<img />', {
							src: p.frames[img].imgData,
							'class': 'n' + img
						}).appendTo('.frames');
						if ((p.frames.length - 1) == (img)) {
							cb(canvas.toDataURL(),sprite);
						}
					}
					Imgg.width = p.img.width;
					Imgg.height = p.img.height;
					Imgg.src = p.frames[img].imgData;

				}(img, p, context, canvas, cb));
			}
		}

		function getFile(bufarray) {
			var xhr = new XMLHttpRequest;
			xhr.open("GET", img, false);
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
			xhr.send();
			return xhr.responseText; 

		}
		
		return {
			toSprite: toSprite
		}

	}


}(window, document));
