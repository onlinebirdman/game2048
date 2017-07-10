
window.onload=function(){
	var obtn = document.getElementsByTagName('button');
	for(var i=0;i<obtn.length;i++){
		obtn[i].onclick=function(){
			var container = document.getElementById('title_container');
			var gameOver = document.getElementById('game_over');
			container.innerHTML = '';
			gameOver.style.display='none';
			game.start();

		}
	}
	game.start()
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

window.addEventListener('touchstart',function(event){
	var e = event||window.event
	game.deltaX = e.touches[0].clientX;
	game.deltaY = e.touches[0].clientY;
});
window.addEventListener('touchend',function(event){
	var e = event||window.event;
	game.deltaX -= e.changedTouches[0].clientX;
	game.deltaY -= e.changedTouches[0].clientY;
	game.touch();
});
window.addEventListener('touchmove', function(event){
	var e = event||window.event;
	game.stopDefault(e);
},{passive:false}) 