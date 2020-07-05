<template>
  <div class="pos">
    <el-row>
      <el-col :span='7' class="pos-order" id="order-list">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table :data="tableData" border style="width: 100%" ref="goodsTable">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" width="50"></el-table-column>
              <el-table-column prop="price" label="金额" width="70"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" @click="deleteOrderListGoodsCount(scope.row)">删除</el-button>
                  <el-button type="text" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="allDiv">
              <small>数量：</small> {{allCount}} &nbsp &nbsp &nbsp &nbsp  <small>金额：</small> {{allMoney}}元
            </div>

            <div class="bottom-btn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger">删除</el-button>
              <el-button type="success">结账</el-button>
            </div>

          </el-tab-pane>
          <el-tab-pane label="挂单">
            挂单
          </el-tab-pane>
          <el-tab-pane label="外卖">
            外卖
          </el-tab-pane>
        </el-tabs>
      </el-col>

      <el-col :span='17' class="pos-goods">
        <div class="oftenGoods">
          <div class="title">
            常用商品
          </div>
          <div class="oftenGoods-list">
            <ul>
              <li v-for="goods in oftenGoods" @click="addOrderList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="o-price">￥{{goods.price}}元</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡" >
              <ul class="cookList">
                <li v-for="item in type0Goods" @click="addOrderList(item)">
                  <span class="foodImg"><img referrer="no-referrer|origin|unsafe-url" :src="item.goodsImg" width="100%"></span>
                  <span class="foodName">{{item.goodsName}}</span>
                  <span class="foodPrice">￥{{item.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食" >
              <ul class="cookList">
                <li v-for="item in type1Goods" @click="addOrderList(item)">
                  <span class="foodImg"><img referrer="no-referrer|origin|unsafe-url" :src="item.goodsImg" width="100%"></span>
                  <span class="foodName">{{item.goodsName}}</span>
                  <span class="foodPrice">￥{{item.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="饮料" >
              <ul class="cookList">
                <li v-for="item in type2Goods" @click="addOrderList(item)">
                  <span class="foodImg"><img referrer="no-referrer|origin|unsafe-url" :src="item.goodsImg" width="100%"></span>
                  <span class="foodName">{{item.goodsName}}</span>
                  <span class="foodPrice">￥{{item.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="套餐" >
              <ul class="cookList">
                <li v-for="item in type3Goods" @click="addOrderList(item)">
                  <span class="foodImg"><img referrer="no-referrer|origin|unsafe-url" :src="item.goodsImg" width="100%"></span>
                  <span class="foodName">{{item.goodsName}}</span>
                  <span class="foodPrice">￥{{item.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'pos',
  created:function(){
    axios.get('https://www.fastmock.site/mock/0bf6a5bae7eab8507e44b56191ddff36/vuepos/oftenGoods')
    .then(response => {
      // console.log(response.data['oftenGoods'])
      this.oftenGoods = response.data['oftenGoods'];
    })
    .catch(error=>{
      alert('网络错误，请重试')
    })

    axios.get('https://www.fastmock.site/mock/0bf6a5bae7eab8507e44b56191ddff36/vuepos/typeGoods')
    .then(response => {
      var dic0 = response.data['data'][0];
      this.type0Goods = Object.values(dic0);

      var dic1 = response.data['data'][1];
      this.type1Goods = Object.values(dic1);

      var dic2 = response.data['data'][2];
      this.type2Goods = Object.values(dic2);

      var dic3 = response.data['data'][3];
      this.type3Goods = Object.values(dic3);
    })
    .catch(error=>{
      alert('网络错误，请重试')
    })

  },
  mounted:function(){
    //设置order-list高度
    var orderHeight = document.body.clientHeight;
    console.log(orderHeight);
    document.getElementById("order-list").style.height = orderHeight+'px';
    // this.$refs.goodsTable.setCurrentRow(this.info,true)
  },
  data(){
    return {
      tableData: [],
      oftenGoods:[],
      type0Goods:[],
      type1Goods:[],
      type2Goods:[],
      type3Goods:[],
      allCount:0,
      allMoney:0
    }
  },
  methods:{
    addOrderList(goods) {
      this.allCount = 0;
      this.allMoney = 0;

      //判断商品是否已经在订单列表中
      var isHave = false;
      for(let i = 0; i < this.tableData.length; i++){
        if(this.tableData[i].goodsId == goods.goodsId) {
          isHave = true;
          break;
        }
      }
      if (isHave) {
        //利用filter进行筛选
        let arr = this.tableData.filter(o=>o.goodsId == goods.goodsId);
        arr[0].count++;
      } else {
        let newGoods = {goodsId:goods.goodsId, goodsName:goods.goodsName,price:goods.price,count:1};
        this.tableData.push(newGoods);
      }

      //计算汇总金额和数量
      for(let i = 0; i < this.tableData.length; i++){
        let item = this.tableData[i];
        this.allCount = this.allCount + item.count;
        this.allMoney = this.allMoney + (item.count * item.price);
      }
    },

    deleteOrderListGoodsCount(goods) {
      if (goods.count == 1) {
        this.tableData.pop(goods);
      } else {
        let arr = this.tableData.filter(o=>o.goodsId == goods.goodsId);
        arr[0].count--;
      }

      //计算汇总金额和数量
      this.allCount = 0;
      this.allMoney = 0;
      for(let i = 0; i < this.tableData.length; i++){
        let item = this.tableData[i];
        this.allCount = this.allCount + item.count;
        this.allMoney = this.allMoney + (item.count * item.price);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pos {
  margin-left:5%;
} 
.pos-order {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
  padding-left: 10px;
  padding-right: 10px;
}
.bottom-btn {
  margin-top: 10px;
}
.title {
  height: 20px;
  border-bottom: 1px solid #D3DCE6;
  background-color: #f9fafc;
  padding: 10px;
  text-align: left;
}
.pos-goods {
  background-color: #f9fafc;
}

.oftenGoods-list ul li {
  list-style: none;
  border: 1px solid #E5E9F2;
  float: left;
  padding: 10px;
  margin:5px;
  background-color:#fff;
  cursor: pointer;
}

.o-price {
  color:#58B7FF;
}

.goods-type {
  clear: both;
  margin-left: 5px;
  margin-right: 5px;
}

.cookList li {
  list-style: none;
  width: 23%;
  border: 1px solid #E5E9F2;
  height: auto;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
}

.cookList li span {
  display: block;
  float: left;
}

.foodImg {
  width: 40%;
  height: 80px;
}

.foodName {
  font-size: 18px;
  padding-left: 10px;
  padding-top: 10px;
  color: brown;
  width: 55%;
  text-align: left;
}

.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}

.allDiv {
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #D3DCE6;
  border-left: 1px solid #D3DCE6;
  border-right: 1px solid #D3DCE6;
}
</style>