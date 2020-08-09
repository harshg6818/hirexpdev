<template>
  <div id="chartdiv"></div>
</template>

<script>
// import 'amcharts3';
// import 'amcharts3/amcharts/xy';
// import 'amcharts3/amcharts/serial';
import 'amstock3/amcharts/amstock';
import 'amstock3/amcharts/serial';
import 'amstock3/amcharts/amcharts';
// import 'amcharts3/amcharts/plugins/';

export default {
  name: 'RateTrend',

  props: {
    trendData1: {
      required: false,
      type: Object
    }
  },

  data () {
    return {
      trendData: {
        // Ahmedabad: [
        //   {
        //     key: '2020/06',
        //     completed_chats: 1,
        //     total_chats: 1,
        //     disengaged_users: 0,
        //     driverAverage: 3.5,
        //     participation_rate: 100,
        //   },
        //   {
        //     key: '2019/09',
        //     completed_chats: 1,
        //     total_chats: 1,
        //     disengaged_users: 1,
        //     driverAverage: 2.5,
        //     participation_rate: 100,
        //   },
        // ],
        // Bangalore: [
        //   {
        //     key: '2020/01',
        //     completed_chats: 6,
        //     total_chats: 8,
        //     disengaged_users: 0,
        //     driverAverage: 4.12,
        //     participation_rate: 75,
        //   },
        //   {
        //     key: '2020/02',
        //     completed_chats: 1,
        //     total_chats: 3,
        //     disengaged_users: 0,
        //     driverAverage: 4.7,
        //     participation_rate: 33.33,
        //   },
        //   {
        //     key: '2019/09',
        //     completed_chats: 8,
        //     total_chats: 9,
        //     disengaged_users: 1,
        //     driverAverage: 3.74,
        //     participation_rate: 88.89,
        //   },
        //   {
        //     key: '2019/10',
        //     completed_chats: 10,
        //     total_chats: 11,
        //     disengaged_users: 0,
        //     driverAverage: 4.28,
        //     participation_rate: 90.91,
        //   },
        //   {
        //     key: '2019/11',
        //     completed_chats: 3,
        //     total_chats: 3,
        //     disengaged_users: 0,
        //     driverAverage: 4.3,
        //     participation_rate: 100,
        //   },
        //   {
        //     key: '2019/12',
        //     completed_chats: 1,
        //     total_chats: 3,
        //     disengaged_users: 1,
        //     driverAverage: 2.2,
        //     participation_rate: 33.33,
        //   },
        // ],
        // Chennai: [
        //   {
        //     key: '2019/10',
        //     completed_chats: 8,
        //     total_chats: 9,
        //     disengaged_users: 0,
        //     driverAverage: 4.24,
        //     participation_rate: 88.89,
        //   },
        //   {
        //     key: '2019/11',
        //     completed_chats: 2,
        //     total_chats: 2,
        //     disengaged_users: 0,
        //     driverAverage: 4.3,
        //     participation_rate: 100,
        //   },
        // ],
        // Delhi: [
        //   {
        //     key: '2019/09',
        //     completed_chats: 7,
        //     total_chats: 7,
        //     disengaged_users: 0,
        //     driverAverage: 4.14,
        //     participation_rate: 100,
        //   },
        // ],
        // Gurgaon: [
        //   {
        //     key: '2019/09',
        //     completed_chats: 6,
        //     total_chats: 6,
        //     disengaged_users: 1,
        //     driverAverage: 3.4,
        //     participation_rate: 100,
        //   },
        // ],
        // 'Gurugram, Haryana, India': [
        //   {
        //     key: '2020/05',
        //     completed_chats: 1,
        //     total_chats: 1,
        //     disengaged_users: 0,
        //     driverAverage: 3.5,
        //     participation_rate: 100,
        //   },
        // ],
        Mumbai: [
          {
            key: '2020/01',
            completed_chats: 6,
            total_chats: 7,
            disengaged_users: 0,
            driverAverage: 4.1,
            participation_rate: 85.71
          },
          {
            // key: '2020/03',
            key: '2020/02',
            completed_chats: 1,
            total_chats: 25,
            disengaged_users: 0,
            driverAverage: 4.5,
            participation_rate: ''
          },
          {
            // key: '2020/05',
            key: '2020/03',
            completed_chats: 3,
            total_chats: 28,
            disengaged_users: 2,
            driverAverage: 2.77,
            participation_rate: ''
          },
          {
            // key: '2020/06',
            key: '2020/04',
            completed_chats: 7,
            total_chats: 21,
            disengaged_users: 6,
            driverAverage: 0.71,
            participation_rate: ''
          },
          {
            // key: '2019/10',
            key: '2020/05',
            completed_chats: 11,
            total_chats: 12,
            disengaged_users: 1,
            driverAverage: 4.19,
            participation_rate: ''
          },
          {
            // key: '2019/11',
            key: '2020/06',
            completed_chats: 4,
            total_chats: 4,
            disengaged_users: 0,
            driverAverage: 4.3,
            participation_rate: ''
          }
        ],
        Pune: [
          {
            key: '2020/01',
            completed_chats: 10,
            total_chats: 21,
            disengaged_users: 0,
            driverAverage: 4.3,
            participation_rate: 47.62
          },
          {
            // key: '2020/03',
            key: '2020/02',
            completed_chats: 1,
            total_chats: 25,
            disengaged_users: 0,
            driverAverage: 4.5,
            participation_rate: 4
          },
          {
            // key: '2020/05',
            key: '2020/03',
            completed_chats: 3,
            total_chats: 28,
            disengaged_users: 2,
            driverAverage: 2.77,
            participation_rate: 10.71
          },
          {
            // key: '2020/06',
            key: '2020/04',
            completed_chats: 7,
            total_chats: 21,
            disengaged_users: 6,
            driverAverage: 0.71,
            participation_rate: 33.33
          },
          {
            // key: '2019/10',
            key: '2020/05',
            completed_chats: 11,
            total_chats: 12,
            disengaged_users: 1,
            driverAverage: 4.19,
            participation_rate: 91.67
          },
          {
            // key: '2019/11',
            key: '2020/06',
            completed_chats: 4,
            total_chats: 4,
            disengaged_users: 0,
            driverAverage: 4.3,
            participation_rate: 100
          }
        ]
      },
      harsh: []
    };
  },

  mounted () {
    // this.chart();
    this.test();
    this.createMultiTrend();
  },

  methods: {
    test () {
      this.$lodash.each(this.trendData, (val, key) => {
        const dataPoints = [];
        this.$lodash.each(val, (v) => {
          const t = {};
          t.value = parseInt(v.participation_rate, 10);
          // t.key = new Date(v.key);
          // t.date = new Date(v.key);
          t.date = v.key;
          console.log('newDate', t.date);
          dataPoints.push(t);
        });
        // console.log(dataPoints);
        const temp = {
          title: key,
          fieldMappings: [{
            // fromField: 'participation_rate',
            fromField: 'value',
            toField: 'value'
            // toField: 'participation_rate',
          }],
          // dataProvider: val,
          dataProvider: dataPoints,
          categoryField: 'date',
          compared: false
        };
        this.harsh.push(temp);
      });
      console.log('this.harsh', this.harsh);
    },

    chart () {
      window.AmCharts.makeChart('chartdiv', {
        type: 'xy',
        theme: 'none',
        marginRight: 10,
        dataDateFormat: 'YYYY-MM-DD',
        startDuration: 0.5,
        trendLines: [],
        // balloon: {
        //   adjustBorderColor: false,
        //   shadowAlpha: 0,
        //   fixedPosition: true,
        // },
        graphs: [{
          balloonText: "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
          bullet: 'diamond',
          maxBulletSize: 25,
          lineAlpha: 0.8,
          lineThickness: 2,
          // lineColor: '#b0de09',
          lineColor: '#edebf5',
          fillAlphas: 0,
          xField: 'date',
          yField: 'ay',
          valueField: 'aValue'
        }, {
          balloonText: "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
          bullet: 'round',
          maxBulletSize: 25,
          lineAlpha: 0.8,
          lineThickness: 2,
          // lineColor: '#fcd202',
          lineColor: '#dbd8eb',
          fillAlphas: 0,
          xField: 'date',
          yField: 'by',
          valueField: 'bValue'
        }, {
          balloonText: "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
          bullet: 'round',
          maxBulletSize: 25,
          lineAlpha: 0.8,
          lineThickness: 2,
          // lineColor: '#DC143C',
          lineColor: '#c9c5e1',
          fillAlphas: 0,
          xField: 'date',
          yField: 'cy',
          valueField: 'cValue'
        }, {
          balloonText: "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
          bullet: 'round',
          maxBulletSize: 25,
          lineAlpha: 0.8,
          lineThickness: 2,
          // lineColor: '#00008B',
          lineColor: '#b7b1d7',
          fillAlphas: 0,
          xField: 'date',
          yField: 'dy',
          valueField: 'dValue'
        }, {
          balloonText: "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
          bullet: 'round',
          maxBulletSize: 25,
          lineAlpha: 0.8,
          lineThickness: 2,
          // lineColor: '#006400',
          lineColor: '#a59ece',
          fillAlphas: 0,
          xField: 'date',
          yField: 'ey',
          valueField: 'eValue'
        }, {
          balloonText: "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
          bullet: 'round',
          maxBulletSize: 25,
          lineAlpha: 0.8,
          lineThickness: 2,
          // lineColor: '#FF8C00',
          lineColor: '#938bc4',
          fillAlphas: 0,
          xField: 'date',
          yField: 'fy',
          valueField: 'fValue'
        }, {
          balloonText: "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
          bullet: 'round',
          maxBulletSize: 25,
          lineAlpha: 0.8,
          lineThickness: 2,
          // lineColor: '#483D8B',
          lineColor: '#8177ba',
          fillAlphas: 0,
          xField: 'date',
          yField: 'gy',
          valueField: 'gValue'
        }, {
          balloonText: "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
          bullet: 'round',
          maxBulletSize: 25,
          lineAlpha: 0.8,
          lineThickness: 2,
          // lineColor: '#FFD700',
          lineColor: '#6f64b0',
          fillAlphas: 0,
          xField: 'date',
          yField: 'hy',
          valueField: 'hValue'
        }, {
          balloonText: "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
          bullet: 'round',
          maxBulletSize: 25,
          lineAlpha: 0.8,
          lineThickness: 2,
          // lineColor: '#00FA9A',
          lineColor: '#5d51a6',
          fillAlphas: 0,
          xField: 'date',
          yField: 'iy',
          valueField: 'iValue'
        }, {
          balloonText: "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
          bullet: 'round',
          maxBulletSize: 25,
          lineAlpha: 0.8,
          lineThickness: 2,
          // lineColor: '#FFFF00',
          lineColor: '#4c3e9d',
          fillAlphas: 0,
          xField: 'date',
          yField: 'jy',
          valueField: 'jValue'
        }],
        valueAxes: [{
          id: 'ValueAxis-1',
          axisAlpha: 0
        }, {
          id: 'ValueAxis-2',
          axisAlpha: 0,
          position: 'bottom'
        }, {
          id: 'ValueAxis-3',
          axisAlpha: 0,
          position: 'top'
        }, {
          id: 'ValueAxis-4',
          axisAlpha: 0,
          position: 'bottom'
        }, {
          id: 'ValueAxis-5',
          axisAlpha: 0,
          position: 'bottom'
        }, {
          id: 'ValueAxis-6',
          axisAlpha: 0,
          position: 'bottom'
        }, {
          id: 'ValueAxis-6',
          axisAlpha: 0,
          position: 'bottom'
        }, {
          id: 'ValueAxis-7',
          axisAlpha: 0,
          position: 'bottom'
        }, {
          id: 'ValueAxis-8',
          axisAlpha: 0,
          position: 'bottom'
        }, {
          id: 'ValueAxis-9',
          axisAlpha: 0,
          position: 'bottom'
        }, {
          id: 'ValueAxis-10',
          axisAlpha: 0,
          position: 'bottom'
        }],
        allLabels: [],
        titles: [],
        dataProvider: [{
          date: 1,
          ay: 2.5,
          by: 4.2,
          cy: 6.2,
          dy: 8.2,
          ey: 10.2,
          fy: 12.2,
          gy: 16.5,
          hy: 11.5,
          iy: 19.5,
          jy: 20.5,
          aValue: 15,
          bValue: 10
          // cValue: 6,
          // dValue: 9,
          // eValue: 7,
          // fValue: 12,
          // gValue: 6,
          // hValue: 8,
          // iValue: 3,
          // jValue: 1,
        }, {
          date: 5,
          ay: 7.3,
          by: 4.9,
          cy: 6.2,
          dy: 10.2,
          ey: 8.2,
          fy: 11.2,
          gy: 13.5,
          hy: 15.5,
          iy: 17.5,
          jy: 14.5,
          aValue: 8,
          bValue: 3
          // cValue: 6,
          // dValue: 9,
          // eValue: 7,
          // fValue: 12,
          // gValue: 6,
          // hValue: 8,
          // iValue: 3,
          // jValue: 1,
        }, {
          date: 10,
          ay: 9.3,
          by: 5.1,
          cy: 6.2,
          dy: 4.2,
          ey: 7.2,
          fy: 11.2,
          gy: 13.5,
          hy: 10.5,
          iy: 15.5,
          jy: 19.5,
          aValue: 10,
          bValue: 20
          // cValue: 18,
          // dValue: 6,
          // eValue: 8,
          // fValue: 12,
          // gValue: 17,
          // hValue: 5,
          // iValue: 3,
          // jValue: 6,
        }, {
          date: 15,
          ay: 2.9,
          by: 6.3,
          cy: 7.2,
          dy: 9.2,
          ey: 11.2,
          fy: 9.2,
          gy: 14.5,
          hy: 12.5,
          iy: 18.5,
          jy: 20.5,
          aValue: 9,
          bValue: 8
          // cValue: 6,
          // dValue: 9,
          // eValue: 7,
          // fValue: 12,
          // gValue: 6,
          // hValue: 8,
          // iValue: 3,
          // jValue: 1,
        }],
        // ],
        export: {
          enabled: false
        }

        // chartScrollbar: {
        //   offset: 15,
        //   scrollbarHeight: 5,
        // },

        // chartCursor: {
        //   pan: true,
        //   cursorAlpha: 0,
        //   valueLineAlpha: 0,
        // },
      });
    },
    createMultiTrend () {
      const chartData1 = [];
      const chartData2 = [];
      const chartData3 = [];
      const chartData4 = [];
      // const chartData5 = [];
      // const chartData6 = [];
      // const chartData7 = [];
      // const chartData8 = [];
      // const chartData9 = [];
      // const chartData10 = [];

      const test1 = [{ value: 47 }, { value: 4 }, { value: 10 }, { value: 33 }, { value: 91 }, { value: 100 }];
      const test2 = [];

      // generateChartData();

      // function generateChartData() {
      const firstDate = new Date();
      firstDate.setDate(firstDate.getDate());
      firstDate.setHours(0, 0, 0, 0);
      // let a1 = 1500;
      // let a2 = 1700;
      // let a3 = 1600;
      // let a4 = 1400;
      // let a5 = 1400;
      // let a6 = 1400;
      // let a7 = 1400;
      // let a8 = 1400;
      // let a9 = 1400;
      // let a10 = 1400;
      // let a1 = 0;
      // let a2 = 0;
      // let a3 = 0;
      // let a4 = 0;
      // let a5 = 0;
      // let a6 = 0;
      // let a7 = 0;
      // let a8 = 0;
      // let a9 = 0;
      // let a10 = 0;

      test1.forEach((val, index) => {
        const newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + index);
        const t = {
          ...val
        };
        t.date = newDate;
        test2.push(t);
      });

      for (let i = 0; i < 12; i++) {
        const newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);
        // a1 += Math.round((Math.random() < 0.5 ? 2 : 1) * Math.random() * 10);
        // a2 += Math.round((Math.random() < 0.5 ? 2 : 1) * Math.random() * 10);
        // a3 += Math.round((Math.random() < 0.5 ? 2 : 1) * Math.random() * 10);
        // a4 += Math.round((Math.random() < 0.5 ? 2 : 1) * Math.random() * 10);
        // a5 += Math.round((Math.random() < 0.5 ? 2 : 1) * Math.random() * 10);
        // a6 += Math.round((Math.random() < 0.5 ? 2 : 1) * Math.random() * 10);
        // a7 += Math.round((Math.random() < 0.5 ? 2 : 1) * Math.random() * 10);
        // a8 += Math.round((Math.random() < 0.5 ? 2 : 1) * Math.random() * 10);
        // a9 += Math.round((Math.random() < 0.5 ? 2 : 1) * Math.random() * 10);
        // a10 += Math.round((Math.random() < 0.5 ? 2 : 1) * Math.random() * 10);
        const a1 = Math.round(Math.random() * (100 + i)) + 100 + i;
        const a2 = Math.round(Math.random() * (100 + i)) + 200 + i;
        const a3 = Math.round(Math.random() * (100 + i)) + 300 + i;
        const a4 = Math.round(Math.random() * (100 + i)) + 400 + i;
        // console.log('a1', a1);
        chartData1.push({
          date: newDate,
          value: a1,
          key: 'harsh1'
        });
        chartData2.push({
          date: newDate,
          value: a2,
          key: 'harsh2'
        });
        chartData3.push({
          date: newDate,
          value: a3,
          key: 'harsh3'
        });
        chartData4.push({
          date: newDate,
          value: a4,
          key: 'harsh4'
        });
        // chartData5.push({
        //   date: newDate,
        //   value: a5,
        //   key: 'harsh5',
        // });
        // chartData6.push({
        //   date: newDate,
        //   value: a6,
        //   key: 'harsh6',
        // });
        // chartData7.push({
        //   date: newDate,
        //   value: a7,
        // });
        // chartData8.push({
        //   date: newDate,
        //   value: a8,
        // });
        // chartData9.push({
        //   date: newDate,
        //   value: a9,
        // });
        // chartData10.push({
        //   date: newDate,
        //   value: a10,
        // });
        // console.log('chartData10', chartData1);
      }
      // console.log('test2', test2);
      // const trendChart = AmCharts.makeChart('chartdiv', {
      window.AmCharts.makeChart('chartdiv', {
        type: 'stock',
        theme: 'none',
        dataSets: this.harsh,
        // dataSets: [
        // {
        //   title: 'second data set',
        //   fieldMappings: [{
        //     fromField: 'value',
        //     toField: 'value',
        //   }],
        //   dataProvider: chartData2,
        //   categoryField: 'date',
        // }, {
        //   title: 'third data set',
        //   fieldMappings: [{
        //     fromField: 'value',
        //     toField: 'value',
        //   }],
        //   dataProvider: chartData3,
        //   categoryField: 'date',
        // },
        // {
        //   title: 'fourth data set',
        //   fieldMappings: [{
        //     fromField: 'value',
        //     toField: 'value',
        //   }],
        //   dataProvider: chartData4,
        //   categoryField: 'date',
        // },

        //   {
        //     title: 'fifth data set',
        //     fieldMappings: [{
        //       fromField: 'value',
        //       toField: 'value',
        //     }],
        //     dataProvider: chartData5,
        //     categoryField: 'date',
        //   },
        //   {
        //     title: 'sixth data set',
        //     fieldMappings: [{
        //       fromField: 'value',
        //       toField: 'value',
        //     }],
        //     dataProvider: chartData6,
        //     categoryField: 'date',
        //   },
        //   {
        //     title: 'seven data set',
        //     fieldMappings: [{
        //       fromField: 'value',
        //       toField: 'value',
        //     }],
        //     dataProvider: chartData7,
        //     categoryField: 'date',
        //   },
        //   {
        //     title: 'eight data set',
        //     fieldMappings: [{
        //       fromField: 'value',
        //       toField: 'value',
        //     }],
        //     dataProvider: chartData8,
        //     categoryField: 'date',
        //   },
        //   {
        //     title: 'nine data set',
        //     fieldMappings: [{
        //       fromField: 'value',
        //       toField: 'value',
        //     }],
        //     dataProvider: chartData9,
        //     categoryField: 'date',
        //   },
        //   {
        //     title: 'ten data set',
        //     fieldMappings: [{
        //       fromField: 'value',
        //       toField: 'value',
        //     }],
        //     dataProvider: chartData10,
        //     categoryField: 'date',
        // },
        // ],
        panels: [{
          showCategoryAxis: true,
          title: 'Value',
          percentHeight: 100,
          // valueAxes: [{
          //   minimum: 0,
          //   maximum: 100,
          //   autoGridCount: false,
          //   gridCount: 11,
          // }],
          stockGraphs: [{
            // id: 'g1',
            // valueField: 'participation_rate',
            valueField: 'value',
            comparable: true,
            compareField: 'value',
            // compareField: 'participation_rate',
            // balloonText: '[[title]]:<b>[[participation_rate]]</b>',
            balloonText: '[[title]]:<b>[[value]]</b>',
            // compareGraphBalloonText: '[[title]]:<b>[[participation_rate]]</b>',
            compareGraphBalloonText: '[[title]]:<b>[[value]]</b>'
          }],
          stockLegend: {
            // valueTextComparing: '[[value]]',
            valueTextComparing: '[[participation_rate]]',
            periodValueTextComparing: '[[title]]'
            // periodValueTextRegular: '[[title]]',
          }
        }],
        // chartCursor: {
        //   enabled: true,
        //   categoryBalloonDateFormat: 'MMM YYYY',
        // },
        chartScrollbarSettings: {
          enabled: false
        },
        chartCursorSettings: {
          valueBalloonsEnabled: true,
          fullWidth: true,
          cursorAlpha: 0.1,
          valueLineBalloonEnabled: true,
          valueLineEnabled: true,
          valueLineAlpha: 0.5
        },
        panelsSettings: {
          recalculateToPercents: 'never'
        },
        // valueAxes: [{
        //   minimum: 0,
        //   maximum: 100,
        //   autoGridCount: false,
        //   gridCount: 11,
        // }],
        // dataDateFormat: 'YYYY-MM',
        // categoryAxis: {
        //   minPeriod: 'MM',
        //   parseDates: true,
        // },
        // periodSelector: {
        //   position: 'left',
        //   periods: [{
        //     period: 'MM',
        //     selected: true,
        //     count: 1,
        //     label: '1 month',
        //   }, {
        //     period: 'YYYY',
        //     count: 1,
        //     label: '1 year',
        //   }, {
        //     period: 'YTD',
        //     label: 'YTD',
        //   }, {
        //     period: 'MAX',
        //     label: 'MAX',
        //   }],
        // },
        dataSetSelector: {
          position: 'right',
          listHeight: 600,
          comboBoxSelectText: 'bottom'
          // listner: {'dataSetCompared', this.loadDataSetData()},
        },
        export: {
          enabled: false
        }
      });
      // console.log('this.harsh[7].dataProvider', this.harsh[7].dataProvider);
      // trendChart.dataSets.push({
      //   title: 'first data set',
      //   fieldMappings: [{
      //     fromField: 'value',
      //     toField: 'value',
      //   }],
      //   dataProvider: test2,
      //   // dataProvider: this.harsh[7].dataProvider,
      //   categoryField: 'date',
      // });
      // trendChart.addListener('rendered', () => {
      // eslint-disable-next-line prefer-destructuring
      // const chart = event.chart;
      // eslint-disable-next-line no-use-before-define
      //   trendChart.dataSetSelector.addListener('dataSetCompared', loadDataSetData);
      // // });
      // function loadDataSetData(ev) {
      //   console.log('ev', ev);
      //   // this.$forceUpdate();
      //   ev.chart.validateData();
      // }
    }
  }
};
</script>

<style lang="scss">
#chartdiv {
  width: 100%;
  height: 100%;
  .amChartsCompareList {
    // overflow: hidden !important;
    .amcharts-compare-item-div {
      height: 30px !important;
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      align-items: center !important;
    }
  }
}
</style>
