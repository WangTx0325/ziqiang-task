var app = getApp()
Page({
  data:{
    student:{},
    isBind:false,
    avatarUrl: '',
    nickName:''
  },
  
  //生命周期函数 监听页面加载
  onLoad: function(options){
    var self = this
    var stu_info = app.get_local_stu_info()
    console.log('me.js缓存中stu_info:',stu_info)
    //if
    self.setData({isBind:true,student:app.globalData.stu_info})
  },

  //生命周期函数 监听页面初次渲染完成
  onReady:function(){

  },

  //生命周期函数 监听页面显示
  onShow: function () {
    var self = this
    var stu_info = app.get_local_stu_info()
    try {
      if (stu_info && stu_info.stu_id) {
        this.setData({ isBind: true, student: stu_info })
      } else {
        this.setData({ isBind: false })
      }
    }
    catch (e) {
      this.setData({ isBind: false })
    }
  },

  //生命周期函数 监听页面隐藏
  onHide: function () {

  },

  //生命周期函数 监听页面卸载
  onUnload: function(){

  },

  //监听用户下拉动作
  onPullDownRefresh: function(){

  },

  //页面上拉触底事件函数
  onReachBottom: function(){

  },

  //用户点击右上角分享
  onShareAppMessage: function(){
    
  }

    
})