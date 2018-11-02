// 获取表单JSON数据
function getValue() {
	var formfield = $('#dropArea').serializeObject();
	for(var i = 0; i < formfield.length; i++) {
		var item = formfield[i];
		if(item.label == '') {
			showError('请输入标题');
			return;
		}
		var arrRslt = makePy(item.label);
		var py = arrRslt[0];
		for(var j = 0; j < formfield.length; j++) {
			if(py == formfield[j].labelpy) {
				var val = formfield[j].labelpy.replace(/[^0-9]/ig, "");
				var letter = formfield[j].labelpy.replace(/[^a-z]+/ig, "");
				if(val != '') {
					var a = parseInt(val);
					a++;
					py = letter + a;
				} else {
					py += 1;
				}
			}
		}
		item.labelpy = py;
	}
	if(formfield.length == 0) {
		showError('空表单不允许保存');
		return;
	} else if($('#formname').val() == '') {
		showError('请输入表单名称');
		return;
	} else if($('#select').val() == '请选择') {
		showError('请选择表单分组');
		return;
	}
	var form = {
		formName: $('#formname').val(),
		formIllustrate: $('#formillustrate').val(),
		formGroup: $('#select').val()
	};
	form.option = formfield;
	console.log(form);
}
// 序列化表单
$.fn.serializeObject = function() {
	var o = [];
	var a = this.children();
	for(var i = 0; i < a.length; i++) {
		var option = [];
		var type = a[i].dataset.attribute;
		var obj = {};
		if(type === 'pfield') {
			var content = a[i].children[0].children[0].innerText;
			obj = {
				type: 'label',
				label: '说明',
				content: content
			};
		} else if(type === 'textfield' || type === 'multiline' || type === 'numberfield' || type == 'moneyfield') {
			var label = a[i].children[0].children[0].innerText;
			var hint = a[i].children[1].children[0].innerText;
			if(type === 'textfield') {
				obj = {
					type: 'text',
					label: label,
					hint: hint
				};
			} else if(type === 'multiline') {
				obj = {
					type: 'multiline',
					label: label,
					hint: hint
				};
			} else if(type === 'numberfield') {
				var unit = a[i].children[0].children[1].innerText;
				obj = {
					type: 'number',
					label: label,
					hint: hint,
					unit: unit
				};
			} else if(type === 'moneyfield') {
				obj = {
					type: 'money',
					label: label.split('(')[0],
					hint: hint
				};
			}
		} else if(type === 'imgfield') {
			var label = a[i].children[0].children[0].innerText;
			obj = {
				type: 'img',
				label: label
			};
		} else if(type === 'radiofield' || type === 'checkfield') {
			var label = a[i].children[0].children[0].innerText;
			var hint = a[i].children[1].children[0].innerText;
			var b = a[i].children[2].children;
			for(var j = 0; j < b.length; j++) {
				option.push(b[j].innerText);
			}
			if(type === 'radiofield') {
				obj = {
					type: 'radio',
					label: label,
					hint: hint,
					options: option
				};
			} else {
				obj = {
					type: 'checkbox',
					label: label,
					hint: hint,
					options: option
				};
			}
		} else if(type === 'datafield' || type === 'stufield' || type === 'teafield') {
			var label = a[i].children[0].children[0].innerText;
			var hint = a[i].children[1].children[2].innerText;
			if (type === 'datafield') {
				obj = {
					type: 'data',
					label: label,
					datatype: hint
				};
			} else if (type === 'stufield') {
				obj = {
					type: 'stu',
					label: label,
					datatype: hint
				};
			} else if (type === 'teafield'){
				obj = {
					type: 'tea',
					label: label,
					datatype: hint
				};
			}
			
		}
		var isrequired = a[i].lastElementChild.innerText;
		obj.Isrequired = isrequired;
		o.push(obj);
	}
	return o;
}