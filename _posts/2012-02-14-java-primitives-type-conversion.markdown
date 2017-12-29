---
layout: post
title: "Java Primitive Type Conversion"
date: 2012-02-14 09:19:00 +08:00
categories: Java IT
tags: Java
---

* content
{:toc}

# Primitives  

|Primitives|Size       |Range (inclusive)                                      |Comment                                                             |
|----------|-----------|-------------------------------------------------------|--------------------------------------------------------------------|
|byte	   |8 bits	   |-128 to 127	                                           |                                                                    |
|short	   |16 bits	   |-32,768 to 32,767	                                   |                                                                    |
|int	   |32 bits	   |-2,147,483,648 to 2,147,483,647	                       |                                                                    |
|long	   |64 bits	   |-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807|add suffixed 'L'/'l' when assigning a long, eg: $=10123456789L      |
|float	   |32 bits	   |2-149 to (2 - 2-23) · 2127	                           |add suffixed 'F'/'f' when assigning a float, eg: $=24.95f           |
|double	   |64 bits	   |2-1074 to (2 - 2-52) · 21023	                       |use in many iterative calculations, such as sin(), cos(), sqrt()    |
|char	   |16 bits	   |'\u0000' to '\uffff' (0 to 65535) (UNICODE)	           |Not like C/C++, which is  8 bit and ASCII                           |
|boolean   |unspecified|true or false	                                       |                                                                    |







<br/>

### Notes
* Java primitive types are built-in data types.
* Primitive types are allocated in memory by declaring them in your code.
* Widening Rule: assigning smaller size primitive to a larger one. e.g. short s = 123; int i = s; float f = 56789L;
* Though long is 64 bits and float is 32 bit, long can be widen to float because the range of float is wider.
* Tough both char and short are 16 bits, they cannot be assigned to each other unless you cast it.
* long is 64 bits, bit it can be converted to float which is 32bits.

<br/>  
e.g. test primitive type conversion  

```java
public class PrimitiveTest {
    public static void main(String[] args) {
        byte b;     //8 bits
        short s;    //16 bits
        int i;      //32 bits
        long l;     //64 bits
        float f;    //32 bits
        double d;   //64 bits
        char c;     //16 bits
        boolean bl; //unspecified

        b = 123;
        s = 1234;
        i = 123456;
        l = 1223456789012l;
        f = 3.4e12f;
        d = 2.7e45;
        c = 0xAE5F;
        bl = true;

        //widening and conversion
        i = b;
        i = s;
        i = c;
        f = b;
        f = s;
        f = i;
        f = l; //note this: long is 64 bits, bit it can be converted to float which is 32bits
        l = i;
        l = b;
        l = c;
        d = s;
        d = l;
        d = c;

        //incompatible types conversion
//        i = f;  //Compile Error: incompatible types: possible lossy conversion from float to int
//        l = f;  //Compile Error: incompatible types: possible lossy conversion from float to long
//        i = l;  //Compile Error: incompatible types: possible lossy conversion from long to int
//        f = d;  //Compile Error: incompatible types: possible lossy conversion from double to float
//        c = s;  //Compile Error: incompatible types: possible lossy conversion from short to char
//        s = c;  //Compile Error: incompatible types: possible lossy conversion from char to short
//        c = b;  //Compile Error: incompatible types: possible lossy conversion from byte to char
//        b = c;  //Compile Error: incompatible types: possible lossy conversion from char to byte
//        c = bl; // Compile Error: incompatible types: boolean cannot be converted to char
//        d = bl; // Compile Error: incompatible types: boolean cannot be converted to double
//        bl = s; // Compile Error: incompatible types: short cannot be converted to boolean
//        bl = c; // Compile Error: incompatible types: char cannot be converted to boolean
//        c = bl; // Compile Error: incompatible types: boolean cannot be converted to char
//        d = bl; // Compile Error: incompatible types: boolean cannot be converted to double

        //casting
        i = (int)d;
        i = (int)f;
        c = (char)s;
        s = (short)c;
    }
}
```