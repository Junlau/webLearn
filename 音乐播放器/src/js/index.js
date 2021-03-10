var $ = window.Zepto;
var root = window.player;
var audioControl = new root.audioControl();

var $scope = $('body');
var requestData = null;
var chooseIndex = 0; //默认选中第零个

function bindEvent () {
    $scope.on('audioChange',function(event,selectIndex){
        let info = requestData[selectIndex];
        audioControl.getAudio(info.audio);
        if(audioControl.status == 'play'){
            audioControl.play();
        }
    });

    $('.like-btn').on('click',function (){
        let info = requestData[chooseIndex];
        info.isLike = !info.isLike;
        renderLikeButton(info.isLike);
    });

    $('.prev-btn').on('click',function (){
        chooseIndex = chooseIndex - 1;
        if(chooseIndex < 0) {
            chooseIndex = 0;
        }
        let info = requestData[chooseIndex];
        render(info);
        $scope.trigger('audioChange',[chooseIndex]);
    });

    $('.next-btn').on('click',function (){
        chooseIndex = chooseIndex + 1;
        if(chooseIndex >= requestData.length) {
            chooseIndex = requestData.length - 1;
        }
        let info = requestData[chooseIndex];
        render(info);
        $scope.trigger('audioChange',[chooseIndex]);
    });

    $('.play-btn').on('click',function (){
        if(audioControl.status == 'play'){
            audioControl.pause();
        }else if(audioControl.status == 'pause'){
            audioControl.play();
        }
        renderPlayButton(audioControl.status);
    });
}

function getData(url) {
    $.ajax({
        type: "GET",
        url:url,
        success:function(data){
            requestData = data;
            render(requestData[chooseIndex]);
            $scope.trigger('audioChange',[chooseIndex]);
        },
        error:function(){
            console.log('error');
        }
    })
}

//填充数据
function render(info) {
    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = info.image;
    $('.song-img img').attr("src",img.src);
    img.onload = function(){
        root.blurImg(img,$('body'));
    }

    let html = `<div class="song-name">`+info.song+`</div>
                <div class="singer-name">`+info.singer+`</div>
                <div class="album-name">`+info.album+`</div>`;
    $('.song-info').html(html);

    renderLikeButton(info.isLike);
}

function renderLikeButton(isLike) {
    if (isLike) {
        $('.like-btn').css({'background-image':'url(../image/icon-like-solid.png)'});
    } else {
        $('.like-btn').css({'background-image':'url(../image/icon-like.png)'});
    }
}

function renderPlayButton(status) {
    if (status == 'play') {
        $('.play-btn').css({'background-image':'url(../image/icon-pause.png)'});
    } else {
        $('.play-btn').css({'background-image':'url(../image/icon-play.png)'});
    }
}

getData("../source/data.json");
bindEvent();