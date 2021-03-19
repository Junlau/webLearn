var list = [{
    title : "吃饭",
    checked : true
},{
    title : "睡觉",
    checked : false
}];
new Vue({
    el:".main",
    data:{
        list : list,
        inputValue : "",
        curTodo: ""
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