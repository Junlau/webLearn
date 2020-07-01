<template>
  <div class="pos">
    <el-row>
      <el-col :span='7' class="pos-order" id="order-list">
        <el-tabs>

        </el-tabs>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pos-order {
  background-color: #f9fafc;

}
</style>