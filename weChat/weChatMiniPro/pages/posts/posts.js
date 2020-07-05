
var postData = require('../../data/posts.js');

// console.log('postData:', postData);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  handleDetailTap(event){
    console.log('event:', event);
    const postid = event.currentTarget.dataset.postid;
    console.log('postid:', postid);
    wx.navigateTo({
      url: './post-detail/post-detail?id='+ postid,
    })
  },

  swiperTap(event) {
    // console.log(event);
    // target 和 currentTarget 的区别
    // 1. target: 指代的是当前点击的组件 【指代的是 image 】
    // 2. currentTarget: 指代的是 事件捕获的组件 【swiper 组件】

    const postid = event.target.dataset.postid;
    console.log('postid:', postid);
    wx.navigateTo({
      url: './post-detail/post-detail?id=' + postid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      contents: postData.postList,
    });
    // console.log('onLoad');
    // console.log('data:', this.data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // console.log('onReady');

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // console.log('onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('onUnload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    console.log('onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('onReachBottom');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log('onShareAppMessage');
    
  }
})