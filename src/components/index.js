import PageTools from './pageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
import LangSelect from './lang'
import TagsView from './TagsView'
export default {
  install (Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('ScreenFull', ScreenFull)
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('LangSelect', LangSelect)
    Vue.component('TagsView', TagsView)
  }
}
