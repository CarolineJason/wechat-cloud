// 评分组件 处理 分数 显示 星星
export const coverageStar = (stars) =>  {
  const num = stars.toString().slice(0,1);
  const arr = [];
  for (let i = 1; i<= 5; i+=1) {
    if (i <= num) {
      arr.push(1);
    }
    else {
      arr.push(0);
    }
  }
  return arr;
}

// 封装 请求方法
export const http = (url, callBack) => {
  console.log('url:',url);
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Type': 'json',
    },
    success: (res) => {
      console.log('http-----res:', res);
      callBack(res.data);
    },
    fail: (err) => {
      console.log('err:', err);
    }
  });
}

export const convertToCastString = (casts) => {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

export const convertToCastInfos = (casts) =>  {
  var castsArray = [];
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray
}
