const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: {},
    commentInfo: '', // 评论内容
    rateValue: '', // 评分
    images: [],
    fileIds: [], // 图片 fileId
    movieId: -1,
  },

  onFieldChange: function(e) {
    this.setData({
      commentInfo: e.detail,
    });
  },

  onRateChange: function(e) {
    this.setData({
      rateValue: e.detail,
    });
  },

  uploadImg: function() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log('tempFilePaths:', tempFilePaths);
        
        this.setData({
          images: this.data.images.concat(tempFilePaths),
        });
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  // 提交评论
  submitComment: function() {
    wx.showLoading({
      title: '评论提交中.......',
    });

    let promiseAll = [];
    Array.isArray(this.data.images) && this.data.images.forEach((item) => {
      promiseAll.push(new Promise((reslove, reject) => {
        let suffix = /\.\w+$/.exec(item)[0]; // 正则表达式返回文件的扩展名
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: item, // 文件路径
          success: res => {
            console.log(res.fileID);

            this.setData({
              fileIds: this.data.fileIds.concat(res.fileID),
            });

            reslove();
          },
          fail: err => {
            console.log('err:', err);
            reject(err);
          }
        });
      }));
    })

    Promise.all(promiseAll).then((res) => {
      db.collection('comments').add({
        data: {
          content: this.data.commentInfo,
          rate: this.data.rateValue,
          fileIds: this.data.fileIds,
          movieId: this.data.movieId,
        }
      }).then((res) => {
        wx.hideLoading();
        wx.showToast({
          title: '评论提交成功',
        });
        setTimeout(() => {
          wx.navigateTo({
            url: '../movie/movie',
          })
        }, 300);
      }).catch((err) => {
        wx.hideLoading();
        wx.showToast({
          title: '评价失败...',
        })
        console.log('err:', err);
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieId: options.movieid,
    });
    wx.cloud.callFunction({
      name: 'comment',
      data: {
        movieid: options.movieid
      }
    }).then((res) => {
      console.log('res:', res);
      this.setData({
        comment: JSON.parse(res.result),
      });
    })
    .catch((err) => {
      console.log('err:', err)
    })
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