var setLocal = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    get(key){
        return JSON.parse(localStorage.getItem(key));
    }
}

var list = setLocal.get("todo") || [];

var vm = new Vue({
    el:".main",
    //监听函数
    watch:{
        //直接监听
        // list : function () {
        //     setLocal.save("todo",this.list);
        // }

        //深层次监听
        list : {
            deep : true,
            handler: function(){
                setLocal.save("todo",this.list);
            }
        }
    },
    data:{
        list : list,
        inputValue : "",
        curTodo: "",
        visibility:"all"
    },
    computed:{
        nofinishNumber(){
            let num = 0;
            for(let i=0; i < this.list.length; i++){
                if(!list[i].checked) {
                    num++;
                }
            }
            return num;
        },
        filterList(){
            if(this.visibility === "all") {
                return this.list;
            } else if(this.visibility === "finish") {
                return this.list.filter(function(item){
                    return item.checked;
                })
            } else if(this.visibility === "unfinish") {
                return this.list.filter(function(item){
                    return !item.checked;
                })
            }
        }
    },
    methods:{
        addTodo(event) {
            let todoItem = {title:this.inputValue,checked:false};
            this.list.push(todoItem);
            this.inputValue = "";
        },
        deleteButtonPressed(todo) {
            let index = this.list.indexOf(todo);
            this.list.splice(index,1);
        },
        editTodo(todo) {
            this.curTodo = todo;
        },
        editFinish(event) {
            this.curTodo = "";
        }
    },
    directives:{
        //自定义事件 focus
        focus: {
            //update为钩子函数
            update(el,binding){
                if(binding.value){
                    el.focus();
                }
            }
        }   
    }
})

function hashChange () {
    vm.visibility = window.location.hash.slice(1);
}

window.addEventListener("hashchange",hashChange);

hashChange();