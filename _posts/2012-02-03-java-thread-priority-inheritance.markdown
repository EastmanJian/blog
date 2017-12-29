---
layout: post
title: "Java Thread Priorities and Priority Inheritance."
date: 2012-02-03 08:27:00 +08:00
categories: Java IT
tags: Java thread inheritance
---

* content
{:toc}

# Methods  to get/set thread's priority  
`final int getPriority()`  
`final void setPriority(int level)`  

The range is between MIN_PRIORITY to MAX_PRIORITY  
where   
- MIN_PRIORITY = 1 (lowest priority)  
- MAX_PRIORITY = 10 (highest priority)
- NORM_PRIORITY = 5 (default priority)  







# Preemptive Scheduling

Java programmers should assume the scheduler uses preemptive scheduling, meaning that if a thread is executing and another thread of a higher priority becomes runnable, it preempts the lower-priority thread. (Preemptive scheduling is not an absolute guarantee, so your algorithm logic should not rely on it.)

![preemptive scheduling](https://ejres-1253687085.picgz.myqcloud.com/img/java/preemptive-scheduling.png)

e.g.

```java
class Mosey implements Runnable {
	public void run() {
		
		for (int i = 0; i < 1000; i++) {
			System.out.println(Thread.currentThread().getName() + "-" + i + " ");
		}
	}
}
public class Stroll { //Test thread priority
	public static void main(String[] args) throws Exception {
		Thread t1 = new Thread(new Mosey());
		t1.setPriority(1); 
		t1.setName("t1");
		t1.start();
		new Mosey().run();
	}
}
```

Because t1's priority is set to low, most of the main thread's run() invocation will be run before t1's run() invocation. 

# Thread Priority Inheritance  
A thread inherits its priority from the thread that started it.  
e.g.  

```java
class Jiggy extends Thread {
    Jiggy(String n) { super(n); }
    public void run() {
        for(int i = 0; i < 100; i++) {
            if("t1".equals(Thread.currentThread().getName()) && i == 5) {
                new Jiggy("t3").start();
                throw new Error();
            }
            if("t2".equals(Thread.currentThread().getName()) && i == 5) {
                new Jiggy("t4").start();
                throw new Error();
            }
            System.out.println(Thread.currentThread().getName() + "-Priority" + Thread.currentThread().getPriority());
        }
    }
    public static void main(String[] args) {
        Thread t1 = new Jiggy("t1");
        Thread t2 = new Jiggy("t2");
        t1.setPriority(1); t2.setPriority(9);
        t2.start(); t1.start();
    } 
}
```

Sample output:

```
t2-Priority9
t2-Priority9
t2-Priority9
t1-Priority1
t2-Priority9
t1-Priority1
t2-Priority9
t1-Priority1
Exception in thread "t2" java.lang.Error
    at edu.exam.ocp.se6.pe.pe1.q31.Jiggy.run(Jiggy.java:13)
t1-Priority1
t4-Priority9
t4-Priority9
t4-Priority9
t1-Priority1
t4-Priority9
Exception in thread "t1" java.lang.Errort
    at edu.exam.ocp.se6.pe.pe1.q31.Jiggy.run(Jiggy.java:9)
t4-Priority9
t4-Priority9
t3-Priority1
t4-Priority9
t4-Priority9
t4-Priority9
t3-Priority1
t4-Priority9
t4-Priority9
t4-Priority9
.
.
.
t3-Priority1
t3-Priority1
t3-Priority1
```

