### ref是什么

- 思考:组件作为设计图，始终是要建造房子(页面UI)的,房子建成后，建成后如果用户想知道当时设计的某个地方(这里以可隐藏式的酒窖为例)，你必须在设计时给用户一个标记，告诉他这个标记对应着以后建好的酒窖，等房子建好了，按着标记去找就可以了

那么这个问题怎么解决呢？首先，基本思路依旧不变，从变量和函数入手，变量好像不错，简单粗暴，用一个变量作为标记，取名为ref，代表着UI页面构建后的真实DOM的元素

从上面的思考不难发现，ref就是React内置的一个变量，用来标记真实DOM元素，也就是说，ref就是真实DOM元素的别名，是React官方推荐的访问真实DOM元素的方式

### 为什么要使用ref

回答这个问题可以从两个角度回答

- 角度一:必须性，就是尽管React团队强烈建议不直接操作DOM，但是总有一些需求避免不了操作DOM，例如你想获取用户上传的文件进行操作，你就必须等真实DOM(<input type="file")构建好，用户成功上传文件后才能获取，这就需要用到ref了(这就类似你有个用户说，我现在还不知道这块要怎么装修，等房子建好后再考虑怎么装修，你就必须在设计图上做个标记)
- 角度二:用户体验，可能有些用户很不需要用到真实的DOM元素，但是作为优秀的工程队，即使再不推荐用户操作真实DOM，也必须提供这样的入口，让用户知道，你可以用，但是不到万不得不要用，简单来说就是即使不用，也要提供，这就是提升用户体验的好方式，不能因为不想让用户用就完全封闭入口，这样的程序员是要被祭天的

### 怎么使用ref
[React ref 的前世今生--掘金](https://juejin.im/entry/5b592b71e51d4518e311a969)
