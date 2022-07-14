<template>
  <el-dropdown trigger="click" @command="changeLang">
    <!-- 这里必须要加div 转成行内块元素 -->
    <div>
      <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="$i18n.locale === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="$i18n.locale === 'en'" command="en"
          >en</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'
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
    changeLang (lang) {
      Cookie.set('language', lang)
      this.$i18n.locale = lang
    }
  }
}
</script>

<style scoped>
</style>
