---
layout: post
title: "Javascript Closures - like Java private fields"
date: 2012-12-22 16:27:00 +08:00
categories: Web IT
tags: JavaScript
---

* content
{:toc}

![Closures](https://ejres-1253687085.picgz.myqcloud.com/img/javascript/closures.png)

### Notes about JavaScript Closure
* A closure is a function having access to the parent scope, even after the parent function has closed.
* Closure makes it possible for a function to have "private" variables. 
* 闭包(closure)就是能够读取其他函数内部变量的函数。由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
* Use JavaScript Nested Functions to implement a closure because a nested function can access its parent function's local variable.
* The nested function's reference is returned by its parent function, so that outside codes can access the nested function, hence enable outside codes to access the parent function's local variable through the nested function.
* The feature of closure is that some variables are defined with a limited scope, which is not global nor local scope. They resides in memory statefully and they can only be accessed by a function's API.
* Closures is something like a private field in Java, the field can be only access by the object itself. Outside codes can only get or change the field's value by API. It is about the encapsulation OO programming principle.
* An [example](https://www.w3schools.com/js/js_function_closures.asp) of A Counter Dilemma illustrate how comes the design of closure.


### Examples
* [private field of a function](https://eastmanjian.cn/js_demo/tiy.jsp?sample=function%2Fclosure_private_field.html)
* [implement a global counter](https://eastmanjian.cn/js_demo/tiy.jsp?sample=function%2Fclosure_counter.html)