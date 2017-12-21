---
layout: post
title: "Singleton pattern lazy initialization implementation in Java"
date: 2014-05-22 00:01:00 +08:00
categories: IT Java
tags: java ooad design pattern concurrency multi-thread
---

* content
{:toc}

## Singleton Pattern
Singgleton is one of Creational Design Patterns. There are any number of cases in programming where you need to make sure that there can be one and only one instance of a class. Singleton is used for this case.

## Lazy Initialization
In computer programming, lazy initialization is the tactic of delaying the creation of an object, the calculation of a value, or some other expensive process until the first time it is needed.




This is typically accomplished by maintaining a flag indicating whether the process has taken place. Each time the desired object is summoned, the flag is tested. If it is ready, it is returned. If not, it is initialized on the spot.
In a software design pattern view, lazy initialization is often used together with a factory method pattern. This combines three ideas:
* using a factory method to get instances of a class (factory method pattern) 
* storing the instances in a map, so you get the same instance the next time you ask for an instance with same parameter (compare with a singleton pattern) 
* using lazy initialization to instantiate the object the first time it is requested (lazy initialization pattern). 

## Using Lazy Initialization to implement Singleton Pattern in Java
The following Java class SafeDeposit try to implement a SafeDeposit object singleton. It contains a static field to store the only instance. With lazy initialization, the instance will not be created until the getInstance() methoed is firstly called. And the static field *singleton* will refer to the instance once it's created. If getInstance() is called twice, it returns the *singleton* refrence to the caller.

```java
public class SafeDeposit {
    private static SafeDeposit singleton;
    private int code;

    public static SafeDeposit getInstance(int code) {
        if (singleton == null) {
            singleton = new SafeDeposit(code);
        }
        return singleton;
    }

    private SafeDeposit(int c) {
        code = c;
    }

    int getCode() {
        return code;
    }
}
```

The code looks good. However, it doesn't work properly in multi-thread environment. Imagine two concurrent thread call the getInstance() method at the first time before the instance is created, the condition test 'if (singleton == null)' might be executed concurrently, both threads' condition test result will be true, then 'new SafeDeposit(code)' will be executed in both threads, which result in two SafeDeposit instances created. To overcome, we need to add *synchronized* modifier to the getInstance() method.
To demostrate, we create another class SafeDepositSync similar to SafeDeposit, but with *synchronized* modifier on the getInstance() method. And we write a test class BeSafeMulti to call getInstance() for both cases. Let's see the output.

```java
public class SafeDeposit {
    private static SafeDeposit singleton;
    private int code;

    public static SafeDeposit getInstance(int code) {
        if (singleton == null) {
            try {
                Thread.sleep(500); //add delay for easier simulate multi-thread case
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            singleton = new SafeDeposit(code);
        }
        return singleton;
    }

    private SafeDeposit(int c) {
        code = c;
    }

    int getCode() {
        return code;
    }
}

public class SafeDepositSync {
    private static SafeDepositSync singleton;
    private int code;

    public static synchronized SafeDepositSync getInstance(int code) {
        if (singleton == null) {
            try {
                Thread.sleep(500); //add delay for easier simulate multi-thread case
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            singleton = new SafeDepositSync(code);
        }
        return singleton;
    }

    private SafeDepositSync(int c) {
        code = c;
    }

    int getCode() {
        return code;
    }
}

/**
 * It’s possible for SafeDeposit’s un-synchronized getInstance() method to return more than one instance of the class.
 * To enforce the singleton, we can add synchronized modifier to the getInstance() method.
 */
public class BeSafeMulti extends Thread {
    private int code;

    public BeSafeMulti(int code) {
        this.code = code;
    }

    public void run () {
        SafeDeposit sd = SafeDeposit.getInstance(code);  //SafeDeposit.getInstance() is un-synchronized.
        SafeDepositSync sds = SafeDepositSync.getInstance(code);  //SafeDepositSync.getInstance() is synchronized.
        System.out.println("SafeDeposit instance = " + sd + ", code = " + sd.getCode());
        System.out.println("SafeDepositSync instance = " + sds + ", code = " + sds.getCode());
    }

    public static void main(String[] args) {
        Thread t1 = new BeSafeMulti(10);
        Thread t2 = new BeSafeMulti(20);
        t1.start();
        t2.start();
    }

}
```

```
/* sample output ->
SafeDeposit instance = SafeDeposit@1632e0d, code = 10
SafeDeposit instance = SafeDeposit@ed7ea5, code = 20
SafeDepositSync instance = SafeDepositSync@1a4dd11, code = 10
SafeDepositSync instance = SafeDepositSync@1a4dd11, code = 10
 */
```
The output shows SafeDeposit created two instances. While SafeDepositSync created only one instance, which is the expected implementation.


## References
* Design Patterns Java - Addison Wesley
* [Lazy Initialization in Wikipedia](https://en.wikipedia.org/wiki/Lazy_initialization)