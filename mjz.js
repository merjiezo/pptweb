/*
 *Framework Created By merjiezo
 *Copyright 2016, 2016 MjFn Foundation, Inc.
 *Framework version: 0.1.0
 *Remind to the user: 
 *	1.only used in font, not in node.js
 *	2.Only one outside Interface:MjFn
 * Date: 2016-04-02 16:36
 */

var MjFn;

if (!MjFn) MjFn = { };

(function(doc, win, undefined) {

	//instantiate MjFn
	MjFn = function(selector) {
		return new _$(selector);
	}

	//the chooser
	function _$(selector) {

		//if there is ie7/8
		if (!doc.querySelectorAll) {
			doc.querySelectorAll = function (selectors) {
				var style = doc.createElement('style'), elements = [], element;
				doc.docElement.firstChild.appendChild(style);
				doc._qsa = [];

				style.styleSheet.cssText = selectors + '{x-qsa:expression(doc._qsa && doc._qsa.push(this))}';
				win.scrollBy(0, 0);
				style.parentNode.removeChild(style);

				while (doc._qsa.length) {
					element = doc._qsa.shift();
					element.style.removeAttribute('x-qsa');
					elements.push(element);
				}
				doc._qsa = null;
				return elements;
			};
		}

		//save HTML Doc
		this.els = [];
		
		//for the carousel programe
		this.time;

		//handle undefined/null/''
		if (!selector) return this;

		//handle cssSelector
		if (typeof selector === 'string') {
			var elements = doc.querySelectorAll(selector);
			for (var i = 0, len = elements.length; i < len; i++) {
				this.els.push(elements[i]);
			}
		} else {
			console.error('Error Input!  function name:: \'private _$\'');
		}

	}

	/*
	 *prototype**(return this) is very important;
	 *every method must add (return this) to have invocation chaining function;
	 */
	_$.prototype = {

		each: function(fn) {
			for (var i = 0, len = this.els.length; i < len; i++) {
				try {
					fn.call(this, this.els[i]);
				} catch(e) {
					this.debug('error102', 'each');
				}
			}
			return this;
		},

		//let els become the first element
		first: function() {
			if (this.els[0]) {
				this.els = [this.els[0]];
			}
			return this;
		},

		//let els become the last element
		end: function() {
			if (this.els[0]) {
				var length = this.els.length;
				this.els = [this.els[length - 1]];
			}
			return this;
		},

		//let els become the element you want
		num: function(num) {
			var length = this.els.length;
			if (num <= length) {
				this.els = [this.els[num - 1]];
				return this;
			} else {
				this.debug('error101', 'num');
			}
		},

		//let it become the children
		children: function(num) {
			var length = this.els.length;
			if (num <= length) {
				this.els = this.els[num-1].children;
				return this;
			} else {
				this.debug('error101', 'children');
			}
		},

		removeClass: function(val) {
			this.each(function(el) {
				var str = el.attributes.class.value.replace(/\s/g,' '),
					arr = str.split(' ');
				arr = this.arrChan.DeleteOne(arr, val);
				var classVal = arr.join(' ');
				el.className = classVal;
			});
			return this;
		},

		//can not handle the none class
		addClass: function(val) {
			val = val.replace(/\s/g, '');
			this.each(function(el) {
				var classVal = el.attributes.class.value + ' ' + val;
				el.className = classVal;
			});
			return this;
		},

		replaceClass: function(val) {
			if (typeof val === 'string') {
				val = val.replace(/\s/g,'');
				this.each(function(el) {
					el.className = val;
				});
			} else {
				this.debug('error103', 'replaceClass');
			}
			return this;
		},

		chanText: function(content) {
			this.each(function(el) {
				el.innerHTML = this.strChan.filterDanger(content);
			});
			return this;
		},

		addText: function(content) {
			this.each(function(el) {
				el.innerHTML += this.strChan.filterDanger(content);
			});
			return this;
		},

		//end of invocation chaining,remove this element(include childNode)
		remove: function() {
			this.each(function(el) {
				el.parentNode.removeChild(el);
			});
		},

		//end of invocation chaining
		getClass: function() {
			return this.els[0].className;
		},

		css: function(prop, val) {
			if (typeof prop === 'string') {
				(typeof val === 'string')?
				this.cssStyle(prop, val)
				:this.debug('error105', 'css');
			} else if (typeof prop === 'object') {
				this.cssGrop(prop);
			}
			return this;
		},

		//change css style
		cssStyle: function(prop, val) {
			if (typeof prop === 'string') {
				this.each(function(el) {
					el.style.hasOwnProperty(prop)?
					el.style[prop] = val
					:this.debug('error104', 'cssStyle,Wrong csstyle is '+prop);
				});
				return this;
			}
		},

		cssGrop: function(json) {
			this.each(function(el) {
				for (cssStyle in json) {
					if (json.hasOwnProperty(cssStyle)) {
						el.style.hasOwnProperty(cssStyle)?
						el.style[cssStyle] = json[cssStyle]
						:this.debug('error104', 'cssGrop,Wrong csstyle is '+cssStyle);
					}
				}
			});
			return this;
		},

		//define return the first W & H in an array
		ele_W_H: function(num) {
			var target = [];
			if (num) {
				(num <= this.els.length)?
				target = [this.els[num - 1].clientWidth, this.els[num - 1].clientHeight]
				:this.debug('Error101','ele_W_H')
				return target;
			} else {
				return [this.els[0].clientWidth, this.els[0].clientHeight];
			}
		},

		//return W & H of body in an array
		body_W_H: function() {
			return [doc.win.clientWidth, doc.win.clientHeight];
		},

		/*
		 *This is insert into HTML code,
		 *It can not protect xss, so do not use it to add content
		 *if you wanna insert content, place use addTest to add content.
		**/
		addHTML: function(str) {
			this.each(function(el) {
				el.innerHTML = str;
			});
			return this;
		},

		append: function(HTML) {
			this.each(function(el) {
				el.innerHTML += HTML;
			});
			return this;
		},

		clear: function() {
			this.each(function(el) {
				el.innerHTML = '';
			});
			return this;
		},

		hide: function() {
			this.each(function(el) {
				this.addAttr('hidden', 'hidden', el);
			});
			return this;
		},

		show: function() {
			this.each(function(el) {
				this.removeAttr('hidden', el);
			});
		},

		data: function(name, val) {
			this.each(function(el) {
				
			});
		},

		removeData: function(attr) {
			this.each(function(el) {
				removeAttr('data-'+attr, el);
			});
		},

		removeAttr: function(Attr, el) {
			if (el.hasAttribute(Attr)) {
				el.removeAttribute(Attr);
			}
		},

		addAttr: function(Attr, val, el) {
			el.setAttribute(Attr, val);
		},

		click: function(func) {
			this.each(function(el) {
				el.addEventListener('click', function(e){
					func.call(this, e);
				});
			});
		},

		Time: {

			timeUnix: new Date(),

			year: function() {
				return this.timeUnix.getFullYear();
			},

			month: function() {
				return this.timeUnix.getMonth();
			}, 
		
			date: function() {
				return this.timeUnix.getDate();
			}, 
		
			hour: function() {
				return this.timeUnix.getHours();
			}, 
		
			min: function() {
				return this.timeUnix.getMinutes();
			}, 
		
			seconds: function() {
				return this.timeUnix.getSeconds();
			}, 
		
			day: function() {
				return this.timeUnix.getDay();
			},

			DateFac: function() {
				var arrDay = [this.year(), this.month(), this.date()],
					time   = [this.hour(), this.min(), this.seconds()];
					for (var i = 0; i < 3; i++) {
						(arrDay[i] > 9)?
						arrDay[i] = String(arrDay[i])
						:arrDay[i] = '0'+arrDay[i];
						(time[i] > 9)?
						time[i] = String(time[i])
						:time[i] = '0'+time[i];
					}
				return [arrDay.join('-'),time.join(':')];
			},
		},

		//Operate Array
		arrChan: {
			DeleteOne: function(arr, val) {
				val = val.replace(/\s/g,'');
				var upArr = [];
				arr.map(function(elem) {
					(elem == val)?'':upArr.push(elem);
				});
				return upArr;
			},
		},

		//Operate String
		strChan: {
			DeleteFac: function(str, val) {
				str = str.replace(/\s/g,' ');
				val = val.replace(/\s/g,' ');
				var	arr = str.split(' '),
					upArr = [];
				arr.map(function(elem) {
					(elem == val)?'':upArr.push(elem);
				});
				return upArr.join(' ');
			},

			toObj: function() {
				
			},

			strLimitWords: function(str, num) {
				if (typeof str === 'string') {
					if (str.length <= num ) { return str; } else {
						str = str.substring(0, num)+'...';
						return str;
					}
				}
				console.error('Error: Wrong Type of the Data :: Correct string');
			},

			//filter < & > & / & ' & " 
			filterDanger: function(html) {
				var elem = doc.createElement('div');
				var txt = doc.createTextNode(html);
				elem.appendChild(txt);
				return elem.innerHTML;
			},

			returnfilter: function(str) {
			    var elem = document.createElement('div');
			    elem.innerHTML = str;
			    return elem.innerText || elem.textContent;
			},
		},

		obj: {
			toJSON: function(obj) {
				
			},

			//JSON TO Arr
			toArr: function(JSON, commas, join) {
				var arr = [];
				for (ele in JSON) {
					if (JSON.hasOwnProperty(ele)) {
						arr.push(commas+join+JSON[ele]);
					}
				}
				return arr;
			},
		},

		//ajax request factory
		ajax: function(URL, method, fn, data) {
			var request = this.data.xmlhttp();
			this.data.open(request, URL, method, data);
			this.data.AjaxCallback(request, fn);
			request = null;
		},

		data: {

			//new a ajax request,support IE5, IE6, IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp: function() {
				if (window.XMLHttpRequest) {
					return new XMLHttpRequest();
				} else {
					return new new ActiveXObject("Microsoft.XMLHTTP");
				}
			},

			//open and send data
			open: function(request, URL, method, data) {
				method = this.MSureGANDP(method);
				request.open(method, URL, true);
				if (method == 'POST') {
					data = this.JsontoStr(data);
					request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					request.send(data);
				} else {
					request.send();
				}
			},

			//return data and have function to execequte
			AjaxCallback: function(request, fn) {
				request.onreadystatechange = function() {
					if (request.readyState === 4) {
						if (request.status === 200) {
							fn.call(this, request.responseText);
						} else {
							fn.error.cell(this, request.status);
						}
					}
				}
			},

			//handle if there are post & get,and turn it to UpperCae
			MSureGANDP: function(method) {
				if (method.match(/^(get|post)$/i)) {
					return method.toUpperCase();
				} else {
					return false;
					console.error('Error Method, please use GET and POST');
				}
			},

			//JSON to str,only use in ajax request
			JsontoStr: function(data) {
				var reqData = '';
				if (typeof data === 'object') {
					for (ele in data) {
						if (data.hasOwnProperty(ele)) {
							reqData += '&'+ele+'='+data[ele];
						}
					}
					return reqData;
				} else {
					console.error('You must use object');
				}
			},

		},

		/**
	 	 *pagination function,defult is 7 page.
	 	 *@param jump to the URL address
	 	 *@param page location info come from back-end
	 	 *@param all the page!
	 	**/
		pagination: function(url, page, total) {
			var str = '';
			if (page == 1) {
				str += '<a href="#top" class="pag_fr_text" id="">上一页</a>'
			} else {
				str += '<a href="'+url+'/'+(page - 1)+'" class="pag_fr_text" id="">上一页</a>';
			}
			if (total > 7) {
				if (page < 4){
					for (var i = 1; i <= 7; i++) {
						(i == page)?
						str += '<a href="'+url+'/'+i+'" class="pag_fr pag_selected" id="">'+i+'</a>'
						:str += '<a href="'+url+'/'+i+'" class="pag_fr" id="">'+i+'</a>';
					}
				}
				if (total - page < 3) {
					for (var i = total - 6; i <= total; i++) {
						(i == page)?
						str += '<a href="'+url+'/'+i+'" class="pag_fr pag_selected" id="">'+i+'</a>'
						:str += '<a href="'+url+'/'+i+'" class="pag_fr" id="">'+i+'</a>';
					}
				}
				if (page >= 4 && total - page >= 3) {				
					for (var i = page - 3; i <= page + 3; i++) {
						(i == page)?
						str += '<a href="'+url+'/'+i+'" class="pag_fr pag_selected" id="">'+i+'</a>'
						:str += '<a href="'+url+'/'+i+'" class="pag_fr" id="">'+i+'</a>';
					}
				}
			} else {
				for (var i = 1; i <= total; i++) {
					(i == page)?
					str += '<a href="'+url+'/'+i+'" class="pag_fr pag_selected" id="">'+i+'</a>'
					:str += '<a href="'+url+'/'+i+'" class="pag_fr" id="">'+i+'</a>';
				}
			}
			if (page == total) {
				str += '<a href="#top" class="pag_fr_text" id="">下一页</a>';
			} else {
				str += '<a href="'+url+'/'+(page + 1)+'" class="pag_fr_text" id="">下一页</a>';
			}
			this.addHTML(str);
			return this;
		},

		//
		carouselParam: {
			nowPic: 1,
			allPic: 5,
			second: 5000,
		},


		carouselPic: function(allPic, sec) {
			this.carouselParam.nowPic = allPic;
			this.carouselParam.second = sec;
		},

		//if there is wrong
		debug: function(error, func) {
			console.error(this.debugHook[error]+ ' -> FRAMEWORK FUNCTION :: ' + func);
		},

		//the debug hook
		debugHook: {
			error100: 'UnKnown Type in the javascript, you must be god!',
			error101: 'Out of the document Num!',
			error102: 'Fail to operate document!',
			error103: 'Error: Wrong Type of the Data, type of data must be string',
			error104: 'UnKnown Style of css or this style not support in your browser',
			error105: 'Empty Value or undefined',
		},

		//all type
		typeHook: ['array', 'string', 'number', 'boolean', 'function', 'object', 'undefined', 'null'],

		//type test
		typeHandle: function(content, target) {
			var way = typeof content;
			if (way === target) {
				return true;
			} else {
				console.log('Wrong type');
			}
		},
	}

})(document, window);
