// 发布留言需要的数据有昵称和留言内容，分析数据结构并初始化
var app = new Vue({
    el: '#app',
    data: {
        username: '',
        message: '',//存储当前文本框的留言内容
        list: []//将留言内容存放到数组
    },
    methods: {
        handleSend() {
            if(this.username === ''){
                window.alert('请输入昵称');
                return;
            }
            if(this.message === ''){
                window.alert('请输入留言内容');
                return;
            }
            this.list.push({
                name: this.username,
                message:this.message 
            });
            this.message= '';//留言内容存储完重置文本框
        },
        handleReply(index) {
            var name = this.list[index].name;
            this.message = '回复@' + name　+': ';
            this.$refs.message.focus();
        }
    }
});