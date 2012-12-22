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
		    
		

		function toSprite(combine) {
			var combine = combine || true;
			try {
				file = getFile();
				var parser = new GifParser(new jDataView(file));
				sprite.width = parser.frames.length * document.documentElement.clientWidth;
				sprite.height = document.documentElement.clientHeight;
				sprite.frames = parser.frames.length;
				sprite.step = document.documentElement.clientWidth;
				sprite.flength = Math.round(document.documentElement.clientWidth / sprite.frames);
				for (var i = 0; i < sprite.frames; i++) {
					sprite.events.push({start: (i * sprite.flength), end: (((i+1) * sprite.flength) - 1)});
				}
				merge(parser);
				return sprite;
			} catch (err) {
				//Handle the error
				console.log(err)
			}
		}

		function merge(p) {
			canvas.width = (p.img.width * (p.frames.length));
			canvas.height = p.img.height;
			for(img in p.frames) {
				
				(function(img, p, context, canvas) {
					var Imgg = new Image();
					Imgg.onload = function() {
						console.log((p.frames.length - 1) == img);
						context.drawImage(this,(img * p.img.width),0);
						if ((p.frames.length - 1) == img) {
							cb(canvas.toDataURL(),p);
						}
					}
					Imgg.width = p.img.width;
					Imgg.height = p.img.height;
					Imgg.src = p.frames[img].imgData;

				}(img,p, context, canvas));
			}
		}

		function cb(bg) {
			
			$('body').css({'background-image': 'url("' + bg + '")', 'background-size': sprite.width + 'px' + ' ' + sprite.height + 'px'});
		}

		function getFile(bufarray) {
			var xhr = new XMLHttpRequest;
			xhr.open("GET", img, false);
            xhr.overrideMimeType("text/plain; charset=x-user-defined");

            xhr.send()
            if (xhr.status != 200) {
            	throw new Error('Failed to download file');
            }
			//Can't use responseType bufferarray for synchronous requests, STUPID!!!
			return xhr.responseText; 
		}
		
		return {
			toSprite: toSprite
		}

	}


}(window, document));
