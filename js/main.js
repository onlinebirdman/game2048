// var oGrid = document.getElementById('title_container');
// var gameArea = [0,0,0,0,//0~3
// 				0,0,0,0,//4~7
// 				0,0,0,0,//8~11
// 				0,0,0,0];//12~15
// createNum = function() {//随机生成数字2或4
// 	//判断第几个格子没数字,生成数组
// 	var arr=[];
// 	for(var j=0; j<gameArea.length;j++) {
// 		if(gameArea[j]==0){
// 			arr.push(j);
// 		}
// 	};
// 	if(arr.length!=0){
// 		//在数组里面随机选择一项
// 		var i = Math.floor(Math.random()*arr.length)
// 		//随机生成数字2或4,并更新状态表
// 		var numCell = document.createElement('div');
// 		var ranNum = Math.random()<0.5?true:false;
// 		numCell.className = ranNum?'n2 num_cell':'n4 num_cell';
// 		numCell.id = 'position-'+arr[i];
// 		numCell.innerHTML = ranNum?2:4;
// 		gameArea[arr[i]] = ranNum?2:4;
// 		//把生成的数字显示在对应格子里
// 		oGrid.appendChild(numCell);
// 	}else{
// 		alert('游戏失败')
// 	}
	
// }
// moveLeft = function(event) {
// 	var e = event||window.event;
// 	//获取有数字的格子，生成数组
// 		if(e.keyCode == 37) {//按下←键
// 		var gameAreaTemp=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
// 		var row[];	
// 		for(var i=0,k=0; i<4;i++){//第一行
// 			if(gameArea[i]!=0){//获取第一行数字
// 				row[k]=gameArea[i];
// 				k++;
// 			}
// 			if(row.length!=0){
// 				if(row.length==1) {

// 				}
// 				for(var j=0;j<row.length;j++){

// 				}
// 			}
// 		}
// 		for(var i=4,k=4; i<8;i++){//第一行
// 			if(gameArea[i]!=0){
// 				var oNum = document.getElementById('position-'+i);
// 				oNum.id=('position-'+k)
// 				gameAreaTemp[k]=gameArea[i];
// 				k++;
// 			}
// 		}
// 		for(var i=8,k=8; i<12;i++){//第一行
// 			if(gameArea[i]!=0){
// 				var oNum = document.getElementById('position-'+i);
// 				oNum.id=('position-'+k)
// 				gameAreaTemp[k]=gameArea[i];
// 				k++;
// 			}
// 		}
// 		for(var i=12,k=12; i<16;i++){//第一行
// 			if(gameArea[i]!=0){
// 				var oNum = document.getElementById('position-'+i);
// 				oNum.id=('position-'+k)
// 				gameAreaTemp[k]=gameArea[i];
// 				k++;
// 			}
// 		}
		
// 		gameArea=gameAreaTemp;
// 		// updataView();//根据状态表更新游戏视图
// 		createNum();//生成随机数	
// 	}
// }




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
window.onkeydown=function(e){
	var e = event||window.event;

	if(e.keyCode==37) {
		game.stopDefault();
		game.moveLeft();
	};
	if(e.keyCode==38) {
		game.stopDefault();
		game.moveUp();
	};
	if(e.keyCode==39) {
		game.stopDefault();
		game.moveRight();
	};
	if(e.keyCode==40) {
		game.stopDefault();
		game.moveDown();
	};

}