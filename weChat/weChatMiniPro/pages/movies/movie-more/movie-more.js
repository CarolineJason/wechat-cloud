import {
  http,
  coverageStar
} from '../../../utils/utils.js';

const app = getApp();

Page({
  data: {
    NavigationBarTitle: "",
    movies: [],
    totalCount: 0,
    isEmpty: true,
    dataUrl: ""
  },
  onLoad: function(options) {
    console.log("options:", options.category)
    const category = options.category
    this.data.NavigationBarTitle = category

    let dataUrl = ""
    const host = app.globalData.doubanBase

    switch (category) {
      case "正在热映":
        dataUrl = `${host}/v2/movie/in_theaters` //正在热映
        break
      case "即将热映":
        dataUrl = `${host}/v2/movie/coming_soon` //即将热映
        break
      case "豆瓣Top250":
        dataUrl = `${host}/v2/movie/top250` // top250
        break
      default:
    }

    http(dataUrl, this.processMovieData)

    this.setData({
      dataUrl
    })
  },

  processMovieData(data) {
    console.log("data:", data)
    const movies = []
    data &&
      data.subjects.forEach(item => {
        if (item.title.length > 6) {
          item.title = item.title.slice(0, 6) + "..."
        }

        const temp = {
          stars: coverageStar(item.rating.stars),
          title: item.title,
          movieId: item.id,
          average: item.rating.average,
          coverageUrl: item.images.large
        }
        movies.push(temp)
      })

    let totalMovie = {}
    if (!this.data.isEmpty) {
      //  不是第一次加载数据
      // 后面一次加载的数据要把前面加载的数据 加起来
      totalMovie = this.data.movies.concat(movies)
    } else {
      // 第一次加载数据
      totalMovie = movies
      this.data.isEmpty = false
    }

    this.setData({
      movies: totalMovie
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh() // 终止 下拉刷新

    console.log("this.data:", this.data)

    this.data.totalCount += 20 // 对 totalCount 数据做累加。
  },

  // 上滑加载更多  [跟 view-scroll 这个组件 不兼容 用 onReachBottom 替代]
  // scrollToLower() {
  //   const { dataUrl, totalCount } = this.data;
  //   console.log('下滑加载更多....');

  //   const nextUrl = `${dataUrl}?start=${totalCount}&count=20`;
  //   http(nextUrl, this.processMovieData);
  //   wx.showNavigationBarLoading(); // 导航栏loading
  // },

  onReady() {
    const { NavigationBarTitle } = this.data
    wx.setNavigationBarTitle({
      title: NavigationBarTitle
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    let refreshUrl = `${this.data.dataUrl}?start=0&count=20`
    console.log("下拉刷新....")
    this.data.movies = {}
    this.data.isEmpty = true
    this.data.totalCount = 0

    http(refreshUrl, this.processMovieData)
    wx.showNavigationBarLoading() // 导航栏loading
  },

  // 上滑 加载更多
  onReachBottom() {
    console.log("上滑加载更多....")
    var nextUrl =
      this.data.dataUrl + "?start=" + this.data.totalCount + "&count=20"
    http(nextUrl, this.processMovieData)
    wx.showNavigationBarLoading()
  },

  // movie 详情
  movieDetailTap(event) {
    const movieId = event.currentTarget.dataset.movieid
    console.log("movieId:", movieId);
    wx.navigateTo({
      url: `../movie-detail/movie-detail?movieId=${movieId}`
    })
  }
})