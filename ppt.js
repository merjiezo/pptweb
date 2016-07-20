/*
 * Framework Created By merjiezo
 * Copyright 2016, 2016 MjFn Foundation, Inc.
 * Framework version: 0.1.0
 * Remind to the user: 
 *	1.only used in font, not in node.js
 * Date: 2016-05-02 10:51
 *
 * the js of the WEB PPT 
 * 
 */
MjFn('.PPTpage').click(function() {
	pptWeb.next();
});

function ppt(num, nowPic) {
	this.num    = num;
	this.nowPic = nowPic;
}
/*
 * this is the ppt prototype
 * prototype have several method to control
 * the page change position
 */
ppt.prototype = {

	getNum: function() {
		return this.num;
	},

	getNowPic: function() {
		return this.NowPic;
	},

	addWord: function() {
		MjFn('.center_block > h1').num(this.nowPic-1).removeClass('rightPo');
		MjFn('.center_block > p').num(this.nowPic-1).removeClass('rightPo');
		MjFn('.center_block > h1').num(this.nowPic).addClass('rightPo');
		MjFn('.center_block > p').num(this.nowPic).addClass('rightPo');
	},

	beforeWord: function() {
		MjFn('.center_block > h1').num(this.nowPic+1).removeClass('rightPo');
		MjFn('.center_block > p').num(this.nowPic+1).removeClass('rightPo');
		MjFn('.center_block > h1').num(this.nowPic).addClass('rightPo');
		MjFn('.center_block > p').num(this.nowPic).addClass('rightPo');
	},

	BefAnimToCont: function() {
		MjFn('.center_block').children(this.nowPic-1).removeClass('rightPo');
		MjFn('.center_block').children(this.nowPic).addClass('rightPo');
	},

	AftAnimToCont: function() {
		MjFn('.center_block').children(this.nowPic+1).removeClass('rightPo');
		MjFn('.center_block').children(this.nowPic).addClass('rightPo');
	},


	//just move
	before: function() {
		if (!(this.nowPic == 1)) {
			this.nowPic -= 1;
			var now = 100 - this.nowPic*100;
			document.getElementById('move').style['left'] = now + '%';
			this.beforeWord();
		}
	},

	next: function() {
		if (!(this.nowPic == this.num)) {
			this.nowPic += 1;
			var now = 100 - this.nowPic*100;
			document.getElementById('move').style['left'] = now + '%';
			this.addWord();
		}
	},


	//scale animation
	beforeScal: function() {
		if (!(this.nowPic == 1)) {
			this.nowPic -= 1;
			var now = 100 - this.nowPic*100;
			MjFn('.circle').addClass('scaleChange');
			document.getElementById('move').style['left'] = now + '%';
			setTimeout(function() {
				MjFn('.circle').removeClass('scaleChange');
			}, 1400);
			this.AftAnimToCont();
		}
	},

	nextScal: function() {
		if (!(this.nowPic == this.num)) {
			this.nowPic += 1;
			var now = 100 - this.nowPic*100;
			MjFn('.circle').addClass('scaleChange');
			document.getElementById('move').style['left'] = now + '%';
			setTimeout(function() {
				MjFn('.circle').removeClass('scaleChange');
			}, 1400);
			this.BefAnimToCont();
		}
	},

	change: function() {

	},
}
