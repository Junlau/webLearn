/*
1）state
state是存储的单一状态，是存储的基本数据。

2）Getters
getters是store的计算属性，对state的加工，是派生出来的数据。就像computed计算属性一样，getter返回的值会根据它的依赖被缓存起来，且只有当它的依赖值发生改变才会被重新计算。

3）Mutations
mutations提交更改数据，使用store.commit方法更改state存储的状态。（mutations同步函数）

4）Actions
actions像一个装饰器，提交mutation，而不是直接变更状态。（actions可以包含任何异步操作）

5）Module
Module是store分割的模块，每个模块拥有自己的state、getters、mutations、actions。

6）辅助函数
Vuex提供了mapState、MapGetters、MapActions、mapMutations等辅助函数给开发在vm中处理store。
*/

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters.js'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
