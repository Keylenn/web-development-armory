知乎～康兵奎
react小书

《深入React技术栈》
《深入浅出react和Redux》
https://juejin.im/entry/5b0275b26fb9a07aa34a8e97
微信笔记
--------------------------------------------------------------------
一、使用jsx构建页面UI
React是一个帮助构建页面UI的库，不是一个框架，它只提供UI层的解决方案，在实际使用中需要搭配其他库实现完整的解决方案。


==》jsx对象

jsx原理：
1.babel编译
2.React.createElement
3.ReactDOM.render


jsx语法注意点：

编写JSX代码是要注意，和HTML便签的属性名区分如：class => className
JSX 是 JavaScript 语言的一种语法扩展，长得像 HTML，但并不是 HTML。
React.js 可以用 JSX 来描述你的组件长什么样的。
JSX 在编译的时候会变成相应的 JavaScript 对象描述。
react-dom 负责把这个用来描述 UI 信息的 JavaScript 对象变成 DOM 元素，并且渲染到页面上。
在 JSX 当中你可以插入 JavaScript 的表达式，表达式用 {} 包裹，表达式插入不仅仅可以用在标签内部，也可以用在标签的属性上
表达式插入里面返回 null ，那么 React.js 会什么都不显示，相当于忽略了该表达式插入。
结合条件返回的话，我们就做到显示或者隐藏某些元素

------------------------------------------------------------------------------------
二、React.js 中一切皆组件
组件化，React天生组件化，每个模块都是一个单独的组件，可以单独使用，也可以和其他模块组合、嵌套使用
组件划分--从需求出发，为了代码可复用性、可维护性


组件的内容编写顺序如下：

static 开头的类属性，如 defaultProps、propTypes。
构造函数，constructor。
getter/setter（还不了解的同学可以暂时忽略）。
组件生命周期。
_ 开头的私有方法。
事件监听方法，handle*。
render*开头的方法，有时候 render() 方法里面的内容会分开到不同函数里面进行，这些函数都以 render* 开头。
render() 方法。

react创建组建的方式:
1.纯组件：函数式定义的无状态组件

2.继承式组件：es6形式的extends React.Component定义的组件
如果一个文件导出的是一个类，那么这个文件名就用大写开头

！！一个组件类必须要实现一个 render 方法，这个 render 方法必须要返回一个 JSX 元素，而且不能返回多个jsx元素（用一个外层的 JSX 元素把所有内容包裹起来）
1.state---用来存储可变化状态的对象
这个对象在构造函数里面初始化
React.js 认为所有的状态都应该由 React.js 的 state 控制，只要类似于 <input />、<textarea />、<select /> 这样的输入控件被设置了 value 值，那么它们的值永远以被设置的值为准
2.setState---更新组件的状态 state ，重新调用 render 方法，重新渲染页面
不能直接用 this.state ，只能使用setState方法，它接受一个对象或者函数作为参数。
调用 setState 的时候，React.js 并不会马上修改 state。而是把这个对象放到一个更新队列里面，即把状态缓存起来，最后把 JavaScript 事件循环中的消息队列的同一个消息中的 setState 都进行合并以后再重新渲染组件，因此想在 setState 之后使用新的 state 来做后续运算就做不到了，不过可以采用接受一个函数作为参数，而这个函数的参数是上一次跟新的state对象（即上一个 setState 的结果），你就可以使用该结果进行运算、操作，然后返回一个对象作为更新 state 的对象
eg：

3.props--一种父级向子级传递数据的方式
组件内部是通过 this.props 的方式获取到组件的参数，在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为 props 对象的键值
默认配置 defaultProps

state 的主要作用是用于组件保存、控制、修改自己的可变状态,是一个局部的、只能被组件自身控制的数据源。state 中状态可以通过 this.setState 方法进行更新，setState 会导致组件的重新渲染。props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参数，组件内部无法控制也无法修改。除非外部组件主动传入新的 props，否则组件的 props 永远保持不变
state 是让组件控制自己的状态，props 是让外部对组件自己进行配置,一般情况下，尽量少地用 state，尽量多地用 props
a:父组件传递数据给子组件---->props
b:子组件传递数据给父组件---->通过props给子组件传入一个回调函数
a+b====》组件间传递数据（子1->父->子2）

当某个状态被多个组件依赖或者影响的时候，就把该状态提升到这些组件的最近公共父组件中去管理，用 props 传递数据或者函数来管理这种依赖或着影响的行为










4.受控组件
类似于 <input />、<select />、<textarea> 这些元素的 value 值被 React.js 所控制、渲染的组件，在 React.js 当中被称为受控组件
对于用户可输入的控件，一般都可以让它们成为受控组件

5.容器类组件--充当了容器的作用，定义了一种外层结构形式，可以往里面塞任意的内容
使用自定义组件的时候，可以在其中嵌套 JSX 结构。嵌套的结构在组件内部都可以通过 props.children 获取到，这种组件编写方式在编写容器类型的组件当中非常有用
React.js 把我们嵌套的 JSX 元素一个个都放到数组当中，然后通过 props.children 传递，而且可以通过props.child[n]把在组件内部把数组中的 JSX 元素安置在不同的地方

6.高阶组件---一个函数，它接受一个组件作为参数，返回一个新的组件
新的组件使用传入的组件作为子组件
高阶组件是为了组件之间的代码复用,将有着某些相同的逻辑抽离出来，其内部的包装组件和被包装组件之间通过 props 传递数据，高阶组件其实就是设计模式里面的装饰者模式

7.Dumb组件--组件的渲染只依赖于外界传进去的 props 和自己的 state，而并不依赖于其他的外界的任何数据
对参数（props）以外的数据零依赖，也不产生副作用

8.Smart 组件
专门做数据相关的应用逻辑，和各种数据打交道、和 Ajax 打交道，然后把数据通过 props 传递给 Dumb，它们带领着 Dumb 组件完成了复杂的应用程序逻辑

开发过程中要合理地划分 Smart 和 Dumb 组件，在 src/ 目录下新建两个文件夹 components/ 和 containers/，所有的 Dumb 组件都放在 components/ 目录下，所有的 Smart 的组件都放在 containers/ 目录下，这是一种约定俗成的规则

划分原则：是否需要高度的复用性，应用场景需要
------------------------------------------------------------------------------------
三、React数据流
数据驱动视图，隔离DOM操作，所有操作全部转换成对数据的操作，通过改变数据来改变页面显示
数据绑定，单项数据流
------------------------------------------------------------------------------------
四、事件监听
在 React.js 不需要手动调用浏览器原生的 addEventListener 进行事件监听。React.js 帮我们封装好了一系列的 on* 的属性，当你需要为某个元素监听某个事件的时候，只需要简单地给它加上 on* 的属性，而且不需要考虑不同浏览器兼容性的问题
这些事件属性名都必须要用驼峰命名法，而且只能用在普通的 HTML 的标签上，而不能用在组件标签上
React.js 中的 event 对象并不是浏览器提供的，而是它自己内部所构建的，这个对象和普通的浏览器 event 对象所包含的方法和属性都基本一致，React.js 将浏览器原生的 event 对象封装了一下，对外提供统一的 API 和属性，这样你就不用考虑不同浏览器的兼容性问题

一般在某个类的实例方法里面的 this 指的是这个实例本身，但是无法事件函数所绑定的实例，即无法打印this，可以通过手动地将实例方法 bind 到当前实例上再传入给 React.js，也可以在 bind 的时候给事件监听函数传入一些参数：
<h1 onClick={this.handleClickOnTitle.bind(this, 'Hello')}>React 小书</h1>
bind 不仅可以帮我们把事件监听方法中的 this 绑定到当前组件实例上；还可以帮助我们在在渲染列表元素的时候，把列表元素传入事件监听函数当中

所有事件监听的方法都用 handle 开头。把事件监听方法传给组件的时候，属性名用 on 开头。

------------------------------------------------------------------------------------
五、Virtual-DOM--运行效率高，使用虚拟DOM，减少DOM操作。
为了尽量复用元素内部的结构，对于用表达式套数组罗列到页面上的元素，都要为每个元素加上 key 属性，这个 key 必须是每个元素唯一的标识。一般来说，key 的值可以直接后台数据返回的 id，因为后台的 id 都是唯一的

1.ref属性--获取已经挂载的元素的 DOM 节点
开发过程要避免用 ref 来做 React.js 本来就可以帮助你做到的页面自动更新的操作和事件监听,所以能不用 ref 就不用

------------------------------------------------------------------------------------
六、生命周期
1.挂载阶段（mounting）--已插入真实DOM
React.js 将组件渲染，并且构造 DOM 元素然后塞入页面的过程称为组件的挂载
ReactDOM.render的渲染过程：

旧：

新（v16.3）：

constructor --组件自身初始化，提早发送数据请求
getDerivedStateFromProps--更新state
componentDidMount--事件订阅

2.更新阶段（updating）--正在被重新渲染
旧：

新（v16.3）：


3.销毁阶段（unMounting）--已移除真实DOM



compenentWillUnmount--取消相应的事件订阅，清除定时器
------------------------------------------------------------------------------------
七、灵活，安全，可维护

1.dangerouslySetInnerHTML属性：
出于安全考虑的原因（XSS 攻击），在 React.js 当中任何的 HTML 格式都会被自动转义，可以通过dangerouslySetInnerHTML属性动态设置元素的 innerHTML，这个属性不必要的情况就不要使用

2.style属性:
React.js 中的元素的style属性接受一个对象，这个对象里面是这个元素的 CSS 属性键值对，原来 CSS 属性中带 - 的元素都必须要去掉 - 换成驼峰命名，（如 font-size 换成 fontSize，text-align 换成 textAlign）
用对象作为 style 方便我们动态设置元素的样式。可以用 props 或者 state 中的数据生成样式对象再传给元素，然后用 setState 就可以修改样式

3.PropTypes --验证 props 的参数类型
React.js 就提供了一种机制，让你可以给组件的配置参数加上类型验证，类型错误就强制报错


3.context--为所有子组件提供共享状态，类似于某个组件的全局变量

每个组件的 context 就是瀑布的源头，只有它的子组件能够访问，它的父组件是不能访问到的

设置了 context的组件必须提供 childContextTypes 作为 context 的声明和验证，可以通过 getChildContext 方法返回子树的 context（对象）

任意深度的子组件都必须先通过 contextTypes 来声明你想要的 context 里面的哪些状态，然后可以通过 this.context 访问到那些状态。

context 打破了组件和组件之间通过 props 传递数据的规范，极大地增强了组件之间的耦合性。而且context 里面的数据能被随意接触就能被随意修改，可能会导致程序的运行不可预料，但是这种机制对于前端应用状态管理来说是很有帮助的，Redux就是充分地利用了这种机制给我们提供便利的状态管理服务。因此我们一般不需要手动写 context，也不要用它，只需要用好这些第三方的应用状态管理库就行了

------------------------------------------------------------------------------------
八、Redux

1.Redux 和 React-redux 并不是同一个东西。
Redux 是一种架构模式（Flux 架构的一种变种），它不关注你到底用什么库，你可以把它应用到 React 和 Vue，甚至跟 jQuery 结合都没有问题。
React-redux 就是把 Redux 这种架构模式和 React.js 结合起来的一个库，就是 Redux 架构在 React.js 中的体现。

2.解决一个矛盾
“模块（组件）之间需要共享数据”和“数据可能被任意修改导致不可预料的结果”之间的矛盾。

3.设计思路
a.提高数据修改的门槛，将所有共享数据状态存储起来（state），而且所有对数据的修改和操作只能通过 特定的渠道（dispatch 函数），然后把这个存储地方和特定的修改渠道集中起来放到一个专门管理的地 方（store）

功能1：为了避免每次修改数据后都要重新渲染，可以考虑使用观察者模式监控数据变化(subscribe)， 每当 dispatch 的时候，监听函数就会被调用,然后重新渲染页面

功能2：只重新渲染被修改的部分，在每个渲染函数执行渲染操作之前先做个判断，判断传入的新数据和旧的数据是不是相同，相同的话就不渲染

实现：
渲染函数：

设计一个通用的createStore (state, stateChanger)函数，返回一个对象：{ getState, dispatch, subscribe }

state：存储共享状态
stateChanger：根据 action 来直接修改 state
store.getState ---获取共享状态
store.dispatch ---修改共享状态
所有对数据的操作必须通过 dispatch 函数。它接受一个参数 action，这个 action 是一个普通的 JavaScript 对象，里面必须包含一个 type 字段来声明你到底想干什么。dispatch 在 swtich 里面会 识别这个 type 字段，能够识别出来的操作才会执行对应的修改
store.subscribe ---监听数据数据状态

===》升级：
合并参数state,和stateChanger----->reducer
reducer是一个纯函数，它接受两个参数，一个是 state，一个是 action，只允许你初始化和计算新的 state

4.总结
共享的状态如果可以被任意修改的话，那么程序的行为将非常不可预料，所以我们提高了修改数据的门槛：你必须通过 dispatch 执行某些允许的修改操作，而且必须大张旗鼓的在 action 里面声明。

这种模式挺好用的，我们就把它抽象出来一个 createStore，它可以产生 store，里面包含 getState 和 dispatch 函数，方便我们使用。

后来发现每次修改数据都需要手动重新渲染非常麻烦，我们希望自动重新渲染视图。所以后来加入了订阅者模式，可以通过 store.subscribe 订阅数据修改事件，每次数据更新的时候自动重新渲染视图。

接下来我们发现了原来的“重新渲染视图”有比较严重的性能问题，我们引入了“共享结构的对象”来帮我们解决问题，这样就可以在每个渲染函数的开头进行简单的判断避免没有被修改过的数据重新渲染。

我们优化了 stateChanger 为 reducer，定义了 reducer 只能是纯函数，功能就是负责初始 state，和根据 state 和 action 计算具有共享结构的新的 state


------------------------------------------------------------------------------------
九、React-Redux

解决组件之间共享状态
1.状态提升
2.使用 context
3.使用redux


结合context 和 store
把 store 存放到context里面，好让子组件 connect 的时候能够取到 store


使用Dumb 组件和 context 连接


connect 和 mapStateToProps

mapDispatchToProps

Provider-----一个容器组件，会把嵌套的内容原封不动作为自己的子组件渲染出来。它还会把外界传给它的 props.store 放到 context

尽量多地写 Dumb 组件，必要时可以使用用高阶组件把它们包装一层

==》使用React-Redux
1.createStore

雏形：
createStore (state, stateChanger)函数，返回一个对象：{ getState, dispatch, subscribe }

state：存储共享状态
stateChanger：根据 action 来直接修改 state
store.getState ---获取共享状态
store.dispatch ---修改共享状态
store.subscribe ---监听数据数据状态

改进：
createStore (reducer)函数，返回一个对象：{ getState, dispatch, subscribe }


reducer：初始化和计算新的 state
合并参数state,和stateChanger----->reducer
reducer是一个纯函数，它接受两个参数，一个是 state，一个是 action，只允 许你初始化和计算新的 state
如果有传入 state 就生成更新数据，否则就是初始化数据
store.getState ---获取共享状态
store.dispatch ---修改共享状态
store.subscribe ---监听数据数据状态


2.connect
雏形：
connetc.js----结合context 和 store (react.js+redux)


把 store 存放到context里面，好让子组件 connect 的时候能够取到 store

改进：
雏形存在问题：有大量重复的逻辑：每个组件的基本逻辑都是，取出 context，取出里面的 store，然后用里面的状态设置自己的状态，这些代码逻辑其实都是相同的
对 context 依赖性过强：这些组件都要依赖 context 来取数据，使得这个组件复用性基本为零。想一下，如果别人需要用到里面的 ThemeSwitch 组件，但是他们的组件树并没有 context 也没有 store，他们没法用这个组件了
==》
使用高阶组件connect从 context 取数据，通过 props 传给 Dumb 组件
Dumb组件，只依赖于外界传进去的 props 和自己的 state去渲染，
mapStateToProps函数，根据 store.getState() 的结果（state）生成一个对象并返回，将这个对象（props）传入高阶组件connect，使其可以取得正确的数据
mapDispatchToProps函数，接受dispatch作为参数，返回一个对象，这个对象内容会同样被 connect 当作是 props 参数传给被包装的组件，使得组件可以知道如何触发 dispatch





3.Provider

问题：context 相关的代码在容器组件中存在
引入容器组件Provider，把context 相关的代码写进Provider，之前装有context 相关的代码的组件嵌套在内，原封不动作为自己的子组件渲染出来，把外界传给它的 props.store 放到 context




------------------------------------------------------------------------------------
十、纯函数
一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函 数

1.函数的返回结果只依赖于它的参数。
非纯函数：

纯函数：


2.函数执行过程里面没有副作用
副作用-->产生了外部可观察的变化，即函数执行后对函数外产生了影响
影响：修改外部的变量，调用 DOM API 修改页面，发送了 Ajax 请求，调用 window.reload 刷新浏览器，使用 console.log 往控制台打印数据....

纯函数：

非纯函数：
函数执行完counter.x 由1变为2


------------------------------------------------------------------------------------
十一、...扩展运算符
http://es6.ruanyifeng.com/#docs/array

------------------------------------------------------------------------------------
十二、查漏补缺
registerServiceWorker的作用：用于在生产环境中为用户在本地创建一个service worker 来缓存资源到本地，提升应用的访问速度

