"use strict";
//-----Component Setup
	function initTheatre() {
		addComponent('chat_theatre'   , 'left'    , false, 'openerWin', ['http://www.eternalcitygame.com'], '<img alt="The Eternal City" src="http://images.eternalcitygame.com/gamelogo.gif">');
		
		addComponent('left_fill'      , 'left'    , 'fill');
		addComponent('image_map'      , 'left'    , false, 'popupArtWin', ['http://images.eternalcitygame.com/map.jpg', 'RegionMap', 'Map of Iridine - The Eternal City'],'<img alt="Region Map" src="http://images.eternalcitygame.com/small_map.jpg">');
		//addComponent('vote_tec'       , 'right'   , false, 'openerWin', ['//www.topmudsites.com/cgi-bin/topmuds/rankem.cgi?id=scarlatc'], '<img alt="Vote for the Eternal City" title="Vote for the Eternal City on TopMudSites" src="//www.skotos.net/games/eternal-city/artwork/votenow_btn.gif">');
		//addComponent('skotos_logo'    , 'right'   , false, 'openerWin', ['//www.skotos.net/'], '<img alt="Skotos Logo" src="//www.skotos.net/TECGame/images/skotoslogo.jpg">');
		addComponent('clientui'       , 'right');
			addComponent('save_button', 'clientui', false, 'saveCurrentWindow', [], '<img alt="Save Log" title="Save Log" src="log.png">');
			addComponent('settings_button', 'clientui', false, 'openSettings', [], '<img alt="Settings" title="Settings" src="settings.png">');
		addComponent('newplayers'     , 'right'   , false, 'openerWin', ['http://www.eternalcitygame.com/overview.shtml'], '<img alt="Getting Started" src="http://images.eternalcitygame.com/started.gif">');
		addComponent('vote_tec'       , 'right'   , false, 'openerWin', ['http://www.topmudsites.com/cgi-bin/topmuds/rankem.cgi?id=scarlatc'], '<img alt="Vote for the Eternal City" title="Vote for the Eternal City on TopMudSites" src="http://www.eternalcitygame.com/artwork/votenow_btn.gif">');
		addComponent('right_fill'     , 'right'   , 'fill');
		addComponent('macro_area'     , 'right');
		for (var i=1;i<=15;i++) {
			addComponent(false, 'macro_area', 'macro_button', 'sendUI', ['fe'+i], romanize(i), 'Macro #'+i);
		}
		addComponent('status_area' , 'right');
		addComponent('combo_compass', 'status_area');
		addComponent('light_indicator', 'combo_compass');
			addComponent('comp_nw', 'combo_compass', 'comp_button', 'compassArrow', ['northwest'], false, 'northwest');
			addComponent('comp_n' , 'combo_compass', 'comp_button', 'compassArrow', ['north'],     false, 'north');
			addComponent('comp_ne', 'combo_compass', 'comp_button', 'compassArrow', ['northeast'], false, 'northeast');
			addComponent('comp_w' , 'combo_compass', 'comp_button', 'compassArrow', ['west'],      false, 'west');
			addComponent('comp_e' , 'combo_compass', 'comp_button', 'compassArrow', ['east'],      false, 'east');
			addComponent('comp_sw', 'combo_compass', 'comp_button', 'compassArrow', ['southwest'], false, 'southwest');
			addComponent('comp_s' , 'combo_compass', 'comp_button', 'compassArrow', ['south'],     false, 'south');
			addComponent('comp_se', 'combo_compass', 'comp_button', 'compassArrow', ['southeast'], false, 'southeast');
			addComponent('comp_u' , 'combo_compass', 'comp_button', 'compassArrow', ['up'],        false, 'up');
			addComponent('comp_d' , 'combo_compass', 'comp_button', 'compassArrow', ['down'],      false, 'down');
		addComponent('bar_area'       , 'status_area');
			addComponent('bar_health'      ,'bar_area'       ,'stat_bar_back','sendUI', ['condition'],   false, 'Health');
			addComponent('fill_health'     ,'bar_health'     ,'stat_bar_fill',false , false, '<span class="stat_bar_label">H</span>');
			addComponent('bar_fatigue'     ,'bar_area'       ,'stat_bar_back','sendUI', ['condition'],   false, 'Fatigue');
			addComponent('fill_fatigue'    ,'bar_fatigue'    ,'stat_bar_fill',false , false, '<span class="stat_bar_label">F</span>');
			addComponent('bar_encumbrance' ,'bar_area'       ,'stat_bar_back','sendUI', ['encumbrance'], false, 'Encumbrance');
			addComponent('fill_encumbrance','bar_encumbrance','stat_bar_fill',false , false, '<span class="stat_bar_label">E</span>');
			addComponent('bar_satiation'   ,'bar_area'       ,'stat_bar_back','sendUI', ['satiation'],   false, 'Satiation');
			addComponent('fill_satiation'  ,'bar_satiation'  ,'stat_bar_fill',false , false, '<span class="stat_bar_label">S</span>');
		addComponent('map_area' , 'right');
	}
//-----Component Functionality
	function doSkoot(num, msg) {
		num = Number(num);
		switch (num) {
		case 1:
			var img = document.getElementById("image_map");
			if (img) img.src = msg; else badSkoot(num, msg);
			break;
		case 2:
			popupArtWin(msg, "Art", "Skotos Art");
			break;
		case 3:
			badSkoot(num, msg); //Bad for TEC, need to figure out what it is for other games.
			break;
		case 4:
			badSkoot(num, msg); //Bad for TEC, need to figure out what it is for other games.
			break;
		case 5:
			popupWin(msg, serverCode + "_Help", 700, 340);
			break;
		case 6:
			showMap(msg);
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
		default:
			badSkoot(num, msg);
		}
	}
	function compassArrow(direction) {
		sendUI('go ' + direction);
	}
	function showCompass(str) {
		var arr = (str.split(","));
		var ele;
		for (var i=0; i<arr.length; i=i+2) {
			ele = document.getElementById('comp_'+arr[i]);
			if (!ele) {
					reportClientError('comp_'+arr[i]+' not found in '+str);
					break;
			}
			if(arr[i+1] == 'show') {
				ele.style.opacity = 0.8;
				ele.style.background = '#ffffff';
			} else {
				ele.style.opacity = 0.5;
				ele.style.background = '#aaaaaa';
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
					x = x - 2 - x/40;
					y = y - 3 - y/40;
					id = "maplink" + dir +''+ ver;
				} else if (dir == 'hor') {
					hor++;
					x = x - 3 - x/40;
					y = y - 2 - y/40;
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
				if (room.width == 0) {
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
//-----Initialization Code
	var serverCode = "TEC";
