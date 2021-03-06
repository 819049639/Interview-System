//index.js
//获取应用实例
const app = getApp()
wx.cloud.init()
const db = wx.cloud.database()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userOpenID: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindNickname: function() {
    wx.navigateTo({
      url: '../userInfoPage/userInfoPage',
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log(res)
        this.setData({ // 获取用户 openid
          userOpenID: res.result.OPENID
        })
      }
    })

  },
  previewImage: function(e) {
    let urlArr = []
    urlArr.push(this.data.userInfo.avatarUrl)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: urlArr // 需要预览的图片http链接列表
    })
  },
})