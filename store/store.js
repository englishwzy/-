import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);
import cart from "store/cart.js"
import user from "store/user.js"
const store = new Vuex.Store({
  modules:{
    cart,
    user
  }
})
console.log(store);
export default store;