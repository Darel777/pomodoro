// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(await cloud.getWXContext().OPENID);
    let openid = await cloud.getWXContext().OPENID;

    return await db.collection('Users').doc(openid).set({
        data:{
            userInfo: event.userInfo,
            openid: await cloud.getWXContext().OPENID,
        },
        success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
          },
          false: function(res) {
              console.log("数据库添加失败")
          }
    })
}