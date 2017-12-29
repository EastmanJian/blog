---
layout: post
title: "Java Islands of Isolation and its Garbage Collection"
date: 2012-03-08 16:28:00 +08:00
categories: Java IT
tags: Java
---

* content
{:toc}

# Concept  
Basically, an **island of isolation** is a group of objects that reference each other but they are not referenced by any active object in the application. Strictly speaking, even a single unreferenced object is an island of isolation too.  

e.g.  
Object A references object B (e.g. A has a field referencing B). Object B references object A. Neither object A nor object B is referenced by any other object. That's an island of isolation.  

If two (or more) objects reference each other, but are not referenced from a root, then they are eligible for garbage collection.






# Example 

```java
public class IslandsOfIsolation {
    IslandsOfIsolation g;
    private String name;
    public static void main(String [] str) throws InterruptedException {
        System.out.println("Begin of main()");
        IslandsOfIsolation gc1 = new IslandsOfIsolation("gc1");
        IslandsOfIsolation gc2 = new IslandsOfIsolation("gc2");
        gc1.g = gc2; //gc1 refers to gc2
        gc2.g = gc1; //gc2 refers to gc1
        gc1 = null;
        gc2 = null;
        //gc1 and gc2 refer to each other and have no other valid references
        //gc1 and gc2 form Island of Isolation
        //gc1 and gc2 are eligible for Garbage collection

        System.gc();
        Thread.sleep(500); //wait for GC
        System.out.println("End of main()");
    }

    public IslandsOfIsolation(String n) {
        this.name = n;
    }

    public void finalize() {
        System.out.println(name + " is being garbage collected");
    }
}
```

🏃

```
Begin of main()
gc2 is being garbage collected
gc1 is being garbage collected
End of main()
```
 
