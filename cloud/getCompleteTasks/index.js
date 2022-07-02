// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // const db = cloud.database()
  // let task = []
  // await db.collection('Tasks')
  // .where({
  //   Tasks_openid_index_:wxContext.OPENID,
  // })
  // .get()
  // .then(res=>{
  //   console.log(wxContext.OPENID)
  //   console.log(res)
  // })
  return cloud.database().collection("Tasks")
  .where({
    openid:wxContext.OPENID
  })
  .get();
  
}