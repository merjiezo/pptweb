document.addEventListener('keydown', function(e) {
	if (e.keyIdentifier == 'Left' || e.keyIdentifier == 'Up') {
		pptWeb.before();
	}
	if (e.keyIdentifier == 'Right' || e.keyIdentifier == 'Down') {
		pptWeb.next();
	}
});

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

	change: function() {

	},
}
