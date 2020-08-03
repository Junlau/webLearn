var tr = 30; //行数
var td = 30; //列数
var sw = 20; //每格的宽度
var sh = 20; //每格的高度

var snake = null;
var food = null;
var game = null;

//定义每个格子
function Square(x,y,classname) {
    // x,y为行列的坐标，不是实际坐标

    this.x = x * sw;
    this.y = y * sh;
    this.class = classname;

    this.viewContent = document.createElement('div'); //对应的 DOM 元素
    this.viewContent.className = this.class;
    this.parent = document.getElementById('snakeWrap'); //对应的父元素
}

Square.prototype.creat = function(){
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.width = sw+'px';
    this.viewContent.style.height = sh+'px';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';

    this.parent.appendChild(this.viewContent);
}

Square.prototype.remove = function(){
    this.parent.removeChild(this.viewContent);
}


//定义蛇
function Snake () {
    this.head = null; //存储蛇头信息
    this.tail = null; //存储蛇尾信息
    this.pos = []; //存储所有的蛇信息

    this.directionNum = { //存储蛇走的方向，用一个对象来表示
        left:{
            x:-1,
            y:0
        },
        right:{
            x:1,
            y:0
        },
        up:{
            x:0,
            y:-1
        },
        down:{
            x:0,
            y:1
        },
    };

    this.direction = this.directionNum.right;
}


Snake.prototype.init = function () {
    //创建蛇头
    var snakeHead = new Square(2,0,'snakeHead');
    snakeHead.creat();
    this.head = snakeHead;
    this.pos.push([2,0]); //存储坐标

    //创建蛇身
    var snakeBody1 = new Square(1,0,'snakeBody');
    snakeBody1.creat();
    this.pos.push([1,0]); //存储坐标

    //创建蛇身 - 蛇尾
    var snakeBody2 = new Square(0,0,'snakeBody');
    snakeBody2.creat();
    this.pos.push([0,0]); //存储坐标
    this.tail = snakeBody2;

    //形成双向链表
    snakeHead.last = null;
    snakeHead.next = snakeBody1;

    snakeBody1.last = snakeHead;
    snakeBody1.next = snakeBody2;

    snakeBody2.last = snakeBody1;
    snakeBody2.next = null;
}

//通过这个方法来获取蛇头的下一个位置对于的元素，根据元素做不通的事情
Snake.prototype.gerNextPos = function () {
    var nextPos = [this.head.x/sw + this.direction.x,this.head.y/sw + this.direction.y];

    //判断下一个点是否是自己，是则 GAME OVER
    let selfCollied = false;
    this.pos.forEach(function(value){
        if(value[0] == nextPos[0] && value[1] == nextPos[1]) {
            selfCollied = true;
        }
    });
    if(selfCollied) {
        this.strategies.die.call(this)
        return;
    }

    //判断下一个点是否是围墙，是则 GAME OVER
    if(nextPos[0] < 0 || nextPos[0] > td-1 || nextPos[1] > tr - 1 || nextPos[1] < 0 ) {
        this.strategies.die.call(this)
        return;
    }

    //判断下一个点是否是食物，是则吃掉
    if(food.x/sw == nextPos[0] && food.y/sh == nextPos[1]) {
        this.strategies.eat.call(this);
        //吃到了之后，重新 createFood
        return;
    }
    //都不是则前进
    this.strategies.move.call(this,false);
}

//处理碰撞后的方法
Snake.prototype.strategies = {
    move:function(format){
        //创建新的身体（旧蛇头的位置，新蛇头已经换位置了）
        var newBody = new Square(this.head.x/sw,this.head.y/sh,'snakeBody');
        //更新链表关系
        newBody.next = this.head.next;
        newBody.next.last = newBody;
        newBody.last = null;

        this.head.remove();
        newBody.creat();

        //创建一个新的蛇头
        var newHead = new Square(this.head.x/sw + this.direction.x,this.head.y/sw + this.direction.y,'snakeHead');
        //更新链表关系
        newBody.last = newHead;
        newHead.next = newBody;
        newHead.last = null;
        newHead.creat();
        

        //更新 pos 数据
        this.pos.splice (0,0,[this.head.x/sw + this.direction.x,this.head.y/sw + this.direction.y]);
        this.head = newHead;

        if(!format) { //如果是 eat 则不需要删除最后一个元素
            this.tail.remove();
            this.tail = this.tail.last;

            this.pos.pop();
        }


    },
    eat:function(){
        this.strategies.move.call(this,true);
    },
    die:function(){
        game.over();
    }
}

function creatFood () {
    let x = null;
    let y = null;

    var include = true; //判断食物是否在蛇身上
    while(include) {
        x = Math.round(Math.random() * (td-1));
        y = Math.round(Math.random() * (tr-1));

        snake.pos.forEach(function(value){
            if (x != value[0] && y != value[1]) {
                include = false;
            } else {
                include = true;
            }
        });
    }

    food = new Square(x,y,'food');
    food.pos=[x,y];

    var foodDom = document.querySelector('.food');
    if(foodDom) {
        foodDom.style.left=x*sw +'px';
        foodDom.style.top=y*sh+'px';
    } else {
        food.creat();
    }
}

function Game () {
    this.time = null;
    this.score = 0;
}

Game.prototype.init = function() {
    snake = new Snake();
    snake.init();
    creatFood();

    //按下方向键
    document.onkeydown = function (ev) {
        if(ev.which == 37 && snake.direction!=snake.directionNum.right) {
            snake.direction = snake.directionNum.left;
        } else if(ev.which == 38 && snake.direction!=snake.directionNum.down) {
            snake.direction = snake.directionNum.up;
        } else if(ev.which == 39 && snake.direction!=snake.directionNum.left) {
            snake.direction = snake.directionNum.right;
        } else if(ev.which == 40 && snake.direction!=snake.directionNum.up) {
            snake.direction = snake.directionNum.down;
        }
    }

    this.start();
}

Game.prototype.start = function(){
    this.time = setInterval(function(){
        snake.gerNextPos();
    },200);
}

Game.prototype.over = function(){
    clearInterval(this.time);
    alert('GAME OVER');
}

game = new Game();
game.init();


