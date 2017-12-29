---
layout: post
title: "Java Unreachable Statements Compile Error"
date: 2012-11-15 16:28:00 +08:00
categories: Java IT
tags: Java
---

* content
{:toc}

# Type of code resulting in unreachable statement error
* A `while (false) {...}` statement will generate **unreachable statement** compile error for the codes in the while block. Ref: while
* But `if (false) {...}` and `Boolean b = false; while (b) {...}` will **not** generate **unreachable statement** compile error.
* Codes after an exception throw statement will generate unreachable statement compile error.
* Statements after an **explicit infinite loop**  (e.g. `while (true) {...}, for (;;)`) will generate **unreachable statement** compile error, even it is an **assertion** statement.

# Examples

```java
while(false) {
    System.out.println("Not here."); //Compile Error: unreachable statement
}
```







```java
public static void main(String[] args) throws Exception {
    throw new MyException();
    System.out.println("success"); //compile Error: unreachable statement
}
```


```java
public void run() {
    while(true) {
        System.out.println("Hello");
    }
    System.out.println("Goodbye");//compile error: unreachable statement
}
```

```java
public void run() {
    for (;;) {
        System.out.println("Hello");
    }
    System.out.println("Goodbye");//compile error: unreachable statement
}
```

```java
public void run() {
    boolean b = true;
    while(b=true) {
        System.out.println("Hello");
    }
    System.out.println("Goodbye");//compiles fine.
}
```

```java
public void run() {
    for (int i=0; i<5;) {
        System.out.println("Hello");
    }
    System.out.println("Goodbye");//compiles fine.
}
```

```java
public void run() {
    while(true) {
        System.out.println("Hello");
    }
    assert false : "unreachable"; //compile error: unreachable statement
}
```