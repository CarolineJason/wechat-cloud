const app = getApp();
import { http } from "../../../utils/utils.js"
import Movie  from "class/Movie.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const movieId = options.movieId;
    console.log('movieId:', movieId);
    const host = app.globalData.doubanBase;
    const detailUrl = `${host}/v2/movie/subject/${movieId}`;
    // http(detailUrl, this.processMovieData)
    let movie = new Movie(detailUrl);
    console.log(movie);
    movie.getMovieData(movie => {
      this.setData({
        movie,
      })
    })
  },

  // 图片预览
  viewMoviePostImg(e) {
    // console.log(e);
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },

  processMovieData(data){
    console.log('data:', data);
  },

  onReady: function () {
  
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