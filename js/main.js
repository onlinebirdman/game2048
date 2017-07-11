/*用于跨浏览器绑定事件的函数*/
addEvent = function(obj,etype,handler) {
	if(obj.addEventListener){
		obj.addEventListener(etype,handler,{passive:false})
	}else if(obj.attachEvent){
		obj.attachEvent('on'+etype,handler)
	};
}


window.onload=function(){	
	var obtn = document.getElementsByTagName('button');
	for(var i=0;i<obtn.length;i++){
		obtn[i].onclick=function(){
			game.start();
		}
	}
	game.start();
}
window.onkeydown=function(event){
	var e = event||window.event;
	if(e.keyCode==37) {
		game.stopDefault(e);
		game.moveLeft();
	};
	if(e.keyCode==38) {
		game.stopDefault(e);
		game.moveUp();
	};
	if(e.keyCode==39) {
		game.stopDefault(e);
		game.moveRight();
	};
	if(e.keyCode==40) {
		game.stopDefault(e);
		game.moveDown();
	};

}

addEvent(window,'touchstart',function(event){
	var e = event||window.event
	game.deltaX = e.touches[0].clientX;
	game.deltaY = e.touches[0].clientY;
})
addEvent(window,'touchend',function(event){
	var e = event||window.event;
	game.deltaX -= e.changedTouches[0].clientX;
	game.deltaY -= e.changedTouches[0].clientY;
	game.touch();
})
addEvent(window,'touchmove',function(event){
	var e = event||window.event;
	game.stopDefault(e);
})
