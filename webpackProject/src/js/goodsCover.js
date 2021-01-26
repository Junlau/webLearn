require('../css/goodsCover.less');
require('jquery');

let num = 1; //默认选中第一个
let isChoose = false;

function init () {
    $('.buy_spect_content ul').on('click','.buy_spect_li',function(){
        isChoose = true;
        $('.buy_spect_li').removeClass('active');
        $(this).addClass('active');
        $('.price_value').html($(this).attr('data-price'));
        num = 1;
        $('.buy_number_value').html(num);
    });
    $('.buy_number_decrease').on('click',function(){
        if(num > 1) {
            num = num - 1;
            $('.buy_number_value').html(num);
        }
    });
    $('.buy_number_add').on('click',function(){
        num = num + 1;
        $('.buy_number_value').html(num);
    });
    $('.buy_ok').on('click',function(){
        //判断是否选中规格
        if (isChoose) {
            alert('提交成功');
            window.open('http://localhost:8080/index.html');
        }else {
            alert('请选择规格');
        }
    })
}
 
init();

