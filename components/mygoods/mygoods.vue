<template>
  <view class="box">
    <view class="left">
      <radio value="" color="#C00000" v-if="showRadio" @click="radioHandler" :checked="goods.goods_state" />
      <image :src="goods.goods_small_logo" mode=""></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">
        {{goods.goods_name}}
      </view>
      <view class="goods-info-box">
        <view class="price">
          ￥{{goods.goods_price}}.00
        </view>
        <view class="count">
          <uni-number-box :min="1" :value="goods.goods_count" v-if="showNumber" @change="numChange"
            ></uni-number-box>
            <!-- 这里的uni-number-box已经对数据处理过了 -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "mygoods",
    data() {
      return {

      };
    },
    methods: {
      radioHandler() {
        this.$emit("radioChange", {
          // 商品的 Id
          goods_id: this.goods.goods_id,
          // 商品最新的勾选状态
          goods_state: !this.goods.goods_state
        });
      },
      // 数量发生变化
      numChange(count) {
        // console.log(count);
        if(count==this.goods.goods_count){
          return;
        }
        this.$emit("countChange", {
          goods_id: this.goods.goods_id,
          goods_count: count,
        });

      },
    },
    props: {
      goods: {
        type: Object,
        default: {},
      },
      showRadio: {
        type: Boolean,
        default: false,
      },
      showNumber: {
        type: Boolean,
        default: true,
      }
    }
  }
</script>

<style lang="scss">
  .box {
    // width:750rpx;
    display: flex;
    padding: 20rpx 10rpx;
    border-bottom: 2rpx solid #e2e2e2;

    .left {
      display: flex;
      align-items: center;
      margin-right: 10rpx;

      image {
        width: 200rpx;
        height: 200rpx;
      }
    }

    .goods-item-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 26rpx;
      }

      .goods-info-box {
        display: flex;
        justify-content: space-between;
        color: #c00000;

        .price {
          font-size: 32rpx;
        }
      }

    }

  }
</style>