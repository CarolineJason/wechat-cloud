const welcomeData = getApp();
console.log("welcomeData:", welcomeData);

Page({
  data: {
    welcomeUserAwatar: "",
    welcomeUserName: ""
  },
  onLoad(options) {
    console.log(options)
    this.setData({
      welcomeUserAwatar: welcomeData.globalData.userInfo.avatarUrl,
      welcomeUserName: welcomeData.globalData.userInfo.nickName
    })
  },
  handleStart() {
    console.log('start');
    wx.navigateTo({
      url: "../newsList/newsList"
    })
  }
})
