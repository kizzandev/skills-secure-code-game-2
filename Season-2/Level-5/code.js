// Welcome to Secure Code Game Season-2/Level-5!

// This is the last level of this season, good luck!

var CryptoAPI = (function() {
	var encoding = {
		a2b: function(a) { },
		b2a: function(b) { }
	};

	var API = {
		sha1: {
			name: 'sha1',
			identifier: '2b0e03021a',
			size: 20,
			block: 64,
			hash: function(s) {
				// hack 1 is an object, therefore block that?
				if (typeof s !== "string") {
					throw "Error: only strings as input.";
				}

				var len = (s += '\x80').length,
					blocks = len >> 6,
					chunk = len & 63,
					res = "",
					i = 0,
					j = 0,
					H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0],
					// hack 3
					// HINT: The array "w" is initialised as an empty array on line 36, any opinions?
					// HACK: Array.prototype.__defineSetter__("0", function() { alert('Exploit 3'); }); CryptoAPI.sha1.hash("abc");
					// w = [0]; // this works? Ok.

					// From solution because I do not fully get it:
					w = [
						0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
					];
					
				while (chunk++ != 56) {
					s += "\x00";
					if (chunk == 64) {
						blocks++;
						chunk = 0;
					}
				}
				
				for (s += "\x00\x00\x00\x00", chunk = 3, len = 8 * (len - 1); chunk >= 0; chunk--) {
					s += encoding.b2a(len >> (8 * chunk) & 255);
				}
					
				for (i = 0; i < s.length; i++) {
					j = (j << 8) + encoding.a2b(s[i]);
					if ((i & 3) == 3) {
						w[(i >> 2) & 15] = j;
						j = 0;
					}
					if ((i & 63) == 63) CryptoAPI.sha1._round(H, w);
				}
				
				for (i = 0; i < H.length; i++)
					for (j = 3; j >= 0; j--)
						res += encoding.b2a(H[i] >> (8 * j) & 255);
				return res;
			}, // End "hash"
			_round: function(H, w) { }
		} // End "sha1"
	}; // End "API"

	// hack 2 is modifying the _round function
	// solution: make _round read-only
	Object.defineProperty(API.sha1, '_round', {
		writable: false
	})

	return API; // End body of anonymous function
})(); // End "CryptoAPI"