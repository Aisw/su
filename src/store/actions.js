import {ADD_COUNT,ADD_TO_CART} from "@/store/mutation-type";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct){
        context.commit(ADD_COUNT,oldProduct)
        resolve('当前商品数量+1')
      }else{
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新商品')
      }
    })

    // let oldProduct = null
    // for (let item of state.cartList) {
    //   if (item.iid == payload.iid) {
    //     oldProduct = item;
    //   }
    // }
    // if (oldProduct) {
    //   oldProduct.count += 1;
    // } else {
    //   payload.count = 1;
    //   state.cartList.push(payload);
    // }


    // let index = state.cartList.indexOf(payload)
    // if (index === -1){
    //   let oldProduct = state.cartList[index]
    //   oldProduct.count += 1;
    // }else{
    //   payload.count = 1;
    //   state.cartList.push(payload)
    // }
  }
}
