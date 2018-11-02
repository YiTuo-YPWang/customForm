var index;
// 数据双向绑定
Object.defineProperty(obj, 'title', {
	configurable: true,
	set: function(newVal) {
		if(newVal === undefined) {
			newVal = labeltext;
		}
		area.children[0].children[0].innerText = newVal;
	}
});
Object.defineProperty(obj, 'formname', {
	configurable: true,
	set: function(newVal) {
		if(newVal === undefined) {
			return ;
		}
		$('#formTitle').html(newVal);
	}
});
Object.defineProperty(obj, 'unit', {
	configurable: true,
	set: function(newVal) {
		if(newVal === undefined) {
			newVal = unittext;
		}
		if(newVal == '') {
			area.children[0].children[1].innerText = '';
		} else {
			area.children[0].children[1].innerText = '(' + newVal + ')';
		}
	}
});
Object.defineProperty(obj, 'hint', {
	configurable: true,
	set: function(newVal) {
		if(newVal === undefined) {
			newVal = hinttext;
		}
		area.children[1].children[0].setAttribute('placeholder', newVal);
//		area.children[1].children[0].innerText = newVal;
	}
});
Object.defineProperty(obj, 'val', {
	configurable: true,
	set: function(newVal) {
		if(newVal === undefined) {
			newVal = hinttext;
		}
		var list = area.children[2].children;
		var opid = 'option' + index;
		for(var i = 0; i < list.length; i++) {
			var a = list[i];
			if(a.dataset.attribute == opid) {
				a.innerText = newVal;
			}
		}
	}
});
Object.defineProperty(obj, 'dataType', {
	configurable: true,
	set: function(newVal) {
		if(newVal === undefined) {
			newVal = hinttext;
		}
		area.children[1].children[2].innerText = newVal;
	}
});
Object.defineProperty(obj, 'required', {
	configurable: true,
	set: function(newVal) {
		if(newVal === undefined) {
			newVal = hinttext;
		}
		area.lastElementChild.innerText = newVal;
	}
});
// 监听键盘输入时触发的事件
document.addEventListener('keyup', function(e) {
	var id;
	if(!!window.ActiveXObject || "ActiveXObject" in window) { // ie浏览器获取id
		id = e.target.id;
	} else {
		id = e.path[0].id;
	}
	var q = id.slice(0, 6);
	var h = id.slice(6, id.length);
	if(id === 'title') {
		obj.title = e.target.value;
	} else if(id === 'hint') {
		obj.hint = e.target.value;
	} else if(q === 'option') {
		index = h;
		obj.val = e.target.value;
	} else if(id === 'unit') {
		obj.unit = e.target.value;
	} else if(id === 'formname') {
		obj.formname = e.target.value;
	}
});
