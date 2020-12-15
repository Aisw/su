<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
  <scroll class="content" ref="scroll" @scroll="contentsScroll" :probe-type="3">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imgLoad"/>
    <detail-param-info :param-info="paramInfo" ref="itemParams"/>
    <detail-comment-info :comment-info="commentInfo" ref="itemComments"/>
    <goods-list :goods="recommends" ref="itemRecommends"/>
  </scroll>
  <back-top @click.native="backClick" v-show="isShow"/>
  <toast :message="message" :show="show"/>
  <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
</div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import GoodsList from "@/components/components/content/goods/GoodsList";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import Toast from "@/components/components/common/toast/Toast";

import Scroll from "@/components/components/common/scroll/Scroll";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";
import {debounce} from "@/components/components/utils";
import {backTopMixin, itemListenerMixin} from "@/common/mixin";

export default {
  name: "Detail",
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      message:'',
      show:false,
    }
  },
  components:{
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Toast,

    Scroll,
    GoodsList,
  },
  created() {
    this.iid = this.$route.params.iid
    //请求数据
    getDetail(this.iid).then(res => {
      const data = res.result
      //头部轮播数据
      this.topImages =data.itemInfo.topImages

      //获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //创建店铺信息
      this.shop = new Shop(data.shopInfo);

      //获取商品详情数据
      this.detailInfo = data.detailInfo;

    //  获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

      this.$nextTick(()=>{
        //根据最新的数据，对应的DOM已经渲染出来，但是图片依然没有加载完成
        // this.themTopYs = [];
        // this.themTopYs.push(0);
        // this.themTopYs.push(this.$refs.itemParams.$el.offsetTop);
        // this.themTopYs.push(this.$refs.itemComments.$el.offsetTop);
        // this.themTopYs.push(this.$refs.itemRecommends.$el.offsetTop);
        // console.log(this.themTopYs)
      })

    })
    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
    //getThemeTopY赋值
    this.getThemeTopY = debounce(()=>{
      this.themTopYs = [];
      this.themTopYs.push(0);
      this.themTopYs.push(this.$refs.itemParams.$el.offsetTop);
      this.themTopYs.push(this.$refs.itemComments.$el.offsetTop);
      this.themTopYs.push(this.$refs.itemRecommends.$el.offsetTop);
    })
  },
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemImageListener )
  },
  methods:{
    imgLoad(){
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themTopYs[index],200);
    },
    contentsScroll(position){
      const positionY = -position.y;
      let length = this.themTopYs.length;
      for (let i=0;i<=length-1;i++){
        if ((this.currentIndex !== i) && (i<length-1 && positionY>=this.themTopYs[i] && positionY<this.themTopYs[i+1]) ||
          (i === length-1 && positionY>=this.themTopYs[i])){
          this.currentIndex = i;
          console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //是否回到顶部
      this.isShow = (-position.y) > 1000;
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    //加入购物车
    addToCart(){
      const product ={}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 将商品加入到购物车成功
      this.$store.dispatch('addCart',product).then(res => {
        this.message = res;
        this.show = true;

        setTimeout(()=>{
          this.show = false;
          this.message = '';
        },1500)
      })

    }
  },
}
</script>

<style scoped>

#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px);
}
</style>
