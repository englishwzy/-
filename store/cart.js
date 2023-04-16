const actions = {
  addCart(context,good){
    // console.log("@@",good);
    context.commit("AddCart",good);
  }
}
const mutations ={
  AddCart(state,good){
    const cartList = state.cartList;
    
    const result = cartList.find((x)=>x.goods_id ==good.goods_id);
    console.log(result);
    if(result){
      // 返回的是一个对象，地址。会修改state原数据的值。
      result.goods_count++;
    }else{
      cartList.push(good);
    }
    uni.setStorageSync("cartList",cartList);
  },
  
  changeRadio(state,good){
  
    state.cartList.forEach(item=>{
      if(item.goods_id==good.goods_id){
        item.goods_state = good.goods_state;
      }
    })
    uni.setStorageSync("cartList",state.cartList);
  },
  
  updateCount(state,good){
     console.log(good);
     state.cartList.forEach(item=>{
       if(item.goods_id==good.goods_id){
         item.goods_count = good.goods_count;
       }
     })
      uni.setStorageSync("cartList",state.cartList);
  },
  // 删除
  removeCount(state,good){
    console.log("mutation",good);
    state.cartList = state.cartList.filter(item=>{
      return item.goods_id !=good.goods_id;
    })
    uni.setStorageSync("cartList",state.cartList);
  },
  // 全选或者全不选
  updateCheckAll(state,mode){
    if(mode==false){
      state.cartList.forEach(item=>{
        item.goods_state =true;
      })
    }else{
      state.cartList.forEach(item=>{
        item.goods_state =false;
      })
    }
    uni.setStorageSync("cartList",state.cartList);
  }
  
}
const state = {
    cartList:uni.getStorageSync("cartList")||[],
}
  
const getters = {
  totalSum(state){
    let num = 0;
    state.cartList.forEach((item)=>{
      // console.log(item);
      num += item.goods_count;
    })
    return num;
  },
  selectNum(state){
    let num = 0;
    state.cartList.forEach((item)=>{
      if(item.goods_state==true){
        num++;
      }
    })
    return num;
  },
  sortNum(state){
    let num =0;
    state.cartList.forEach((item)=>{
      num++;
    })
    return num;
  },
  // 已勾选的价格
  selectPrice(state){
    let sum = 0;
    state.cartList.forEach(item=>{
      if(item.goods_state){
        sum += item.goods_count*item.goods_price;
      }
    })
    return sum;
  }
  
}

const cart = {
    namespaced:true,
    actions,
    mutations,
    state,
    getters   
}
export default cart;