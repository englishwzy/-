<template>
  <view class="userInfo">
    <view class="pic">
      <image src="/static/uni.png" mode=""></image>
      <view class="nickname">
        long
      </view>
    </view>
    <view class="panel-list">
      <view class="panel-one">
        <view class="info">
          <view class="info-num">
            8
          </view>
          <view class="info-text">
            收藏的店铺
          </view>
        </view>
        <view class="info">
          <view class="info-num">
            14
          </view>
          <view class="info-text">
            收藏的商品
          </view>
        </view>
        <view class="info">
          <view class="info-num">
            18
          </view>
          <view class="info-text">
            关注的商品
          </view>
        </view>
        <view class="info">
          <view class="info-num">
            84
          </view>
          <view class="info-text">
            足迹
          </view>
        </view>
      </view>
      <view class="panel-two">
        <view class="title">
          我的订单
        </view>
        <view class="infolist">
          <view class="info">
            <view class="info-icon">
              <image src="/static/my-icons/icon1.png" mode=""></image>
            </view>
            <view class="info-text">
              待付款
            </view>
          </view>
          <view class="info">
            <view class="info-icon">
              <image src="/static/my-icons/icon2.png" mode=""></image>
            </view>
            <view class="info-text">
              待收货
            </view>
          </view>
          <view class="info">
            <view class="info-icon">
              <image src="/static/my-icons/icon3.png" mode=""></image>
            </view>
            <view class="info-text">
              退款/退货
            </view>
          </view>
          <view class="info">
            <view class="info-icon">
              <image src="/static/my-icons/icon4.png" mode=""></image>
            </view>
            <view class="info-text">
              全部订单
            </view>
          </view>
        </view>
      </view>
      <view class="panel-three">
        <view class="option-list">
          <view class="left">
            收货地址
          </view>
          <view class="right">
            <uni-icons type="right"></uni-icons>
          </view>
        </view>
        <view class="option-list">
          <view class="left">
            联系客服
          </view>
          <view class="right">
            <uni-icons type="right"></uni-icons>
          </view>
        </view>

        <view class="option-list" @click="logout">
          <view class="left">
            退出登录
          </view>
          <view class="right">
            <uni-icons type="right"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapMutations} from "vuex"
  export default {
    name: "userInfo",
    data() {
      return {

      };
    },
    methods:{
      ...mapMutations("user",['updateAddress','updateUserInfo','updateToken']),
      logout(){
        uni.showModal({
          title:"提示",
          content:"确认退出登录吗？",
          success:(res)=>{
            if(res.confirm){
              // 清空数据
              this.updateAddress({});
              this.updateUserInfo({});
              this.updateToken('');
            }else{
              
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .userInfo {
    height: 100%;
    background-color: #f4f4f4;
  }

  .pic {
    height: 400rpx;
    background-color: #c00000;
    text-align: center;

    image {
      width: 150rpx;
      height: 150rpx;
      border-radius: 150rpx;
      margin-top: 100rpx;
      border: 4rpx solid white;
      box-shadow: 0 2rpx 10rpx black;
    }

    .nickname {
      color: white;
      font-weight: bold;
      font-size: 32rpx;
      margin-top: 20rpx;
    }
  }


  .panel-list {
    position: relative;
    padding: 0 20rpx;
    top: -20rpx;

    .panel-one {
      background-color: #ffffff;
      height: 120rpx;
      border-radius: 10rpx;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .info {
        text-align: center;
      }
    }

    .panel-two {
      border-radius: 10rpx;
      margin-top: 20rpx;
      background-color: #fff;

      .title {
        height: 80rpx;
        line-height: 80rpx;
        padding-left: 20rpx;
        border-bottom: 2rpx solid #f4f4f4;
      }

      .infolist {
        height: 180rpx;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .info {
          text-align: center;

          .info-icon {
            image {
              width: 70rpx;
              height: 70rpx;
            }
          }
        }
      }
    }

      
    .panel-three{
      padding:0 20rpx;
      background-color: #fff;
      margin-top:20rpx;
      border-radius: 10rpx;
      .option-list{
        height:80rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>