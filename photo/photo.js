var imageWidth = ($('.imageList').width() - 3 * 8)/4;
var width = $('body').width();
var ratio = $(window).height()/$(window).width();
var nowIndex = undefined;
var total = undefined;

function creatImageList(imageArray) {
    total = imageArray.length;

    let imageStr = '';
    imageArray.forEach(function(ele , index) {
        imageStr = imageStr + '<li><img height='+imageWidth+'px  src="./images/'+index+'.png" alt=""></li>';
    });
     
    $('.imageList ul').html(imageStr);
}

function creatShow(imageArray) {
    let showImageStr = '';
    imageArray.forEach(function(ele , index) {
        showImageStr = showImageStr + '<li></li>';
    });
    $('.show ul').width(width * imageArray.length).html(showImageStr);
     
    imageArray.forEach(function(ele, index){
        $('.show ul li').eq(index).width(width)

        let oImage = new Image();
        oImage.src = './images/'+index+'.png';
        oImage.onload = function(){
            let w = this.width;
            let h = this.height;
            if(h/w > ratio) {
                $(this).appendTo($('.show ul li').eq(index)).css({height:'100%'});
            } else {
                $(this).appendTo($('.show ul li').eq(index)).css({width:'100%'});
            }
        };
    });
}

creatImageList([0,1,2,3,4,5,6]);
creatShow([0,1,2,3,4,5,6]);

$('.imageList ul li').on('tap',function(){
    console.log('111');
    nowIndex = $(this).index()
    $('.show').css({display:'block'});
    $('.show ul').css({left:('-'+width * nowIndex+'px')});
});

$('.show')
    .on('tap', function(){
        $('show').hide();
    })
    .on('swipeRight', function(){
        if (nowIndex > 0 && nowIndex < total) {
            nowIndex = nowIndex - 1;
            $('.show ul').animate({left:('-'+width * nowIndex+'px')},200);
        }
    })
    .on('swipeLeft', function(){
        if (nowIndex < total - 1) {
            nowIndex = nowIndex + 1;
            $('.show ul').animate({left:('-'+width * nowIndex+'px')},200);
        }
    })

