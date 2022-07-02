// pages/userInfo/userInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{
            avatarUrl:"", // 字符串类型
            nickName:"", // 字符串类型
            note:"", // 字符串类型
            connectWay:"", // 字符串类型
        },
        tempMotto:"",
        isChangeMotto:false,
    },

    // 修改座右铭
    goToUpdateNote(){
        this.setData({
            isChangeMotto:true,
            tempMotto: getApp().globalData.note
        })
    },
    // updateAvatarUrl:function () {
    //     wx.chooseImage({
    //       count: 1,
    //       success: (result) => {
    //         let avatarUrl = result.tempFilePaths
    //         this.setData({
    //             "userInfo.avatarUrl": avatarUrl,
    //         })
    //         getApp().globalData.userInfo.avatarUrl = avatarUrl
    //         console.log(getApp().globalData.userInfo.avatarUrl)
    //       },
    //     })
    // },
    
    unshow(){
        this.setData({
            isChangeMotto:false
        })
    },

    getMotto(e){
        let motto = e.detail.value
        this.setData({
            tempMotto:motto,
        })
    },

    confirm(){
        this.setData({
            "userInfo.note" : this.data.tempMotto
        })
        getApp().globalData.note = this.data.tempMotto
        this.unshow()
    },
    // todo：
    sendNewInfo(){
        // 将新的用户信息发送到数据库，数据类型是对象,其属性可参考 this.data.userInfo
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
    onLoad: function (options) {
        this.setData({
            userInfo:getApp().globalData.userInfo
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        this.sendNewInfo()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})