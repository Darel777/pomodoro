if(wx.getUserProfile){
    console.log("can get Info");
} 


// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasUserInfo:false,
        userInfo:{
            avatarUrl:"",
            nickName:"",
            note:"",
            connectWay:"",
        },
        openid:"",

        premitCloseBefore:getApp().globalData.premitCloseBefore,

    },
    // 是否允许提前修改小闹钟
    stateChanege:function (params) {
        getApp().globalData.premitCloseBefore = params.detail.value;
    },

    // 获取用户授权，使用用户微信头像与昵称
    getUserProfile(e){
        console.log("hasUserInfo:" + this.data.hasUserInfo)
        if(!this.data.hasUserInfo){
            wx.getUserProfile({
                desc: 'desc',
                success:(res)=>{
                  console.log("get Info sucessfully")
                  console.log("detail message:")
                  console.log(res.userInfo)
                  this.setData({
                    "userInfo.nickName" : res.userInfo.nickName,
                    "userInfo.avatarUrl" : res.userInfo.avatarUrl,
                    hasUserInfo:true,   
                  })
                  getApp().globalData.userInfo = this.data.userInfo
                  getApp().globalData.hasUserInfo = this.data.hasUserInfo
                },
              })
        }
    },

    sendData(){
        // 将当前数据(userInfo、hasUserInfo)传输到数据库
        wx.cloud.callFunction({
            name: 'addUser',
            data: {
                userInfo: this.data.userInfo,
              },
              complete: res => {
                  console.log('callFunction test result: ', res)
              }
           })
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.data.openid = getApp().globalData.openid
        console.log(this.data.openid)
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.setData({
            hasUserInfo:getApp().globalData.hasUserInfo,
            userInfo:getApp().globalData.userInfo
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },




})