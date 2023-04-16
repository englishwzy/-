const actions = {
  
}
const mutations = {
  updateAddress(state,address){
    state.address = address;
    uni.setStorageSync("address",state.address);
  }
}
const state = {
    address:uni.getStorageSync("address")||{},
}
const getters = {
    addressDetail(state){
      return state.address.provinceName + state.address.cityName +state.address.countyName + state.address.detailInfo;
    },
}
export default {
  namespaced:true,
  actions,
  mutations,
  state,
  getters
}