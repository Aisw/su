<template>
<div id="detail">
  <detail-nav-bar class="detail-nav"/>
  <scroll class="content" ref="scroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
    <detail-param-info :param-info="paramInfo"/>
  </scroll>
</div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import Scroll from "@/components/components/common/scroll/Scroll";

import {getDetail,Goods,Shop,GoodsParam} from "@/network/detail";

export default {
  name: "Detail",
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
    }
  },
  components:{
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,

    Scroll,
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
    })
  },
  methods:{
    imgLoad(){
      this.$refs.scroll.refresh();
    },
  }
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
