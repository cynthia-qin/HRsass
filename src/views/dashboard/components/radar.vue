<template>
  <div ref="radar" class="radar-echart"></div>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core' // 按需引入
// 引入柱状图图表，图表后缀都为 Chart
import { RadarChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  RadarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

export default {
  filters: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.radar)
    // 绘制图表
    myChart.setOption({
      title: {
        text: '基础雷达图'
      },
      legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      },
      radar: {
        // shape: 'circle',
        // 每个区域的最高值
        indicator: [
          { name: '工作效率', max: 100 },
          { name: '考勤', max: 100 },
          { name: '积极性', max: 100 },
          { name: '帮助同事', max: 100 },
          { name: '自主学习', max: 100 },
          { name: '正确率', max: 100 }
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: [10, 1, 100, 5, 100, 0],
            name: '张三'
          },
          {
            value: [50, 50, 50, 50, 50, 10],
            name: '李四'
          }
        ]
      }]
    })
  },
  methods: {}
}
</script>

<style scoped>
.radar-echart {
  width: 600px;
  height: 400px;
}
</style>
