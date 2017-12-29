---
layout: post
title: "Java, Overloaded Method's Parameter, Widening (Smallest Promotion) vs Autoboxing."
date: 2012-02-22 08:54:00 +08:00
categories: Java IT
tags: Java overload
---

* content
{:toc}

In overloaded methods, widening (smallest promotion) has higher precedence of autoboxing.  

e.g. 

```java
public class SmallestPromotion {
    public static void main(String[] args) {
        byte b = -41;
        SmallestPromotion sp = new SmallestPromotion();
        System.out.println(sp.convert(b)); //b is converted to short rather than int as parameter
    }

    public String convert(int x) {
        return "int";
    }

    public String convert(short b) {
        return "short";
    }
}
```

<i class="fa fa-youtube-play fa-2x" aria-hidden="true"></i>

`
short
`





<br/>
<br/>
e.g. autoboxing when invoking overloaded methods  

```java
public class Email {
    public void send(float f) {
        System.out.println("float parameter");
    }
//    public void send(double d) {
//        System.out.println("double parameter");
//    }
    public void send(Object x) {
        System.out.println("Object parameter");
    }
    public void send(String s) {
        System.out.println("String parameter");
    }
    public void send(int id) {
        System.out.println("int parameter");
    }
    public static void main(String [] args) {
        Email email = new Email();
        email.send(12.5);  //12.5 is double, autobox into Double, it's a child object of Object, hence send(Object x) is invoked. If there is a method send(double d), it will be invoked instead of send(Object x)
        email.send(23.6f); //if there is send(double d) instead of send(float f), send(double d) will be invoked instead of send(Object x), because widening has higher precedence of autoboxing.
        email.send(123456);
        email.send(new String("Hello"));
        email.send(new java.util.Date());
    }
}
```

<i class="fa fa-youtube-play fa-2x" aria-hidden="true"></i>

```
Object parameter  
float parameter  
int parameter  
String parameter  
Object parameter  
```

<br/>
<br/>
Autoboxing and unboxing  
1) code written before Java 5 shouldn’t be affected by new Java features like autoboxing, therefore widening is preferred to boxing, producing "i".
2) you can’t widen from one wrapper to another. e.g. Integer can't be widen to Long.

e.g.  

```java
public class Dec26 {
    public static void main(String[] args) {
        short a1 = 6;
        long l = 1000;
        new Dec26().go(a1);
        new Dec26().go(new Integer(7));

    }

    void go(Short x) {
        System.out.print("S ");
    }

    void go(Long x) {
        System.out.print("L ");
    }

    void go(int x) {
        System.out.print("i ");
    }

//    void go(short s) {
//        System.out.print("s ");
//    }

    void go(Number n) {
        System.out.print("N ");
    }

//    void go(Integer i) {
//        System.out.print("I ");
//    }
}
```

<i class="fa fa-youtube-play fa-2x" aria-hidden="true"></i>

`
i N
`

