// 处理localstorage
var setLocal = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    },
    get(key){
        return JSON.parse(localStorage.getItem(key));
    }
}
var filterChecked = {
    all(list){
        return list;
    },
    finish(list){
        return list.filter(function(item){
            return item.checked;
        })
    },
    unfinish(list){
        return list.filter(function(item){
            return !item.checked;
        })
    }
}
var list = setLocal.get("todo") || [];
var vm = new Vue({
    el:'.main',
    watch:{ //监听函数
        list:{
            deep: true,
            handler:function(){
                setLocal.save("todo",this.list)
            }
        }
    },
    data:{
        list:list,//项目列表
        inputValue:'', //输入值
        editing:'', //正在编辑的选项
        beforeEdit:'',//编辑前的状态
        visibility:'all'//hash值
    },
    computed:{ //计算属性
        filterList(){
            return this.list.filter(function(item){return !item.checked}).length
        },
        filterCheck(){
            return filterChecked[this.visibility] ? filterChecked[this.visibility](this.list) : this.list
        }
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
function hashchange(){
    var hash = window.location.hash.slice(1);
    vm.visibility = hash;
}
hashchange()
window.addEventListener("hashchange",hashchange)