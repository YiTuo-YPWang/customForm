function drag(o) {
	var formItem = {
		textfield: '<div class="form-group" draggable="true" data-attribute="textfield"><div class="cell-title"><span class="form-label">单行</span></div><div class="cell-body"><input class="form-span" type="text" placeholder="请输入" disabled/></div><span style="display: none;">false</span></div>',
		multiline: '<div class="form-group" draggable="true" data-attribute="multiline"> <div class="cell-title" style="vertical-align: top;"> <span class="form-label">多行</label> </div> <div class="cell-body"> <textarea class="form-span" rows="3" style="width: 80%;">请输入</textarea> </div> <span style="display: none;">false</span> </div>',
		numberfield: '<div class="form-group" draggable="true" data-attribute="numberfield"> <div class="cell-title"> <span class="form-label" style="padding-right: 0px;">数字</span><span style="padding-right: 10px;"></span> </div> <div  class="cell-body"> <input class="form-span" type="number" placeholder="请输入" disabled/> </div> <span style="display: none;">false</span> </div>',
		imgfield: '<div class="form-group" draggable="true" data-attribute="imgfield"> <div class="cell-title"> <span class="form-label">图片</span> </div> <div class="cell-body"> <img src="img/cp_img_tj.png" style="width: 60px;height: 60px;"/> </div> <span style="display: none;">false</span> </div>',
		pfield: '<div class="form-group from-group-n" draggable="true" data-attribute="pfield"> <div> <p class="form-p">请输入说明文字</p> </div> <span style="display: none;">false</span> </div>',
		radiofield: '<div class="form-group" draggable="true" data-attribute="radiofield"> <div class="cell-title"> <span class="form-label">单选框</span> </div> <div class="cell-body"> <span class="item-ta"><input data-attribute="option0" type="radio" value="选项1" />选项1</span> <span class="item-ta"><input data-attribute="option1" type="radio" value="选项2" />选项2</span> <span class="item-ta"><input data-attribute="option2" type="radio" value="选项3" />选项3</span> </div> <span style="display: none;">false</span> </div>',
		checkfield: '<div class="form-group" draggable="true" data-attribute="checkfield"> <div class="cell-title"> <span class="form-label">多选框</span> </div> <div class="cell-body"> <span class="item-ta"><input data-attribute="option0" type="checkbox" value="选项1" />选项1</span> <span class="item-ta"><input data-attribute="option1" type="checkbox" value="选项2" />选项2</span> <span class="item-ta"><input data-attribute="option2" type="checkbox" value="选项3" />选项3</span> </div> <span style="display: none;">false</span> </div>',
		datafield: '<div class="form-group" draggable="true" data-attribute="datafield"> <div class="cell-title"> <span class="form-label">日期</span> </div> <div class="cell-body"> <input class="form-span" style="vertical-align: top;" type="text" placeholder="请选择" disabled/><span class="data-icon"><i class="icon-date">&#xe64d;</i></span><span></span> <span style="display: none;">yyyy-mm-dd hh:ii</span> </div> <span style="display: none;">false</span> </div>',
		moneyfield: '<div class="form-group" draggable="true" data-attribute="moneyfield"> <div class="cell-title"> <span class="form-label" style="padding-right: 0px;">金额（元）</span> </div> <div  class="cell-body"> <input class="form-span" type="number" placeholder="请输入" disabled/></div> <span style="display: none;">false</span> </div>',
		stufield: '<div class="form-group" draggable="true" data-attribute="stufield"> <div class="cell-title"> <span class="form-label">学生</span> </div> <div class="cell-body"> <input type="text" value="" disabled> <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span> <span style="display: none;">单选</span> </div> <span style="display: none;">false</span> </div>',
		teafield: '<div class="form-group" draggable="true" data-attribute="teafield"> <div class="cell-title"> <span class="form-label">教师</span> </div> <div class="cell-body"> <input type="text" value="" disabled> <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span> <span style="display: none;">单选</span> </div> <span style="display: none;">false</span> </div>',
		selectfield: '<div class="form-group" draggable="true" data-attribute="selectfield"> <div> <span class="cell-title" style="line-height: 40px;">下拉框</span><select name="" class="io-select"></select> </div> <div style="display: none;"> <span class="item-ta"><input data-attribute="option0" type="checkbox" value="选项1" />选项1</span> <span class="item-ta"><input data-attribute="option1" type="checkbox" value="选项2" />选项2</span> <span class="item-ta"><input data-attribute="option2" type="checkbox" value="选项3" />选项3</span> </div> <span style="display: none;">false</span> </div>',
		filefield: '<div class="form-group" draggable="true" data-attribute="filefield"><div class="cell-title"> <span class="form-label">文件上传</span></div> <div class="cell-body"><a href="javascript:void(0)">上传附件</a></div> <span style="display: none;">false</span></div>'
	}
	var dragOptions = [];
	//默认参数，传入的参数o之后会与之合并
	var options = {
		dragArea: "dragArea",
		dropArea: "dropArea",
		onDropEnd: function(){}
	}
	//document.getElementById捕捉到的节点
	var target = {
		dragArea: null,
		dropArea: null,
	};
	var events={
		onDropEnd:null,
		
	};
	//后面用于判断鼠标移动的时候是把元素底部的边变蓝还是上部的边变蓝
	var deraction = {
		index: -1,
		deraction: 0,
		flag: -1,
	}

	//正在拖拽的元素
	var dragTarget;

	var empty = function(obj) {
		if(obj == undefined || obj == null || obj == "")
			return true;

		return false;
	}

	var exception = function(tip) {
		console.log("dragErr:" + tip);
		throw new Error(tip);
	}

	var getTarget = function(id) {
		var target = document.getElementById(id);
		if(empty(target))
			throw new Error("无法找到这个id")
		return target;
	}

	//  ========== 
	//  = 获取鼠标所在的坐标位置 = 
	//  ========== 
	var getPageLocation = function(event) {
		var e = event || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		var x = e.pageX || e.clientX + scrollX;
		var y = e.pageY || e.clientY + scrollY;
		return {
			'x': x,
			'y': y
		};
	}

	var insertAfter = function(newElement, targetElement) {
		var parent = targetElement.parentNode;
		if(parent.lastChild == targetElement) {
			// 如果最后的节点是目标元素，则直接添加。因为默认是最后
			parent.appendChild(newElement);
		} else {
			//如果不是，则插入在目标元素的下一个兄弟节点的前面。也就是目标元素的后面
			parent.insertBefore(newElement, targetElement.nextSibling);
		}
	}

	var insertBefore = function(newElement, targetElement) {
		targetElement.parentNode.insertBefore(newElement, targetElement)
	}

	//  ========== 
	//  = 将每个表单区的上下边界恢复成原样 = 
	//  ========== 
	var setBorderDefault = function() {
		if(target.dropArea.children.length > 0)
			for(var i = 0; i < target.dropArea.children.length; i++) {
				target.dropArea.children[i].style.borderTop = "";
				target.dropArea.children[i].style.borderBottom = "";
				target.dropArea.children[i].style.borderRight = "";
				target.dropArea.children[i].style.borderLeft = "";
			}
	}

	//  ========== 
	//  = 获取CSS = 
	//  ========== 
	var getCss = function(o, key) {
		return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
	}

	var preventDefault = function(e) {
		e.preventDefault();
	}

	///  ========== 
	//  = 将表单元素拖拽到右边删掉 = 
	//  ========== 
	var dragOut = function(e) {
		e.preventDefault();
		if(deraction.flag == 2) {
			dragTarget.parentNode.removeChild(dragTarget);
			setBorderDefault();
		}
		$('#rightForm').html('');
		changeItem(1);
	}

	//  ========== 
	//  = 开始拖动 = 
	//  ========== 
	var dragStart = function(e) {
		dragTarget = e.target;
		//区分拖拽的元素是要新增呢还是要交换位置，记录到flag上，1表示要新增，2表示交换位置
		if(dragTarget.parentNode.id == options.dragArea) {
			deraction.flag = 1;
		} else {
			deraction.flag = 2;
			target.dragArea.addEventListener("dragover", preventDefault);
		}
	}

	//  ========== 
	//  = 拖动经过 = 
	//  ========== 
	var dragOver = function(e) {
		e.preventDefault();
		var pageLocation = getPageLocation();
		var index = -1;
		//检测目前鼠标正落在哪个表单元素上面
		if(target.dropArea.children.length > 0) {
			for(var i = 0; i < target.dropArea.children.length; i++) {
				var pos = target.dropArea.children[i].getBoundingClientRect();
				if(pageLocation.y >= pos.bottom || pageLocation.x >= pos.right)
					continue;
				index = i;
				break;
			}
		} else {
			index = 0;
			deraction["deraction"] = 0;
			deraction["index"] = -1;
			deraction["flag"] = 1;
			return;
		}
		if(index != -1) {
			var pos = target.dropArea.children[index].getBoundingClientRect();
			setBorderDefault();
				//鼠标落在表单元素宽度中间以上的部分，则上边变蓝
//			if((pos.bottom + pos.top) / 2 > pageLocation.y) { //元素的上边变蓝
//				deraction["deraction"] = -1;
//				deraction["index"] = index;
//				target.dropArea.children[index].style.borderTop = "1px solid blue";
//			} else if ((pos.bottom + pos.top) / 2 < pageLocation.y) { //元素的下边变蓝			
//				deraction["deraction"] = 1;
//				deraction["index"] = index;
//				target.dropArea.children[index].style.borderBottom = "1px solid blue";
//			}
			if ((pos.left + pos.right) / 2 > pageLocation.x){
				deraction["deraction"] = -1;
				deraction["index"] = index;
				target.dropArea.children[index].style.borderLeft = "1px solid blue";
			} else if ((pos.left + pos.right) / 2 < pageLocation.x){
				deraction["deraction"] = 1;
				deraction["index"] = index;
				target.dropArea.children[index].style.borderRight = "1px solid blue";
			}		
		} else { //当前拖拽的是第一个表单元素		
			deraction["deraction"] = 0;
			deraction["index"] = -1;
		}
	}

	//  ========== 
	//  = 拖动结束 = 
	//  ========== 
	var dragEnd = function(e) {
		setBorderDefault();
		target.dragArea.removeEventListener("dragover", preventDefault);
	}
	function encodeHtml(str){
	    var encodedStr = "" ;
	    if (str=="") return encodedStr ;
	    else {
	        for (var i = 0 ; i < str.length ; i ++){
	            encodedStr += "&#" + str.substring(i, i + 1).charCodeAt().toString(10) + ";" ;
	        }
	    }
	    return encodedStr ;
	}
	//  ========== 
	//  = 放置 = 
	//  ========== 
	var drop = function(e) {
		e.preventDefault();
		if(deraction.index != -1) {
			var index = deraction.index;
			if(deraction.deraction > 0) {
				var node;			
				var nodeType = dragTarget.dataset.attribute;
				//flag为1，插入表单元素，否则就是换位置
				if(deraction.flag == 1) {
//					node = dragTarget.cloneNode(true);
					var nodeType = dragTarget.dataset.attribute;
					$('#tt').html(formItem[nodeType]);
					node = document.getElementById('tt').childNodes[0];
					node.addEventListener("dragstart", dragStart);
					node.addEventListener("dragend", dragEnd);
				} else {
					node = dragTarget
				}
				insertAfter(node, target.dropArea.children[index]);
			} else if(deraction.deraction < 0) {
				var node;
				var nodeType = dragTarget.dataset.attribute;
				if(deraction.flag == 1) {
//					node = dragTarget.cloneNode(true);
					var nodeType = dragTarget.dataset.attribute;
					$('#tt').html(formItem[nodeType]);
					node = document.getElementById('tt').childNodes[0];
					node.addEventListener("dragstart", dragStart);
					node.addEventListener("dragend", dragEnd);
				} else {
					node = dragTarget
				}
				insertBefore(node, target.dropArea.children[index]);
			}
			//target.dropArea=document.getElementById("dropArea");
		} else if(deraction.flag == 1){  //第一个插入的表单元素
//			var node = dragTarget.cloneNode(true);
			var nodeType = dragTarget.dataset.attribute;
			$('#tt').html(formItem[nodeType]);
			var node = document.getElementById('tt').childNodes[0];
			node.addEventListener("dragstart", dragStart);
			node.addEventListener("dragend", dragEnd);
//			target.dropArea.appendChild(node);
			$(target.dropArea).append(node);
		}
		
		events.onDropEnd.call(this, node)
		deraction.index = -1;
		//  setBorderDefault();
	}

	//  ========== 
	//  = 初始化 = 
	//  ========== 
	var init = function(arguments) {
		//extend(arguments)
		options = extend2(options,arguments)
		if(!empty(options.dragArea)) {
			target.dragArea = getTarget(options.dragArea);
			target.dragArea.addEventListener("drop", dragOut);
			if(target.dragArea.children.length > 0)
				for(var i = 0; i < target.dragArea.children.length; i++) {
					target.dragArea.children[i].setAttribute("draggable", "true");
					target.dragArea.children[i].addEventListener("dragstart", dragStart);
					target.dragArea.children[i].addEventListener("dragend", dragEnd);
				}
		} else {
			exception("请设置拖拽区域");
		}

		if(!empty(options.dropArea)) {
			target.dropArea = getTarget(options.dropArea);
			target.dropArea.addEventListener("drop", drop);
			target.dropArea.addEventListener("dragover", dragOver);
		} else {
			exception("请设置存取地址");
		}
		
		events.onDropEnd = options.onDropEnd;
	}

	//  ========== 
	//  = 合并参数 = 
	//  ========== 
	var extend = function(n) {
		for(var p in n)
			if(!options.hasOwnProperty(p) || (options.hasOwnProperty(p) && options[p] != n[p]))
				options[p] = n[p];
	}
	var extend2=function(destination,source){
	  for (var property in source) {
        destination[property] = source[property];
      }
      return destination;
		
	}
	//执行
	if(arguments.length > 0)
		arguments = arguments[0];

	init.call(this, arguments);

}