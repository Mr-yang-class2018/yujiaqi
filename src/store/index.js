//引入插件
import Vue from 'vue'
import Vuex from 'vuex'
//引入外部文件
import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"
Vue.use(Vuex)

const state = {
  urlPath: 'http://106.12.85.17:8090/public/image',
  TabBar: {
    is_jd_TabBar: true,
    is_jx_TabBar: false,
  },
  //用户名数据
  userInfo: 1,
  //keep-leave
  keepExclude: 'Details,Cart',
  keepInclude: '',
  shopCart: {},
  shopCartLength:0,//购物车的数据数量
  loginRecords:'',//进入login的记录
  temp:null,
  ShippingAddress:'北京市昌平区马池口镇吉利大学'   //配送地址
}
const x = new Vuex.Store({
  state,      //状态管理数据
  mutations,  //定义事件
  getters,    //计算
  actions,    //异步请求
  modules: {} //模块
})
export default x
