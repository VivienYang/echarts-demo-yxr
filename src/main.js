// import echarts from 'echarts'
let echarts = require('echarts');
console.log(111);
console.log(echarts);
const main = document.getElementById('main');
let clientWidth = document.documentElement.clientWidth;
main.style.width = `${clientWidth}px`;
main.style.height = `${clientWidth * 1.2}px`;

// 基于准备好的dom，初始化echarts实例;
let myChart = echarts.init(main, 'default');

// 指定图表的配置项和数据
// 折线图
let x = 1;
function createXdata() {
  x++;
  return `2023-1-${x}`;
}
let y = 1;
function createYdata() {
  y++;
  return y;
}
let xData = [createXdata(), createXdata()];
let valData = [createYdata(), createYdata()];

// 使用刚指定的配置项和数据显示图表。
myChart.setOption({
  baseOption: {
    title: {
      text: 'echarts折线图',
    },
    legend: {
      data: ['2023年1月出勤天数'],
    },
    xAxis: {
      type: 'category',
      data: xData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        lineStyle: {
          color: 'red',
        },
        itemStyle: {
          borderWidth: 300,
        },
        name: '2023年1月出勤天数',
        data: valData,
        type: 'line',
      },
    ],
  },
  media: [
    {
      query: {
        maxWidth: 500,
      },
      option: {
        series: [
          {
            lineStyle: {
              color: 'blue',
            },
          },
        ],
      },
    },
  ],
});
let isLoading = false;
document.querySelector('#loadMore').addEventListener('click', () => {
  if (isLoading) return;
  myChart.showLoading();
  isLoading = true;
  setTimeout(() => {
    xData = [...xData, createXdata()];
    valData = [...valData, createYdata()];
    myChart.setOption({
      xAxis: {
        data: xData,
      },
      series: {
        data: valData,
      },
    });
    myChart.hideLoading();
    isLoading = false;
  }, 500);
});
myChart.on('click', (e) => {
  console.log(e.name);
  console.log(e.data);
  // window.open(`https://www.baidu.com?time=${e.name}&val=${e.data}`);
});
