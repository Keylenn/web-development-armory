//使用render函数动态绑定value，坚挺input事件，把输入内容通过$emit('input')派发给父组件
Vue.component('vInput', {
    props: {
        value: {
            type: {String, Number},
            default: ''
        }
    },
    render(h) {
        var _this = this;
        return h('div', [
            h('span', '昵称:'),
            h('input', {
                attrs: { //设置元素属性
                    type: 'text'
                },
                domProps: {
                    value: this.value
                },
                on: {
                    input(event) {
                        _this.value = event.target.value;
                        _this.$emit('input', event.target.value);
                    }
                }
            })
        ]);
    }
});
Vue.component('vTextarea', {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    render(h) {
        var _this = this;
        return h('div', [
            h('span', '留言内容:'),
            h('textarea', {
                attrs: {
                    placeholder: '请输入留言内容'
                },
                domProps: {
                    value: this.value
                },
                ref: 'message',
                on: {
                    input(event) {
                        _this.value = event.target.value;
                        _this.$emit('input', event.target.value);
                    }
                }
            })
        ]);
    },
    methods: {
        focus() {
            this.$refs.message.focus();
        }
    }
});