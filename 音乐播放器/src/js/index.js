var $ = window.Zepto;
var root = window.player;
var requestData = null;

function getData(url) {
    // $.ajax({
    //     type: "GET",
    //     url:url,
    //     success:function(data){
    //         console.log(data);
    //     },
    //     error:function(){
    //         console.log('error');
    //     }
    // })
    //假数据
    let data = [
        {
            "image": "../source/song_1.jpg",
            "audio": "../source/song_1.mp3",
            "song": "丑八怪",
            "album": "意外",
            "singer": "薛之谦",
            "duration": 253,
            "isLike": true
        },
        {
            "image": "../source/song_2.jpg",
            "audio": "../source/song_2.mp3",
            "song": "小半",
            "album": "小梦大半",
            "singer": "陈粒",
            "duration": 297,
            "isLike": false
        },
        {
            "image": "../source/song_3.jpg",
            "audio": "../source/song_3.mp3",
            "song": "Shape of You",
            "album": "➗",
            "singer": "LJ",
            "duration": 297,
            "isLike": false
        }
    ];
    requestData = data;
    render(requestData[0]);
}
getData();

//填充数据
function render(info) {
    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = info.image;
    console.log(img.src);
    $('.song-img img').attr("src",img.src);
    img.onload = function(){
        root.blurImg(img,$('body'));
    }


    let html = `<div class="song-name">`+info.song+`</div>
                <div class="singer-name">`+info.singer+`</div>
                <div class="album-name">`+info.album+`</div>`;
    $('.song-info').html(html);


}