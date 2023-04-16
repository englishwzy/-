import { mapGetters } from 'vuex'
const tabbarbadge = {
    onShow(){
      this.setBadge();
    },
    methods:{
      setBadge(){
          uni.setTabBarBadge({
            index:2,
            text:this.totalSum + "",
          })
      }
    },
    computed:{
      ...mapGetters("cart",['totalSum']),
    },
    // 监听totalsum变化，变化就重新调用设置标徽
    watch:{
      totalSum(){
        this.setBadge();
      }
    }
}
export default tabbarbadge;