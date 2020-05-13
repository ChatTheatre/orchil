"use strict";
var profiles = {
	"tectesttunnel": {
		"method":   "websocket",
		"protocol": "ws",
		"server":   "tectest.skotos.net",
		"port":      8867,
		"path":     "/orchil/",
		"extra":    "tec"
	},
	"tectest": {
		"method":   "websocket",
		"protocol": "ws",
		"server":   "tectest.skotos.net",
		"port":      7707,
		"path":     "/orchil/foobar",
		"extra":    "tec"
	},
	"grtunnel": {
		"method":   "websocket",
		"protocol": "ws",
		"server":   "gr.skotos.net",
		"port":      2080,
		"path":     "/orchil/",
		"extra":    "gr"
	},
	"popcornajax": {
		"method":   "ajax",
		"protocol": "https",
		"server":   "192.168.1.67",
		"port":      443,
		"path":     "/orchil/server.php",
		"rate":     1,
		"extra":    "gr"
	},
	"portal_tectest":{
		"method":   "websocket",
		"protocol": "ws",
		"server":   "skotos.net",
		"port":      8080,
		"path":     "/tectest",
		"extra":    "tec",
		"reports":  true,
		"chars":    false
	},
	"portal_tec":{
		"method":   "websocket",
		"protocol": "ws",
		"server":   "skotos.net",
		"port":      8080,
		"path":     "/tec",
		"extra":    "tec",
		"reports":  true,
		"chars":    false
	},
	"portal_marrach":{
		"method":   "websocket",
		"protocol": "ws",
		"server":   "skotos.net",
		"port":      8080,
		"woe_port":  8084,
		"path":     "/marrach",
		"extra":    "marrach",
		"reports":   false,
		"chars":     true,
		"prompt":   "> "
	},
	"portal_grendelsrevenge":{
		"method":   "websocket",
		"protocol": "ws",
		"server":   "skotos.net",
		"port":      8080,
		"path":     "/grendel",
		"extra":    "gr",
		"reports":  false,
		"chars":    false
	},
	"portal_lovecraft":{
		"method":   "websocket",
		"protocol": "ws",
		"server":   "skotos.net",
		"port":      8080,
		"woe_port":  8082,
		"path":     "/lovecraft",
		"extra":    "lcabn",
		"reports":  false,
		"chars":    true
	},
	"portal_ironclaw":{
		"method":   "websocket",
		"protocol": "ws",
		"server":   "skotos.net",
		"port":      8080,
		"woe_port":  8083,
		"path":     "/ironclaw",
		"extra":    "ironclaw",
		"reports":  false,
		"chars":    true,
	},	
    "portal_allegory":{
		"method":   "websocket",
		"protocol": "ws",
		"server":   "skotos.net",
		"port":      8080,
		"woe_port":  8083,
		"path":     "/ironclaw",
		"extra":    "ironclaw",
		"reports":  false,
		"chars":    true,
	},
	"portal_lazarus":{
	"method":   "websocket",
		"protocol": "ws",
		"server":   "multirev.net",
		"port":      8080,
		"woe_port":  8081,
		"path":     "/lazarus",
		"extra":    "game",
		"reports":   false,
		"chars":     true
	}
};
