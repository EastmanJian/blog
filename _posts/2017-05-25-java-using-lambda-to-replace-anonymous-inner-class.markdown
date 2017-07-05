---
layout: post
title: "Using Lambda Expression to replace Anonymous Inner Class in Java 1.8"
date: 2017-05-25 10:44:00 +08:00
categories: IT Java
tags: java lambda
---

* content
{:toc}

## Anonymous Inner Classes

An anonymous inner class is a local inner class that does not have a name. It either extend an existing class or implement an existing interface.
It is an easy option for handling simple events.

* It's properties are as the same as Local Inner Class.
* When it is compiled, two bytecode files are generated. e.g. AnonInner.class and AnonInner$1.class. The compiler assigns it a number because it does not have a name. 
* The difference with anonymous inner classes is that you can create multiple instances of a local inner class within the method, but an anonymous inner class can only be instantiated one time.

## Lambda expressions 
![Java 8 Lambda](https://ejres-1253687085.picgz.myqcloud.com/img/java/java8lambda.png)





Lambda expressions are used primarily to define inline implementation of a functional interface, i.e., an interface with a single method only.  
Lambda expressions are introduced in Java 8 and are touted to be the biggest feature of Java 8.   
Lambda expression facilitates functional programming, and simplifies the development a lot.

## Lambda Expression vs Anonymous Inner Class
Lambda expression eliminates the need of anonymous inner class and gives a very simple yet powerful functional programming capability to Java.  
For anonymous inner classes which is simple with only one method, the syntax of anonymous class seems a bit excessive and cumbersome. Lambda expressions let you express instances of single-method classes more compactly.

## Example of replacing Anonymous Inner Class to Lambda Expression

The following AnonInner class has an anonymous inner class, which extends Thread and implement run() to print a message in an infinite loop.
```java
/**
 * Example of Anonymous Inner Class, which extends an existing class.
 */
public class AnonInner {
    public int x = 10;
    public void printX() {
        final String s = "x = ";
        Thread t = new Thread() { //Anonymous Inner Class
            public void run() {
                while(true) {
                    System.out.println(s + x);
                }
            }
        };  //The semicolon here denotes the end of the new statement.
        t.start();
    }
    public static void main(String [] args) {
        new AnonInner().printX();
    }
}
``` 

The anonymous inner class above can be replaced with constructor accepting lambda in Java 1.8.
```java
public class AnonInnerLambda {
    public int x = 10;

    public void printX() {
        final String s = "x = ";
        Thread t = new Thread(() -> {
            while (true) {
                System.out.println(s + x);
            }
        });  //The semicolon here denotes the end of the new statement.
        t.start();
    }

    public static void main(String[] args) {
        new AnonInnerLambda().printX();
    }
}

```

Because we can also implement Runnable interface to code a thread, another option to replace the anonymous inner class with a lambda, which implements the Runnable implement.
```java
public class AnonInnerLambda1 {
    public int x = 10;

    public void printX() {
        final String s = "x = ";
        Runnable t = () -> {
            while (true) {
                System.out.println(s + x);
            }
        };
        new Thread(t).start();
    }

    public static void main(String[] args) {
        new AnonInnerLambda1().printX();
    }
}
```


## References

* [Java Documentation](http://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)
* [Java8 Lambda Expressions](http://www.tutorialspoint.com/java8/java8_lambda_expressions.htm)