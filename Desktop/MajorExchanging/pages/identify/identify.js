var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      stu_id: '',
      password: ''
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
    
  },

  /**
   * 登录请求
   */
  login: function(e){
    wx.showToast({
      title: '登录请求中',
      icon: 'loading',
      duration: 10000
    })
  },
    useridInput: function (e) {
        this.setData({ stu_id: e.detail.value })
        // if (e.detail.value.length >= 7) {
        //   wx.hideKeyboard();
        // }
    },
    passwdInput: function (e) {
        this.setData({ password: e.detail.value });
    },
    inputFocus: function (e) {
        if (e.target.id == 'userid') {
            this.setData({
                'userid_focus': true
            });
        } else if (e.target.id == 'passwd') {
            this.setData({
                'passwd_focus': true
            });
        }
    },
    inputBlur: function (e) {
        if (e.target.id == 'userid') {
            this.setData({
                'userid_focus': false
            });
        } else if (e.target.id == 'passwd') {
            this.setData({
                'passwd_focus': false
            });
        }
    },
    // 点击绑定后执行
    bindId: function (e) {
        var self = this
        // 如果用户没有授权
        if (!e.detail.userInfo) return;
        // 如果用户授权
        // console.log(e.detail.userInfo)
        if (!self.data.stu_id || !self.data.password) {
            wx.showToast({
                title: '学号密码不能为空',
                icon: 'none',
                duration: 2000
            })
            return false
        }
        wx.showToast({
            title: '绑定中...',
            icon: 'loading',
            duration: 10000
        })
        wx.request({
            url: app.server + '/student/login/',
            method: 'POST',
            data: { stu_id: self.data.stu_id, password: self.data.password, avatar: e.detail.userInfo.avatarUrl },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                // 错误
                if (res.statusCode == 422) {
                    wx.showToast({
                        title: '学号或密码错误',
                        icon: 'none',
                        duration: 2000
                    })
                    return false
                } else if (res.statusCode == 400) {
                    wx.showToast({
                        title: '教务系统崩溃了，稍后再试吧',
                        icon: 'none',
                        duration: 3000
                    })
                    return false
                }
                else if (res.statusCode != 200) {
                    wx.showToast({
                        title: '服务器未知错误，稍后再试吧',
                        icon: 'none',
                        duration: 3000
                    })
                    return false
                }
                // 成功
                app.set_local_stu_info(res.data)
                wx.showToast({
                    title: '欢迎你,' + res.data.name,
                    icon: 'success',
                    duration: 2000
                })
                console.log("url", e.detail.userInfo.avatarUrl)
                setTimeout(function () {
                    wx.navigateBack()
                }, 2000)

            },
            fail() {
                wx.showToast({
                    title: '服务暂不可用',
                    icon: 'loading',
                    duration: 3000
                })
            }
        })
    }
})