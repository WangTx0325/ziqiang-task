const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaTxt:null,
    imgArr:null,
    max:50,

  },

  // saveEditOrNot(){
  //   wx.showModal({
  //     title: '将此次编辑保留',
  //     content: '',
  //     cancelText:'不保留',
  //     confirmText:"保留",
  //     success(res){
  //       if(res.confirm){
  //         console.log('确定')
  //       } else if(res.cancel){
  //         wx.navigateBack({
  //           delta:1
  //         })
  //       }
  //     }
  //   })
  // },

  getInputValue: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    if(len > this.data.max) return;
    this.setData({
      currentWordNumber:len,
      textareaTxt:e.detail.value
    });
  },

  chooseImage(){
    let self = this;
    wx.chooseImage({
      count:9,
      sizeType:'compressed',
      sourceType:['album','camera'],
      success: function(res) {
        self.setData({
          imgArr:res.tempFilePaths
        })
      },
    })
  },
  
  postData(){
    wx.navigateBack({
      delta: 1
    })
    wx.request({
      url: app.globalData.baseUrl + "api",
      method: "POST",
      data: {
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        textareaTxt: this.data.textareaTxt,
        imgArr: this.data.imgArr,
        location: this.data.location
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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