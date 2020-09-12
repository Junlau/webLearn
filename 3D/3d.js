var oLi = document.getElementsByTagName('li');
//类数组转成数组
var oLiArray = Array.prototype.slice.call(oLi);

oLiArray.forEach(function(ele, index) {
    ele.size = getSize(ele);
    ele.addEventListener('mouseenter',function(e){
        addClass(this,e,'in');
    })
    ele.addEventListener('mouseleave',function(e){
        addClass(this,e,'out');
    })
});

function getSize(ele) {
    return {
        w : ele.offsetWidth,
        h : ele.offsetHeight
    }
}

//offset[X|Y] 是相对于目标元素左上角和鼠标之间的距离；page[X|Y] 是相对于整个页面左上角和鼠标之间的距离
function addClass(ele, e, state) {
    //改变原点
    let x = e.offsetX - ele.size.w/2;
    let y = e.offsetY - ele.size.h/2;

    //tan值转成角度 
    let tanYX = Math.atan2(y,x) * (180/Math.PI);
    let dealData = (Math.round((tanYX + 180)/90) + 3)%4;

    let direction;
    switch(dealData) {
        case 0 :
            direction = 'top';
            break;
        case 1 :
            direction = 'right';
            break;
        case 2 :
            direction = 'bottom';
            break;
        case 3 :
            direction = 'left';
            break;
    }
    console.log(state + '-' + direction)
    ele.className = state + '-' + direction;

}