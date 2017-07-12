// index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    gameArea: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    hidden:'none',
    score:0,
    bestscore:0,
    deltaX:0,
    deltaY:0,
    success:'none',
    endless:false
  },
  touchstart:function(event){
    this.data.deltaX = event.touches[0].pageX;
    this.data.deltaY = event.touches[0].pageY;
  },
  touchend:function(event){
    this.data.deltaX -= event.changedTouches[0].pageX;
    this.data.deltaY -= event.changedTouches[0].pageY;
    var absX = Math.abs(this.data.deltaX);
    var absY = Math.abs(this.data.deltaY);
    if (absX > absY) {
      if (this.data.deltaX < 0) {
        this.moveRight();
      } else if (this.data.deltaX > 0) {
        this.moveLeft();
      }
    } else if (absX < absY) {
      if (this.data.deltaY < 0) {
        this.moveDown();
      } else if (this.data.deltaY > 0) {
        this.moveUp();
      }
    }
  },
  start:function(){
    this.initialize();
    this.createNum();
    this.createNum();
  },
  initialize:function(){
    this.setData({
      gameArea: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      hidden:'none',
      endless:false,
      bestscore:wx.getStorageSync('bestscore2048')||0,
      score:0
    })
  },
  createNum:function(){
    do{
      var row = Math.floor(Math.random() * 4)
      var col = Math.floor(Math.random() * 4)
      if (this.data.gameArea[row][col] == 0) {
        var ranNum = Math.random() < 0.5 ? 2 : 4;
        this.data.gameArea[row][col] = ranNum;
        break;
      }
    }while(true);
    this.setData({
      gameArea:this.data.gameArea
    })
    this.isOver();
  },
  isOver:function(){
      if(!this.canLeft()&&!this.canRight()&&!this.canUp()&&!this.canDown()){
        this.setData({
          hidden:'block'
        })
        wx.setStorageSync('bestscore2048',this.data.bestscore )
      }
  },
  canLeft:function(){
    for (var row = 0; row < 4; row++) {
      for (var col = 1; col < 4; col++) {
        if (this.data.gameArea[row][col] != 0) {
          if (this.data.gameArea[row][col - 1] == 0 || this.data.gameArea[row][col] == this.data.gameArea[row][col - 1]){
            return true;
          }
        }
      }
    }
    return false;
  },
  canRight: function () {//判断是否可以右移
    for (var row = 0; row < 4; row++) {
      for (var col = 2; col >= 0; col--) {
        if (this.data.gameArea[row][col] != 0) {
          if (this.data.gameArea[row][col + 1] == 0 || this.data.gameArea[row][col] == this.data.gameArea[row][col + 1]) {
            return true;
          }
        }
      }
    }
    return false;
  },
  canDown: function () {//判断是否可以下移
    for (var col = 0; col < 4; col++) {
      for (var row = 2; row >= 0; row--) {
        if (this.data.gameArea[row][col] != 0) {
          if (this.data.gameArea[row + 1][col] == 0 || this.data.gameArea[row][col] == this.data.gameArea[row + 1][col]) {
            return true;
          }
        }
      }
    }
    return false;
  },
  canUp: function () {//判断是否可以上移
    for (var col = 0; col < 4; col++) {
      for (var row = 1; row < 4; row++) {
        if (this.data.gameArea[row][col] != 0) {
          if (this.data.gameArea[row - 1][col] == 0 || this.data.gameArea[row][col] == this.data.gameArea[row - 1][col]) {
            return true;
          }
        }
      }
    }
    return false;
  },
  moveLeft:function(){
    var gameArea = this.data.gameArea;
    if (this.canLeft()) {
      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 3; col++) {
          var nextCol = this.getNextCol(row, col);
          if (nextCol == -1) {
            break;
          } else {
            if (gameArea[row][col] == 0) {
              gameArea[row][col] = gameArea[row][nextCol];
              gameArea[row][nextCol] = 0;
              col--;
            } else if (gameArea[row][col] == gameArea[row][nextCol]) {
              gameArea[row][col] *= 2;
              this.data.score += this.data.gameArea[row][col];
              this.updataScore();
              gameArea[row][nextCol] = 0;
            }
          }
        }
      };
      this.data.gameArea = gameArea;
      if (!this.data.endless) {
        this.isOk();
      } else {
        wx.setStorageSync('bestscore2048', this.data.bestscore)
      }
      this.createNum();
    }
  },
  getNextCol: function (row, col) {
    for (var i = col + 1; i < 4; i++) {
      if (this.data.gameArea[row][i] != 0) {
        return i;
      }
    };
    return -1;
  },
  moveRight: function () {//逐行右移
    if (this.canRight()) {
      for (var row = 0; row < 4; row++) {
        for (var col = 3; col >= 0; col--) {
          var preCol = this.getPreCol(row, col);
          if (preCol == -1) {
            break;
          } else {
            if (this.data.gameArea[row][col] == 0) {
              this.data.gameArea[row][col] = this.data.gameArea[row][preCol];
              this.data.gameArea[row][preCol] = 0;
              col++;
            } else if (this.data.gameArea[row][col] == this.data.gameArea[row][preCol]) {
              this.data.gameArea[row][col] *= 2;
              this.data.score += this.data.gameArea[row][col];
              this.updataScore();
              this.data.gameArea[row][preCol] = 0;
            }
          }
        }
      };
      if (!this.data.endless) {
        this.isOk();
      } else {
        wx.setStorageSync('bestscore2048', this.data.bestscore)
      }
      this.createNum();
    }
  },
  getPreCol: function (row, col) {
    for (var i = col - 1; i >= 0; i--) {
      if (this.data.gameArea[row][i] != 0) {
        return i;
      }
    };
    return -1;
  },
  moveUp: function () {//逐行上移
    if (this.canUp()) {
      for (var col = 0; col < 4; col++) {
        for (var row = 0; row < 3; row++) {
          var nextRow = this.getNextRow(row, col);
          if (nextRow == -1) {
            break;
          } else {
            if (this.data.gameArea[row][col] == 0) {
              this.data.gameArea[row][col] = this.data.gameArea[nextRow][col];
              this.data.gameArea[nextRow][col] = 0;
              row--;
            } else if (this.data.gameArea[row][col] == this.data.gameArea[nextRow][col]) {
              this.data.gameArea[row][col] *= 2;
              this.data.score += this.data.gameArea[row][col];
              this.updataScore();
              this.data.gameArea[nextRow][col] = 0;
            }
          }
        }
      };
      if (!this.data.endless) {
        this.isOk();
      } else {
        wx.setStorageSync('bestscore2048', this.data.bestscore)
      }
      this.createNum();
    }
  },
  getNextRow: function (row, col) {
    for (var i = row + 1; i < 4; i++) {
      if (this.data.gameArea[i][col] != 0) {
        return i;
      }
    };
    return -1;
  },
  moveDown: function () {//逐行下移
    if (this.canDown()) {
      for (var col = 0; col < 4; col++) {
        for (var row = 3; row >= 0; row--) {
          var preRow = this.getPreRow(row, col);
          if (preRow == -1) {
            break;
          } else {
            if (this.data.gameArea[row][col] == 0) {
              this.data.gameArea[row][col] = this.data.gameArea[preRow][col];
              this.data.gameArea[preRow][col] = 0;
              row++;
            } else if (this.data.gameArea[row][col] == this.data.gameArea[preRow][col]) {
              this.data.gameArea[row][col] *= 2;
              this.data.score += this.data.gameArea[row][col];
              this.updataScore();
              this.data.gameArea[preRow][col] = 0;
            }
          }
        }
      };
      if(!this.data.endless){
        this.isOk();
      }else{
        wx.setStorageSync('bestscore2048', this.data.bestscore)
      }
      this.createNum();
    }
  },
  getPreRow: function (row, col) {
    for (var i = row - 1; i >= 0; i--) {
      if (this.data.gameArea[i][col] != 0) {
        return i;
      }
    };
    return -1;
  },
  isOk:function(){
    for (var row = 0; row < 4; row++) {
      for (var col = 0; col < 4; col++) {
        if (this.data.gameArea[row][col] == 2048) {
          this.setData({
            success:'block'
          })
          wx.setStorageSync('bestscore2048', this.data.bestscore);
        }
      }
    };
  },
  updataScore:function(){
    if(this.data.score>this.data.bestscore){
      this.data.bestscore = this.data.score;
    }
    this.setData({
      score:this.data.score,
      bestscore:this.data.bestscore
    })
  },
  touchmove:function(){

  },
  goOn:function(){
    this.setData({
      endless:true,
      success:'none'
    })
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    this.start();
  },
    

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})

