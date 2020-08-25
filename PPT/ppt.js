//传入一个数组，动态创建 slider

var ppt = {
    $wrapper: $('.wrapper'),
    $slider: $('.slider'),
    len:0,
    nowIndex: 0,
    init: function(imageArray) {
        if(imageArray.length > 0){
            this.len = imageArray.length;
            this.createDom(imageArray);
            this.buildEvent();
        }
        
    },
    createDom: function(imagerArray) {
        var strList = '<div class="slider-list">';
        var strLi = '<div class="slider-order"><ul>';
        
        imagerArray.forEach(function(ele, index){
            let sliderString = '<div class="slider" style="background-image:url('+ele.bgImage+');">\
                                    <div class="title">\
                                        <h1>'+ele.title+'</h1>\
                                        <p>'+ele.des+'/p>\
                                    </div>\
                                    <div class="image">\
                                        <img src="'+ele.image+'" alt="">\
                                    </div>\
                                </div>'
            strList = strList + sliderString;

            let liString = '';
            if(index == 0){
                liString = '<li class="active"></li>';
            } else {
                liString = '<li></li>';
            }
            strLi = strLi + liString;
        });

        strList = strList + '</div>';
        strLi = strLi + '</ul></div>'

        var strBtn = '<div class="slider-btn">\
                            <button class="btn-left"></button>\
                            <button class="btn-right"></button>\
                      </div>'

        this.$wrapper.html(strList + strBtn + strLi);
    },
    buildEvent: function(){
        var This = this;
        $('.btn-left').on('click',function(){
            This.nowIndex > 0 ? This.nowIndex-- : This.nowIndex = This.len - 1;
            console.log(This.nowIndex);
        });
        $('.btn-right').on('click',function(){
            This.nowIndex >= This.len - 1 ?  This.nowIndex = 0 : This.nowIndex++;
            console.log(This.nowIndex);
        });
        $('.slider-order ul li').on('click',function(){
            This.nowIndex = $(this).index();
            console.log(This.nowIndex);
        });
    },
    

}


var imageArray = [
    {title:'标题一',des:'这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容',image:'./images/img-1.png',bgImage:'./images//bg-1.jpg'},
    {title:'标题二',des:'这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容',image:'./images/img-2.png',bgImage:'./images//bg-2.jpg'},
    {title:'标题三',des:'这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容',image:'./images/img-3.png',bgImage:'./images//bg-3.jpg'}];

ppt.init(imageArray);