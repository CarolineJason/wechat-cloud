//app.js
App({
  globalData: {
    userInfo: null,
    openid: null,
    session_key: null,
  },

  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let that = this;
        console.log("登录------res:", res)
        const APP_ID = "wx2dc9fc434a815bcd" //输入小程序appid
        const APP_SECRET = "5d5fc0320980dc212291ca0189b11d65" //输入小程序app_secret

        wx.request({
          //获取openid接口
          url: `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${res.code}&grant_type=authorization_code`,
          data: {},
          method: "GET",
          success: res => {
            console.log("登录成功获取 openId: ===data==>", res);
            this.globalData.openid = res.data.openid;  // 在全局变量中存储 openid
            this.globalData.session_key = res.data.session_key; // 在全局变量中存储 session_key
            console.log('this.globalData:', this.globalData);
          }
        })
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("获取用户信息===res:", res)
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              console.log('123:',this);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          })
        } else {
          console.log("小程序授权失败......")
        }
      }
    });
  },
})