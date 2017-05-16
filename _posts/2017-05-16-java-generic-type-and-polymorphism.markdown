---
layout: post
title: "Understanding polymorphism and generics, generics wildcards"
date: 2017-05-16 12:22:00 +08:00
categories: IT Java
tags: java ocp polymorphism generics
---

* content
{:toc}

### Example of Generics and Polymorphism

Java 1.6 onwards introduced Generics. You can refer to Java books about Generic Classes, Generic Interfaces, Generic Methods. Here we concentrate to a few points which easily lead to confusion.  
The following example created two Classes, Flakes inherits Cereal. Then we use them in generic interface List and generic class ArrayList.  
Can you predict the compile and run result of the following codes?  
```java
1.  import java.util.*;
2.  class Cereal { }
3.  public class Flakes extends Cereal {
4.      public static void main(String[] args) {
5.          List<Flakes> c0 = new List<Flakes>();
6.          List<Cereal> c1 = new ArrayList<Cereal>();
7.          Cereal co2 = new Flakes();
8.          List<Cereal> c2 = new ArrayList<Flakes>();
9.          Flakes co3 = new Cereal();
10.         List<Flakes> c3 = new ArrayList<Cereal>();
11.         List<Object> c4 = new ArrayList<Flakes>();
12.         ArrayList<Cereal> c5 = new ArrayList<Flakes>();
13.         ArrayList<? extends Cereal> c6 = new ArrayList<Flakes>();
14.         List<? extends Cereal> c7 = new ArrayList<Flakes>();
15.     }
16.  }
```
Here is the compile result.





```
Line 5:  Compile Error： java.util.List is abstract; cannot be instantiated
Line 8:  Compile Error: incompatible types: java.util.ArrayList<Flakes> cannot be converted to java.util.List<Cereal>
Line 9:  Compile Error: incompatible types: Cereal cannot be converted to Flakes
Line 10: Compile Error: incompatible types: java.util.ArrayList<Cereal> cannot be converted to java.util.List<Flakes>
Line 11: Compile Error: incompatible types: java.util.ArrayList<Flakes> cannot be converted to java.util.List<java.lang.Object>
Line 12: Compile Error: incompatible types: java.util.ArrayList<Flakes> cannot be converted to java.util.List<Cereal>
```

Surprisingly, for line 8, even though a Cereal is superclass of Flakes, a List&lt;Cereal&gt; cannot refer to an ArrayList&lt;Flakes&gt;. Not like line 7, a reference of Cereal can refer to a Flakes object (line 7).  
Line 10~12 have similar compile error as line 8.  
If you want to use a polymorphic reference, you need to use an upper-bound. For example, line 13 and 14 are valid.

### Using Polymorphism in Upper-Bound or Lower-Bound Wildcards of Generics
After you used upper-bound or lower-bound wildcards to assign a generic type reference, how to use it?   
Please find an example below. Is it valid?
```java
1.  import java.util.ArrayList;
2.  
3.  public class UpperBoundWildcardsTest {
4.      public static void main(String[] args) {
5.          ArrayList<? extends Number> list = new ArrayList<>();
6.          Number n1 = new Integer(12);
7.          Integer n2 = new Integer (23);
8.          Double n3= new Double (34.56);
9.          list.add(n1);
10.         list.add(n2);
11.         list.add(n3);
12.         list.add(null);
13.     }
14. 
15.     public void testAdd(ArrayList<? extends Number> list){
16.         list.add(new Integer(67));
17.         list.add(new Double(78.9));
18.         for (Number n : list ) {
19.             System.out.println(n);
20.         }
21.         ArrayList<Integer> intList = new ArrayList<Integer>();
22.         intList.add(123);
23.         list = intList;
24.     }
25. }
```
Here is the compile result.

```
Line 9: Compile Error: no suitable method found for add(java.lang.Number).
    method java.util.ArrayList.add(capture#1 of ? extends java.lang.Number) is not applicable
    (argument mismatch; java.lang.Number cannot be converted to capture#1 of ? extends java.lang.Number)
Line 10: Compile Error: no suitable method found for add(java.lang.Integer)
    method java.util.ArrayList.add(capture#1 of ? extends java.lang.Number) is not applicable
    (argument mismatch; java.lang.Integer cannot be converted to capture#1 of ? extends java.lang.Number)
Line 11: Compile Error: no suitable method found for add(java.lang.Double)
    method java.util.ArrayList.add(capture#1 of ? extends java.lang.Number) is not applicable
    (argument mismatch; java.lang.Double cannot be converted to capture#1 of ? extends java.lang.Number)
Line 16: Compile Error: no suitable method found for add(java.lang.Integer)
    method java.util.ArrayList.add(capture#1 of ? extends java.lang.Number) is not applicable
    (argument mismatch; java.lang.Integer cannot be converted to capture#1 of ? extends java.lang.Number)
Line 17: Compile Error: no suitable method found for add(java.lang.Double)
    method java.util.ArrayList.add(capture#1 of ? extends java.lang.Number) is not applicable
    (argument mismatch; java.lang.Double cannot be converted to capture#1 of ? extends java.lang.Number)
```

Surprisingly again, there are compile errors in line 9, 10, 11, 16, 17.  
Working wih Java's polymorphism feature, a Number reference can refer to its child object like a Double or an Integer object.  
But there are compile errors in line 9,10,11 because list's member can be &lt;? extends Number&gt;, like Number, Double, Integer etc.., in line 9, it tries to add a Number object to list, in case list is referencing to ArrayList&lt;Integer&gt;, it will cause problem because an Integer ref cannot refer to a Number object.  
Same reason, in line 10, it tries to add an Integer object to list, in case list is referencing to ArrayList&lt;Double&gt; or other type which is out of ArrayList&lt;Integer&gt;, it will cause error because Double ref or other references cannot refer to an Integer object.  
In order to protect the consistency, Java compiler cannot let them pass.  
The reason of compile error in line 11 is similar to line 10.  
Only null is acceptable to be added, see line 12.  

Similar to line 10 and 11, there will be the same compile err in line 16 and 17.

Though the list cannot be used for add() in most cases, it can be used for get(), or in a method for traversing, or assign another initiated List object to the list. Demonstrated in line 18~23.


Please find an example for lower-bound generics below. Similar to the upper-bound generics, there will be compile errors in line 24 and 25, because the lower-bound generic type in ArrayList &lt;? super IOException&gt; can be IOException, Exception, Throwable or Object, if you add an Exception or SQLException objects to exceptions, in case the exceptions type is IOException, it cannot be used to reference these objects.

```java
1.  import java.io.FileNotFoundException;
2.  import java.io.IOException;
3.  import java.sql.SQLException;
4.  import java.util.ArrayList;
5.  import java.util.List;
6.  
7.  public class LowerBoundWildcardsTest {
8.      public static void showExceptions(List<? super IOException> list) {
9.          for (Object e : list) {
10.             System.out.println(e.toString());
11.         }
12.     }
13. 
14.     public static void main(String[] args) {
15.         ArrayList<? super IOException> exceptions = new ArrayList<Exception>();
16.         IOException e1 = new IOException("Problem 1");
17.         IOException e2 = new IOException("Problem 2");
18.         FileNotFoundException e3 = new FileNotFoundException("Problem 3");
19.         Exception e4 = new Exception("Problem 4");
20.         Exception e5 = new SQLException("Problem 5");
21.         exceptions.add(e1);
22.         exceptions.add(e2);
23.         exceptions.add(e3);
24.         exceptions.add(e4);
25.         exceptions.add(e5);
26.         showExceptions(exceptions);
27.     }
28. }
```

Compile Result:

```
Error:(24, 19) java: no suitable method found for add(java.lang.Exception)
    method java.util.ArrayList.add(capture#1 of ? super java.io.IOException) is not applicable
      (argument mismatch; java.lang.Exception cannot be converted to capture#1 of ? super java.io.IOException)
Error:(25, 19) java: no suitable method found for add(java.lang.Exception)
    method java.util.ArrayList.add(capture#2 of ? super java.io.IOException) is not applicable
      (argument mismatch; java.lang.Exception cannot be converted to capture#2 of ? super java.io.IOException)
```

