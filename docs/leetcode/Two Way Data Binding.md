## METHOD 1 

> 未完， 还需要研究 没有结论

(Object.defineProperty(obj, prop, descriptor)[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty]
当前我认识到双向绑定的核心是 get、set：
```
...
get
  一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）。
  默认为 undefined。
set
  一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
  默认为 undefined。
```
一个简单的例子：
```
 let obj = {
  name: 'lcy',
  hobby: ['cycle', 'cook']
 };
 
 let theOtherObj = {
  name: 'too'
 };
 
 function Binding(_o, _p) {
   let temp;
   Object.defineProperty(_o, _p, {
    get (){
      return temp;
    },
    set (val){
      temp = val;
      theOtherObj[_p] = val; // 姑且写死
      return temp;
    }
   });
 }
 
 Binding(obj, 'name');
 
 obj.name; // 'lcy'
 theOtherObj.name; // 'too'
 
 obj.name = 'cool lcy';
 
 obj.name; // 'cool lcy'
 theOtherObj.name; // 'cool lcy'
```

上面代码是我很想认为， 所谓的双向绑定就是通过某一个函数操作赋值。
以 `.vue` 中的 `template` 为例子： 
```
<template>
  <div>
    <h1>Hi! {{ name }}</h1>
    <h3 v-text="welcomingSpeech"></h3>
  </div>
</template>
```
我理想中的流程：
解析模板 得到需要绑定的 DOM 节点，对 data return 的对象做 get set 处理， 当 set 时同步更新绑定的对象。
我上面的例子还缺少了对相应DOM的更新
知道了这点之后，其实用来做什么都可以， 只要需要

## METHOD 2
`new Proxy(target, handler)`
