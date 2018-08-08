Vue.component('list', {
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    render(h) {
        var _this = this;
        var list = [];
        this.list.forEach(function (msg, index) {
            var node = h('div', {
                attrs: {
                    class: 'list-item'
                }
            }, [
                h('span', msg.name + ': '),
                h('div', {
                    attrs: {
                        class: 'list-msg'
                    }
                }, [
                    h('p', msg.message),
                    h('a', {
                        attrs: {
                            class: 'list-reply'
                        },
                        on: {
                            click() {
                                _this.handleReply(index);
                            }
                        }
                    }, '回复'),//添加删除功能
                    h('a', {
                        attrs: {
                            class: 'list-delete'
                        },
                        on: {
                            click() {
                                _this.list.splice(index, 1);
                                list.length -=1;
                            }
                        }
                    }, '删除')
                ])
            ])
            list.push(node);
        });
        if(this.list.length) {
            return h('div', {
                attrs: {
                    class: 'list'
                }
            }, list);
        }else {
            return h('div', {
                attrs: {
                    class: 'list-nothing'
                }
            }, '留言列表为空')
        }
    },
    methods: {
        handleReply(index) {
            this.$emit('reply', index);
        }
    }
});