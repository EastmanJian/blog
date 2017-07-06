---
layout: post
title: "Summary of Java Collection Framework"
date: 2017-05-30 19:39:00 +08:00
categories: Java IT
tags: java collection
---

* content
{:toc}

![Collections Hierarchy](https://ejres-1253687085.picgz.myqcloud.com/img/java/CollectionHierarchy.png)
![Map Hierarchy](https://ejres-1253687085.picgz.myqcloud.com/img/java/MapInterface.png)

## Concept of Java Collections Framework  
Collections Framework is a unified set of classes and interfaces defined in the java.util package for storing collections.  
Collections Framework represents the collections and their operations. It contains 3 elements.  




* Collection interfaces - represents abstract types of collections, so that the operations can be abstracted from detail. e.g. Set, List, Queue, Map  
* Collection implementations - the detail implementation of the interfaces. Substantially, they are reusable data structures. e.g. HashSet, ArrayList, Vector, PriorityQueue, TreeMap  
* Collection algorithms - manipulation operations on the collection objects. Substantially, they are reusable functional modules. e.g. Collections class, Arrays class  


## Advantages of Java Collection Framework  
* **Reduces programming effort** - like most Framework claims, programmer just need to focus on the business logic.  
* **Increases performance** - by providing high-performance implementations of data structures and algorithms, which are written by experts.  
* **Provides interoperability between unrelated APIs** - by establishing a common language to pass collections back and forth.  
* **Reduces the effort required to design, implement, and learn APIs**  

 
## Interfaces Hierarchy - Implementation - Methods
The following table is a summary of the collection interfaces hierarchy, their key implementations with different data structure, and principle methods. It's used for quickly lookup the implementation's interface, super interface, and what are the frequently used methods provided by each interface or specific implementation.

![Interface Impl Methods](https://ejres-1253687085.picgz.myqcloud.com/img/java/CollectionImplMethod.png)
[*(Enlarge)*](https://ejres-1253687085.picgz.myqcloud.com/img/java/CollectionImplMethod.png)  [*(Excel Version)*](https://ejres-1253687085.cosgz.myqcloud.com/doc/CollectionInterfacesImplMethods.xlsx)

### Notes
* The interfaces define the functionality that is **common** to all Collections.  
* The interfaces also facilitate the **exchange of data** between two Collections.  
* Different implementations have their particular **features and advantages**.  
* LinkedHashSet extends HashSet. LinkedHashMap extends HashMap.  
* **Primitives** are **not allowed** as the elements (item, key, value) of collections. They will be **auto boxed** to their wrapper objects.  
* **ArrayList** vs **Vector**, functionalities are the same, with the following difference.  
    * ArrayList - not synchronized, not thread-safe. If a thread-safe implementation is not needed, it is recommended to use ArrayList in place of Vector.  
    * Vector - synchronized, thread-safe  
* **HashMap** vs **HashTable** vs **ConcurrentHashMap**,  functionalities are the same, with the following difference.  
    * HashMap - not synchronized, not thread-safe, allow null as key or value. If a thread-safe implementation is not needed, it is recommended to use HashMap in place of HashTable  
    * Hashtable - synchronized, thread-safe, not allow null key or value.  
    * ConcurrentHashMap - synchronized, thread-safe, highly-concurrent, not allow null key or value. If a thread-safe highly-concurrent implementation is desired, it is recommended to use ConcurrentHashMap in place of Hashtable.  

## Collection Interfaces and Implementation features.
The following table is a summary of the feature of different collection interfaces and their key implementations. Use it to determine the suitable implementation that your business logic need.

![Collection Features](https://ejres-1253687085.picgz.myqcloud.com/img/java/CollectionFeatures.png)
[*(Enlarge)*](https://ejres-1253687085.picgz.myqcloud.com/img/java/CollectionFeatures.png) 


## References

* [Java Documentation](http://docs.oracle.com/javase/7/docs/technotes/guides/collections/overview.html)
