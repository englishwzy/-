<template>
  <view class="settle" v-if="cartList.length!==0">
    <label class="radio" @click="changeAll">
      <radio value="" :checked="isAll" color="#c00000" /><text>全选</text>
    </label>
    <view class="priceSum">
      合计:<text>￥{{selectPrice}}</text>
    </view>
    <button type="warn">结算<text>{{selectNum}}</text></button>
  </view>
  <view class="empty-cart" v-else>
      <image src="/static/cart_empty@2x.png" class="empty-img"></image>
      <text class="tip-text">空空如也~</text>
    </view>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapMutations
  } from "vuex";
  export default {
    name: "mysettle",
    data() {
      return {

      };
    },
    props: ['vh'],
    computed: {
      ...mapState("cart",['cartList']),
      ...mapGetters("cart", ['selectNum', 'sortNum','selectPrice']),
      isAll() {
        return this.sortNum == this.selectNum;
      }
    },
    methods: {
      changeAll() {
        console.log(this.isAll);
        this.updateCheckAll(this.isAll);
      },
      ...mapMutations("cart", ['updateCheckAll']),
    }
  }
</script>

<style lang="scss">
  .settle {
    width: 100%;
    position: fixed;
    align-items: center;
    justify-content: space-between;
    display: flex;
    background-color: #Fff;
    z-index: 999;
    bottom: 0;

    .radio {
      line-height: 100rpx;
    }

    .priceSum {
      text {
        color: #c00000;
      }
    }

    button {
      line-height: 100rpx;
      width: 200rpx;
      height: 100rpx;
      border-radius: 0;
      background-color: #c00000;
      margin: 0;

    }
  }

// 空购物车
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:280rpx;
  .empty-img {
    width: 180rpx;
    height: 180rpx;
  }
  .tip-text {
    font-size: 24rpx;
    color: gray;
    margin-top: 30rpx;
  }
}

</style>