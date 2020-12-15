<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list ></cart-list>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "@/components/components/common/navBar/NavBar";
import CartList from "@/views/shop/childComps/CartList";
import CartBottomBar from "@/views/shop/childComps/CartBottomBar";
import {mapGetters} from 'vuex'


export default {
  name: "Shop",
  data(){
    return{
    }
  },
  computed:{
    ...mapGetters([
      "cartLength"
    ])
  },
  components:{
    NavBar,
    CartList,
    CartBottomBar
  }
}
</script>

<style scoped>

.nav-bar{
  background-color: var(--color-tint);
  color: #f6f6f6;
  font-weight: 700;
}
.cart{
  height: 100vh;
}
</style>
