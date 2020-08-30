var nowIndex = 0;
var len = $('.img-order ul li').length;
var width = $('.wrapper').width();
var flag = true;
var timer = null;

function init () {
    bindEvent();
}

function bindEvent() {
    $('.wrapper').on('mouseenter',function(){
        $('.wrapper .btn').css({display:'block'});
        clearTimeout(timer);
    }).on('mouseleave',function(){
        $('.wrapper .btn').css({display:'none'});
        creatTimeOut();
    });

    $('.wrapper .btn .leftBtn').add($('.wrapper .btn .rightBtn')).add($('.img-order ul li')).on('click',function(){
        if($(this).attr('class') == 'leftBtn') {
            move('left');
        } else if($(this).attr('class') == 'rightBtn') {
            move('right');
        } else {
            let index = $(this).index();
            move(index);
        }
    });
}

function move(direction) {
    if(flag) {
        flag = false;
        let isDo = true;
        if(direction == 'left') {
            if(nowIndex == 0) {
                $('.img-list ul').css({left:-(width * len)});
                nowIndex = len - 1;
            } else {
                nowIndex = nowIndex - 1;
            }
        } else if(direction == 'right') {
            if (nowIndex == len - 1) {
                isDo = false;
                $('.img-list ul').animate({left:-(width * len)},function(){
                    $('.img-list ul').css({left:0});
                    creatTimeOut();
                    flag = true;
                });
                nowIndex = 0;
            } else {
                nowIndex = nowIndex + 1;
            }
        }  else {
            nowIndex = direction;
        }
        if (isDo) {
            $('.img-list ul').animate({left:-(width * nowIndex)},function(){
                creatTimeOut();
                flag = true;
            });
        }
        changeOrder(nowIndex);
    }
}

function changeOrder(index){
    // $('.img-order ul li.active').removeClass('active');
    // $('.img-order ul li').eq(index).addClass('active');
    let order = document.getElementsByClassName('img-order')[0];
    let liActive = order.getElementsByClassName('active')[0];
    liActive.className = '';
    
    let liIndex = order.getElementsByTagName('li')[index];
    liIndex.className = 'active';

}

function creatTimeOut () {
    clearTimeout(timer);
    timer = setTimeout(function(){
        move('right');
    },3000);
}

init();
creatTimeOut();
