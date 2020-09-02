//立即执行函数
(function(){
    var oDiv = document.getElementsByClassName('wrapper');
    var oLi = document.getElementsByTagName('li');
    var imageWidth = 200;

    function getData (){
        return data;
    }

    function addDom (requestData) {
        requestData.forEach(function(ele, index){
            let oItem = document.createElement('div');
            oItem.className = 'item';

            let oEdge = document.createElement('div');
            oEdge.className = 'edge';
            oEdge.style.height = ele.height * imageWidth / ele.width + 'px';

            let oImage = new Image();
            oImage.src = ele.preview
            oImage.height = ele.height * imageWidth / ele.width;
            oImage.onerror = function () {
                this.style.width = '202px';
                this.style.margin = '-1px'
                this.height = ele.height * imageWidth / ele.width + 2;
            }

            let oP = document.createElement('p');
            oP.innerText = ele.title;

            oEdge.appendChild(oImage);
            oItem.appendChild(oEdge);
            oItem.appendChild(oP);

            let liIndex = getMinLi();
            let domLi = oLi[liIndex];
            domLi.appendChild(oItem);
        });
    }

    function getMinLi () {
        let minHeight = oLi[0].offsetHeight;
        let index = 0;
        for (let i = 0; i < oLi.length; i++) {
            let heigh = oLi[i].offsetHeight;
            if (heigh < minHeight) {
                minHeight = heigh;
                index = i;
            }
        }
        return index;
    }

    addDom(getData());

    window.onscroll = function () {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop; //滚动距离
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight; //视图高度
        let liIndex = getMinLi();
        let domLi = oLi[liIndex];
        var pageHeigh = domLi.offsetHeight;
        if (scrollHeight + clientHeight > pageHeigh) {
            addDom(getData());
        }
    };
})()