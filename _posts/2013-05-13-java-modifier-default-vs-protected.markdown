---
layout: post
title: "Difference between 'protected' and 'default' Java access modifiers"
date: 2013-05-13 21:30:00 +08:00
categories: Java IT
tags: Java OCP
---

* content
{:toc}

## Java Modifiers Visibility Matrix

There are 4 types of Java access modifiers - public, protected, no modifier, and private. They control Java Class and Class members' visibility. The following table shows the **Visibility Matrix** for the access modifiers.

|Access Modifiers 👇 |Same Class|Same Package|Subclass (different package)|Other packages|👈 can be accessed by|
|--------------------|:--------:|:----------:|:--------------------------:|:------------:|---------------------|
| *public*           |Yes       |Yes         |Yes                         |Yes           |                     |     
| *protected*        |Yes       |Yes         |Yes                         |No            |                     |
| *default*          |Yes       |Yes         |No                          |No            | no modifier, like *friendly* in C++ |
| *private*          |Yes       |No          |No                          |No            |                     |





  ***public***: a class, a method, or a variable accessible to all the classes of any package.  
  ***protected***: only available to subclasses (even in different package) and the same package class.  
  ***default*** (without specifiers): assume to friendly, the mothod is only accessible in the package, cannot be accessed by subclass in different package. (unlike C/C++)  
  ***private***: not accessible to other classes.

## Modifiers to Class,members, and local variables 
* At Class level, only public and no modifier are allowed. 
* At member (class variable or method) level, these 4 types access modifiers are applicable.
* Method's local variables do not have access modifiers.

## Difference between ***protected*** and ***default***
***Public*** and ***private*** are easy to understand, sometimes it will be confusing between ***protected*** and ***default***. Please find an example below, which shows their difference.

Here is a superclass named *Father* in package *edu.exam.ocp.se6.pe.sat1.q02*.
```java
package edu.exam.ocp.se6.pe.sat1.q02;

public class Father {
    void noModifier() {  //default modifier
        System.out.println("method without Modifier in Father.");
    }
    protected void protectedModifier() {
        System.out.println("method with protected modifier in Father.");
    }
}
```
Its subclass *Child* inherits *Father* in package *edu.exam.ocp.se6.pe.sat1.q02a* (note it's a different package) and try to access *Father*'s two methods with *default* and *protected* access modifiers.
```java
1.  package edu.exam.ocp.se6.pe.sat1.q02a;
2.  
3.  import edu.exam.ocp.se6.pe.sat1.q02.Father;
4.  
5.  public class Child extends Father {
6.      public static void main(String[] args) {
7.          Child child = new Child();
8.          child.noModifier();  //compile error
9.          child.protectedModifier();
10.      }
11. }

```
There is a compile error at line 8, which indicates method with *default* modifier cannot be accessed by its subclass in a different package.
  
![modifiers](https://ejres-1253687085.picgz.myqcloud.com/img/java/protected_vs_default.png)  

