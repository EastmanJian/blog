---
layout: post
title: "Java 7 new feature - using String as Switch Variable"
date: 2012-07-14 09:19:00 +08:00
categories: Java IT
tags: Java
---

* content
{:toc}

In Java 7.0 and above, you can use String as the switch variable.

e.g. 

```java
public class StringValidAfterJava7 {
    public static void main(String[] args) {
        String myConsole = "WII";
        final String ps ="PLAYSTATION"; 
        switch (myConsole) {
            case "XBOX":
                System.out.println("XBox console");
                break;
            case "WII":
                System.out.println("WII console");
                break;
            case ps:
                System.out.println("PlayStation console");
                break;
            default:
                System.out.println("Not here");
        }
    }
}
```

🏃

`WII console`
 
