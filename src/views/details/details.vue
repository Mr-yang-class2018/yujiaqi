<style lang='less'>
#details {
  background-color: #f3f3f3;
  /* tabbar导航的数量*/
  /* @tabbar_length : 4;*/
  width: 100vw;
  height: 100vh;
  .detailsScroll {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
    .message {
      .shopInfo {
        border-radius: 10px;
      }
      .discount,
      .selected,
      .distribution,
      .weight,
      .freeFreight,
      .service {
        display: flex;
        min-height: 40px;
        background-color: #fff;
        position: relative;
        line-height: 30px;
        padding: 5px 10px;
        .left {
          flex: 1;
          text-align: left;
          padding-left: 15px;
        }
        .right {
          flex: 5;
          text-align: left;
          font-size: 12px;
          padding-right: 20px;
          div {
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box; /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
            -webkit-line-clamp: 1; /*用来限制在一个块元素显示的文本的行数。*/
            -webkit-box-orient: vertical; /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
            span {
              color: red;
              border: 1px solid red;
              margin-right: 5px;
            }
          }
          span.icon {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 16px;
          }
        }
      }
      .discount {
        height: 60px;
        border-radius: 10px;
        margin-top: 10px;
      }
      .selected {
        margin-top: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .distribution {
        p {
          padding-right: 40px;
        }
      }
      .service {
        text-align: left;
        padding-right: 30px;
        background-color: #fff;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        .icon {
          position: absolute;
          right: 10px;
          top: 10px;
        }
      }
    }
  }
}
</style>
<template>
  <div id="details" v-loading="loading">
    <details-nav-bar ref="detailsNavBar" :title="titleArr"></details-nav-bar>
    <scroll
      class="detailsScroll"
      ref="DetailsScroll"
      @parentScroll="getScrollY"
      :probeType="3"
    >
      <details-banner :dfeature="goodsImg"></details-banner>
      <div class="message">
        <!-- 商品信息 -->
        <details-base-info :goodsInfo="detailsGoods"></details-base-info>

        <!-- 优惠 -->
        <div class="discount" @click="open('discount')">
          <div class="left">优惠</div>
          <div class="right">
            <div><span>换购</span>是否有换购---有 显示,没有不选是</div>
            <div>
              <span>限购</span>是否有限购---有 显示,没有不选是 111 111 111 1 11
              11
            </div>
            <span class="icon el-icon-more"></span>
          </div>
        </div>
        <!-- 已选 -->
        <div class="selected" @click="open('selected')">
          <div class="left">已选</div>
          <div class="right">
            <span>规格....</span>
            <span>{{ orderSel.order_num }}个</span>
            <span class="icon el-icon-more"></span>
          </div>
        </div>
        <!-- 送至 -->
        <div class="distribution" @click="open('distribution')">
          <div class="left">送至</div>
          <div class="right">
            <p>{{ addr }}</p>
            <p>
              <span v-if="true" title="库存有货则显示">现货</span>
              {{ getDistributionTime }}
            </p>
            <span class="icon el-icon-more"></span>
          </div>
        </div>
        <!-- 重量   不免运费  显示重量   免运费  显示 运费-->
        <div class="freeFreight" v-if="free_freight">
          <div class="left">运费</div>
          <div class="right">
            <p>免运费</p>
            <span class="icon el-icon-more"></span>
          </div>
        </div>
        <div class="weight" v-else>
          <div class="left">重量</div>
          <div class="right">
            <p>不免运费，显示重量(kg)</p>
            <span class="icon el-icon-more"></span>
          </div>
        </div>

        <!-- 服务 -->
        <div class="service" @click="open('service')">
          <div class="left">服务</div>
          <div class="right">
            <span class="icon el-icon-more"></span>
          </div>
        </div>
      </div>

      <!--评价 自定义 一个变量数组 暂时使用 -->
      <details-evaluate
        :evaluate="detailsEvaluate"
        :cDetailsId="detailsId"
      ></details-evaluate>
      <!-- 问答 -->

      <!-- 体验 -->

      <!-- 商铺信息 -->
      <shops-info :shopsinfo="shopInfo"></shops-info>

      <!-- 推荐 -->
      <div style="height: 800px; background-color: #fff; margin-top: 10px">
        <ul>
          <li>推荐</li>
          <li>猜你喜欢</li>
        </ul>
      </div>
      <!-- 详情 -->
      <div style="height: 800px; background-color: #fff; margin-top: 10px">
        <h1>详情 = 文字 + 图片的组合</h1>
        <ul>
          <li>商品介绍</li>
          <li>规格参数</li>
          <li>售后服务</li>
        </ul>
      </div>

      <!-- 遮罩菜单 -->

      <el-drawer
        title="优惠"
        direction="btt"
        :close-on-press-escape="false"
        :visible.sync="discount"
        :append-to-body="true"
      >
        <span>我来啦!</span>
      </el-drawer>
      <el-drawer
        title="已选"
        direction="btt"
        :close-on-press-escape="false"
        :visible.sync="selected"
        :append-to-body="true"
        :withHeader="false"
      >
        <div>
          <div v-for="(item, index) in selectNorm" :key="index">
            <div v-for="(i, j) in item" :key="j">
              <div>{{ j }}</div>
              <div
                v-for="(m, n) in i"
                :key="n"
                style="
                  width: 90%;
                  height: 30px;
                  text-overflow: hidden;
                  overflow: hidden;
                  margin-bottom: 10px;
                  text-align: left;
                  background-color: #d4d4d4;
                  line-height: 30px;
                  margin-left: 5%;
                  border-radius: 15px;
                "
              >
                {{ m.name }}
              </div>
            </div>
          </div>
          <div class="order_num">
            <div>数量</div>
            <div>
              <button @click="order_num--" :disabled="orderSel.order_num <= 1">
                -
              </button>
              <input type="text" v-model="orderSel.order_num" />
              <button @click="orderSel.order_num++">+</button>
            </div>
          </div>
        </div>
      </el-drawer>
      <el-drawer
        title="配送至"
        direction="btt"
        :close-on-press-escape="false"
        :visible.sync="distribution"
        :append-to-body="true"
        custom-class="自定义类名"
      >
        <ul
          style="text-align: left; line-height: 20px; font-size: 14px"
          v-if="$store.state.userInfo"
        >
          <li
            style="padding: 10px 0"
            v-for="(item, index) in allAddress"
            :key="index"
            @click="changeAddr(item.takeover_addr)"
          >
            <!-- 使用过滤器吧地址进行拼接 -->
            {{ item.takeover_addr | changeAddr }}
          </li>
        </ul>
      </el-drawer>
      <el-drawer
        title="服务"
        direction="btt"
        :close-on-press-escape="false"
        :visible.sync="service"
        :append-to-body="true"
        :withHeader="false"
      >
        <span>服务</span>
      </el-drawer>
    </scroll>

    <details-tab-bar
      :addshopcart="addShop"
      :toaddorder="addOrder"
    ></details-tab-bar>
  </div>
</template>

<script>
import Scroll from "components/contents/scroll/Scroll";
//引入当前组件的子组件
import DetailsNavBar from "./childComp/DetailsNavBar";
import DetailsBanner from "./childComp/DetailsBanner";
import DetailsBaseInfo from "./childComp/DetailsBaseInfo";
import ShopsInfo from "./childComp/ShopsInfo";
import DetailsEvaluate from "./childComp/DetailsEvaluate";
import DetailsTabBar from "./childComp/DetailsTabBar";
//引入商品数据网络请求
// import {getgoods,getGoods_id} from 'network/goods'
import { getGoodsId } from "network/details.js";
import { get_user_address } from "network/address";
import { addShopCart } from "network/shopCart";
import { GoodsInfo, ShopInfo, SelectNorm, Evaluate } from "common/utils";
// import { GoodsInfo, ShopInfo} from "common/utils";
export default {
  name: "Details",
  props: {},
  data() {
    return {
      // path: "http://106.12.85.17:8090/public/image",
      titleArr: ["商品", "评价", "详情", "推荐"],
      detailsGoods: {}, //商品详情数据
      goodsImg: [], //轮播图数据
      shopInfo: {}, //商铺数据
      selectNorm: {}, // 规格数据
      detailsEvaluate: {}, // 商品评价
      currentIndex: 0,
      saveY: 0,
      tabCenter: null,
      loading: false, // 是否加载等待
      discount: false, //优惠遮罩层，不显示
      selected: false, // 选择遮罩层 不显示
      distribution: false, // 送至遮罩层 不显示
      service: false, //服务遮罩层不显示
      nowGoods: true,
      shopCategory: "", //商铺是个体还是自营
      addr: "", // 在本地存储取到的地址
      free_freight: 0, // 是否免运费  0 不免  1 免
      orderSel: {
        order_num: 1, //购买的商品数量
        norm: {},
      },
    };
  },
  components: {
    Scroll,
    DetailsNavBar,
    DetailsBanner,
    DetailsBaseInfo,
    ShopsInfo,
    DetailsEvaluate,
    DetailsTabBar,
  },
  computed: {
    getDistributionTime() {
      //获取配送的时间
      let nowTime = new Date();
      // let h = nowTime.getHours();
      let h = 20;
      let temp = "";
      if (this.shopCeatgory == "自营") {
        //jd自营
        if (this.aa) {
          //本地配送  +1
          if (h >= 0 && h < 11) {
            temp = `在11:00前下单，预计今天送达,${this.shopCategory}`;
          }
          if (h > 11 && h < 23) {
            temp = `在23:00前下单，预计明天( ${this.setDate(nowTime, 1)})送达,${
              this.shopCategory
            }`;
          }
          if (h >= 23) {
            temp = `在明天(11:00)前下单,预计明天(${this.setDate(
              nowTime,
              1
            )})17:00前送达,${this.shopCategory}`;
          }
        } else {
          //异地配送  +2
          if (h >= 0 && h < 11) {
            temp = `在11:00前下单，预计${this.setWeek(
              nowTime,
              3
            )}(${this.setDate(nowTime, 2)})送达,${this.shopCategory}`;
          }
          if (h > 11 && h < 23) {
            temp = `在23:00前下单，预计${this.setWeek(
              nowTime,
              3
            )}(${this.setDate(nowTime, 3)})送达,${this.shopCategory}`;
          }
          if (h >= 23) {
            temp = `在明天(11:00)前下单,预计${this.setWeek(
              nowTime,
              3
            )}(${this.setDate(nowTime, 3)})17:00前送达,${this.shopCategory}`;
          }
        }
      } else {
        // 个体
        if (h >= 0 && h < 11) {
          temp = `在11:00前下单，预计今天送达,${this.shopCategory}`;
        }
        if (h > 11 && h < 23) {
          temp = `在23:00前下单，预计${this.setWeek(nowTime, 3)}(${this.setDate(
            nowTime,
            3
          )})送达,${this.shopCategory}`;
        }
        if (h >= 23) {
          temp = `在明天(11:00)前下单,预计${this.setWeek(
            nowTime,
            3
          )}(${this.setDate(nowTime, 3)})17:00前送达,${this.shopCategory}`;
        }
      }
      return temp;
    },
    allAddress() {
      return this.$store.state.allAddress;
    },
  },

  watch: {
    order_num(val) {
      console.log(val);
    },
  },
  activated() {},
  mounted() {
    this.$bus.$on("toDE", (path) => {
      this.isShow = true;
      this.$refs.DetailsScroll.scroll.scrollTo(0, -path * 800, 200);
      this.$refs.detailsNavBar.currentIndex = this.titleArr[path];
    });
    this.tabCenter = this.$refs.detailsNavBar.$el.querySelector(".tabCenter");
    // console.log(this.tabCenter);
  },
  methods: {
    //通过id获取商品的方法
    getGoods(data) {
      //页面等待
      this.loading = true;
      getGoodsId(data).then((res) => {
        if (res.code != 200) return;
        console.log(res);
        // 获取轮播数据
        this.goodsImg = res.data.goodsData.img_detalis_list;
        // 商品数据

        this.detailsGoods = new GoodsInfo(
          res.data.goodsData,
          res.data.shopData
        );
        // 取店铺数据
        this.shopInfo = new ShopInfo(res.data.shopData);
        console.log(this.detailsGoods);
        // 取规格数据
        this.selectNorm = new SelectNorm(
          res.data.norms,
          res.data.relationGoods
        );
        // this.getNorm(res.data.norms,res.data.relationGoods)

        //获取评价
        this.detailsEvaluate = new Evaluate(res.data.sevaluateDate);
        console.log(this.detailsEvaluate);
        //自营 还是个体

        this.shopCategory = res.data.shopData.category;
        //是否免运费
        this.free_freight = res.data.goodsData.free_freight == 0 ? false : true;
        console.log(this.free_freight);
        this.loading = false;
      });
    },
    //在滚动的时候计算 tabCenter的显示，以及tanCenter的显示
    getScrollY(position) {
      if (-position.y <= 0) return;
      if (-position.y < 0) this.tabCenter.style.display = "none";
      else this.tabCenter.style.display = "flex";
      this.$refs.detailsNavBar.$el.style.background = `rgba(255,255,255,${
        -position.y / 100
      })`;
      this.tabCenter.style.opacity = `${-position.y / 100}`;
      this.tabCenter.style.filter = `opacity(${-position.y})`;
      this.$refs.detailsNavBar.currentIndex = this.titleArr[
        parseInt(-position.y / 800)
      ];
    },
    //tabCenter 点击后跳转滚动条位置

    // 设置一下送至的地址
    setAddr() {
      let address = this.$store.state.ShoppingAddress;
      let arr = address.takeover_addr.split(",");
      arr.pop();
      let temp = [];
      console.log(arr);
      for (let elem of arr.values()) {
        if (temp.indexOf(elem) == -1) {
          temp.push(elem);
        }
      }
      if (temp.length == 3) temp.pop();
      return temp.join(" ");
    },
    changeAddr(val) {
      console.log(val);
      let arr = val.split(",");
      //过滤数组，排除重复值
      //拼接到页面中
      //存到本地存储中，存储的数据，不去存截取后得值，直接存原值
      this.addr = arr.join("");
      let path = window.location.origin + "/jd";
      let data = window.localStorage.getItem(path);
      if (data != null) {
        data = JSON.parse(data);
      } else {
        data = {};
      }
      data.orderAddr = val;
      window.localStorage.setItem(path, JSON.stringify(data));
      this.distribution = false;
    },
    getAddr() {
      let path = window.location.origin + "/jd";
      let data = window.localStorage.getItem(path);
      if (data != null) {
        data = JSON.parse(data);
        if (data.orderAddr != null) {
          this.addr = data.orderAddr;
        } else {
          this.addr = "北京市,北京市,九九九";
          data.orderAddr = "北京市,北京市,九九九";
        }
      } else {
        this.addr = "北京市,北京市,九九九";
        data = {};
        data.orderAddr = "北京市,北京市,九九九";
      }
      window.localStorage.setItem(path, JSON.stringify(data));
    },
    setDate(nowtime = new Date(), val = 1) {
      let calculationTime = new Date(
        nowtime.getTime() + val * 24 * 60 * 60 * 1000
      );
      let a = `${calculationTime.getMonth()}月${calculationTime.getDate()}日`;
      return a;
    },
    setWeek(nowtime = new Date(), day = 4) {
      let setDay = nowtime.getDay();
      if (setDay + day > 7) {
        return "下周" + num(setDay + day - 7);
      } else {
        return "本周" + num(setDay + day);
      }
      //取值
      function num(temp) {
        let a = "";
        switch (temp) {
          case 7:
            a = "日";
            break;
          case 1:
            a = "一";
            break;
          case 2:
            a = "二";
            break;
          case 3:
            a = "三";
            break;
          case 4:
            a = "四";
            break;
          case 5:
            a = "五";
            break;
          case 6:
            a = "六";
            break;
        }
        return a;
      }
    },
    open(val) {
      if (val == "discount") {
        this.discount = true;
      }
      if (val == "selected") {
        this.selected = true;
      }
      if (val == "distribution") {
        this.distribution = true;
        if (!this.$store.state.userInfo) {
          //点击配送至--如果用户没有登陆，应该先让他登录，再获取数据
          this.$router.path("/login");
          return;
        }
        if (this.allAddress == null) {
          get_user_address({
            user_id: this.$store.state.userInfo.id,
          }).then((res) => {
            console.log(res);
            this.$store.state.allAddress = res.data;
          });
        }
      }
      if (val == "service") {
        this.service = true;
      }
    },
    getNorm(norm, relation) {
      this.selectNorm = {};
      let aaa = {};
      if (norm.length > 0) {
        for (let i = 0; i < norm.length; i++) {
          if (!aaa[norm[i].ggname]) {
            aaa[norm[i].ggname] = [];
          }
          aaa[norm[i].ggname].push(norm[i]);
        }
      }
      this.selectNorm.norm = aaa;
      let bbb = {};
      if (relation.length > 0) {
        for (let i = 0; i < relation.length; i++) {
          console.log(bbb);
          if (!bbb[relation[i].relation_name]) {
            bbb[relation[i].relation_name] = [];
          }
          bbb[relation[i].relation_name].push(relation[i]);
        }
      }
      this.selectNorm.relation = bbb;
      console.log(this.selectNorm);
    },
    addShop() {
      console.log("执行力添加购物车");
      let shopCart = {};
      shopCart.goods_id = this.detailsId;
      shopCart.user_id = this.$store.state.userInfo
        ? this.$store.state.userInfo.id
        : "";
      shopCart.num = this.orderSel.order_num;
      //需要计算取值
      shopCart.norm = JSON.stringify(this.orderSel.norm); //传递json串
      shopCart.takeover_addr = this.addr;
      if (this.$store.state.userInfo) {
        //请求购物车
        console.log("用户存在");
        addShopCart(shopCart).then((res) => {
          console.log(res);
        });
      } else {
        console.log("用户不存在");
        let path = window.location.origin + "/jd";
        let data = window.localStorage.getItem(path);
        if (data != null && data != "") {
          data = JSON.parse(data);
          let temp = 0;
          if (data.shopCart && data.shopCart.length > 0) {
            for (let i = 0; i < data.shopCart.length; i++) {
              if (
                data.shopCart[i].goods_id == shopCart.goods_id &&
                data.shopCart[i].norm == shopCart.norm &&
                data.shopCart[i].takeover_addr == shopCart.takeover_addr
              ) {
                data.shopCart[i].num += shopCart.num * 1;
                break;
              }
              temp++;
            }
            if (temp == data.shopCart.length) {
              data.shopCart.push(shopCart);
            }
          } else {
            data.shopCart = [];
            data.shopCart.push(shopCart);
          }
        } else {
          data = {};
          data.shopCart = [];
          data.shopCart.push(shopCart);
        }
        //...shopCart是否存在，存在添加数据，不存在创建数据
        this.$store.state.shopCartLength = 0;
        data.shopCart.forEach((item) => {
          console.log(item);
          this.$store.state.shopCartLength += item.num * 1;
        });
        window.localStorage.setItem(path, JSON.stringify(data));
      }
    },
    addOrder() {
      console.log("执行力添加购物车2");
    },
  },
  //查看本地存储是否存有购物车数据
  lookLocalStorage(){
    if(!this.$store.state.userInfo){
      let path = window.location.origin + "/jd";
      let data = window.localStorage.getItem(path);
      if(data == null || data == "") return
      if(!data.shopCart) return
      this.calculactionStorageShopNum(data.shopCart)
    }
  },
  calculactionStorageShopNum(arr){
    this.$store.state.shopCartLength = 0;
    arr.forEach((item) => {
      this.$store.state.shopCartLength += item.num*1
    })
  },
  filters: {
    changePrice(val, str = "$") {
      return str + Number(val).toFixed(2);
    },
    changeEvaluate(val) {
      console.log(val);
      return val;
    },
    changeAddr(val) {
      let addr = val.split(",").join("");
      return addr;
    },
  },
};
</script>

