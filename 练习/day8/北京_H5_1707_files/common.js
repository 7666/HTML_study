var FAIL = -1;
var SUCCESS = 1;

//提示
function prompt(sta, msg){
	alert(msg);
}

//滚动条事件
window.onscroll = function(){
	var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
	var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
	var clientH = document.documentElement.clientHeight || document.body.clientHeight
	//console.log(scrollT +"+"+scrollH+"+"+clientH);
	if(scrollT == scrollH - clientH){
//		console.log("到底部了");
		for(var i in scrollBottom){
			scrollBottom[i]();
		}
	}else if(scrollT == 0){
//		console.log("到顶部了");
		for(var i in scrollTop){
			scrollTop[i]();
		}
	}
}

scrollTop = new Array();
scrollBottom = new Array();

//注册滚动条回调
function addScrollCallBack(callback,isTop){
	if(isTop){
		scrollTop.push(callback);
	}else{
		scrollBottom.push(callback);
	}
}


//打印
function log(msg){
	console.log(msg);
}