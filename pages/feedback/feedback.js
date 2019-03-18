let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      '小程序使用反馈',
      '个人信息错误反馈',
      '面试情况反馈'
    ],
    // dataForm
    index: 0,
    pickerValue: '请选择类型...',
    textareaValue: '',
    files: [],
    // 上传图片
    pics: []
  },
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // console.log(this)
    this.setData({
      index: e.detail.value,
      pickerValue: this.data.array[e.detail.value]
    })
  },
  bindTextareaHandle: function(e) {
    // console.log(e)
    this.setData({
      textareaValue: e.detail.value
    })
    // console.log(this.data.textareaValue)
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindFormSubmit: function(e) {
    console.log('bindFormSubmit: => e: ', e)
    console.log(this.data)
    wx.request({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，并非真实的接口地址
      data: {
        data: this.data
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      },
      fail(res) {
        console.log(res)
      },
      complete(res) {
        console.log(res)
      }
    })
  },
  bindFormReset: function(e) {
    // console.log(e)
    this.setData({
      pickerValue: '请选择类型...',
      files: []
    })
  },

  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let files = that.data.files
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          files.push(res.tempFilePaths[i]);
        }
        that.setData({
          files
        });
      }
    })
    // console.log(that.data.files)
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  uploadimg: function() { //这里触发图片上传的方法
    var pics = this.data.pics;
    app.uploadimg({
      url: 'https://example.weixin.qq.com/upload', //这里是你图片上传的接口
      path: this.data.files //这里是选取的图片的地址数组        
    });
  },

  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})