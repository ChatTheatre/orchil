"use strict";
//-----Component Setup
	function initTheatre() {
		addComponent('left_wrap',     'left');
		addComponent('chat_theatre'   ,'left_wrap');
			addComponent('clientui'     ,'chat_theatre');
				addComponent('settings_button', 'clientui',false, 'openSettings', [], '<img alt="Settings" title="Settings" src="settings.png">');
				addComponent('save_button','clientui'    ,false, 'saveCurrentWindow', [], '<img alt="Save Log" title="Save Log" src="log.png">');
			addComponent('skotos_logo'  ,'chat_theatre', false, 'openerWin', ['//www.skotos.net/'], '<img alt="Skotos Logo" src="http://grendelsrevenge.skotos.net/images/sklogo.png">');
			addComponent('monsters_logo','chat_theatre');
		addComponent('stats'          ,'left_wrap');
			addComponent('bar_area'     ,'stats');
				addComponent('bar_health'            ,'bar_area'     ,'stat_bar_back',false,false,false,'Health Points');
				addComponent('fill_health'           ,'bar_health'   ,'stat_bar_fill');
				addComponent('bar_favor_points'      ,'bar_area'     ,'stat_bar_back',false,false,false,'Favor Points');
				addComponent('fill_favor_points'     ,'bar_favor_points','stat_bar_fill');
				addComponent('bar_favors'            ,'bar_area'     ,'',false,false,false,'Favors');
					addComponent('single_favors'       ,'bar_favors');
					addComponent('hundred_favors'      ,'bar_favors');
				//addComponent('fill_favors'           ,'bar_favors'   ,'stat_bar_fill');

				addComponent('bar_roundtime'         ,'bar_area'     ,'stat_bar_back',false,false,false,'Timer');
				addComponent('fill_roundtime'        ,'bar_roundtime','stat_bar_fill');
				addComponent('amt_health_text'       ,'bar_area'     ,'stat_bar_label',false,false,false,'Health Points');
				addComponent('amt_favor_point_text'  ,'bar_area'     ,'stat_bar_label',false,false,false,'Favor Points');
				addComponent('amt_favor_text'        ,'bar_area'     ,'stat_bar_label',false,false,false,'Favors');
		addComponent('resources'               ,'left_wrap');
			addComponent('resource_area'               ,'resources');
				addComponent('icn_gold_resource'       ,'resource_area','resource_icon',false,false,false,'Gold');
				addComponent('amt_gold_resource'       ,'icn_gold_resource','resource_amount');
				addComponent('icn_iron_resource'       ,'resource_area','resource_icon',false,false,false,'Iron');
				addComponent('amt_iron_resource'       ,'icn_iron_resource','resource_amount');
				addComponent('icn_shadow_resource'     ,'resource_area','resource_icon',false,false,false,'Shadow');
				addComponent('amt_shadow_resource'     ,'icn_shadow_resource','resource_amount');
				addComponent('icn_mana_resource'       ,'resource_area','resource_icon',false,false,false,'Mana');
				addComponent('amt_mana_resource'       ,'icn_mana_resource','resource_amount');
				addComponent('icn_stone_resource'      ,'resource_area','resource_icon',false,false,false,'Stone');
				addComponent('amt_stone_resource'      ,'icn_stone_resource','resource_amount');
		addComponent('abilities'      , 'right');
			addComponent('ability_container'      , 'abilities');
		//addComponent('image_map'  , 'left' , false, 'popupArtWin', ['//www.skotos.net/TECGame/images/map.jpg', 'RegionMap', 'Map of Iridine - The Eternal City'],'<img alt="Region Map" src="//www.skotos.net/TECGame/images/small_map.jpg">');
		//addComponent('vote_gr'    , 'right', false, 'openerWin', ['//www.topmudsites.com/cgi-bin/topmuds/rankem.cgi?id=grendel'], '<img alt="Vote for Grendel's Revenge" title="Vote for the Grendel's Revenge on TopMudSites" src="//www.skotos.net/games/eternal-city/artwork/votenow_btn.gif">');
		//addComponent('newplayers'  , 'right', false, 'openerWin', ['//www.skotos.net/games/eternal-city/overview.shtml'], '<img alt="Getting Started" src="//www.skotos.net/TECGame/images/started.gif">');
		addComponent('right_fill'  , 'right', 'fill');
		addComponent('macros'      , 'right');
			addComponent('macro_area'  , 'macros');
		for (var i=1;i<=21;i++) {
			addComponent(false, 'macro_area', 'macro_button', 'sendUI', ['fe'+i], romanize(i), 'Macro #'+i);
		}
		addComponent('map', 'right');
		addComponent('map_box', 'map', 'msize3');
			addComponent('sky_cover', 'map_box');
			for (var i=1;i<=16;i++) {
				addComponent('map'+i, 'map_box', 'map_square');
			}
			for (var i=1;i<=24;i++) {
				addComponent('exit'+i, 'map_box', 'mapexits');
			}
		/*addComponent('status_area' , 'right');*/
		/*addComponent('light_indicator','status_area');*/
			addComponent('comp_nw', 'map_box', 'comp_button', 'compassArrow', ['northwest'], false, 'northwest');
			addComponent('comp_n' , 'map_box', 'comp_button', 'compassArrow', ['north'],     false, 'north');
			addComponent('comp_ne', 'map_box', 'comp_button', 'compassArrow', ['northeast'], false, 'northeast');
			addComponent('comp_w' , 'map_box', 'comp_button', 'compassArrow', ['west'],      false, 'west');
			addComponent('comp_e' , 'map_box', 'comp_button', 'compassArrow', ['east'],      false, 'east');
			addComponent('comp_sw', 'map_box', 'comp_button', 'compassArrow', ['southwest'], false, 'southwest');
			addComponent('comp_s' , 'map_box', 'comp_button', 'compassArrow', ['south'],     false, 'south');
			addComponent('comp_se', 'map_box', 'comp_button', 'compassArrow', ['southeast'], false, 'southeast');

			/*(addComponent('comp_u' , 'light_indicator', 'comp_button', 'compassArrow', ['up'],   false, 'up');
			addComponent('comp_d' , 'light_indicator', 'comp_button', 'compassArrow', ['down'], false, 'down');
		/*addComponent('bar_area'       , 'status_area');
			addComponent('bar_health'      ,'bar_area'       ,'stat_bar_back','sendUI', ['condition'],   false, 'Health');
			addComponent('fill_health'     ,'bar_health'     ,'stat_bar_fill',false , false, '<span class="stat_bar_label">H</span>');
			addComponent('bar_fatigue'     ,'bar_area'       ,'stat_bar_back','sendUI', ['condition'],   false, 'Fatigue');
			addComponent('fill_fatigue'    ,'bar_fatigue'    ,'stat_bar_fill',false , false, '<span class="stat_bar_label">F</span>');
			addComponent('bar_encumbrance' ,'bar_area'       ,'stat_bar_back','sendUI', ['encumbrance'], false, 'Encumbrance');
			addComponent('fill_encumbrance','bar_encumbrance','stat_bar_fill',false , false, '<span class="stat_bar_label">E</span>');
			addComponent('bar_satiation'   ,'bar_area'       ,'stat_bar_back','sendUI', ['satiation'],   false, 'Satiation');
			addComponent('fill_satiation'  ,'bar_satiation'  ,'stat_bar_fill',false , false, '<span class="stat_bar_label">S</span>');*/
		//addComponent('map_area' , 'right');
	}
//-----Component Functionality
	function doSkoot(num, msg) {
		num = Number(num);
		console.log("SKOOT " + num + " " + msg);
		switch (num) {
		case 1:
			var img = document.getElementById("image_map");
			if (img) img.src = msg; else badSkoot(num, msg);
			break;
		case 2:
			popupArtWin(msg, "Art", "Grendel's Revenge Art");
			break;
		case 3:
			badSkoot(num, msg);
			break;
		case 4:
			top.location.href = msg;
			break;
		case 5:
			popupHelp(msg, serverCode+'_Help', 700, 500);
			break;
		case 6:
			popupLeaders(msg, serverCode+'_Leaders', 800, 600);
			break;
		case 100:
			popup100(msg);
			break;
		case 101:
			popup101(msg);
			break;
		case 102:
			setSliderValue(msg);
			break;
		case 103:
			changeReplacementBox(msg);
			break;
		case 104:
			changeSliderImage(msg);
			break;
		case 105:
			//alterBlinky(msg);
			badSkoot(msg);
			break;
		case 106:
			addAction(msg);
			break;
		case 107:
			removeAction(msg);
			break;
		case 108:
			updateRechargeTimer(msg);
			break;
		case 109:
			updateExits(msg);
			break;
		case 110:
			setMapImage(msg);
			break;
		case 111:
			switchMapMode(msg);
			break;
		case 112:
			switchPortalImage(msg);
			break;
		case 113:
			openerWin('https://www.skotos.net/user/login.php?timeout=1&timeout_from=http%3a%2f%2fgrendelsrevenge%2eskotos%2enet%2fmonsters_login%2f');
			break;
		case 114:
			popup114(msg);
			break;
		case 115:
			popup115(msg);
			break;
		case 116:
			popup116(msg);
			break;
		default:
			badSkoot(num, msg);
		}
	}
	function setSliderValue(msg) {
		msg = msg.split(' ');
		var name = unescape(msg[0]);
		var value = unescape(msg[1]);
		if (name==="favors") {
			var targetHundreds = Math.floor(Number(value) / 100);
			var targetOnes = Number(value) - (targetHundreds * 100);
			var holderHundreds = document.getElementById("hundred_favors");
			var holderOnes = document.getElementById("single_favors");
			var currentHundreds = holderHundreds.childNodes.length;
			var currentOnes = holderOnes.childNodes.length;
			console.log([targetOnes, currentOnes, holderOnes]);
			while (targetOnes > holderOnes.childNodes.length) {
				addComponent("", holderOnes, "onefavor");
			}
			while (targetOnes < holderOnes.childNodes.length) {
				holderOnes.removeChild(holderOnes.childNodes[0]);
			}
			while (targetHundreds > holderHundreds.childNodes.length) {
				addComponent("", holderHundreds, "hundredfavors");
			}
			while (targetHundreds < holderHundreds.childNodes.length) {
				holderHundreds.removeChild(holderHundreds.childNodes[0]);
			}
			console.log(targetOnes, holderOnes.childNodes.length, targetHundreds,  holderHundreds.childNodes.length);
			var totalElements = targetOnes + targetHundreds;
			if (totalElements) {
				var incrment, offset;
				var span = 80;
				if (totalElements > 5) {
					var increment = span / (totalElements-1);
					var offset = 0;
				} else {
					increment = 20;
					offset = span - (increment * (totalElements-1));
				}
				for (var i=1; i<=targetOnes; i++) {
					holderOnes.children[targetOnes - i].style.top = offset + "px";
					offset += increment;
				}
				for (var i=1; i<=targetHundreds; i++) {
					holderHundreds.children[targetHundreds - i].style.top = offset + "px";
					offset += increment;
				}
			}
		}
		console.log("slider name: " + name);
		var obj = document.getElementById("fill_" + name);
		if (obj) {
			if (name==="roundtime") {
				obj.style.transitionDuration = "0s";
				//console.log(obj.style.transitionDuration);
				obj.style.height = "0px";
				value = (Number(value)+1) + "s";
				//console.log(value);
				rechargeTarget = value;
				setTimeout(rechargeGoUp, 10);
				//obj.style.transitionDuration = rechargeTarget;
				//obj.style.height = "75px";
				//console.log("initial height: "+obj.style.height);
			} else {
				obj.style.height = (Math.min(100,Math.max(0,value))*0.75) + "px";
			}
		} else {
			badSkoot("Unknown slider: " + msg);
		}
	}
	var rechargeTarget;
	function rechargeGoUp() {
		var obj = document.getElementById("fill_roundtime");
		obj.style.transitionDuration = rechargeTarget;
		obj.style.height = "75px";
		console.log("delayed height: "+obj.style.height);
	}
	function showStatusBar(str) {
		var arr = (str.split(","));
		var filler = document.getElementById('fill_'+arr[0].toLowerCase());
		if (filler) {
			filler.style.height = (2+min(100,max(0,arr[1]))*0.75) + "px";
		}
	}
	function changeReplacementBox(msg) {
		msg = msg.split(' ');
		var name = unescape(msg[0]).split(' ')[0];
		var value = unescape(msg[1]);
		var obj = document.getElementById("amt_" + name);
		var shrink = (name==="favor_text" && value > 999);
		if (obj) {
			if (value.indexOf("<font size='-3'><u>") !== -1) {
				value = value.split(">");
				value = [value[2].split("<")[0], value[4].split("<")[0]];
				shrink = value[1]>9999;
				value = "<div style='text-decoration:underline;'>" + value[0] + "</div>" + value[1];
			}
			if (name == "health_text" || name == "favor_point_text" || name == "favor_text") {
				obj.style.fontSize = (shrink?"x-":"") + "small";
			}
			obj.innerHTML = value;
		} else {
			badSkoot("Unknown replacement box: " + msg);
		}
	}
	function changeSliderImage(msg) {
		msg = msg.split(' ');
		var name = unescape(msg[0]);
		var value = unescape(msg[1]);
		var obj = document.getElementById("fill_" + name);
		if (obj) {
			if (value == "/images/redbar.png") {
				obj.className = "stat_bar_fill";
			} else if (value == "/images/greenbar.png") {
				obj.className = "stat_bar_fill un";
				obj.style.backgroundColor = "green";
			} else if (value == "/images/bluebar.png") {
				obj.className = "stat_bar_fill";
			} else if (value == "/images/goldbar.png") {
				obj.className = "stat_bar_fill";
			} else {
				badSkoot("Unknown image: " + msg);
			}
		} else {
			badSkoot("Unknown slider: " + msg);
		}
	}
	var ability_icons = [];
	function addAction(msg) {
		var action, image;
		msg = msg.split(' ');
		var action = unescape(msg[0]);
		var image = unescape(msg[1]);
		var tooltip_name = (msg.length > 2) ? unescape(msg[2]) : "";
		var help_node    = (msg.length > 3) ? unescape(msg[3]) : "";
		//Make sure we don't already have it.
		for (i=0;i<ability_icons.length; i++) {
			if (ability_icons[i] && ability_icons[i].id == "ability_icon_"+action)
				return;
		}
		var icon = addComponent("ability_icon_"+action, "ability_container", "ability_icon", clickHelp, help_node, false, tooltip_name);
		icon.style.backgroundImage = "url('//grendelsrevenge.skotos.net"+image+"')";
		ability_icons.push(icon);
		var overlay = addComponent("ability_overlay_"+action, "ability_icon_"+action, "ability_overlay");
		overlay.addEventListener("transitionend", function(event) {
			overlay.style.transitionDuration = "0s";
			overlay.style.height = "0px";
		}, false);
	}
	function removeAction(msg) {
		var action, spot, node;
		var action = unescape(msg);
		var newlist = [];
		for (i=0;i<ability_icons.length;i++) {
			icon = ability_icons[i];
			if (icon && icon.name == "ability_icon_"+action) {
				var child = icon.firstChild();
				while(child) {
					icon.removeChild(child);
					child = icon.firstChild();
				}
				icon.remove();
			} else if (icon) {
				newlist.push(icon);
			}
		}
		ability_icons = newlist;
	}
	function clickHelp(e) {
		console.log(e);
		console.log(this);
		console.log(this.dataset.clickargs);
		popupHelp('http://grendelsrevenge.skotos.net:2080/bin/help?node=' + this.dataset.clickargs, 'ability_info', 700, 500);
		//do stuff, show help
	}
	var rechargeAbility;
	var rechargeAmount;
	function updateRechargeTimer(msg) {
		msg = msg.split(' ');
		var action = unescape(msg[0]);
		var duration = unescape(msg[1]);
		var obj = document.getElementById("ability_overlay_"+action);
		if (obj) {
			obj.style.transitionDuration = "0s";
			obj.style.height = "100%";
			rechargeAbility = obj;
			rechargeAmount = duration;
			setTimeout(doRecharge, 10);
		}
		//for (i = 0; i <= 10; i++) {
		//	if ((ability_mask_list[i] == 1) && (ability_object_list[i].name == action)) {
		//		obj = ability_object_list[i];
		//		break;
		//	}
		//}
		if (obj) {
			//obj.startRecharge(duration);
		}
	}
	function doRecharge() {
		rechargeAbility.style.transitionDuration = rechargeAmount + "s";
		rechargeAbility.style.height = "0px";
	}
	function updateExits(msg) {
		msg = msg.split(' ');
		var direction = unescape(msg[0]);
		var state = unescape(msg[1]);
		var node = document.getElementById("comp_"+direction);
		if (node && (state == '1')) {
			node.style.backgroundImage = 'url(//grendelsrevenge.skotos.net/images/compass/grn_' + direction + '.gif)';
		} else {
			node.style.backgroundImage = 'url(//grendelsrevenge.skotos.net/images/compass/red_' + direction + '.gif)';
		}
	}
	function compassArrow(direction) {
		sendUI('go ' + direction);
	}
	function setMapImage(msg) {
		msg = msg.split(' ');
		document.getElementById("map"+msg[0]).style.backgroundImage = "url('//grendelsrevenge.skotos.net"+unescape(msg[1])+"')";
	}
	function switchMapMode(msg) {
		var mapbox = document.getElementById("map_box");
		if (msg==1) {
			//TODO:Add arial map overlay.
			mapbox.className = "msize4";
		} else {
			//TODO:Remove arial map overlay.
			mapbox.className = "msize3";
		}
	}
	function switchPortalImage(msg) {
		msg = msg.split(' ');
		var exit_pos = unescape(msg[0]);
		var image = unescape(msg[1]);
		var node = document.getElementById("exit"+exit_pos);
		if (image == '/images/portals/blank.png') {
			node.style.backgroundImage = 'none';
		} else {
			node.style.backgroundImage = 'url("//grendelsrevenge.skotos.net' + image + '")';
		}
	}
	function sendCommandNoEcho(msg) {
		doSend(msg, true);
	}
	//-----Old TEC stuff
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
			filler.style.height = Math.round(arr[1]*0.75) + "px";
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
			var i, x, y;
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
	
	//-----Weird GR Popups
		function do_open(filename, windowname, attrString) {
			filename = filename.split('&amp;');
			filename = filename.join('&');
			helpwin = window.open(unescape(filename), windowname, attrString);
			helpwin.focus();
		}
		function popupHelp(filename, windowname, remWinWdh, remWinHgt) {
			var scrLeft = parseInt((screen.width  / 2) - (remWinWdh / 2));
			var scrTop  = parseInt((screen.height / 2) - (remWinHgt / 2));
			var attrString = 'width=' + remWinWdh + ',height=' + remWinHgt + ',left=' + scrLeft + ',top=' + scrTop + 'hotkeys=yes,scrollbars=yes,resizable=yes,toolbar=yes';
			setTimeout('do_open("' + filename + '","' + windowname + '","' + attrString + '")', 1);
		}
		function popupLeaders(filename, windowname, remWinWdh, remWinHgt) {
			var scrLeft = parseInt((screen.width  / 2) - (remWinWdh / 2));
			var scrTop  = parseInt((screen.height / 2) - (remWinHgt / 2));
			var attrString = 'width=' + remWinWdh + ',height=' + remWinHgt + ',left=' + scrLeft + ',top=' + scrTop + 'hotkeys=yes,scrollbars=yes, resizable=yes,toolbar=yes';
			setTimeout('do_open("' + filename + '","' + windowname + '","' + attrString + '")', 1);
		}
		function popup100() {
			var filename, windowtitle, height, width;
			msg = msg.split(' ');
			filename = msg[0];
			if (msg.length > 1)
				windowtitle = msg[1];
			if (msg.length > 2)
				height = msg[2];
			else
				height = 400;
			if (msg.length > 3)
				width = msg[3];
			else
				width = 400;
			if (filename.substr(0, 7) != "http://") {
				filename = "http://grendelsrevenge.skotos.net" + filename;
			}
			popupWin(filename, windowtitle, width, height);
		}
		function unescapeSubs(str) {
				var tmp;
				var out = new Array();
				str = str.split('%26');
				for (var i = 0; i < str.length; i++) {
						tmp = str[i].split('=');
						out[(2 * i)] = unescape(tmp[0]);
						out[(2 * i) + 1] = unescape(tmp[1]);
				}
				return out;
		}
		function popup101(msg) {
			var filename, windowtitle, height, width;
			msg = msg.split(' ');
			filename = msg[0];
			if (msg.length > 1)
				windowtitle = msg[1];
			if (msg.length > 2)
				height = msg[2];
			else
				height = 400;
			if (msg.length > 3)
				width = msg[3];
			else
				width = 400;
			var text_subs;
			if (msg.length > 4) {
				text_subs = unescapeSubs(msg[4]);
				message_list[windowtitle] = text_subs;
			}
			if (msg.length > 5)
				var image_subs = unescapeSubs(msg[5]);
			for (i = 0; i < text_subs.length; i++) {
				var arr = (/filter\: progid\:DXImageTransform.Microsoft.AlphaImageLoader\( src='([^']+)'\)/i).exec(text_subs[i]);
				if (arr) {
					text_subs[i] = RegExp.leftContext + "background-image: url(" + arr[1] + "); background-repeat: no-repeat" + RegExp.rightContext;
				}
			}
			if (filename.substr(0, 7) != "http://") {
				if (filename == "/screens/spend_favor.html" || filename == "/screens/spend_karma.html" || filename == "/screens/reincarnate.html") {
					filename = "/monsters_login/Zealotry" + filename;
				} else {
					//filename = "http://grendelsrevenge.skotos.net" + filename;
					filename = "" + filename;
				}
			}
			popupWin(filename, windowtitle, width, height);
		}
		function handle_114_msg(msg) {
			var filename, windowtitle, height, width;
			msg = msg.split(' ');
			filename = msg[0];
			if (msg.length > 1)
				windowtitle = msg[1];
			if (msg.length > 2)
				height = msg[2];
			else
				height = 400;
			if (msg.length > 3)
				width = msg[3];
			else
				width = 400;
			var text_subs;
			if (msg.length > 4) {
				text_subs = unescapeSubs(msg[4]);
				message_list[windowtitle] = text_subs;
			}
			if (msg.length > 5)
				var image_subs = unescapeSubs(msg[5]);
			popupWinWithStatus(filename, windowtitle, width, height);
		}
		function handle_115_msg(msg) {
			var filename, windowtitle, height, width;
			msg = msg.split(' ');
			filename = msg[0];
			if (msg.length > 1)
				windowtitle = msg[1];
			if (msg.length > 2)
				height = msg[2];
			else
				height = 400;
			if (msg.length > 3)
				width = msg[3];
			else
				width = 400;
			var text_subs;
			if (msg.length > 4) {
				text_subs = unescapeSubs(msg[4]);
				message_list[windowtitle] = text_subs;
			}
			if (msg.length > 5)
				var image_subs = unescapeSubs(msg[5]);
			popupScrollWin(filename, windowtitle, width, height);
		}
		function handle_116_msg(msg) {
			var filename, windowtitle, height, width;
			msg = msg.split(' ');
			filename = msg[0];
			if (msg.length > 1)
				windowtitle = msg[1];
			if (msg.length > 2)
				height = msg[2];
			else
				height = 400;
			if (msg.length > 3)
				width = msg[3];
			else
				width = 400;
			var text_subs;
			if (msg.length > 4) {
				text_subs = unescapeSubs(msg[4]);
				message_list[windowtitle] = text_subs;
			}
			if (msg.length > 5)
				var image_subs = unescapeSubs(msg[5]);
			popupScrollWinWithStatus(filename, windowtitle, width, height);
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
	var ability_box_list = new Array();
	var ability_mask_list = new Array();
	var ability_object_list = new Array();
	var message_list = new Array();
	var serverCode = "GR";