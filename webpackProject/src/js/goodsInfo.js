require('../css/goodsInfo.less');
require('./goodsCover.js');
require('jquery');

//获取地址后面的?id location.search #id location.hash
function getId () {
    //slice(1)，去除?号，如果有多个用&区分
    let optionList = location.search.slice(1).split('&');
    let idNum = null;
    optionList.forEach(function(ele, index){
        if(ele.indexOf('id=') !==-1) {
            idNum = ele.slice(3);
        }
    })
    return idNum;
}

//获取所有产品数据
function getGoodsList() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/goodsList.json',
        success: function (data) {
            findGoods(data);
        }
    })
}

function findGoods(data) {
    console.log(data);
    let idNum = getId();
    if (idNum !== null) {
        data.list.forEach(function(ele, index){
            if (idNum == ele.id) {
                let goodsImageString = `<img src="`+ele.imgurl[0]+`" alt="">`;
                $('.goodsImage').html(goodsImageString);
                $('.oneName').text(ele.name);

                //价格排序
                ele.spectList.sort((a,b) => a["price"] - b["price"]);
                $('.onePrice').text('￥' + ele.spectList[0].price + '-' + ele.spectList[ele.spectList.length - 1].price);
                $('.price_value').text('￥' + ele.spectList[0].price + '-' + ele.spectList[ele.spectList.length - 1].price);

                $('.detailDes').text(ele.name);
                let detailImageString = '';
                ele.imgurl.forEach(function(imageUrl,index){
                    detailImageString += `<img src="`+imageUrl+`" alt="">`
                });
                $('.info_detail').append(detailImageString);

                //将价格绑定到商品规格上
                let liStirng = '';
                ele.spectList.forEach(function(priceData,index){
                    liStirng += `<li class="buy_spect_li "data-price="`+ priceData.price +`">`+ priceData.spect +`</li>`;
                });
                $('.buy_spect_content ul').html(liStirng);
            }
        });
    }
}
//绑定点击事件
function buildEvent () {
    $('.info_two').on('click',function(){
        $('.buy_wrap').css('display','block');
        $('html').css({height:'100%',overflow:'hidden'});
    });
    $('.buy_gray').on('click',function(){
        $('.buy_wrap').css('display','none');
        $('html').css({height:'100%',overflow:'visible'});
    });
}

getGoodsList();
buildEvent();