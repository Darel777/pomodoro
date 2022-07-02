// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCreateTask:false, // 判断创建任务页面是否展示
        task:[{ // 任务列表
            name: "软工二",
            time_data: 30,
            time:"30min",
            complete_num: 0 // 完成次数
        },{
            name:"计网",
            time_data: 20,
            time:"20min",
            complete_num: 0
        }],

        tasknum: 2, // 任务列表数目

        taskongoing: false, // 是否有任务正在进行
        ongoingtask: {}, // 正在进行的任务对象
        isdoingtask: -1, // 正在进行的任务在task中的索引

        time: 0, // 倒计时的总时间
        timeData:{}, // 显示倒计时的具体时间

        new_task_name:"", // 新任务的名字
        new_task_time: 30, // 新任务的时间，默认是30min

        completeahead: false, // 是否可以提前完成任务
        cantransmitdata: false, // 是否可以数据传输（完成任务的部分）

        isinputtime: false, // 是否自定义输入任务时间
        time_button_select: [1,0,0,0,0], // 判断按钮被按下

        note: getApp().globalData.userInfo.note,
        isEditTask: false,
        editTaskIdx: -1,
        editTaskName: "",
        editTaskTime: -1,
      },

      // 选择自定义任务时间触发
      inputTime(){
          // 如果之前是选择时间，就需要重置
          if(this.data.isinputtime == false){
              this.setData({
                isinputtime: true,
                time_button_select: [0,0,0,0,1],
                new_task_time: 0
              })
          }
          // 如果之前就是自定义时间
          else{
              // 已输入过时间，就直接返回
              if(this.data.new_task_time != 0){
                  return
              }
          }
      },

      // 选择某个时间按钮触发
      selectTime: function(event){
          let time = event.currentTarget.dataset.time * 1;
          let select = [];
          let index = time / 30 - 1;
          for(let i = 0; i < 5; i++){
              if(i == index){select[i] = 1;}
              else{select[i] = 0;}
          }
          this.setData({
              new_task_time: time,
              isinputtime: false,
              time_button_select: select
          });
      },

      // 获得新任务的名称
      getName(e){
        let name = e.detail.value;
        this.setData({
            new_task_name:name
        })
      },

      getNewName(e){
          let name = e.detail.value;
          this.setData({
              editTaskName: name
          })
      },

      // 获得新任务的时间
      getTime(e){
          let time = e.detail.value;
          time = time * 1;
          this.setData({
              new_task_time: time
          });
      },

      getNewTime(e){
          let time = e.detail.value;
          time = time * 1;
          this.setData({
              editTaskTime: time
          })
      },

      // 显示增加任务页面
      addTask(){
            this.setData({
                isCreateTask:true,
                new_task_time: 30,
                time_button_select: [1,0,0,0,0],
                new_task_name: "",
                isinputtime: false
            });
      },

      // 确认增加任务，主页上增加一个任务卡片
      confirm(){
          if(this.data.new_task_name === "" || this.data.new_task_time === 0){
              console.log(this.data.new_task_name,this.data.new_task_time);
              return;
          }
          this.setData({
              task:this.data.task.concat({
                name: this.data.new_task_name,
                time_data: this.data.new_task_time,
                time: this.data.new_task_time + "min",
                complete_num: 0
              }),
              tasknum: this.data.tasknum+1
          });
          let newtask = this.data.task[this.tasknum-1];
          this.unshow();
        //   console.log(this.data.task);
      },

      // 关闭添加任务页面
      unshow(){
          this.setData({
              isCreateTask:false,
            });
      },

    // 删除任务
      deleteTask(e){
        let index = e.currentTarget.dataset.index;
        this.data.task.splice(index,1);
        this.setData({
            task: this.data.task
        })
      },

      // 开始任务
      begin(event){
          this.setData({
              completeahead: getApp().globalData.premitCloseBefore,
              time: 0,
              cantransmitdata: false
          });
        let taskid = event.currentTarget.dataset.index;
        let t = this.data.task[taskid];
        this.setData({
            isdoingtask: taskid,
            taskongoing:true,
            ongoingtask:t,
            time: t.time_data * 60 * 1000,
            cantransmitdata: true
        })
      },

      edit(event){
          let taskidx = event.currentTarget.dataset.index;
          let t = this.data.task[taskidx];
          this.setData({
              editTaskIdx: taskidx,
              editTaskName: t.name,
              editTaskTime: t.time_data
          })
          this.setData({
            isEditTask: true
        })
      },

      confirmModify(){
          let tasks = this.data.task;
          let i = this.data.editTaskIdx;
          tasks[i].name = this.data.editTaskName;
          tasks[i].time_data = this.data.editTaskTime;
          tasks[i].time = this.data.editTaskTime + "min";
          this.setData({
              task: tasks,
              isEditTask: false
          })
      },

      unshowEdit(){
          this.setData({
              isEditTask: false,
          })
      },

      // 传送数据给数据库，记录已完成的任务
      sendCompletedTask(){
        // 传送数据 
        // task 完成的任务
        let task = this.data.task[this.data.isdoingtask];
        task['completetime'] = (new Date()).getTime(); // 完成时的时间戳 
        // console.log(task);
      },

      // 完成任务对data的更改
      completeTask(){
          let task = this.data.task;
          task[this.data.isdoingtask].complete_num++;
        this.setData({
            task: task,
            cantransmitdata: false,
            isdoingtask: -1,
            isdoingtask: {}
        });
      },

      // 倒计时的更新
      onChange(e) {
        this.setData({
          timeData: e.detail,
        });
        let timedata = this.data.timeData;
        let iscompleted = (timedata.hours === 0) && (timedata.minutes === 0) && (timedata.seconds === 0);
        if (iscompleted && this.data.cantransmitdata){
            // console.log(2);
            this.setData({taskongoing: false});
            this.sendCompletedTask();
            this.completeTask();
        }
      },
    
      // 放弃任务
      giveup() {
        this.setData({ 
            taskongoing: false,
            isdoingtask: -1,
            ongoingtask:{}
         });
      },

      // 提前完成任务
      completeAhead(){
          this.setData({
              taskongoing: false,
              cantransmitdata: true
          });
          this.sendCompletedTask();
          this.completeTask();
      },

      // 将数据库的中任务列表加载入data中的task
      loadTask(){
        // 获取数据库任务列表
        // 需要返回一个列表，和data中的task一样
      },

      // 保存task进入数据库
      saveTask(task){
          // 将任务列表保存进数据库
          // task形式参见data中的task
          wx.cloud.callFunction({
              name: 'addTask',
              data: {
                  task: task,
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

        var _this = this;
          
          const db = wx.cloud.database();
          
          db.collection('Tasks').where({
              openid: getApp().globalData.openid,
          }).get({
              success: function (res) {
                  console.log(res.data),
                  
                  _this.setData({
                        task: res.data[0].task
                      });
              }
          })

        //   console.log("onload:note="+getApp().globalData.userInfo.note);

        // 获取数据库中的任务列表
        // let task_list = this.loadTask();
        // this.setData({
        //     task: task_list
        // });

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
            note: getApp().globalData.userInfo.note
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        this.saveTask(this.data.task);
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        //this.saveTask(this.data.task);
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

    }
})