---
layout: post
title: "Java Primitive Wrapper Cache Values Objects"
date: 2012-07-30 13:21:00 +08:00
categories: Java IT
tags: Java
---

* content
{:toc}

The Java primitives wrapper classes might cache values objects within a range to improve performance.

e.g. 

```java
public class Stealth {
    public static void main(String[] args) {
        Integer i = 420;
        Integer i2;
        Integer i3;
        i2 = i.intValue();
        i3 = i.valueOf(420);
        System.out.println((i == i2) + " " + (i == i3));

        i = 42;  //Integer(42) is cached.
        i2 = i.intValue();
        i3 = i.valueOf(42);  //not creating a new instance but find it from the cache.
        System.out.println((i == i2) + " " + (i == i3));  //test if they are the same instance
    }
}
```

🏃

```
false false
true true
```
 
