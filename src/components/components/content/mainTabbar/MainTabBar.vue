<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <tab-bar>
      <tab-bar-item path="/home">
          <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
          <img slot="item-icon-active" src="~assets/img/tabbar/home_red.png" alt="">
          <div slot="item-text">首页</div>
      </tab-bar-item>

      <tab-bar-item path="/category">
          <img slot="item-icon" src="~assets/img/tabbar/category.png" alt="">
          <img slot="item-icon-active" src="~assets/img/tabbar/category_red.png" alt="">
          <div slot="item-text">分类</div>
      </tab-bar-item>

      <tab-bar-item path="/shop">
          <img slot="item-icon" src="~assets/img/tabbar/shopcar.png" alt="">
          <img slot="item-icon-active" src="~assets/img/tabbar/shopcar_red.png" alt="">
          <div slot="item-text">购物车</div>
      </tab-bar-item>

      <tab-bar-item path="/profile">
          <img slot="item-icon" src="~assets/img/tabbar/profile.png" alt="">
          <img slot="item-icon-active"src="~assets/img/tabbar/profile_red.png" alt="">
          <div slot="item-text">我的</div>
      </tab-bar-item>

    </tab-bar>

  </div>
</template>

<script>
import TabBar from "@/components/components/common/tabbar/TabBar";
import TabBarItem from "@/components/components/common/tabbar/TabBarItem";
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>
  /*@import "@assets/css/base.css";*/
</style>
