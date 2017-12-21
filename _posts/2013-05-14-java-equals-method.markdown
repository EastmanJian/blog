---
layout: post
title: "equals() method v.s. == in Java"
date: 2013-05-14 18:44:00 +08:00
categories: Java IT
tags: java ocp
---

* content
{:toc}

## Java Doc's description for Object.equals(). 

The equals method for class Object implements the most discriminating possible equivalence relation on objects; that is, for any non-null reference values x and y, this method returns true if and only if x and y refer to the same object (x == y has the value true).





## String.equals()
String overrides equals() method, String.equals() compares the string value. 

### e.g. 
```java
String a = "Shuky";
String b = "Shuky";
```
a.equals(b) result is true.
a==b result is also true, though this is comparing address, but due to constant pool (常量池) a and b share the same string in memory, the address is equal.

### e.g.
```java
String a = new String("Shuky");
String b = new String("Shuky");
```
a.equals(b) result is true.
a==b result is false, because a and b's address are different.

## Primitives' wrapping class equals() method
Primitives' wrapping class - Boolean | Character | Byte | Shot | Integer | Long | Float | Double, like String, their equals() method compares the primitive's value, but not the reference (memory address).

### e.g. 
```java
Integer n1 = new Integer(30);
Integer n2 = new Integer(30);
Integer n3 = new Integer(31);
System.out.println(n1 == n2); //结果是false 两个不同的Integer对象，故其地址不同，
System.out.println(n1 == n3); //那么不管是new Integer(30)还是new Integer(31) 结果都显示false
System.out.println(n1.equals(n2)); //结果是true 根据jdk文档中的说明，n1与n2指向的对象中的内容是相等的，都是30，故equals比较后结果是true
System.out.println(n1.equals(n3)); //结果是false 因对象内容不一样，一个是30一个是31
```

## StringBuffer's equals() method 
StringBuffer's equals() method cannot be used to compare string content, it compares address only unless you override it.
### e.g. 
```java
StringBuffer sb1 = new StringBuffer("hi");
StringBuffer sb2 = new StringBuffer("hi");
```
sb1.equals(sb2) is false.

## Summary

> Use the == comparison operator to determine if two primitive types are equal and also to determine if two references point to the same object. Use the equals method to determine if two objects are “equal,” which is whatever equality means in the business logic of the class.
