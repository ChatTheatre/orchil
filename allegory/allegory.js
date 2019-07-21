"use strict";
//-----Component Setup
	var bigMapHREF;
	function initTheatre() {
		addComponent('skotos_logo'    , 'right'   , false);
		addComponent('clientui'       , 'skotos_logo');
		addComponent('save_button'  , 'clientui', false, 'saveCurrentWindow', [], '<img alt="Save Log" title="Save Log" src="http://test.skotos.net/orchil/marrach/log.png">');
		addComponent('settings_button', 'clientui', false, 'openSettings', [], '<img alt="Settings" title="Settings" src="http://test.skotos.net/orchil/marrach/settings.png">');
		addComponent('newplayers'     , 'right'   , false, 'openerWin', ['http://ironclaw.skotos.net/Ironclaw/starting.sam'], '<img alt="Getting Started" src="http://www.skotos.net/CastleMarrachGame/images/started.gif">');
		addComponent('newplayers'     , 'right'   , false, 'openerWin', ['http://ironclaw.skotos.net/Ironclaw/mastering.sam'], '<img alt="Mastering Chat" src="http://www.skotos.net/CastleMarrachGame/images/mastering.gif">');        
        document.getElementById('left').appendChild(document.getElementById('status'));
        document.getElementById('left').appendChild(document.getElementById('environment'));
        
		addComponent('right_fill'     , 'right'   , 'fill');
		addComponent('image_map'      , 'right'   , false, 'popupMapWindow', []);
		addComponent('image_map_img'  , 'image_map');
		addComponent('comp_nw', 'image_map', 'comp_button', 'compassArrow', ['northwest'], false, 'go northwest');
		addComponent('comp_n' , 'image_map', 'comp_button', 'compassArrow', ['north'],     false, 'go north');
		addComponent('comp_ne', 'image_map', 'comp_button', 'compassArrow', ['northeast'], false, 'go northeast');
		addComponent('comp_w' , 'image_map', 'comp_button', 'compassArrow', ['west'],      false, 'go west');
		addComponent('comp_e' , 'image_map', 'comp_button', 'compassArrow', ['east'],      false, 'go east');
		addComponent('comp_sw', 'image_map', 'comp_button', 'compassArrow', ['southwest'], false, 'go southwest');
		addComponent('comp_s' , 'image_map', 'comp_button', 'compassArrow', ['south'],     false, 'go south');
		addComponent('comp_se', 'image_map', 'comp_button', 'compassArrow', ['southeast'], false, 'go southeast');

		//addComponent('macro_area'     , 'right');
/*		for (var i=1;i<=15;i++) {
			addComponent(false, 'macro_area', 'macro_button', 'sendUI', ['fe'+i], romanize(i), 'Macro #'+i);
		}
*/
	}

    function inputCmd(element) {
        document.getElementById('commandinput').value=element.title;
    }

	function updateCompass(bitfield, image, dir, bit) {

		if (bitfield & bit) {
  	    	image.style.backgroundImage = "url(http://www.skotos.net/IronclawGame/images/arrows/" + dir + "-ex.gif)";
		} else {
	    	image.style.backgroundImage = "url(http://www.skotos.net/IronclawGame/images/arrows/" + dir + "-noex.gif)";
		}
    }
//-----Component Functionality
	function doSkoot(num, msg) {
		num = Number(num);
		console.log("SKOOT " + num + " " + msg);
		switch (num) {
		case 1:
			var img = document.getElementById("image_map_img");
			if (img) {
				img.style.backgroundImage = "url('"+msg+"')";
			} else {
				badSkoot(num, msg);
			}
			break;
		case 2:
			popupArtWin(msg, "Art", "Skotos Art");
			break;
		case 3:
			badSkoot(num, msg);
			break;
		case 4:
			bigMapHREF = msg;
			break;
		case 5:
	   		updateCompass(msg, document.getElementById("comp_n"), "n",    1);
	   		updateCompass(msg, document.getElementById("comp_ne"), "ne",   2);
	   		updateCompass(msg, document.getElementById("comp_e"), "e",    4);
	   		updateCompass(msg, document.getElementById("comp_se"), "se",   8);
	   		updateCompass(msg, document.getElementById("comp_s"), "s",   16);
	   		updateCompass(msg, document.getElementById("comp_sw"), "sw",  32);
	   		updateCompass(msg, document.getElementById("comp_w"), "w",   64);
	   		updateCompass(msg, document.getElementById("comp_nw"), "nw", 128);
			break;
		case 6:
			popupWin(msg, "SkotosAnyURL", 800, 600);
			break;
		case 7:
			showCompass(msg);
			break;
		case 8:
			showStatusBar(msg);
			break;
		case 9:
			showEnvIcon(msg);
			break;
		case 10:
			showHVMapLinks(msg);
			break;
		case 70:
	   		popupWin(msg, "SkotosToolSourceView", 800, 600);
			break;
		case 80:
			update(msg);
			break;
        case 90:
            updateEnv(msg);
		default:
			//badSkoot(num, msg);
		}
	}
	function popupMapWindow() {
		popupArtWin(bigMapHREF, 'Map', 'Allegory of the Empires Map');
	}
	function compassArrow(direction) {
		sendUI('go ' + direction);
	}
	function showCompass(str) {
		var arr = (str.split(","));
		for (var i=0; i<arr.length; i=i+2) {
			if(arr[i+1] == 'show') {
				document.getElementById('comp_'+arr[i]).style.opacity = 0.8;
				document.getElementById('comp_'+arr[i]).style.background = '#ffffff';
			} else {
				document.getElementById('comp_'+arr[i]).style.opacity = 0.5;
				document.getElementById('comp_'+arr[i]).style.background = '#aaaaaa';
			}
		}
	}
	function showStatusBar(str) {
		var arr = (str.split(","));
		var filler = document.getElementById('fill_'+arr[0].toLowerCase());
		if (filler) {
			filler.style.height = (arr[1]*0.75) + "px";
		}
	}
	function showEnvIcon(str) {
		var i= Math.min(Math.max(str*1, 0), 30); //0-30
		i = Math.round((i / 30) * 100) / 100;    //No more than two decimal points
		document.getElementById('light_indicator').style.opacity = i;
	}
	//-----Map Functions
		function createMapDiv(id, parentId, className) {
			var div = document.createElement("div");
			div.id = id;
			div.className = className;
			document.getElementById(parentId).appendChild(div);
			return div;
		}
		function createMapImg(parentObj, className, src) {
			var img = document.createElement("img");
			img.className = className;
			parentObj.appendChild(img);
			img.src = src;
			img.alt = '';
			return img;
		}
		function findOrCreateRoom(id) {
			var room = document.getElementById('maproom' + id);
			if (!room) {
				room = createMapDiv('maproom' + id, 'map_area', 'maproom');
			}
			return room;
		}
		function findOrCreateLink(dir, id) {
			var link = document.getElementById(id);
			if (!link) {
				if (dir == 'hor' || dir == 'ver') {
					link = createMapDiv(id, 'map_area', 'map_link_' + dir);
				} else if (dir == 'ne') {
					link = createMapDiv(id, 'map_area', 'map_link_dia');
					createMapImg(link, 'map_link_dia_tr', 'sw4.gif');
					createMapImg(link, 'map_link_dia_bl', 'ne4.gif');
				} else if (dir == 'nw') {
					link = createMapDiv(id, 'map_area', 'map_link_dia');
					createMapImg(link, 'map_link_dia_tl', 'se4.gif');
					createMapImg(link, 'map_link_dia_br', 'nw4.gif');
				} else if (dir == 'none') {
					link = createMapDiv(id, 'map_area', 'map_link_dia');
					createMapImg(link, 'map_link_dia_tr', 'nosw.gif');
					createMapImg(link, 'map_link_dia_bl', 'none.gif');
				} else if (dir == 'nonw') {
					link = createMapDiv(id, 'map_area', 'map_link_dia');
					createMapImg(link, 'map_link_dia_tl', 'nose.gif');
					createMapImg(link, 'map_link_dia_br', 'nonw.gif');
				}
			}
			return link;
		}

		function showMap(str) {
			var arr = (str.split(","));
			var i = 0;
			var x, y, wid, bg, col, lig, colarr;
			var locwid = 120 * 0.5;
			var id;
			clearMap();
			clearMapLinks();
			for (i; i < arr.length; i = i + 5) {
				wid = arr[i + 2]*1;
				col = arr[i + 3];
				lig = Math.min(Math.max(arr[i + 4], 0), 30);
				lig = lig - 25;
				colarr = col.hex2rgb();
				colarr[0] = Math.min(Math.max(Math.round(colarr[0]*1 + (lig * 8)), 0), 255);
				colarr[1] = Math.min(Math.max(Math.round(colarr[1]*1 + (lig * 8)), 0), 255);
				colarr[2] = Math.min(Math.max(Math.round(colarr[2]*1 + (lig * 8)), 0), 255);
				col = colarr.join(",").rgb2hex();
				x = arr[i]*1 + locwid;
				y = arr[i + 1]*1 + locwid;
				id = ((i+5)/5);
				var room = findOrCreateRoom(id);
				room.style.left       = x + "px";
				room.style.top        = y + "px";
				room.style.width      = (wid - 2)  + "px";
				room.style.height     = (wid - 2)  + "px";
				room.style.background = col+'';
			}
		}

		function showHVMapLinks(str) {
			var arr = (str.split(","));
			var i, x, y, dir, acc, link;
			var id, ver=0, hor=0, nw=0, ne=0, nonw=0, none=0, num;
		//	var locwid = document.getElementById("map_area").style.width.replace("px", "")*0.5;
			var locwid = 120 * 0.5;
			

			for (i = 0; i < arr.length; i = i + 4) {
				x = arr[i]*1 + locwid;
				y = arr[i + 1]*1 + locwid;
				dir = arr[i + 2];
				acc = arr[i + 3]*1;

				//x,y,ver,1
				if (dir != 'ver' && dir != 'hor' && !acc) {
					dir = 'no'+dir;
				}

				if (dir == 'ver') {
					ver++;
					x = x - 2 - x/80;
					y = y - 3 - y/20;
					id = "maplink" + dir +''+ ver;
				} else if (dir == 'hor') {
					hor++;
					x = x - 3 - x/40;
					y = y - 2;
					id = "maplink" + dir +''+ hor;
				} else {
					if (dir == 'nw') {
						nw++;num = nw;
					} else if (dir == 'ne') {
						ne++;num = ne;
					} else if (dir == 'nonw') {
						nonw++;num = nonw;
					} else if (dir == 'none') {
						none++;num = none;
					}
					x = x - 5;
					y = y - 5;
					id = "maplink" + dir +''+ num;
				}
				link = findOrCreateLink(dir, id);
				if (dir == 'ver' || dir == 'hor') {
					if (acc) {
						link.style.background = '#ffffff';
					} else {
						link.style.background = '#000000';
					}
				}
				link.style.left = x + "px";
				link.style.top = y + "px";
			}
		}

		function clearMap() {
			for (var i=1;;i++) {
				var room = document.getElementById('maproom' + i);
				if (!room) {
					return;
				}
				if (room.offsetTop == -30 && room.offsetLeft == -30) {
					return;
				}
				room.style.left   = -30 + "px";
				room.style.top    = -30 + "px";
				room.style.width  = 0;
				room.style.height = 0;
				room.style.background = 'transparent';
			}
		}

		function clearMapLinks() {
			var linknames = ['maplinkver', 'maplinkhor', 'maplinkne', 'maplinknw', 'maplinknone', 'maplinknonw'];
			var numnames = linknames.length;
			for (var i=1;;i++) {
				var link, found;
				found = 0;
				for (var j=0;j<numnames;j++) {
					link = document.getElementById(linknames[j] + i);
					if (link) {
						link.style.left  = -30 + "px";
						link.style.top   = -30 + "px";
						found = 1;
					}
				}
				if (!found) {
					return;
				}
			}
		}
//-----Library Functions
	function romanize(num) {
		if (!+num) return false;
		var digits = String(+num).split(''),
			key = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM', '','X','XX','XXX','XL','L','LX','LXX','LXXX','XC', '','I','II','III','IV','V','VI','VII','VIII','IX'], roman = '',
			i = 3;
		while (i--)
			roman = (key[+digits.pop() + (i * 10)] || '') + roman;
		return Array(+digits.join('') + 1).join('M') + roman;
	}
	String.prototype.hex2rgb = function() {
		var red, green, blue;
		var triplet = this.toLowerCase().replace(/#/, '');
		var rgbArr  = new Array();

		if(triplet.length == 6) {
			rgbArr[0] = parseInt(triplet.substr(0,2), 16)
			rgbArr[1] = parseInt(triplet.substr(2,2), 16)
			rgbArr[2] = parseInt(triplet.substr(4,2), 16)
			return rgbArr;
		} else if(triplet.length == 3) {
			rgbArr[0] = parseInt((triplet.substr(0,1) + triplet.substr(0,1)), 16);
			rgbArr[1] = parseInt((triplet.substr(1,1) + triplet.substr(1,1)), 16);
			rgbArr[2] = parseInt((triplet.substr(2,2) + triplet.substr(2,2)), 16);
			return rgbArr;
		} else {
			throw triplet + ' is not a valid color triplet.';
		}
	}
	function rgb2hexfun(value) {
		var x = 255;
		var hex = '';
		var i;
		var regexp=/([0-9]+)[, ]+([0-9]+)[, ]+([0-9]+)/;
		var array=regexp.exec(value);
		for(i=1;i<4;i++) hex += ('0'+parseInt(array[i]).toString(16)).slice(-2);
		return '#'+hex;
	}
	String.prototype.rgb2hex = function() {
		var x = 255;
		var hex = '';
		var i;
		var regexp=/([0-9]+)[, ]+([0-9]+)[, ]+([0-9]+)/;
		var array=regexp.exec(this);
		for(i=1;i<4;i++) hex += ('0'+parseInt(array[i]).toString(16)).slice(-2);
		return '#'+hex;
	}
    
    function update(input) {
        var t = input.split(" ");
        var msg = t[0];
        var curr = t[1];
        if(msg == "health") {
             document.getElementById("health").style.width = "" + curr + "%";
             document.getElementById("health_text").innerText = "" + curr + "%";
        } else if(msg == "energy") {
             document.getElementById("energy").style.width = "" + curr + "%";
             document.getElementById("energy_text").innerText = "" + curr + "%";
        } else if(msg == "hunger") {
             document.getElementById("hunger").style.width = "" + curr + "%";
             document.getElementById("hunger_text").innerText = "" + curr + "%";
        }
    }

    function updateEnv(input) {
        var t = input.split(" ");
        var time = t[0];
        var weather = t[1];
        var wind = t[2];
        var url;
        
        switch(time) {
            case "night":
                url = './icons/time/night.png';
                break;
            case "dawn":
                url = './icons/time/sunrise.png';
                break;
            case "morning":
                url = './icons/time/day.png';
                break;
            case "midday":
                url = './icons/time/day.png';
                break;
            case "afternoon":
                url = './icons/time/day.png';
                break;
            case "dusk":
                url = './icons/time/sunset.png';
                break;
            case "evening":
                url = './icons/time/night.png';
                break;
            case "midnight":
                url = './icons/time/night.png';
                break;
            case "aftermidnight":
                url = './icons/time/night.png';
                break;
            default:
                url = './icons/time/day.png';
                break;
        }
                
        document.getElementById('time-icon').src = url;
        
        switch(weather) {
            case "cloudy":
                url = './icons/weather/clouds.png';
                break;
            case "rainy":
                url = './icons/weather/rain.png';
                break;
            case "snowy":
                url = './icons/weather/snow.png';
                break;
            case "stormy":
                url = './icons/weather/thunder.png';
                break;
            case "windy":
                url = './icons/weather/wind.png';
                break;
            default:
                url = './icons/weather/clear.png';
                break;
        }
                
        document.getElementById('weather-icon').src = url;
                
        switch(wind) {
            case "calm":
                url = './icons/weather/clear.png';
                break;
            default:
                url = './icons/weather/wind.png';
                break;
        }
                
        document.getElementById('wind-icon').src = url;
        
    }

	function popupArtWin(filename, windowname, windowtitle) {
		var artwin;
		var adj4NN  = (navigator.appName == "Netscape" ? -5 : 0 );
		var scrLeft = 16 + window.screenX;
		var scrTop  = 16 + window.screenY;

		var i = filename.indexOf(' ');
		while (i != -1) {
	    	filename = filename.substring(0, i) + '%20' +
	               	filename.substring(i + 1);
            i = filename.indexOf(' ');
		}

		artwin = window.open('http://108.62.118.199:10080/Theatre/Art.sam?url=' +
                                 escape(filename) + '&title=' +
				 escape(windowtitle), windowname,
				 'width=100,height=100,left=' + scrLeft +
                                 ',top=' + scrTop +
				 ',hotkeys=no,scrollbars=no,resizable=no,' +
				 'dependent=yes');
		// Just in case it was already open and not at the foreground.
		artwin.focus();
    }
//-----Initialization Code
	var serverCode = "IC";