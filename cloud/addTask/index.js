// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    console.log(await cloud.getWXContext().OPENID);
    let openid = await cloud.getWXContext().OPENID;

    return await db.collection('Tasks').doc(openid).set({
        data:{
            task: event.task,
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

    // return await db.collection('Tasks').where({
    //     openid : await cloud.getWXContext().OPENID,
    // }).get({
    //     success: function(res){
    //         db.collection('Tasks').doc(res.data._id).update({
    //             data:{
    //                 task: event.task,
    //                 openid: cloud.getWXContext().OPENID,
    //             },
    //             success: function(res) {
    //             // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //             console.log(res)
    //             },
    //             false: function(res) {
    //                 console.log("数据库添加失败")
    //             }
    //             })
    //     },
    //     false: function(res){
    //         db.collection('Tasks').add({
    //                 data:{
    //                     task: event.task,
    //                     openid: cloud.getWXContext().OPENID,
    //                 },
    //                 success: function(res) {
    //                     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //                     console.log(res)
    //                   },
    //                   false: function(res) {
    //                       console.log("数据库添加失败")
    //                   }
    //             })
    //     }
    // })