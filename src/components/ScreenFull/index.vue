<template>
  <div>
    <svg-icon
      icon-class="fullscreen"
      style="color: #fff; width: 20px; height: 20px"
      @click="changeScreen"
    />
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  filters: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    changeScreen () {
      if (!ScreenFull.isEnabled) {
        this.$message.warning('此时全屏模式不可用')
        return
      }
      // 显示或关闭全屏
      ScreenFull.toggle()
    }
  }
}
</script>

<style scoped>
</style>
