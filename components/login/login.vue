<template>
  <view class="login">
    <uni-icons type="contact-filled" size="100" color="rgb(175, 175, 175)"></uni-icons>
    <!-- opentype 和@getUserInfo搭配使用 -->
    <button type="warn" class="login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <view class="login-text">
      登录后尽享更多权益
    </view>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from "vuex"
  export default {
    name: "login",
    data() {
      return {

      };
    },
    
    methods: {
      ...mapMutations("user", ['updateUserInfo','updateToken']),
      getUserInfo(e) {
        console.log(e);
        if (e.detail.errMsg != "getUserInfo:ok") {
          return uni.$showMsg("您取消了登录授权");
        }
        console.log("e",e.detail);
        this.updateUserInfo(e.detail.userInfo);
        this.getToken(e.detail);
      },
      // 调用登录接口，换取永久的token
      async getToken(info) {
        const [err, res] = await uni.login({provider: 'weixin'}).catch(err => err);
        if (err || res.errMsg != "login:ok") {
          return uni.$showMsg("登录失败");
        }
        console.log(res.code);
        // 准备参数
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // 发请求获取token
        // const {data} =await uni.$http.post("/api/public/v1/users/wxlogin",query);
        // console.log(data);
        // if(data.meta.status !== 200){
        //   return uni.$showMsg("登录失败！");
        // }
        // uni.$showMsg('登录成功')
        
        // 因为appid不同，所以使用fade token
        const fade ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
        console.log(fade);
        this.updateToken(fade);
      }
    },
  }
</script>

<style lang="scss">
  .login {
    margin-top: 340rpx;
    text-align: center;
    padding: 0 40rpx;

    .login-btn {
      border-radius: 80rpx;
      padding: 0px;
      margin: 30rpx 0;
      background-color: #c00000;
    }

    .login-text {
      color: gray;
      font-size: 24rpx;
    }
  }
</style>