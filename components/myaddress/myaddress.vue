<template>
  <view class="box">
    <view class="add-address" v-if="!address.userName">
      <button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
    </view>
    <view class="address-info" v-else>
      <view class="info">
        <view class="receiver-info">
          <view class="name">
            收货人:{{address.userName}}
          </view>
          <view class="phone">
            电话：{{address.telNumber}}
          </view>
        </view>
        <view class="address-detail">
          收货地址:{{addressDetail}}
        </view>
      </view>
      <view class="icon" @click="chooseAddress">
        <uni-icons type="right" size="40" color="#c4c4c4"></uni-icons>
      </view>

    </view>
    <image src="/static/cart_border@2x.png" mode="" class="pic"></image>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState,
    mapGetters
  } from "vuex"
  export default {
    name: "myaddress",
    data() {
      return {

      };
    },
    methods: {
      async chooseAddress() {
        // 第一项为错误，第二项为成功之后返回的参数
        const [err, suc] = await uni.chooseAddress();
        if (suc && suc.errMsg === 'chooseAddress:ok') {
          this.updateAddress(suc);
        }
        if (err && err.errMsg == "chooseAddress:fail auth deny"|| err.errMsg === 'chooseAddress:fail authorize no response') {
          this.reAuth(); //重新发起授权申请
        }

      },
      async reAuth() {
        // 3.1 提示用户对地址进行授权
        const [err2, confirmResult] = await uni.showModal({
          content: '检测到您没打开地址权限，是否去设置打开？',
          confirmText: "确认",
          cancelText: "取消",
        })

        // 3.2 如果弹框异常，则直接退出
        if (err2) return

        // 3.3 如果用户点击了 “取消” 按钮，则提示用户 “您取消了地址授权！”
        if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')

        // 3.4 如果用户点击了 “确认” 按钮，则调用 uni.openSetting() 方法进入授权页面，让用户重新进行授权
        if (confirmResult.confirm) return uni.openSetting({
          // 3.4.1 授权结束，需要对授权的结果做进一步判断
          success: (settingResult) => {
            // 3.4.2 地址授权的值等于 true，提示用户 “授权成功”
            if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
            // 3.4.3 地址授权的值等于 false，提示用户 “您取消了地址授权”
            if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
          }
        })
      },
      ...mapMutations("user", ['updateAddress']),
    },
    computed: {
      ...mapGetters("user", ['addressDetail']),
      ...mapState("user", ['address']),
    }
  }
</script>

<style lang="scss">
  .box {
    position: relative;
    height: 100%;

    .address-info {
      display: flex;
      align-items: center;
      padding: 40rpx 10rpx;

      .info {
        flex: 1;

        .receiver-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25rpx;
        }
      }

      .icon {
        width: 80rpx;
      }
    }

    .add-address {
      display: flex;
      text-align: center;
      align-items: center;
      height: 100%;
    }

    .pic {
      position: absolute;
      bottom: -10rpx;
      height: 10rpx;
      width: 100%;
    }
  }
</style>