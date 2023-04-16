<template>
  <view class="cartpage">
    <view class="address">
        <myaddress></myaddress>
    </view>
    <view class="cartTitle">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title">购物车</text>
    </view>
    <uni-swipe-action>
      <view class="cartList" v-for="list in cartList" :key="list.goods_id">
        <uni-swipe-action-item  :right-options="options" @click="swipeActionClickHandler(list)">
          <mygoods :goods="list" :showRadio="true" @radioChange="radioChange" @countChange="countChange"></mygoods>
        </uni-swipe-action-item>
      </view>
    </uni-swipe-action>
    <mysettle></mysettle>
  </view>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapMutations
  } from "vuex";
  import tabbar from "@/mixins/tabbar-badge.js"
  export default {
    onShow(){
      const result = uni.getWindowInfo();
      this.vh = result.windowHeight-46;
      // 暂时不使用
    },
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }],
        vh:0,
      };
    },
    onLoad() {
      console.log(this.cartList);
    },
    computed: {
      ...mapState("cart", ['cartList'])
    },
    methods: {
      ...mapMutations("cart", ['changeRadio', 'updateCount','removeCount']),
      radioChange(e) {
        console.log(e);
        this.changeRadio(e);
      },
      // 自定义事件，接收到数量变化
      countChange(newcount) {
        // console.log(newcount);
        this.updateCount(newcount);
      },
      // 点击了滑动按钮
      swipeActionClickHandler(good) {
          this.removeCount(good);
      }
    },
    mixins: [tabbar],
  }
</script>

<style lang="scss">
  .cartpage{
    position: relative;
  }
  .address{
    height:180rpx;
  }
 
  
  
  .cartTitle {
    // border:1px solid red;
    height: 80rpx;
    line-height: 80rpx;
    padding-left: 10rpx;
    border-bottom: 2rpx solid #e2e2e2;

    .cart-title {
      margin-left: 20rpx;
    }
  }

  .cartList {}
</style>