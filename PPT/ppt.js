//传入一个数组，动态创建 slider

var ppt = {
    $wrapper: $('.wrapper'),
    $slider: '',
    len:0,
    lastIndex:undefined,
    nowIndex: 0,
    flag: true,
    timer: null,
    init: function(imageArray) {
        if(imageArray.length > 0){
            this.len = imageArray.length;
            this.createDom(imageArray);
            this.buildEvent();
            this.createTime();
        }
        
    },
    createDom: function(imagerArray) {
        var strList = '<div class="slider-list">';
        var strLi = '<div class="slider-order"><ul>';
        
        imagerArray.forEach(function(ele, index){
            let sliderString = '<div class="slider" style="background-image:url('+ele.bgImage+');">\
                                    <div class="title">\
                                        <h1>'+ele.title+'</h1>\
                                        <p>'+ele.des+'</p>\
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

        this.$slider = $('.slider');
    },
    buildEvent: function(){
        var This = this;
        $('.btn-left').on('click',function(){
            if(This.flag) {
                This.lastIndex = This.nowIndex;
                This.nowIndex > 0 ? This.nowIndex-- : This.nowIndex = This.len - 1;
                
                This.totalFun();
            }
        });
        $('.btn-right').on('click',function(){
            if(This.flag) {
                This.lastIndex = This.nowIndex;
                This.nowIndex >= This.len - 1 ?  This.nowIndex = 0 : This.nowIndex++;
                This.totalFun();
            }
        });
        $('.slider-order ul li').on('click',function(){
            if(This.flag) {
                This.lastIndex = This.nowIndex;
                This.nowIndex = $(this).index();
                
                This.totalFun();
            }
        });
        

        this.$slider.on('go',function(){
            $(this).fadeOut(300)
                .find($('p')).animate({fontSize:'16px'}).end()
                .find($('.image')).animate({width: '0%'});
        });
        this.$slider.on('come',function(){
            $(this).delay(300).fadeIn(300)
                .find($('p')).animate({fontSize:'20px'}).end()
                .find($('.image')).animate({width: '40%'},function(){
                    This.flag = true;
                    This.createTime();
                });
        });
    },
    totalFun: function(){
        //加锁
        if (this.lastIndex != this.nowIndex){
            clearTimeout(this.timer);
            this.flag = false;
            this.changeOrder();
            this.$slider.eq(this.lastIndex).trigger('go');
            this.$slider.eq(this.nowIndex).trigger('come');
        }
    },
    createTime: function(){
        var This = this;
        this.timer = setTimeout(function(){
            if(This.flag) {
                This.lastIndex = This.nowIndex;
                This.nowIndex >= This.len - 1 ?  This.nowIndex = 0 : This.nowIndex++;
                This.totalFun();
            }
        },3000);
    },
    changeOrder: function(){
        $('.slider-order ul li.active').removeClass('active');
        $('.slider-order ul li').eq(this.nowIndex).addClass('active');
    }
    

}


var imageArray = [
    {title:'标题一',des:'这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容',image:'./images/img-1.png',bgImage:'./images//bg-1.jpg'},
    {title:'标题二',des:'这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容',image:'./images/img-2.png',bgImage:'./images//bg-2.jpg'},
    {title:'标题三',des:'这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容这是第一页PPT内容',image:'./images/img-3.png',bgImage:'./images//bg-3.jpg'}];

ppt.init(imageArray);