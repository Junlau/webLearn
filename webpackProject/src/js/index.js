const { get } = require('jquery');

require('../css/index.less');
require('jquery');

function getGoodsList() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/goodsList.json',
        success: function (data) {
            createList(data);
        }
    })
}
getGoodsList();
function createList(data) {
    console.log(data);
    let str = '';
    data.list.forEach(function(ele, index){
        //a标签跳转
        str = str +`<a href="http://localhost:8080/goodsInfo.html?id=`+ele.id+`">
        <div class="goodsItem">
        <img src="`+ele.imgurl[0]+`" alt="">
        <p class="goodsTitle">`+ele.name+`</p>
        <p class="goodsPrice">￥`+ele.spectList[0].price+`</p>
        </div></a>`
    });
    $('.table_content').html(str);
}