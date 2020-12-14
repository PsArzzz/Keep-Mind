Page({
  data: {
    hasEmptyGrid: false,
    cur_year: '',
    cur_month: '',
  },
  onLoad(options) {
    this.setNowDate();
  },//直接调用setNowDate函数，将日历制作完成
 
  dateSelectAction: function (e) {
    var cur_day = e.currentTarget.dataset.idx;
    this.setData({
      todayIndex: cur_day
    })
  },
 
  setNowDate: function () {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const todayIndex = date.getDate() - 1;
    console.log(`日期：${todayIndex}`)
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
      weeks_ch,
      todayIndex,
    })
  },//大的框架
 
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },//获取一个月有多少天
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },//获取这个月第一天是在星期几
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);//在数组中添加一个数i
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },//计算这个月前要加多少空格
  calculateDays(year, month) {
    let days = [];
 
    const thisMonthDays = this.getThisMonthDays(year, month);
 
    for (let i = 1; i <= thisMonthDays; i++) {
      days.push(i);//在数组中添加一个数i，这次i是这个月的日期
    }
 
    this.setData({
      days
    });
  },
  handleCalendar(e) {//对用户进行月份更改的行为进行反馈
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') //判断点击的是倒回去的按钮，向前一个月
    {    
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
 
      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);
 
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
 
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
 
      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);
 
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  }
})