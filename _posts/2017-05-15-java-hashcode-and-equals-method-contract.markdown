---
layout: post
title: "Understand the hashCode() and equals() contract"
date: 2017-05-15 11:22:00 +08:00
categories: IT Java
tags: java ocp
---

* content
{:toc}

## The hashCode Method
> The Object class contains a method named hashCode with the following signature:  
> 　　public int hashCode()  
> This method is used by hash table data structures. The *hashCode* and *equals* methods are related in the sense that two objects that are equal should generate the same hash code. Therefore, any time you override equals in a class, you should also override hashCode. 

Confused what's the contract between *hashCode* and *equals* methods? See the example below.

## Example




The following codes intend to create a HashMap with mapping between *Friends* and their *Birthdays*. When the main() is invoked with a *Friend's* name as parameter, it tries to return the birthday.

```java
import java.util.*;

public class Birthdays {
    public static void main(String[] args) {
        Map<Friends, String> hm = new HashMap<Friends, String>();
        hm.put(new Friends("Charis"), "Summer 2009");
        hm.put(new Friends("Draumur"), "Spring 2002");
        Friends f = new Friends(args[0]);
        System.out.println(hm.get(f));
    }
}

class Friends {
    String name;
    Friends(String n) {
        name = n;
    }
}
```

When we run 'java Birthdays Draumur' in command line, we expect it returns 'Spring 2002'. However, we are disppointed that it returns 'null' instead.

```
$ java Birthdays Draumur
null
```

The reason is that the HashMap<Friends, String> uses Friends object's hashcode as the key. As we didn't override the hashcode() method, it invoked the Object's hashcode() method directly. Hence the hashcode of *new Friends(“Draumur”)* in the HashMap is different from the one created when we run the program.

Observe the codes of HashMap.get() as below.
```java
    public V get(Object key) {
        Node<K,V> e;
        return (e = getNode(hash(key), key)) == null ? null : e.value;
    }

    final Node<K,V> getNode(int hash, Object key) {
        Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
        if ((tab = table) != null && (n = tab.length) > 0 &&
            (first = tab[(n - 1) & hash]) != null) {
            if (first.hash == hash && // always check first node
                ((k = first.key) == key || (key != null && key.equals(k))))
                return first;
            if ((e = first.next) != null) {
                if (first instanceof TreeNode)
                    return ((TreeNode<K,V>)first).getTreeNode(hash, key);
                do {
                    if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k))))
                        return e;
                } while ((e = e.next) != null);
            }
        }
        return null;
    }
```

It traverses the map and try to match the key by both hashcode and equals method. Let's overrid hashcode() and equals() methods in class Friends as below. Similar to String.hashcode() and String.equals(), whenever the Friends.name is the same, it has the same hashcode and equals() returns true. 

```java
class Friends extends Object{
    String name;

    Friends(String n) {
        name = n;
    }

    public boolean equals(Object f) {
        boolean result = false;
        if (((Friends)f).name.equals(this.name))
            result = true;
        return result;
    }

    public int hashCode() {
        int h = 0;
        if (h == 0 && name.length() > 0) {
            char val[] = name.toCharArray();

            for (int i = 0; i < name.length(); i++) {
                h = 31 * h + val[i];
            }
        }
        return h;
    }
}
```

Recompile and run. See what will happen.
 
```
$ java Birthdays Draumur
Spring 2002
```
It gives what we expected!

