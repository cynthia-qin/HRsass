<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <el-form
              ref="userForm"
              :model="userInfo"
              :rules="rules"
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名" prop="username">
                <el-input
                  v-model="userInfo.username"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password2">
                <el-input
                  v-model="userInfo.password2"
                  type="password"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
            </el-form>
            <el-row type="flex" justify="center">
              <el-col :span="18">
                <el-button size="small" type="primary" @click="saveUser"
                  >更新</el-button
                >
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <component :is="componentName"></component>
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserInfoById } from '@/api/user'
import { saveUserDetails } from '@/api/employees'
import UserInfo from './components/userInfo.vue'
import JobInfo from './components/job-info.vue'
export default {
  filters: {},
  components: {
    UserInfo,
    JobInfo
  },
  data () {
    return {
      componentName: 'UserInfo',
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
        // eslint-disable-next-line indent
        { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserInfoById()
  },
  methods: {
    async getUserInfoById () {
      this.userInfo = await getUserInfoById(this.userId)
    },
    saveUser () {
      // 先校验表单
      this.$refs.userForm.validate().then(async () => {
        await saveUserDetails({
          ...this.userInfo,
          password: this.userInfo.password2
        })
        this.$message.success('修改个人信息成功')
      })
    }
  }
}
</script>

<style scoped>
</style>
