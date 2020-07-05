// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event,context) => {
  console.log('event:', event);
  console.log('context:', context);
  const wxContext = cloud.getWXContext();

  console.log('wxContext:', wxContext);

  return {
    sum: event.a + event.b,
  }
}