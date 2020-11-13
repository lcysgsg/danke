## JS Puzzler

### `.` 与 `=` 操作符优先级

```js
let a = {n : 1};
let b = a;
a.x = a = {n: 2};

console.log(a.x)
console.log(b.x)
```
<details>
<summary><b>答案</b></summary>
<pre>
undefined
{n: 2}
</pre>
</details>

<details><summary><b>分析</b></summary>
<pre>
a、b 是对象且指向同一地址
运算符具有优先级
. 也是运算符
所以可以拆解成：
var a = { n: 1 };
var b = a;
a.x = { n: 2 };
a = { n: 2 };
</pre>
</details>


### 你真的了解作用域吗?

```js
var a = 0,  
    b = 0;
function A(a) {
    A = function (b) {
        return a + b++
    }
    return a++
}
A(1)
A(2)
```

<details>
<summary><b>答案</b></summary>
<pre>
1
4
</pre>
</details>

<details><summary><b>分析</b></summary>
<pre>
有点小陷阱的意思： 函数表达式的参数名是 b
A(1) 执行后， 函数声明式A 就被 函数表达式A “覆写”
A(2) 执行的就是 函数表达式A
函数表达式A 中 a 之所以 === 2， 就是因为作用域
</pre>
</details>


### 类数组的length

```js
var obj = {
    "2" : 3,
    "3" : 4,
    "length" : 2,
    "splice" : Array.prototype.splice,
    "push" : Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```

<details>
<summary><b>答案</b></summary>
<pre>
var obj = {
    2: 1,
    3: 2,
    "length" : 4,
    "splice" : Array.prototype.splice,
    "push" : Array.prototype.push
}
</pre>
</details>

<details><summary><b>分析</b></summary>
<pre>
跟数组没关系，单纯是因为 Array.prototype.push 的底层实现
v8 里对于 push 的实现，只要有 length 属性就行了，push 其实就是 obj[lengh] = value
</pre>
</details>
