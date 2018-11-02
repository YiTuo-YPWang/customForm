var labeltext, hinttext, unittext;
var area;
var obj = {};
var allDeploy = {};
// 配置项
var configure = {
	textfield: ['formTitle', 'formHint', 'formProv'],
	multiline: ['formTitle', 'formHint', 'formProv'],
	numberfield: ['formTitle', 'formHint', 'formUnit', 'formProv'],
	imgfield: ['formTitle', 'formProv'],
	pfield: ['formText', 'formShow'],
	radiofield: ['formTitle', 'formHint', 'formOption', 'formProv'],
	checkfield: ['formTitle', 'formOption', 'formProv'],
	datafield: ['formTitle', 'formDatatype', 'formProv'],
	moneyfield: ['formTitle', 'formHint', 'formProv'],
	stufield: ['formTitle', 'formBox', 'formProv'],
	teafield: ['formTitle', 'formBox', 'formProv']
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
	'  <input type="radio" name="chtype" value="年-月-日  时:分" onclick="changeDataType(this)">年-月-日  时:分 </br>' +
	'  <input type="radio" name="chtype" value="年-月-日" onclick="changeDataType(this)">年-月-日' +
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
function choose(self) {
	changeItem(0);
	var type = self.dataset.attribute;
	change(self, configure[type]);
}

function showError(val){
	$('#errormessage').html(val);
	$('#error').show();
	$('#error').delay(3000).hide(0);
}

// 动态添加控件设置项
var change = function(self, deploy) {
	area = self;
	var type = self.dataset.attribute;
	var div = '';
	for(var i = 0; i < deploy.length; i++) {
		var a = deploy[i];
		if(a == 'formOption') {
			var option = [];
			var b = self.children[2].children;
			for(var k = 0; k < b.length; k++) {
				var o = {
					text: b[k].innerText,
					id: b[k].dataset.attribute
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
					'<a href="javascript:void(0)" onclick="del(this)" class="actiondb">删除</a> <a href="javascript:void(0)" onclick="add(this)" class="actiondb">添加</a>' +
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
	if(type === 'pfield') {
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
	} else if (type === 'numberfield'){
		labeltext = self.children[0].children[0].innerText;
		hinttext = self.children[1].children[0].innerText;
		unittext = self.children[0].children[1].innerText;
		$('#title').val(labeltext);
		$('#hint').val(hinttext);
		if (unittext != '') {
			$('#unit').val(unittext.split('(')[1].split(')')[0]);
		}		
	} else {
		labeltext = self.children[0].children[0].innerText;
		hinttext = self.children[1].children[0].innerText;
		$('#title').val(labeltext);
		$('#hint').val(hinttext);
	}
	var checked = self.lastElementChild.innerText;
	if (checked == 'true'){
		document.getElementById('prov').checked = true;
	}
	console.log(document.getElementById('prov').checked);
}

//删除选项
function del(self) {
	var p = self.parentNode.children[0].id;
	var index = p.slice(6, p.length);
	var option = [];
	var a = area.children[2].children;
	if (a.length === 1) {
		showError('至少需要一个选项')
	} else {
		for(var i = 0; i < a.length; i++) {
			if(p === a[i].dataset.attribute) {
				area.children[2].removeChild(area.children[2].children[i]);
			}
		}
		self.parentNode.parentNode.removeChild(self.parentNode);
	}	
}
//添加选项
function add(self) {
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
		'<a href="javascript:void(0)" onclick="del(this)" class="actiondb">删除</a> <a href="javascript:void(0)" onclick="add(this)" class="actiondb">添加</a>' +
		'</div>';
	$(op).insertAfter(self.parentNode);
	var span = '<span data-attribute="option' + bindex + '">选项' + bid + '</span>';
	var idx = self.parentNode.children[0].id;
	var ch = area.children[2].children;
	var findidx;
	for(var i = 0; i < ch.length; i++) {
		if(idx === ch[i].dataset.attribute) {
			findidx = i;
			break;
		}
	}
	$(span).insertAfter(area.children[2].children[findidx]);
	bindex++;
	sessionStorage.setItem('index', bindex);
}

//切换控件设置与表单设置
function changeItem(idx) {
	$('#tabbar').children().removeClass('active');
	if(idx === 0) {
		$("#tabbar a:first-child").addClass('active');
		$('#rightForm').show();
		$('#formSet').hide();
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
		$(area.children[1].children[1]).remove();
	} else if(area.lastElementChild.innerText == 'true' && area.dataset.attribute != 'pfield') {
		var span = '<span class="form-span">（必填）</span>';
		$(span).insertAfter(area.children[1].children[0]);
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
	var a = area.children[2].children;
	var htnl = '';
	for(var i = 0; i < a.length; i++) {
		var o = {
			text: a[i].innerText,
			id: a[i].dataset.attribute
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
	if (sessionStorage.getItem('index') == null) {
		sessionStorage.setItem('index', arr.length);
	}	
	area.children[2].innerHTML = '';
	for(var i = 0; i < arr.length; i++) {
		var span = '<span data-attribute="option' + i + '">' + arr[i] + '</span>';
		area.children[2].innerHTML += span;
	}
	var type = area.dataset.attribute;
	change(area, configure[type]);
	$('#operate').hide();
}