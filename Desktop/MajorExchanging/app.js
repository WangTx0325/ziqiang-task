//app.js
App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)
        var self = this
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                    wx.getStorage({
                        key: 'stu_info',
                        success: function(res) {
                            if (res.data) {
                                self.globalData.stu_info = res.data
                                console.log('读取缓存中用户信息', res.data)
                            } else {
                                // 未绑定
                                wx.navigateTo({
                                    url: '../identify/identify',
                                })
                            }

                        },
                        fail: function(res) {
                            // 授权了，却没有绑定
                            wx.navigateTo({
                                url: '../identify/identify',
                            })
                        },
                    })
                } else {
                    console.log("没有授权")
                    wx.navigateTo({
                        url: '../identify/identify',
                    })
                    return
                }
            }
        })
    },
    /* getUserInfo: function (cb) {
      var that = this
      if (this.globalData.userInfo) {
        typeof cb == "function" && cb(this.globalData.userInfo)
      } else {
        //调用登录接口
        wx.login({
          success: function () {
            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo
                typeof cb == "function" && cb(that.globalData.userInfo)
              }
            })
          }
        })
      }
    },*/

    globalData: {
        userInfo: null,
        guide_index: null,
        token: '',
        stu_info: {}
    },
    server: 'https://taoke.ziqiang.net.cn/api_v3',
    // 通用方法
    get_local_stu_info: function() {
        if (this.globalData.stu_info != null)
            return this.globalData.stu_info
        wx.getStorage({
            key: 'stu_info',
            success: function(res) {
                if (res.data) {
                    this.globalData.stu_info = res.data
                    return res.data
                } else {
                    return null
                }

            },
            fail: function() {
                // wx.navigateTo({
                //   url: '../index/index',
                // })
                return null
            }
        })
    },
    set_local_stu_info: function(stu_info) {
        this.globalData.stu_info = stu_info
        wx.setStorage({
            key: "stu_info",
            data: stu_info
        })
    },
})