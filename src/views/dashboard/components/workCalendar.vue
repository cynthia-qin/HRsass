<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select
        v-model="currentYear"
        style="width: 120px"
        size="small"
        @change="dateChange"
      >
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <el-select
        v-model="currentMonth"
        style="width: 120px; margin-left: 10px"
        size="small"
        @change="dateChange"
      >
        <el-option
          v-for="item in 12"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template #dateCell="{ date, data }">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay (value) {
      const date = value.split('-')[2]
      return date.startsWith('0') ? date.substr(1) : date
    }
  },
  components: {},
  props: {
    // 表示当前选择的年 如果没有选择 就默认是当前年
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data () {
    return {
      yearList: [], // 表示可选的所有年份
      currentYear: '', // 当前年份
      currentMonth: null, // 当前月份
      currentDate: null // 当前日期
    }
  },
  computed: {},
  watch: {},
  created () {
    // 获取选择的开始时间
    this.currentYear = this.startDate.getFullYear()
    // 根据选择的时间 创建前五年加后五年的年份数组
    this.yearList = Array.from(Array(11), (value, index) => index + this.currentYear - 5)
    // 获取当前月份
    this.currentMonth = this.startDate.getMonth() + 1
    // 初始化时间后 主动调用方法 让日历时间和选择器时间关联起来
    this.dateChange()
  },
  methods: {
    dateChange () {
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}`)
    },
    isWeek (date) {
      return date.getDay() === 6 || date.getDay() === 0
    }
  }
}
</script>

<style  scoped>
::v-deep .el-calendar-day {
  height: auto;
}
::v-deep .el-calendar-table__row td,
::v-deep .el-calendar-table tr td:first-child,
::v-deep .el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
::v-deep .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
::v-deep .el-calendar__header {
  display: none;
}
</style>
