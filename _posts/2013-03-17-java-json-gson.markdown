---
layout: post
title: "Usage of Google gson - a Java JSON API"
date: 2013-03-17 22:25:00 +08:00
categories: Java IT
tags: Java JSON
---

* content
{:toc}

> [Gson](https://github.com/google/gson) is a Java library that can be used to convert Java Objects into their JSON representation. It can also be used to convert a JSON string to an equivalent Java object. Gson can work with arbitrary Java objects including pre-existing objects that you do not have source-code of.  
> 
> There are a few open-source projects that can convert Java objects to JSON. However, most of them require that you place Java annotations in your classes; something that you can not do if you do not have access to the source-code. Most also do not fully support the use of Java Generics. Gson considers both of these as very important design goals.

# Example

```java
class BagOfPrimitives {
    private int value1 = 1;
    private String value2 = "abc";
    private transient int value3 = 3;
    BagOfPrimitives() {
        // no-args constructor
    }
}
```

```java
import com.google.gson.Gson;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class GsonDemo {
    public static void main(String[] args) {
        GsonDemo demo = new GsonDemo();
        demo.objToJson();
        demo.jsonToObj();
    }

    private void objToJson() {
        BagOfPrimitives obj = new BagOfPrimitives();
        Gson gson = new Gson();
        String json = gson.toJson(obj);
        System.out.println("json=" + json);
    }

    private void jsonToObj() {
        String json = "{\"value1\":1,\"value2\":\"abc\"}";
        Gson gson = new Gson();
        BagOfPrimitives obj2 = gson.fromJson(json, BagOfPrimitives.class);
        String output = ReflectionToStringBuilder.toString(obj2, ToStringStyle.MULTI_LINE_STYLE);
        System.out.println("obj2=" + output);
    }
}
```

Run Output

```
json={"value1":1,"value2":"abc"}
obj2=com.ej.jse.gson.BagOfPrimitives@5b37e0d2[
  value1=1
  value2=abc
]
```
