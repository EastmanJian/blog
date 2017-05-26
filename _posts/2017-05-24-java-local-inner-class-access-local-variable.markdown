---
layout: post
title: "Java Local Inner Classes accessing Local Variable in higher Java version"
date: 2017-05-24 13:20:00 +08:00
categories: IT Java
tags: java oo
---

* content
{:toc}

## The change in higher Java version

In Java 6 or previous versions, a local inner class does not have access to the local variables of method unless those variables are final.   
Starting in Java SE 8, a local class can access local variables and parameters of the enclosing block that are final or effectively final. Hence adding final modifier for the variable is not necessary. However you cannot change the value the variable after value is assigned.

## Example




The following code compiles and runs fine.
```java
public class Internet {
    private int y = 8;
    public static void main(String[] args) {
        new Internet().go();
    }
    void go() {
        int x = 7; //not necessary to declare x as final here
        class TCPIP {
            void doit() { System.out.println(y + x); }
        }
        TCPIP ip = new TCPIP(); //this line cannot put before TCPIP declaration
        ip.doit();
    }
}
```
```
// -> 15
```

However, if we change the x after it's assigned first time, it leads to compile error.
```java
public class Internet {
    private int y = 8;

    public static void main(String[] args) {
        new Internet().go();
    }

    void go() {
        int x = 7;
        x = 9; //leads to compile error at line 'System.out.println(y + x);': local variables referenced from an inner class must be final or effectively final
        class TCPIP {
            void doit() {
                x = 9; //compile error: local variables referenced from an inner class must be final or effectively final
                System.out.println(y + x);
            }
        }
        TCPIP ip = new TCPIP();
        ip.doit();
    }
}
```


