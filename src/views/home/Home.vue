<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load='true'
            @pullingUp="loadMore">

      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"> </home-recommend-view>
      <home-feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>

    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
import TabControl from "@/components/components/content/tabControl/TabControl";
import NavBar from "@/components/components/common/navBar/NavBar";

import {getHomeMultidata,getHomeGoods} from "@/network/home";
import {backTopMixin, itemListenerMixin} from "@/common/mixin";

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
import HomeFeatureView from "@/views/home/childComps/HomeFeatureView";
import GoodsList from "@/components/components/content/goods/GoodsList";
import Scroll from "@/components/components/common/scroll/Scroll";

export default {
name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    GoodsList,
    Scroll,
    TabControl,
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    //3.监听item中图片加载完成
      this.$bus.$on('itemImageLoad',() => {
        this.$refs.scroll && this.$refs.scroll.refresh()
      })
    },
  methods: {
    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })

    },
    //事件监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      this.isShow = (-position.y) > 1000;
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad(){
      //  2.获取tabcontroll的offsettop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    getScrollY(){
      return this.$refs.scroll.scroll ?this.$refs.scroll.scroll.y:0
    },
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.getScrollY();
    //取消全局监听事件
    this.$bus.$off('itemImageLoad',this.itemImageListener)
  },
}
</script>

<style scoped>

#home{
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;

  /*//浏览器原生滚动时不是导航栏滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index: 9;
}
</style>
