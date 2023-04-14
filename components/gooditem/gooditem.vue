<template>
  <view class="good" @click="gotoGoodDetail(good)">
    <view class="pic">
      <image :src="good.goods_small_logo" mode=""></image>
    </view>
    <view class="info">
      <view class="info-title">
        {{good.goods_name}}
      </view>
      <view class="price">
        <!-- 使用filters处理数据 -->
        ￥{{good.goods_price | handlePrice}}
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "gooditem",
    data() {
      return {

      };
    },
    filters: {
      handlePrice(num) {
        return num.toFixed(2);
      }
    },
    props: ['good'],
    methods:{
      gotoGoodDetail(item){
        console.log(item);
        uni.navigateTo({
          url:"/subpkg/goods_detail/goods_detail?goods_id="+item.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">
  .good {
    height: 100%;
    display: flex;

    .pic {
      height: 100%;
      width: 200rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    // 文字
    .info {
      flex: 1;
      display: flex;
      font-size: 26rpx;
      flex-direction: column;
      justify-content: space-between;

      .price {
        color: #C00000;
        font-size: 32rpx;
      }
    }

  }
</style>