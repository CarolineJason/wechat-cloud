//index.js
const app = getApp();

wx.cloud.init({
  text: 'dev-2020-06-22-i9ogz',
  traceUser: true,
})
const db = wx.cloud.database();

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  insert: function() {
    db.collection('user').add({
      data: {
        name: 'jason',
        age: 12,
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  },
  
  update: function() {
    db.collection('user').doc('f188d1a95f01477d005dc9bf006c7a13')
      .update({
        data: {
          name: 'jack',
          age: '30'
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  },

  delete: function() {
    db.collection('user').doc('f188d1a95f01477d005dc9bf006c7a13')
      .remove()
      .then(res => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  },

  search: function() {
    db.collection('user').where({name: 'jack'})
      .get()
      .then(res => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  },

  // 小程序 云函数
  sum: function() {
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 1,
        b: 2,
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })



  },

  // 获取 openId
  getOpenId: function() {
    wx.cloud.callFunction({
      name: 'login'
    })
    .then(res => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  },

  // 批量删除 数据库里的数据
  batchDel: function() {
    wx.cloud.callFunction({
      name: 'batchDel',
    }).then(res => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  },

  upload: function() {
    wx.chooseImage({
      count: 1, // 上传图片数量
      sizeType: ['original', 'compressed'], // 上传图片大小类型 原始类型/压缩类型
      sourceType: ['album', 'camera'], // 相册/相机拍照
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        
        // 将 tempFilePaths 存储到 数据库中
        wx.cloud.uploadFile({
          cloudPath: 'example.png',
          filePath: tempFilePaths[0], // 文件路径
        }).then(res => {
          console.log(res);
          console.log(res.fileID);
          db.collection('image').add({
            data: {
              fileID: res.fileID,
            },
          }).then((res) => {
            console.log('res:', res);
          }).catch((err) => {
            console.log('err:', err);
          })
        }).catch(error => {
          console.log(error);
        })
      }
    })
  },

  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
})
