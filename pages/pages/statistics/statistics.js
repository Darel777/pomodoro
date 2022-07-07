// pages/statistics/statistics.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({
    options: {
        styleIsolation: 'shared' 
          // 默认值 isolated(启动隔离)、 
          // apply-shared(页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面) 、
          // shared(wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件)
    },
    data: {
            //开始时间
            currentDate_start_time: new Date().getTime(),//滑动栏内部
            currentDate_end_time: new Date().getTime(),
            show_start_time: false,//是否展示
            show_end_time: false,
            start_selected: "1970-01-01",
            end_selected: "2077-01-01",
            days_selected:1,
            self_outtodate:0,
            self_outtomins:0,
            self_outtostreak:0,
            completedTasks:[]//已完成任务
    },
  //滑动时对组件的value进行改变
  onInput_start_time(event) {
    this.setData({
      currentDate_start_time: event.detail,
    });
  },
  onInput_end_time(event) {
    this.setData({
      currentDate_end_time: event.detail,
    });
  },
  //展示
  showPopup_start_time() {
    this.setData({ show_start_time: true });
  },
  showPopup_end_time() {
    this.setData({ show_end_time: true });
  },
  //隐藏
  onClose_start_time() {
    this.setData({ show_start_time: false });
  },
  onClose_end_time() {
    this.setData({ show_end_time: false });
  },
  //选中时将cell中的字段改变
  onSelect_start_time(event){
    console.log(this.data.currentDate_start_time);
    console.log(this.data.currentDate_end_time);
    this.onClose_start_time();
    if(this.data.currentDate_end_time<this.data.currentDate_start_time){
        Notify("请不要让开始时间在结束时间后面！");return;
    }
    let date = new Date(this.data.currentDate_start_time);
        let y = date.getFullYear()
        let MM = date.getMonth() + 1
        MM = MM < 10 ? ('0' + MM) : MM
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
    this.setData({ start_selected: y+"-"+MM+"-"+d});
    let end=parseInt(this.data.currentDate_end_time/86400000)+1;
    let start=parseInt(this.data.currentDate_start_time/86400000)+1;
    this.Result_Changes(start,end);
  },
  onSelect_end_time(event){
    console.log(this.data.currentDate_start_time);
    console.log(this.data.currentDate_end_time);
    this.onClose_end_time();
    if(this.data.currentDate_end_time<this.data.currentDate_start_time){
        Notify("请不要让开始时间在结束时间后面！");return;
    }
    let date = new Date(this.data.currentDate_end_time);
        let y = date.getFullYear()
        let MM = date.getMonth() + 1
        MM = MM < 10 ? ('0' + MM) : MM
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
    this.setData({ end_selected: y+"-"+MM+"-"+d});
    let end=parseInt(this.data.currentDate_end_time/86400000)+1;
    let start=parseInt(this.data.currentDate_start_time/86400000)+1;
    this.Result_Changes(start,end);
  },

  //拖动自定义天数条
  Dragging(event){
    this.setData({
        days_selected: event.detail.value,
      });
      console.log(this.data.days_selected);
      this.data.currentDate_end_time= new Date().getTime();
        let date =new Date(this.data.currentDate_end_time);
        let date2=new Date(this.data.currentDate_end_time-86400000*this.data.days_selected);
        let y = date.getFullYear()
        let MM = date.getMonth() + 1
        MM = MM < 10 ? ('0' + MM) : MM
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        this.setData({ end_selected: y+"-"+MM+"-"+d});
        let y1 = date2.getFullYear()
        let MM1 = date2.getMonth() + 1
        MM1 = MM1 < 10 ? ('0' + MM1) : MM1
        let d1 = date2.getDate()
        d1 = d1 < 10 ? ('0' + d1) : d1
        this.setData({ start_selected: y1+"-"+MM1+"-"+d1});
        this.Result_Changes();
  },
  //三天
    threedays(event){
    this.setData({
        days_selected: 2
      });
      this.data.currentDate_end_time= parseInt(new Date().getTime()/86400000)*86400000-1;
      this.data.currentDate_start_time=this.data.currentDate_end_time-86400000*this.data.days_selected;
      let date =new Date(this.data.currentDate_end_time);
      let date2=new Date(this.data.currentDate_end_time-86400000*this.data.days_selected);
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      this.setData({ end_selected: y+"-"+MM+"-"+d});
      let y1 = date2.getFullYear()
      let MM1 = date2.getMonth() + 1
      MM1 = MM1 < 10 ? ('0' + MM1) : MM1
      let d1 = date2.getDate()
      d1 = d1 < 10 ? ('0' + d1) : d1
      this.setData({ start_selected: y1+"-"+MM1+"-"+d1});
      let days=Date.now();
    //   console.log(days);
      let end=parseInt(days/86400000);
      let start=end-2;//-2 加一起3天（）
      this.Result_Changes(start,end);
},
  //七天
    sevendays(event){
        this.setData({
            days_selected: 6
          });
          this.data.currentDate_end_time= parseInt(new Date().getTime()/86400000)*86400000-1;
          this.data.currentDate_start_time=this.data.currentDate_end_time-86400000*this.data.days_selected;
          let date =new Date(this.data.currentDate_end_time);
          let date2=new Date(this.data.currentDate_end_time-86400000*this.data.days_selected);
          let y = date.getFullYear()
          let MM = date.getMonth() + 1
          MM = MM < 10 ? ('0' + MM) : MM
          let d = date.getDate()
          d = d < 10 ? ('0' + d) : d
          this.setData({ end_selected: y+"-"+MM+"-"+d});
          let y1 = date2.getFullYear()
          let MM1 = date2.getMonth() + 1
          MM1 = MM1 < 10 ? ('0' + MM1) : MM1
          let d1 = date2.getDate()
          d1 = d1 < 10 ? ('0' + d1) : d1
          this.setData({ start_selected: y1+"-"+MM1+"-"+d1});
          let days=Date.now();
        //   console.log(days);
        
      let end=parseInt(days/86400000);
      let start=end-6;//-6 加一起7天（）
          this.Result_Changes(start,end);
},
  //十五天
    fifteendays(event){
        this.setData({
            days_selected: 14
          });
          this.data.currentDate_end_time= parseInt(new Date().getTime()/86400000)*86400000-1;
          this.data.currentDate_start_time=this.data.currentDate_end_time-86400000*this.data.days_selected;
          let date =new Date(this.data.currentDate_end_time);
          let date2=new Date(this.data.currentDate_end_time-86400000*this.data.days_selected);
          let y = date.getFullYear()
          let MM = date.getMonth() + 1
          MM = MM < 10 ? ('0' + MM) : MM
          let d = date.getDate()
          d = d < 10 ? ('0' + d) : d
          this.setData({ end_selected: y+"-"+MM+"-"+d});
          let y1 = date2.getFullYear()
          let MM1 = date2.getMonth() + 1
          MM1 = MM1 < 10 ? ('0' + MM1) : MM1
          let d1 = date2.getDate()
          d1 = d1 < 10 ? ('0' + d1) : d1
          this.setData({ start_selected: y1+"-"+MM1+"-"+d1});
          let days=Date.now();
        //   console.log(days);
          let end=parseInt(days/86400000);
          let start=end-14;//-14 加一起15天（）
          this.Result_Changes(start,end);
},
  //三十天
    thirtydays(event){
        this.setData({
            days_selected: 29
          });
          this.data.currentDate_end_time= parseInt(new Date().getTime()/86400000)*86400000-1;
          this.data.currentDate_start_time=this.data.currentDate_end_time-86400000*this.data.days_selected;
          let date =new Date(this.data.currentDate_end_time);
          let date2=new Date(this.data.currentDate_end_time-86400000*this.data.days_selected);
          let y = date.getFullYear()
          let MM = date.getMonth() + 1
          MM = MM < 10 ? ('0' + MM) : MM
          let d = date.getDate()
          d = d < 10 ? ('0' + d) : d
          this.setData({ end_selected: y+"-"+MM+"-"+d});
          let y1 = date2.getFullYear()
          let MM1 = date2.getMonth() + 1
          MM1 = MM1 < 10 ? ('0' + MM1) : MM1
          let d1 = date2.getDate()
          d1 = d1 < 10 ? ('0' + d1) : d1
          this.setData({ start_selected: y1+"-"+MM1+"-"+d1});
          let days=Date.now();
        //   console.log(days);
          let end=parseInt(days/86400000);
         let start=end-29;//-29 加一起30天（）
         this.Result_Changes(start,end);
},
  //后端连接函数
Result_Changes(start,end){
    console.log(start);
    console.log(end);
    const that=this;
    let total_minutes=0;
    let total_tasks=0;
    let total_days=0;
    var myarray=new Array();
    // console.log(myarray.length);
    for(let i=0;i<that.data.completedTasks.length;i++){
        var thisday=parseInt(that.data.completedTasks[i].completetime/86400000);
        if(thisday>=start&&thisday<=end){

        total_minutes+=that.data.completedTasks[i].time_data*that.data.completedTasks[i].complete_num;
        total_tasks+=that.data.completedTasks[i].complete_num;
        
    }
    }
    for(let i=0;i<that.data.completedTasks.length;i++){
        var thisday=parseInt(that.data.completedTasks[i].completetime/86400000);
        console.log(thisday);
        var leng=myarray.length;
        var if_new_day=true;
        for(let j=0;j<leng;j++){
            if(myarray[j]==thisday){
                if_new_day=false;
            }
        }
        if(if_new_day){
            myarray[leng]=thisday;
        }
    }
    for(let i=0;i<leng;i++){
        if(myarray[i]>=start&&myarray[i]<=end){
            total_days=total_days+1;
        }
    }
    console.log(myarray);
    that.data.self_outtodate=total_tasks;
    that.data.self_outtomins=total_minutes.toFixed(2);
    that.data.self_outtostreak=total_days;
    // console.log(total_minutes);//110
    // console.log(total_tasks);//3
    // console.log(that.data.self_outtodate);//und

    this.setData({ self_outtodate:that.data.self_outtodate});
    this.setData({ self_outtomins:that.data.self_outtomins});
    this.setData({ self_outtostreak:that.data.self_outtostreak});

},

getTime(data,type){
  var _data = data;
  //如果是13位正常，如果是10位则需要转化为毫秒
  if (String(data).length == 13) {
    _data = data
  } else {
    _data = data*1000
  }
  const time = new Date(_data);    
  const Y = time.getFullYear();
  const Mon = time.getMonth() + 1;
  const Day = time.getDate();
  const H = time.getHours();
  const Min = time.getMinutes();
  const S = time.getSeconds();
  //自定义选择想要返回的类型
  if(type=="Y"){
    return `${Y}-${Mon}-${Day}`
  }else if(type=="H"){
    return `${H}:${Min}:${S}`
  }else{
    return `${Y}-${Mon}-${Day} ${H}:${Min}:${S}`
  }
},

onLoad(options){
  // var that = this
  // wx.cloud.callFunction({
  //   name:"getCompleteTasks",
  //   success(res){
  //     console.log(res)
  //     let len = res.result.data[0].task.length
  //     that.data.completedTasks = []
  //     for(let i = 0;i<len;i++){
  //       if(res.result.data[0].task[i].completetime != null){
  //         that.data.completedTasks.push(res.result.data[0].task[i])
  //       }
  //     }
  //     console.log(that.data.completedTasks)      
  //   },fail(res){
  //     console.log("fail")
  //   }
  // })
},


onShow(options){
  var that = this
  wx.cloud.callFunction({
    name:"getCompleteTasks",
    success(res){
      console.log(res)
      let len = res.result.data[0].task.length
      that.data.completedTasks = []
      for(let i = 0;i<len;i++){
        if(res.result.data[0].task[i].completetime != null){
          that.data.completedTasks.push(res.result.data[0].task[i])
        }
      }
      console.log(that.data.completedTasks)
      
    },fail(res){
      console.log("fail")
    }
  })
}
})