<template>
  <view class="settle" v-if="cartList.length!==0">
    <label class="radio" @click="changeAll">
      <radio value="" :checked="isAll" color="#c00000" /><text>全选</text>
    </label>
    <view class="priceSum">
      合计:<text>￥{{selectPrice}}</text>
    </view>
    <button type="warn" @click="settle">结算<text>{{selectNum}}</text></button>
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
        second: 3,
        timer: null,
      };
    },
    props: ['vh'],
    computed: {
      ...mapState("cart", ['cartList']),
      ...mapGetters("cart", ['selectNum', 'sortNum', 'selectPrice']),
      ...mapState("user", ['address','token']),
      ...mapGetters("user", ['addressDetail']),
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
      ...mapMutations("user", ['updateRedirect']),
      // 结算
      settle() {
        // 判断是否登录，是否已选地址，勾选商品是否为空
        if (this.token == '') {
          console.log(1);
          // uni.$showMsg("还未登录,"+this.second+"秒后跳转登录页面");
          this.updateRedirect({
            opentype: "reLaunch",
            url: "/pages/cart/cart",
          })
          return this.showSecond();
        }
        if (this.selectNum == 0) {
          return uni.$showMsg("请选择商品！");
        }
        if (!this.address.userName) {
          return uni.$showMsg("请选择收货地址！");
        }
        this.getOrder(); //成功之后调用获取订单的函数
      },
      showSecond() {
        this.showTips(this.second)
        this.timer = setInterval(() => {
          this.second--;
          if (this.second <= 0) {
            clearInterval(this.timer);
            uni.reLaunch({
              url: '/pages/my/my',
            })
            return;
          }
          this.showTips(this.second);
        }, 1000)

      },
      showTips(n) {
        // 调用 uni.showToast() 方法，展示提示消息
        uni.showToast({
          // 不展示任何图标
          icon: 'none',
          // 提示的消息
          title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
          // 为页面添加透明遮罩，防止点击穿透
          mask: true,
          // 1.5 秒后自动消失
          duration: 1500
        })
      },
      async getOrder() {
        const goods = this.cartList.filter(item => {
          return item.goods_state != false;
        })
        const arr = [];
        goods.forEach(item => {
          let obj = {
            goods_id: item.goods_id,
            goods_number: item.goods_count,
            goods_price: item.goods_price,
          };
          arr.push(obj);
        })
        // console.log(arr);
        let query = {
          order_price: "0.01",
          consignee_addr: this.addressDetail,
          goods: arr,
        }
        const {
          data
        } = await uni.$http.post('/api/public/v1/my/orders/create', query);
        if (data.meta.status !== 200) {
          return uni.$showMsg("创建订单失败");
        }
        const order_number = data.message.order_number;
        // console.log(data,order_number);
        const result = await uni.$http.get("/api/public/v1/my/orders/all",{type:1});
        console.log(result);
       
      }
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
    margin-top: 280rpx;

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