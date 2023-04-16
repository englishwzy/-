const actions = {
  
}
const mutations = {
  updateAddress(state,address){
    state.address = address;
    uni.setStorageSync("address",state.address);
  },
  updateUserInfo(state,info){
    state.userInfo = info;
    uni.setStorageSync("userInfo",state.userInfo);
  },
  updateToken(state,token){
    state.token = token;
     uni.setStorageSync("token",state.token);
     console.log(state.token);
  },
  updateRedirect(state,info){
    state.redirect = info;
    uni.setStorageSync("redirect",state.redirect);
  }
}
const state = {
    address:uni.getStorageSync("address")||{},
    userInfo:uni.getStorageSync("userInfo")||{},
    token:uni.getStorageSync("token")||"",
    redirect:uni.getStorageSync("redirect")||{},
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