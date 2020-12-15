import {debounce} from "@/components/components/utils";
import BackTop from "@/components/components/content/backTop/BackTop";

export const itemListenerMixin = {
  data(){
    return{
      itemImageListener:null,
    }
  },
  mounted(){
    //1.图片加载完成的事件监听
    let refresh = debounce(this.$refs.scroll.refresh,50)
    //对监听事件进行保存
    this.itemImageListener = ()=>{
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImageListener)

  }
}

export const backTopMixin={
  components:{
    BackTop,
  },
  data(){
    return{
      isShow:{
        type:Boolean,
        default:false,
      },
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  }
}
