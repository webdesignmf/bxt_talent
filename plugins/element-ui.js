import Vue from 'vue'
import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/date-picker.css'
import 'element-ui/lib/theme-chalk/icon.css'
import { DatePicker } from 'element-ui'
locale.use(lang)
Vue.use(DatePicker)
