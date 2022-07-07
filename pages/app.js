// app.js
App({
  onLaunch() {

    wx.cloud.init({
      env:"cloud1-8gwq2dfwde160a96"
    })

    
    

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }
    })
    //获取用户openid
        wx.cloud.callFunction({
            name:"getOpenid",
            success(res){
              getApp().globalData.openid = res.result.openid;
              console.log(getApp().globalData.openid)
            },fail(res){
              console.log("fail")
            }
          })
          wx.cloud.callFunction({
            name:"getUserInfo",
            success(res){
              console.log(res)
              getApp().globalData.userInfo = res.result.data[0].userInfo
            },fail(res){
              console.log("fail")
            }
          })

          
  },
  globalData: {
    // 需要在wx.login获取openID后，同时返回以下数据并赋值到全局变量当中（商量一下一共需要哪些数据）
    userInfo:{
        nickName:"微信用户",
        note:"keep and fighting!",
        avatarUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp403769333.jpg&refer=http%3A%2F%2Fimg2.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653463730&t=ac52df9863d70fef049d701befe070cf", // 存放默认头像的url
        connectWay:"1109815290"
    }, 
    hasUserInfo:false,
    premitCloseBefore: false,// true为允许提前关闭小闹钟
    openid:"", 
  },
})
