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
                  <el-button type="text">删除</el-button>
                  <el-button type="text">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
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

      <el-col span='17' class="pos-goods">
        <div class="oftenGoods">
          <div class="title">
            常用商品
          </div>
          <div class="oftenGoods-list">
            <ul>
              <li v-for="goods in oftenGoods">
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
                <li v-for="item in type0Goods">
                  <span class="foodImg"><img referrer="no-referrer|origin|unsafe-url" :src="item.goodsImg" width="100%"></span>
                  <span class="foodName">{{item.goodsName}}</span>
                  <span class="foodPrice">￥{{item.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食" >
              汉堡
            </el-tab-pane>
            <el-tab-pane label="饮料" >
              汉堡
            </el-tab-pane>
            <el-tab-pane label="套餐" >
              汉堡
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'pos',
  mounted:function(){
    //设置order-list高度
    var orderHeight = document.body.clientHeight;
    console.log(orderHeight);
    document.getElementById("order-list").style.height = orderHeight+'px';
    // this.$refs.goodsTable.setCurrentRow(this.info,true)
  },
  data(){
    return {
      tableData: [{
          goodsName: '可口可乐',
          price: 8,
          count:1
        }, {

          goodsName: '香辣鸡腿堡',
          price: 15,
          count:1
        }, {

          goodsName: '爱心薯条',
          price: 8,
          count:1
        }, {

          goodsName: '甜筒',
          price: 8,
          count:1
        }],
      oftenGoods:[
          {
              goodsId:1,
              goodsName:'香辣鸡腿堡',
              price:18
          }, {
              goodsId:2,
              goodsName:'田园鸡腿堡',
              price:15
          }, {
              goodsId:3,
              goodsName:'和风汉堡',
              price:15
          }, {
              goodsId:4,
              goodsName:'快乐全家桶',
              price:80
          }, {
              goodsId:5,
              goodsName:'脆皮炸鸡腿',
              price:10
          }, {
              goodsId:6,
              goodsName:'魔法鸡块',
              price:20
          }, {
              goodsId:7,
              goodsName:'可乐大杯',
              price:10
          }, {
              goodsId:8,
              goodsName:'雪顶咖啡',
              price:18
          }, {
              goodsId:9,
              goodsName:'大块鸡米花',
              price:15
          }, {
              goodsId:20,
              goodsName:'香脆鸡柳',
              price:17
          }
      ],
      type0Goods:[
          {
              goodsId:1,
              goodsImg:"https://hbimg.huabanimg.com/6f046582fea083bef63c757207ebb0e03960f9569676f4-KKEFiY_fw658",
              goodsName:'香辣鸡腿堡',
              price:18
          }, {
              goodsId:2,
              goodsImg:"https://hbimg.huabanimg.com/1b7891f844c60f4dcb77aeab2ff6046216302ee211b6a-ZgkAdI_fw658",
              goodsName:'田园鸡腿堡',
              price:15
          }, {
              goodsId:3,
              goodsImg:"https://hbimg.huabanimg.com/b578ba4db8befc193ce07a2a1055ed2467875ebd7b082-S3apZb_fw658",
              goodsName:'和风汉堡',
              price:15
          }
      ]

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
</style>