<template>
  <div>
    <!-- 文件上传 -->
    <!-- action为什么给#， 因为前面我们讲过了，我们要上传到腾讯云，需要自定义的上传方式,action给个#防止报错 -->
    <el-upload
      list-type="picture-card"
      :on-preview="preview"
      action="#"
      :limit="1"
      :file-list="fileList"
      :on-remove="removeFile"
      :on-change="changeFile"
      :http-request="upload"
      :before-upload="beforeUpload"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- 进度条组件 -->
    <el-progress
      v-if="showPercent"
      :percentage="percent"
      style="width: 180px"
    ></el-progress>
    <!-- 进度条组件 -->
    <!-- 文件预览 -->
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" alt="" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script>
import Cos from 'cos-js-sdk-v5' // 引入腾讯云的包
const cos = new Cos({ // 实例化的包 已经具有了上传的能力 可以上传到该账号里面的存储桶了
  SecretId: 'AKIDSnwsc8YfZM3Zv3xfDNL7jCSW9h7RccPx',
  SecretKey: 'To00oRt9CH9oLl26xfFd8TiV7YmnaAZs'
})
export default {
  filters: {},
  components: {},
  data () {
    return {
      showPercent: false,
      percent: 0,
      currentUid: '',
      fileList: [],
      showDialog: false,
      imgUrl: ''
    }
  },
  computed: {
    fileComputed () {
      return this.fileList.length === 1
    }
  },
  watch: {},
  created () { },
  methods: {
    // 上传前预览图片
    preview (file) {
      // console.log(file)
      // 将预览图片的地址赋给弹层里img的src
      this.imgUrl = file.url
      // 显示弹层
      this.showDialog = true
    },
    // 删除图片
    removeFile (file, fileList) {
      // file是删除的图片详情 fileList是空数组
      // console.log(file, fileList)
      // 将删除的文件剔除
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    // 当文件框的值发生变化 包括上传图片，上传成功，上传失败
    changeFile (file, fileList) {
      //  file是上传的图片详情 如果上传失败fileList是空数组
      this.fileList = fileList.map(item => item) // 将上传成功的图片信息赋给this.fileList
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeUpload (file) {
      // file是上传的文件
      // 先判断上传的类型是否满足要求
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      // 判断上传的图片的大小是否超过5M
      const maxSize = 5 * 1024 * 1024 // file的文件大小的单位是B 所以我们需要转换
      if (file.size > maxSize) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      // console.log(file)
      // 记住当前上传文件的uid
      this.currentUid = file.uid
      // 这里一定要return
      return true
    },
    // params是一个file对象，是我们需要上传到腾讯cos的内容
    upload (params) {
      // console.log(params) //是一个对象包含当前文件上传框的内容
      // console.log(params.file) // 是一个File文件对象 是上传的图片的信息
      if (params.file) {
        // 开始上传的时候显示进度条
        this.showPercent = true
        // 执行上传操作
        cos.putObject({
          Bucket: 'cynthia-123-1312866065', // 存储桶名称
          Region: 'ap-shanghai', // 存储桶地狱
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型
          onProgress: (progressData) => {
            this.percent = progressData.percent * 100
          }
        }, (err, data) => {
          console.log(err || data)
          // data.statusCode = 200时表示成功
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentUid) {
                // upload:true 表示上传成功
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
          }
          // 延时关闭进度条
          setTimeout(() => {
            this.showPercent = false
            this.percent = 0
          }, 1000)
          // console.log(this.fileList)
        })
      }
    }
  }
}
</script>

<style scoped>
::v-deep .disabled .el-upload--picture-card {
  display: none;
}
</style>
