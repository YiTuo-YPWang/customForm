var labeltext, hinttext, unittext;
var area;
var obj = {};
var allDeploy = {};
// 配置项
var configure = {
	textfield: ['formTitle', 'formHint', 'formProv', 'formWidth'],
	multiline: ['formTitle', 'formProv'],
	numberfield: ['formTitle', 'formHint', 'formUnit', 'formProv', 'formWidth'],
	imgfield: ['formTitle', 'formProv'],
	pfield: ['formText', 'formShow', 'formWidth'],
	radiofield: ['formTitle', 'formOption', 'formProv', 'formWidth'],
	checkfield: ['formTitle', 'formOption', 'formProv', 'formWidth'],
	datafield: ['formTitle', 'formDatatype', 'formProv', 'formWidth'],
	moneyfield: ['formTitle', 'formHint', 'formProv', 'formWidth'],
	stufield: ['formTitle', 'formBox', 'formProv', 'formWidth'],
	teafield: ['formTitle', 'formBox', 'formProv', 'formWidth'],
	selectfield: ['formTitle', 'formOption', 'formProv', 'formWidth'],
	filefield: ['formTitle', 'formProv']
};
// 标题控件设置项
var formTitle = '<div class="wf-field">' +
	'<div class="fieldname">' +
	'标题 <span class="fieldinfo ">最多10字</span>' +
	'<div class="fieldblock">' +
	'	<input type="text" class="" value="" id="title" maxlength="10">' +
	'</div>' +
	'</div>' +
	'</div>';
allDeploy['formTitle'] = formTitle;
// 说明文字控件设置项
var formText = '<div class="wf-field">' +
	'<div class="fieldname">' +
	'说明文字 <span class="fieldinfo ">最多500字</span>' +
	'<div class="fieldblock">' +
	'	<textarea type="text" class="" value="" id="title" maxlength="500"></textarea>' +
	'</div>' +
	'</div>' +
	'</div>';
allDeploy['formText'] = formText;
// 提示文字控件设置项
var formHint = '<div class="wf-field">' +
	'<div class="fieldname">' +
	'	提示文字 <span class="fieldinfo ">最多20字</span>' +
	'	<div class="fieldblock">' +
	'	<input type="text" class="" value="" id="hint" maxlength="20">' +
	'	</div>' +
	'</div>' +
	'</div>';
allDeploy['formHint'] = formHint;
// 单位控件设置项
var formUnit = '<div class="wf-field">' +
	'<div class="fieldname">' +
	'	单位 <span class="fieldinfo ">最多20字</span>' +
	'	<div class="fieldblock">' +
	'	<input type="text" value="" id="unit" maxlength="20">' +
	'	</div>' +
	'</div>' +
	'</div>';
allDeploy['formUnit'] = formUnit;
// 验证控件设置项
var formProv = '<div class="wf-field">' +
	'<div class="fieldname">' +
	'	验证 ' +
	'	<div class="fieldblock">' +
	'	<input type="checkbox" value="" id="prov" style="vertical-align: middle;" onclick="Isrequired()"><span>（必填）</span>' +
	'	</div>' +
	'</div>' +
	'</div>';
allDeploy['formProv'] = formProv;
// 是否显示控件设置项
var formShow = '<div class="wf-field">' +
	'<div class="fieldname">' +
	'	显示 ' +
	'	<div class="fieldblock">' +
	'	<input type="checkbox" value="" id="prov" style="vertical-align: middle;" onclick="Isrequired()"><span>是否显示</span>' +
	'	</div>' +
	'</div>' +
	'</div>';
allDeploy['formShow'] = formShow;
// 日期类型控件设置项
var formDatatype = '<div class="wf-field">' +
	'<div class="fieldname">' +
	'日期类型 ' +
	'<div class="fieldblock">' +
	'  <input type="radio" name="chtype" value="yyyy-mm-dd hh:ii" onclick="changeDataType(this)">年-月-日  时:分 </br>' +
	'  <input type="radio" name="chtype" value="yyyy-mm-dd" onclick="changeDataType(this)">年-月-日' +
	'</div>' +
	'</div>' +
	'</div>';
allDeploy['formDatatype'] = formDatatype;
// 日期类型控件设置项
var formBox = '<div class="wf-field">' +
	'<div class="fieldname">' +
	'日期类型 ' +
	'<div class="fieldblock">' +
	'  <input type="radio" name="chtype" value="单选" onclick="changeDataType(this)">单选 </br>' +
	'  <input type="radio" name="chtype" value="多选" onclick="changeDataType(this)">多选' +
	'</div>' +
	'</div>' +
	'</div>';
allDeploy['formBox'] = formBox;
var formWidth = '<div class="wf-field">' +
	'<div class="fieldname">字段宽度 ' +
	'<div class="fieldblock"> ' +
	'<select name="" class="option" onchange="getWidth()" id="selectwidth">' +
	'	<option value="1" select>跨三列</option>' +
	'	<option value="2">跨两列</option>' +
	'	<option value="3">跨一列</option>' +
	'</select>' +
	'</div>' +
	'</div>' +
	'</div>';
allDeploy['formWidth'] = formWidth;

function getCols(){
	var val = $('#formcols').val();
	var item = $('#dropArea').children();
	if(val == '1') {
		allDeploy['formWidth'] = '';
		$('#dropArea>div').attr('style', 'width: 100%');
		$('#dropArea>div').addClass('colspan1');
		$('#dropArea>div').removeClass('colspan2');
		$('#dropArea>div').removeClass('colspan3');
	} else if(val == '2') {
		allDeploy['formWidth'] = '<div class="wf-field">' +
			'<div class="fieldname">字段宽度 ' +
			'<div class="fieldblock"> ' +
			'<select name="" class="option" onchange="getWidth()" id="selectwidth">' +
			'	<option value="1" select>跨两列</option>' +
			'	<option value="2">跨一列</option>' +
			'</select>' +
			'</div>' +
			'</div>' +
			'</div>';
		for (var i = 0; i < item.length; i++) {
			var width = item[i].style.width;
			if (width == '100%' || width == '66.7%') {
				item[i].style.width = '100%';
			} else if (width == '33.3%') {
				item[i].style.width = '50%';
			}
		}
		$('#dropArea>div').addClass('colspan2');
		$('#dropArea>div').removeClass('colspan1');
		$('#dropArea>div').removeClass('colspan3');
	} else if (val == '3') {
		allDeploy['formWidth'] = formWidth;
		for (var i = 0; i < item.length; i++) {
			var width = item[i].style.width;
			if (width == '100%') {
				item[i].style.width = '100%';
			} else if (width == '50%') {
				item[i].style.width = '33.3%';
			}
		}
		$('#dropArea>div').addClass('colspan3');
		$('#dropArea>div').removeClass('colspan2');
		$('#dropArea>div').removeClass('colspan1');
	}
}
function choose(self) {	
	area = self;
	changeItem(0);
	if (sessionStorage.getItem('bordercolor') != null) {
		var color = sessionStorage.getItem('bordercolor');
		$('#dropArea>div').css('border-width', '1px');
		$('#dropArea>div').css('border-style', 'solid');
		$('#dropArea>div').css('border-color', color);
	}
	var type = self.dataset.attribute;	
	change(self, configure[type]);	
}

function showError(val) {
	$('#errormessage').html(val);
	$('#error').show();
	$('#error').delay(3000).hide(0);
}

// 动态添加控件设置项
var change = function(self, deploy) {	
	var type = self.dataset.attribute;
	var div = '';
	for(var i = 0; i < deploy.length; i++) {
		var a = deploy[i];
		if(a == 'formOption') {
			var option = [];
			var b = self.children[1].children;
			for(var k = 0; k < b.length; k++) {
				var o = {
					text: b[k].children[0].value,
					id: b[k].children[0].dataset.attribute
				};
				option.push(o);
			}
			div += '<div class="wf-field">' +
				'<div class="fieldname">' +
				'选项 <span class="fieldinfo ">最多10字</span>';
			for(var j = 0; j < option.length; j++) {
				var val = option[j].text;
				var id = option[j].id;
				div += '<div class="fieldblock">' +
					'<input type="text" class="" value="' + val + '" id="' + id + '" maxlength="10">' +
					'<a href="javascript:void(0)" onclick="del(this)" class="actiondb">删除</a> <a href="javascript:void(0)" onclick="add(this, \'' + type + '\')" class="actiondb">添加</a>' +
					'</div>';
			}
			div += '<a href="javascript:void(0)" onclick="showoperate()">批量编辑</a>' +
				'</div>' +
				'</div>';
		} else {
			div += allDeploy[a];
		}
	}
	$('#rightForm').html(div);
	if(type === 'pfield' || type === 'filefield') {
		labeltext = self.children[0].children[0].innerText;
		$('#title').val(labeltext);
	} else if(type === 'datafield' || type === 'stufield' || type === 'teafield') {
		labeltext = self.children[0].children[0].innerText;
		hinttext = self.children[1].children[2].innerText;
		if(hinttext == document.getElementsByName('chtype')[0].value) {
			document.getElementsByName('chtype')[0].checked = true;
		} else {
			document.getElementsByName('chtype')[1].checked = true;
		}
		$('#title').val(labeltext);
	} else if(type === 'numberfield') {
		labeltext = self.children[0].children[0].innerText;
		hinttext = self.children[1].children[0].getAttribute('placeholder');;
		unittext = self.children[0].children[1].innerText;
		$('#title').val(labeltext);
		$('#hint').val(hinttext);
		if(unittext != '') {
			$('#unit').val(unittext.split('(')[1].split(')')[0]);
		}
	} else {
		labeltext = self.children[0].children[0].innerText;
		hinttext = self.children[1].children[0].getAttribute('placeholder');
		$('#title').val(labeltext);
		$('#hint').val(hinttext);
	}
	var checked = self.lastElementChild.innerText;
	if(checked == 'true') {
		document.getElementById('prov').checked = true;
	}
	if(type != 'multiline' && type != 'filefield' && type != 'imgfield') {
		var width = self.style.width;
		var val = $('#formcols').val();
		if (val == '3') {
			if(width == '66.7%') {
				$("#selectwidth").find("option[value = '2']").attr("selected", "selected");
			} else if(width == '33.3%') {
				$("#selectwidth").find("option[value = '3']").attr("selected", "selected");
			} else {
				$("#selectwidth").find("option[value = '1']").attr("selected", "selected");
			}
		} else if (val == '2'){
			if(width == '50%') {
				$("#selectwidth").find("option[value = '2']").attr("selected", "selected");
			} else {
				$("#selectwidth").find("option[value = '1']").attr("selected", "selected");
			}
		}
	}
}

function getWidth() {
	var widthId = $('#selectwidth').val();
	var val = $('#formcols').val();
	if (val == '3') {
		if(widthId == '1') {
			area.style.width = '100%';
		} else if(widthId == '2') {
			area.style.width = '66.7%';
		} else if(widthId == '3') {
			area.style.width = '33.3%';
		}
	} else if (val == '2'){
		if(widthId == '1') {
			area.style.width = '100%';
		} else if(widthId == '2') {
			area.style.width = '50%';
		}
	} else if (val == '1') {
		area.style.width = '100%';
	}
	
}

//删除选项
function del(self) {
	var p = self.parentNode.children[0].id;
	var index = p.slice(6, p.length);
	var option = [];
	var a = area.children[1].children;
	if(a.length === 1) {
		showError('至少需要一个选项')
	} else {
		for(var i = 0; i < a.length; i++) {
			if(p === a[i].children[0].dataset.attribute) {
				area.children[1].removeChild(area.children[1].children[i]);
			}
		}
		self.parentNode.parentNode.removeChild(self.parentNode);
	}
}
//添加选项
function add(self, type) {
	var bindex, bid;
	if(sessionStorage.getItem('index') == null) {
		bindex = 3;
		sessionStorage.setItem('index', bindex);
		bid = bindex + 1;
	} else {
		bindex = parseInt(sessionStorage.getItem('index'));
		bid = bindex + 1;
	}
	var op = '<div class="fieldblock">' +
		'<input type="text" class="" value="选项' + bid + '" id="option' + bindex + '" maxlength="10">' +
		'<a href="javascript:void(0)" onclick="del(this)" class="actiondb">删除</a> <a href="javascript:void(0)" onclick="add(this, \'' + type + '\')" class="actiondb">添加</a>' +
		'</div>';
	$(op).insertAfter(self.parentNode);
	var span;
	if(type == 'radiofield') {
		span = '<span class="item-ta"><input data-attribute="option' + bindex + '" type="radio" value="选项' + bid + '">选项' + bid + '</input></span>';
	} else {
		span = '<span class="item-ta"><input data-attribute="option' + bindex + '" type="checkbox" value="选项' + bid + '">选项' + bid + '</input></span>';
	}
	var idx = self.parentNode.children[0].id;
	var ch = area.children[1].children;
	var findidx;
	for(var i = 0; i < ch.length; i++) {
		if(idx === ch[i].children[0].dataset.attribute) {
			findidx = i;
			break;
		}
	}
	$(span).insertAfter(area.children[1].children[findidx]);
	bindex++;
	sessionStorage.setItem('index', bindex);
}

//切换控件设置与表单设置
function changeItem(idx) {
	$('#tabbar').children().removeClass('active');	
	getCols();
	if(idx === 0) {		
		$("#tabbar a:first-child").addClass('active');
		$('#rightForm').show();
		$('#formSet').hide();
		var type = area.dataset.attribute;
		change(area, configure[type]);
	} else {
		$("#tabbar a:last-child").addClass('active');
		$('#rightForm').hide();
		$('#formSet').show();
	}
}
// 选择时间格式
function changeDataType(self) {
	obj.dataType = self.value;
}
// 是否选中必填
function Isrequired() {
	obj.required = document.getElementById('prov').checked;
	if(area.lastElementChild.innerText == 'false' && area.dataset.attribute != 'pfield') {
		$(area.children[0].children[1]).remove();
	} else if(area.lastElementChild.innerText == 'true' && area.dataset.attribute != 'pfield') {
		var span = '<span style="color: red;">*</span>';
		$(span).insertAfter(area.children[0].children[0]);
	}
}
// 添加表单分组
function addOption() {
	var name = $('#selectname').val();
	if(name == '') {
		showError('分组名称不能为空')
		return;
	}
	var option = '<option value="' + name + '">' + name + '</option>'
	$('#select').append(option);
	$('#addoption').hide();
	$('#selectname').val('');
}
// 显示选项批量编辑界面
function showoperate() {
	$('#operate').toggle();
	$('#textoption').html('');
	var option = [];
	var a = area.children[1].children;
	var htnl = '';
	for(var i = 0; i < a.length; i++) {
		var o = {
			text: a[i].children[0].value,
			id: a[i].children[0].dataset.attribute
		};
		htnl += o.text + '\n';
		option.push(o);
	}
	htnl = htnl.substr(0, htnl.length - 1);
	$('#textoption').val(htnl);
}
// 获取批量编辑的表单数据
function getOption() {
	var a = $('#textoption').val();
	var arr = [];
	if(a == '') {
		arr[0] = '';
	} else {
		arr = a.split('\n');
	}
	if(sessionStorage.getItem('index') == null) {
		sessionStorage.setItem('index', arr.length);
	}
	var type = area.dataset.attribute;
	area.children[1].innerHTML = '';
	for(var i = 0; i < arr.length; i++) {
		var span;
		if(type == 'radiofield') {
			span = '<span class="item-ta"><input data-attribute="option' + i + '" type="radio" value="' + arr[i] + '">' + arr[i] + '</input></span>';
		} else {
			span = '<span class="item-ta"><input data-attribute="option' + i + '" type="checkbox" value="' + arr[i] + '">' + arr[i] + '</input></span>';
		}
		area.children[1].innerHTML += span;
	}
	change(area, configure[type]);
	$('#operate').hide();
}