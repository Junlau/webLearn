var oLi = $('.item');
var oliArray = Array.prototype.slice.call(oLi);
let liIndex = -1;

window.onload = function(){
    oliArray.forEach(function(ele, index) {
        $(ele).find('.inner').css({'transform':'translate3d(0,0,0)','transition-delay': index*0.1 + 's'});
    });
}

oLi.on('click', function () {
    console.log(22222);
    liIndex = $(this).index();
    oLi.css({'width':'0px','height':'0px','transition': 'height 0.5s linear, width 0.5s linear 0.5s'});
    $(this).css({'width':'100%','height':'100%'});
    $(this).find('.title').css({'opacity':0});
    $(this).find('.des').css({'display':'block'});
});

$('.close').on('click', function (e) {
    console.log(11111);
    e.stopPropagation();
    oLi.css({'width':'16%','height':'100%','transition': 'height 0.5s linear 0.5s, width 0.5s linear'});
    oLi.eq(liIndex).find('.title').css({'opacity':1});
    oLi.eq(liIndex).find('.des').css({'display':'none'});
 });