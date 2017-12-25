---
layout: post
title: "Multi-thread synchronization in Java, notify() vs notifyAll()"
date: 2014-05-23 00:11:30 +08:00
categories: IT Java
tags: Java multi-thread concurrency synchronization
---

* content
{:toc}

## producer/consumer model

A classic multi-thread model is the **producer/consumer model**, where one thread is “producing” something and another thread is “consuming” something. If the consumer is too fast, it might need to wait for the producer. Once the producer catches up, it can notify the consumer to continue consuming again. This model is frequently used as an example for multi-threading synchronization programming.   
Following animation pictures illustrate a typical Producer and a Consumer. The Producer produces numbers and push to a stack until it's full, and the Consumer pops (consumes) the numbers out of the stack until it's empty.

![Producer](https://ejres-1253687085.picgz.myqcloud.com/img/java/producer.gif)

![Consumer](https://ejres-1253687085.picgz.myqcloud.com/img/java/consumer.gif)





The following Producer and Consumer Java classes demonstrate the model above.

```java
/**
 * Example of notifyAll() vs notify() in multi-threading.
 * Producer: every 5 seconds produces 9 numbers (1~9) to the stack in a batch, then notify the Consumers.
 */
public class Producer extends Thread {
    private MyStack2 stack;
    public Producer(MyStack2 stack) {
        this.stack = stack;
    }
    public void run() {
        while(true) {
            for (int i=1 ; i<=9 ; i++) {
                stack.push(i);
                System.out.println("Producer: Just pushed " + i);
                try {
                    Thread.sleep(500);
                }catch(InterruptedException e) {}
            }
            synchronized(stack) {
                System.out.println("Producer: Notifying...");
                stack.notifyAll(); 
            }
            try {
                Thread.sleep(5000);
            }catch(InterruptedException e) {}
        }
    }
}
```

```java
/**
 * Example of wait() in multi-threading.
 * Consumer: every 1 second pops a number from the stack. If the stack is empty, wait for the Producer.
 *
 */
public class Consumer extends Thread {
    private MyStack2 stack;
    private int id;

    public Consumer(int id, MyStack2 stack) {
        this.stack = stack;
        this.id = id;
    }

    public void run() {
        while (true) {
            synchronized (stack) {
                int x = stack.pop();
                if (x == -1) {
                    try {
                        System.out.println("Consumer " + id + ": Waiting...");
                        stack.wait();
                    } catch (InterruptedException e) {
                    }
                } else {
                    System.out.println("Consumer " + id + ": Just popped " + x);
                }
            }
            Thread.yield();
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

## multi-thread synchronization handling in Java
Java language has the following key concepts and mechanism about multi-thread synchronization handling.
* Thread States - NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED
* Monitor Lock
* Synchronized Blocks
* Synchronized Methods
* Deadlock
* Thread.yield()
* Thread.sleep()
* Thread.join()
* Thread.wait()
* Thread.notify()
* Thread.notifyAll()

## notify() vs notifyAll(), demo
If there are only one Producer and one Consumer, we can use notify() or notifyAll() once the Producer wants to awaken the Consumer to consume. However, in case there are multiple Consumers, ideally we should use notifyAll() to awaken all the Consumers, otherwise, only one of the Consumers will be awaken to continue the job. The class ProduceConsume below demonstrate one Producer and multiple Consumers case. 

```java
/**
 * Example of wait(), notifyAll(), notifyAll() in multi-threading.
 *
 * One Producer thread and multiple Consumers threads to show the difference between notifyAll() and notify().
 */
public class ProduceConsume {
    public static void main(String[] args) {
        MyStack2 stack = new MyStack2();
        Consumer c1 = new Consumer(1, stack);
        Consumer c2 = new Consumer(2, stack);
        Consumer c3 = new Consumer(3, stack);
        c1.start();
        c2.start();
        c3.start();
        Producer p = new Producer(stack);
        p.start();
    }
}
```

Let's see the difference if we use notifyAll() or notify() in the Producer thread.

### using notifyAll() in Producer
Keep the original codes in Producer and run ProduceConsume. A sample output will be as below.

```
Consumer 1: Waiting...
Consumer 2: Waiting...
Consumer 3: Waiting...
Producer: Just pushed 1
Producer: Just pushed 2
Producer: Just pushed 3
Producer: Just pushed 4
Producer: Just pushed 5
Producer: Just pushed 6
Producer: Just pushed 7
Producer: Just pushed 8
Producer: Just pushed 9
Producer: Notifying...
Consumer 2: Just popped 9
Consumer 1: Just popped 8
Consumer 3: Just popped 7
Consumer 1: Just popped 6
Consumer 3: Just popped 5
Consumer 2: Just popped 4
Consumer 2: Just popped 3
Consumer 3: Just popped 2
Consumer 1: Just popped 1
Consumer 3: Waiting...
Consumer 2: Waiting...
Consumer 1: Waiting...
Producer: Just pushed 1
Producer: Just pushed 2
Producer: Just pushed 3
...
```
You can see all the Consumer threads are notified and continue to consume the stack until it's empty. And then they go back to wait.


### using notify() in Producer
If the change the code in the Producer, replacing notifyAll() to notify(). Rerun ProduceConsume and let's see what will happen.
```
Consumer 1: Waiting...
Consumer 2: Waiting...
Consumer 3: Waiting...
Producer: Just pushed 1
Producer: Just pushed 2
Producer: Just pushed 3
Producer: Just pushed 4
Producer: Just pushed 5
Producer: Just pushed 6
Producer: Just pushed 7
Producer: Just pushed 8
Producer: Just pushed 9
Producer: Notifying...
Consumer 1: Just popped 9
Consumer 1: Just popped 8
Consumer 1: Just popped 7
Consumer 1: Just popped 6
Consumer 1: Just popped 5
Consumer 1: Just popped 4
Consumer 1: Just popped 3
Consumer 1: Just popped 2
Consumer 1: Just popped 1
Consumer 1: Waiting...
Producer: Just pushed 1
Producer: Just pushed 2
Producer: Just pushed 3
Producer: Just pushed 4
Producer: Just pushed 5
Producer: Just pushed 6
Producer: Just pushed 7
Producer: Just pushed 8
Producer: Just pushed 9
Producer: Notifying...
Consumer 2: Just popped 9
Consumer 2: Just popped 8
Consumer 2: Just popped 7
Consumer 2: Just popped 6
Consumer 2: Just popped 5
Consumer 2: Just popped 4
Consumer 2: Just popped 3
Consumer 2: Just popped 2
Consumer 2: Just popped 1
Consumer 2: Waiting...
Producer: Just pushed 1
Producer: Just pushed 2
Producer: Just pushed 3
Producer: Just pushed 4
Producer: Just pushed 5
Producer: Just pushed 6
Producer: Just pushed 7
Producer: Just pushed 8
Producer: Just pushed 9
Producer: Notifying...
Consumer 3: Just popped 9
Consumer 3: Just popped 8
Consumer 3: Just popped 7
Consumer 3: Just popped 6
Consumer 3: Just popped 5
Consumer 3: Just popped 4
Consumer 3: Just popped 3
Consumer 3: Just popped 2
Consumer 3: Just popped 1
Consumer 3: Waiting...
Producer: Just pushed 1
Producer: Just pushed 2
Producer: Just pushed 3
Producer: Just pushed 4
Producer: Just pushed 5
Producer: Just pushed 6
Producer: Just pushed 7
Producer: Just pushed 8
Producer: Just pushed 9
Producer: Notifying...
Consumer 1: Just popped 9
Consumer 1: Just popped 8
Consumer 1: Just popped 7
...
```
You can see the Producer randomly waits up only one of the Consumers. Other two Consumers are still waiting there. And that activated consumer consumes all the stack elements and then go back to wait. The next cycle is similar. 
