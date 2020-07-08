Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: [],
  },

  getMovieList: function() {
    wx.showLoading({
      title: 'loading....',
    })
    wx.cloud.callFunction({
      name: 'movieList',
      data: {
        start: this.data.movieList.length,
        count: 10,
      }
    }).then((res) => {
      console.log('moiveList:', res);
      wx.hideLoading();
      this.setData({
        movieList: this.data.movieList.concat(JSON.parse(res.result).subjects),
      });
    }).catch((err) => {
      console.log(err);
      wx.hideLoading();
    })
  },

  onRefresh(){
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading(); 
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.movieList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovieList();
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
    this.onRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMovieList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})