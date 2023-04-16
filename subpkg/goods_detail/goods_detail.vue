<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="pic in goods_info.pics" :key="pic.pics_id">
        <view class="swiper-item">
          <image :src="pic.pics_mid" mode=""></image>
        </view>
      </swiper-item>
    </swiper>
    <view class="good-info-box" v-if="goods_info.goods_name">
      <view class="price">
        ￥{{goods_info.goods_price}}
      </view>
      <view class="good-info-body">
        <view class="body-title">
          {{goods_info.goods_name}}
        </view>
        <view class="body-icon">
          <uni-icons type="star"></uni-icons>
          <view>收藏</view>
        </view>
      </view>
      <view class="good-info-footer">
        快递：免运费
      </view>
    </view>

    <view class="good-introduction">
      <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    </view>

    <uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="onClick"
      @buttonClick="addCart2" class="nav" />
  </view>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from "vuex";
  export default {
    data() {
      return {
        goods_info: {},
        options: [{
            text: "客服",
            icon: "chat",

          },
          {
            icon: 'shop',
            text: '店铺',
            info: 2,
            infoBackgroundColor: '#007aff',
            infoColor: "#f5f5f5"
          }, {
            icon: 'cart',
            text: '购物车',
            info: 0
          }
        ],
        customButtonGroup: [{
            text: '加入购物车',
            backgroundColor: 'linear-gradient(90deg, #1E83FF, #0053B8)',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
            color: '#fff'
          }
        ],
      };
    },
    onLoad(value) {
      console.log("sss", value.goods_id);
      this.getGoodInfo(value.goods_id || value.good_id);
      // 使用watch的复杂形式代替带onload中写
      // this.options[2].info = this.totalSum;
    },
    methods: {
      ...mapActions("cart", ["addCart"]),
      async getGoodInfo(id) {
          const {
            statusCode,
            data
          } = await uni.$http.get("/api/public/v1/goods/detail?goods_id=" + id);
          if (statusCode != 200) {
            return uni.$showMsg();
          }
          data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ')
          this.goods_info = data.message;
          // 获取数据。
          console.log(this.goods_info);
        }

        // 右侧按钮点击事件
        ,
      addCart2(e) {

        if (e.content.text == "加入购物车") {
          // console.log(e);
          const good = {
            goods_id: this.goods_info.goods_id, // 商品的Id
            goods_name: this.goods_info.goods_name, // 商品的名称
            goods_price: this.goods_info.goods_price, // 商品的价格
            goods_count: 1, // 商品的数量
            goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
            goods_state: true // 商品的勾选状态
          }
          // dispatch到action中
          this.addCart(good);
        }
      },
      // 左侧点击事件
      onClick(e) {
        console.log(e);
        if (e.content.text == '购物车') {
          uni.reLaunch({
            url: "/pages/cart/cart"
          })
        }
      }

    }

    ,
    computed: {
      ...mapGetters("cart", ['totalSum']),
    },
    watch: {
      // totalSum(newValue,old){
      //   // console.log(newValue,old);
      //   this.options[2].info = newValue;
      // }
      totalSum: {
        handler(newValue, old) {
          // console.log(newValue,old);
          this.options[2].info = newValue;
        },
        immediate:true,
      }
    }
  }
</script>

<style lang="scss">
  $red: #C00000;

  .nav {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  swiper {
    width: 100%;
    height: 760rpx;

    swiper-item {
      width: 100%;
      height: 100%;

      .swiper-item {
        height: 100%;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  // 商品说明
  .good-info-box {
    padding: 20rpx;
    padding-right: 0;

    .price {
      color: $red;
      margin: 20rpx 0;
    }

    .good-info-body {
      display: flex;
      align-items: center;
      font-size: 26rpx;

      .body-icon {
        width: 160rpx;
        text-align: center;
        border-left: 1px solid #e0e0e0;
      }

      .body-title {
        flex: 1;
        margin-right: 20rpx;
      }
    }

    .good-info-footer {
      margin: 20rpx 0;
      color: gray;
    }

  }
</style>