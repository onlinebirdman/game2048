var game = {
	gameArea:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
	score:0,
	bestscore:0,
	deltaX:0,
	deltaY:0,
	start:function(){
		var score = document.getElementById('score');
		score.innerHTML=this.score;
		for(var row=0;row<4;row++){
			for(var col=0;col<4;col++){
				this.gameArea[row][col]=0
			}
		}
		this.createNum();
		this.createNum();
	},
	createNum:function(){//在空白处随机生成数字2或4
		var oGrid = document.getElementById('title_container');
		do{
			var row = Math.floor(Math.random()*4)
			var col = Math.floor(Math.random()*4)
			if(this.gameArea[row][col]==0){
				var numCell = document.createElement('div');
				var ranNum = Math.random()<0.5?true:false;
				numCell.className = ranNum?'n2 num_cell':'n4 num_cell';
				numCell.id = 'position-'+row+'-'+col;
				numCell.innerHTML = ranNum?2:4;
				this.gameArea[row][col]=parseInt(numCell.innerHTML);
				oGrid.appendChild(numCell);
				break;
			}
		}while(true);
		this.isOver()
	},
	canMoveLeft:function(){//判断是否可以左移
		for(var row=0;row<4;row++){
			for(var col=1;col<4;col++){
				if(this.gameArea[row][col]!=0) {
					if(this.gameArea[row][col-1]==0 || this.gameArea[row][col]==this.gameArea[row][col-1]){
						return true;
					}
				}
			}
		}
		return false;
	},
	moveLeft:function(){//逐行左移
		if(this.canMoveLeft()){
			for(var row=0; row<4;row++){
				for(var col=0; col<3;col++){
					var nextCol = this.getNextCol(row,col);
					if(nextCol==-1){
						break;
					}else{
						if(this.gameArea[row][col]==0){
							this.gameArea[row][col]=this.gameArea[row][nextCol];
							this.moveNum(row,nextCol,row,col);
							this.gameArea[row][nextCol]=0;
							col--;
						}else if(this.gameArea[row][col]==this.gameArea[row][nextCol]){
							this.gameArea[row][col]*=2;
							this.moveNum(row,nextCol,row,col);
							this.createDbl(row,col,this.gameArea[row][col]);
							this.gameArea[row][nextCol]=0;
						}
					}
				}
			};
			this.isOk();
			this.createNum();
		}	
	},
	getNextCol:function(row,col){
		for(var i=col+1;i<4;i++){
			if(this.gameArea[row][i]!=0){
				return i;
			}
		};
		return -1;
	},

	canMoveRight:function(){//判断是否可以右移
		for(var row=0;row<4;row++){
			for(var col=2;col>=0;col--){
				if(this.gameArea[row][col]!=0) {
					if(this.gameArea[row][col+1]==0 || this.gameArea[row][col]==this.gameArea[row][col+1]){
						return true;
					}
				}
			}
		}
		return false;
	},
	moveRight:function(){//逐行右移
		if(this.canMoveRight()){
			for(var row=0; row<4;row++){
				for(var col=3; col>=0;col--){
					var preCol = this.getPreCol(row,col);
					if(preCol==-1){
						break;
					}else{
						if(this.gameArea[row][col]==0){
							this.gameArea[row][col]=this.gameArea[row][preCol];
							this.moveNum(row,preCol,row,col);
							this.gameArea[row][preCol]=0;
							col++;
						}else if(this.gameArea[row][col]==this.gameArea[row][preCol]){
							this.gameArea[row][col]*=2;
							this.moveNum(row,preCol,row,col);
							this.createDbl(row,col,this.gameArea[row][col]);
							this.gameArea[row][preCol]=0;
						}
					}
				}
			};
			this.isOk();
			this.createNum();
		}	
	},
	getPreCol:function(row,col){
		for(var i=col-1;i>=0;i--){
			if(this.gameArea[row][i]!=0){
				return i;
			}
		};
		return -1;
	},

	canMoveDown:function(){//判断是否可以下移
		for(var col=0;col<4;col++){
			for(var row=2;row>=0;row--){
				if(this.gameArea[row][col]!=0) {
					if(this.gameArea[row+1][col]==0 || this.gameArea[row][col]==this.gameArea[row+1][col]){
						return true;
					}
				}
			}
		}
		return false;
	},
	moveDown:function(){//逐行下移
		if(this.canMoveDown()){
			for(var col=0; col<4;col++){
				for(var row=3; row>=0;row--){
					var preRow = this.getPreRow(row,col);
					if(preRow==-1){
						break;
					}else{
						if(this.gameArea[row][col]==0){
							this.gameArea[row][col]=this.gameArea[preRow][col];
							this.moveNum(preRow,col,row,col);
							this.gameArea[preRow][col]=0;
							row++;
						}else if(this.gameArea[row][col]==this.gameArea[preRow][col]){
							this.gameArea[row][col]*=2;
							this.moveNum(preRow,col,row,col);
							this.createDbl(row,col,this.gameArea[row][col]);
							this.gameArea[preRow][col]=0;
						}
					}
				}
			};
			this.isOk();
			this.createNum();
		}	
	},
	getPreRow:function(row,col){
		for(var i=row-1;i>=0;i--){
			if(this.gameArea[i][col]!=0){
				return i;
			}
		};
		return -1;
	},

	canMoveUp:function(){//判断是否可以上移
		for(var col=0;col<4;col++){
			for(var row=1;row<4;row++){
				if(this.gameArea[row][col]!=0) {
					if(this.gameArea[row-1][col]==0 || this.gameArea[row][col]==this.gameArea[row-1][col]){
						return true;
					}
				}
			}
		}
		return false;
	},
	moveUp:function(){//逐行上移
		if(this.canMoveUp()){
			for(var col=0; col<4;col++){
				for(var row=0; row<3;row++){
					var nextRow = this.getNextRow(row,col);
					if(nextRow==-1){
						break;
					}else{
						if(this.gameArea[row][col]==0){
							this.gameArea[row][col]=this.gameArea[nextRow][col];
							this.moveNum(nextRow,col,row,col);
							this.gameArea[nextRow][col]=0;
							row--;
						}else if(this.gameArea[row][col]==this.gameArea[nextRow][col]){
							this.gameArea[row][col]*=2;
							this.moveNum(nextRow,col,row,col);
							this.createDbl(row,col,this.gameArea[row][col]);
							this.gameArea[nextRow][col]=0;
						}
					}
				}
			};
			this.isOk();
			this.createNum();
		}	
	},
	getNextRow:function(row,col){
		for(var i=row+1;i<4;i++){
			if(this.gameArea[i][col]!=0){
				return i;
			}
		};
		return -1;
	},

	moveNum:function(rowfrom,colfrom,rowto,colto){
		var idFrom = 'position-'+rowfrom+'-'+colfrom;
		var idTo = 'position-'+rowto+'-'+colto;
		var numToMove = document.getElementById(idFrom);
		numToMove.id = idTo;
	},
	createDbl:function(row,col,num){
		this.removeNum(row,col);
		this.removeNum(row,col);
		this.gameArea[row][col]=num;
		var score = document.getElementById('score');
		var container = document.getElementById('title_container');
		var newNum = document.createElement('div');
		newNum.id='position-'+row+'-'+col;
		newNum.className='num_cell n'+num;
		newNum.innerHTML=num;
		container.appendChild(newNum);
		this.score+=num;
		score.innerHTML=this.score;
	},
	removeNum:function(row,col){
		var container = document.getElementById('title_container');
		var numToRemove = document.getElementById('position-'+row+'-'+col);
		container.removeChild(numToRemove);
	},
	isOk:function(){
		for(var row=0; row<4;row++){
			for(var col=0; col<4;col++){
				if(this.gameArea[row][col]==2048){
					return alert("恭喜你！")
				}
			}
		};
	},
	isOver:function(){
		if(!this.canMoveLeft()&&!this.canMoveRight()&&!this.canMoveUp()&&!this.canMoveDown()){
			var gameOver = document.getElementById('game_over');
			var best = document.getElementById('bestscore');
			gameOver.style.display='block';
			if(this.score>this.bestscore){
				this.bestscore=this.score;
				best.innerHTML=this.bestscore;
			}
			this.score=0;
		}else{
			return false;
		}
	},
	stopDefault: function(e){
		if(e && e.preventDefault){
			e.preventDefault()
		}else{
			window.e.returnValue = false;
		}
	},
	touch:function(){
		var absX = Math.abs(this.deltaX);
		var absY = Math.abs(this.deltaY);
		if(absX>absY){
			if(this.deltaX>0){
				this.moveLeft();
			}else if(this.deltaX<0){
				this.moveRight();
			}
		}else if(absX<absY){
			if(this.deltaY<0){
				this.moveDown();
			}else if(this.deltaY>0){
				this.moveUp();
			}
		}
	}
}
