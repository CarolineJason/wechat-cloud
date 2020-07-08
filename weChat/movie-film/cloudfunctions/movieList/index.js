// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

var rp = require('request-promise');

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return rp(`http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`)
    .then((res) => {
      console.log(res); // 在云函数 服务端输出
      return res;
    })
    .catch((err) => {
      console.error(err);
    })
}