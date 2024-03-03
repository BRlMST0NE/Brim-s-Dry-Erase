// ==UserScript==
// @name         ᏼꭱꮖꮇꮪꭲσɴꭼ's Dry Erase
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  "Fixes" hit marker caching issues.
// @match        *://shellshock.io/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
String.prototype.replace_all = function(str, newstr) {
    return this.split(str).join(newstr);
};

window.XMLHttpRequest = class extends window.XMLHttpRequest {
	open( method, url ) {
		if ( url.indexOf( 'shellshock.js' ) > - 1 ) {
			this.isScript = true;
		}   return super.open( ...arguments );
	}
	get response() {
		if ( this.isScript ) {
			return super.response.replace_all(`if(0===this.container.visibility)`,`getStoredBool("hitMarkers",!0)?this.show():this.hide();if(0===this.container.visibility)`)
		}   return super.response;
	}
};
