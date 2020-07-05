Page({
  handleStart() {
    console.log('进入小程序之旅！');
    // wx.navigateTo({
    //   // 小程序跳转 【跳转到新的 页面会执行 onHide 生命周期, 左上角 有 返回按钮】
    //   url: '../posts/posts',
    // });
    // wx.redirectTo({
      //  启动页一般用 wx.redirectTo 这个，不需要返回的按钮
      // 小程序跳转 【跳转到新的 页面会执行 onUnload 生命周期, 左上角 没有 返回按钮】
      // url: '../posts/posts',
    // });


    // 跳转到 tabBar 的页面 必须用这个跳转
    wx.switchTab({
      url: '../posts/posts',
    })
  },
  handleWrap() {
    console.log('handleWrap');
  },
  onHide() {
    console.log('onHide');
  },
  onUnload(){
    console.log('onUnload');
  }
})