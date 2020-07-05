
const detailList = require('../../../data/post-detail.js');
const app = getApp(); // 通过 getApp() 方法获取全局 数据

Page({
  data: {
    isPlayingMusic: false,
    currentId:'',
  },
  onLoad: function (options) {
    console.log('options:', options);
    console.log('globalData-- 获取全局数据--:', app.globalData); // 获取全局数据
    const postId = options.id;
    this.setData({
      currentId: postId,
    });
    const detailData = detailList.postDetailList[postId];
    const detail = [];
    detail.push(detailData);
    // console.log('detail:', detail);
    this.setData({
      detailData: detail,
    });

    let postsCollectObj = wx.getStorageSync("post_collect");
    if (postsCollectObj) {
      const postCollect = postsCollectObj[postId];
      if (postCollect) {
        this.setData({
          collected: postCollect,
        });
      }
    }
    else {
      postsCollectObj = {};
      postsCollectObj[postId] = false;
      wx.setStorageSync("post_collect", postsCollectObj);
    }

    // 通过全局变量 来同步 主控播放 和页面播放器 播放图标的同步
    if (app.globalData.g_isPlayingMusic && postId === app.globalData.g_isMusicPostId ) {
      this.setData({
        isPlayingMusic: true,
      });
    }
    this.onMusicMointor();
  },

  //  全局监听 music 的模仿状态，并且同步 播放的图标
  onMusicMointor(){
    wx.onBackgroundAudioPlay(() => {  // 监听音乐 播放 改变播放图标， 设置播放当前歌曲的id
      this.setData({
        isPlayingMusic: true,
      });
      app.globalData.g_isPlayingMusic = true;
      // app.globalData.g_isMusicPostId = postId
      app.globalData.g_isMusicPostId = this.data.currentId;
    });

    wx.onBackgroundAudioPause(() => { // 监听音乐 暂停 改变播放图标， 设置播放当前歌曲的id为null
      this.setData({
        isPlayingMusic: false,
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_isMusicPostId = null;
    });

    wx.onBackgroundAudioStop(() => {
      // 监听音乐 播放完成 改变播放图标， 设置播放当前歌曲的id为null
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_isMusicPostId = null
    })
  },

  // 收藏
  handleCollect() {
    console.log('收藏');
    let postsCollected = wx.getStorageSync("post_collect"); // 获取存储到对象
    let postCollected = postsCollected[this.data.currentId]; // 获取当前到 的 postCollected
    postCollected = !postCollected; // 点击 取反
    postsCollected[this.data.currentId] = postCollected; // 将当前的postCollected 更新到 存储的对象
    wx.setStorageSync("post_collect", postsCollected);  // 保存到存储对象
    this.setData({
      collected: postCollected,
    });
    // wx.showToast({
    //   title: postCollected ?'收藏成功' : '取消收藏成功',
    //   icon: 'success',
    //   mask: false,
    //   duration: 2000,
    //   success(res){
    //     console.log('res:', res);
    //   }
    // });

    wx.showModal({
      title: postCollected ? '确定要取消收藏吗？' : '确定收藏文章',
      content: '是否收藏该文章？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },

  // 分享
  shareHandle() { // 分享
    const itemList = [
      '分享给微信好友',
      "分享到朋友圈",
      "分享到QQ",
      "分享到QQ空间",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#666',
      success(res){
        console.log('res:', res);
      },
      fail() {
        console.log('err:',err);
      }
    })
  },

  // 点击播放音乐
  musicHandle() {
    console.log('music');
    console.log('detailList:', detailList);
    const isPlayingMusic = this.data.isPlayingMusic;
    const currentId = this.data.currentId;
    const postData = detailList.postDetailList;

    if (isPlayingMusic) { // 播放状态
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false,
      });
    }
    else { // 暂停状态
      wx.playBackgroundAudio({
        dataUrl: postData[currentId].music.dataUrl,
        title: postData[currentId].music.title,
        coverImgUrl: postData[currentId].music.coverImgUrl
      });
      this.setData({
        isPlayingMusic: true,
      });
    }
  },
  
});