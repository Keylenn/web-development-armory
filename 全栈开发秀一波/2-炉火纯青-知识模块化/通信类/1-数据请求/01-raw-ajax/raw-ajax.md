> [AJAX -- JavaScript 标准参考教程(alpha)--阮一峰](http://javascript.ruanyifeng.com/bom/ajax.html)
> [XMLHttpRequest Level 2 使用指南--阮一峰](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)

### 什么是ajax

思考:前后端分离必然少不了前后端通信，如果每一次通信都要等待通信结束后
才能进行下一步操作，这就像不让年轻人上厕所带手机，难以想象;再想一下，
如果每一次通信都需要刷新一次页面，就像是你只想换个灯泡，但是需要拆掉
一栋房子一样令人无法接受;基于以上的考虑，w3c觉得解决这个问题刻不容绶，
于是想到一个办法，制定一个标准(取名为ajax)，允许开发者异步地进行通信，
而且可以局部地刷新页面，老大发号施令，谁敢不从，所以浏览器们纷纷推出
了符合标准的浏览器接口。

从上面的思考，不难发现，ajax是一个允许开发者进行异步通信，页面局部刷
新的浏览器的接口，也可以说，现在说的ajax，实际上指代的是一种前后端通信的方式

### 为什么要使用ajax

### 怎么使用ajax

1. 原理：不同浏览器实现这个接口的对象不同，主要分为IE和非IE，IE浏览器是通过ActiveXObject对象实现，
而非IE浏览器主要通过XMLHttpRequest对象实现

2. 使用：掌握实现ajax接口的对象实例的创建，以及对象实例常用的用法，理清通信的步骤

- 创建xhr实例，考虑兼容性,学习xhr实例常用属性和方法
- 绑定xhr.onreadystatechange方法，判断xhr.readyState和xhr.status，对后台响应结果进行处理
- 调用xhr.open方法
- 使用xhr.setRequestHeader定义请求头
- 调用xhr.send方法,学会将数据合法化

（ps：更详细的使用可以参考上面的资源，很仔细透彻，建议当做文档来使用）

3. 封装ajax（详见raw-ajax.js）