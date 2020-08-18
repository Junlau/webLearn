var personArr = [
    {name:'王港', src:'./img/1.jpg',des:'哇哦杀菌灯',sex:'m'},
    {name:'刘莹', src:'./img/1.jpg',des:'哇哦杀菌灯',sex:'f'},
    {name:'王秀莹', src:'./img/1.jpg',des:'哇哦杀菌灯',sex:'f'},
    {name:'刘金雷', src:'./img/1.jpg',des:'哇哦杀菌灯',sex:'m'},
    {name:'刘飞翔', src:'./img/1.jpg',des:'哇哦杀菌灯',sex:'m'}
];

var oUl = document.getElementsByTagName('ul')[0];
var maleBtn = document.getElementsByClassName('male')[0];
var femaleBtn = document.getElementsByClassName('female')[0];
var allBtn = document.getElementsByClassName('all')[0];
var inputContent = document.getElementsByClassName('inputContent')[0];
var btnView = document.getElementsByClassName('btnView')[0];

var inputName = '';
var inputSex = '';

function renderList(arr) {
    var allStr = '';
    arr.forEach(function (ele, index) {
        var liStr = '<li>\
        <img src="' + ele.src +'" alt="">\
        <p class="name">'+ ele.name +'</p>\
        <p class="des">'+ele.des+'</p>\
        </li>'
        
        allStr = allStr + liStr;

    });

    oUl.innerHTML = allStr;
}

function findPersonForSex(sex,arr) {
    if (sex.length <= 0 || sex == 'a') {
        return arr;
    }
    var sexArr = arr.filter(function (ele, index){
        return ele.sex == sex ? true : false;
    });
    return sexArr;
}

function findPersonForName(name,arr) {
    var nameArr = arr.filter(function (ele){
        return ele.name.indexOf(name) <= -1 ? false : true;
    });
    return nameArr;
}

//统一查询
function findPersonForNameAndSex(name,sex) {
    var nArray = findPersonForName(name,personArr);
    return findPersonForSex(sex,nArray);
}

inputContent.oninput = function () {
    inputName = this.value;
    renderList(findPersonForNameAndSex(inputName,inputSex));
}

// maleBtn.onclick = function () {
//     inputSex = 'm';
//     renderList(findPersonForNameAndSex(inputName,inputSex));

//     maleBtn.className = maleBtn.className + ' active';
//     femaleBtn.className = femaleBtn.className.replace(' active','');
//     allBtn.className = allBtn.className.replace(' active','');
// }

// femaleBtn.onclick = function () {
//     inputSex = 'f';
//     renderList(findPersonForNameAndSex(inputName,inputSex));

//     femaleBtn.className = femaleBtn.className + ' active';
//     maleBtn.className = maleBtn.className.replace(' active','');
//     allBtn.className = allBtn.className.replace(' active','');
// }

// allBtn.onclick = function () {
//     inputSex = '';
//     renderList(findPersonForNameAndSex(inputName,inputSex));

//     allBtn.className = allBtn.className + ' active';
//     maleBtn.className = maleBtn.className.replace(' active','');
//     femaleBtn.className = femaleBtn.className.replace(' active','');
// }

//三个 button 同时添加点击事件比较麻烦，另一种点击事件添加方法
btnView.addEventListener('click',function (e){
    console.log(e.target.nodeName);
    if (e.target.nodeName == 'BUTTON') {
        document.getElementsByClassName('active')[0].className = '';
        e.target.className = 'active';
        inputSex = e.target.getAttribute('sex');
        renderList(findPersonForNameAndSex(inputName,inputSex));
    }   
})

renderList(findPersonForNameAndSex(inputName,inputSex));