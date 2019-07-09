var list = [{
    title: '吃饭',
    checked: true
},{
    title: '睡觉',
    checked: true
},{
    title: '写代码',
    checked: false
}]
var vm = new Vue({
    el:'.main',
    data:{
        list:list,//项目列表
        inputValue:'', //输入值
        editing:'', //正在编辑的选项
        beforeEdit:''//编辑前的状态
    },
    methods:{
        addTodo(){
            this.list.push({
                title: this.inputValue,
                checked: false
            }) 
            this.inputValue = ""
        },
        delTodo(todo){
            var index =  this.list.indexOf(todo);
            this.list.splice(index,1);
        },
        editTodo(todo){
            this.editing = todo;
            this.beforeEdit = todo.title;
        },
        editedTodo(){
            this.editing = "";
        },
        canceEdit(todo){
            //esc取消编辑
            todo.title = this.beforeEdit;
            this.beforeEdit = "";
            this.editing = "";
        }

    },
    directives:{ 
        focus:{ //自定义指令 
            update(el,binding){
               if(binding.value){
                   el.focus();
               }
            }
        }
    }
})