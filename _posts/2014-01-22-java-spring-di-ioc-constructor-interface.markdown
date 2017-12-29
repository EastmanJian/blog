---
layout: post
title: "Spring DI (Dependency Injection) / IoC (Inversion of Control), Using Interface to Advance Decoupling"
date: 2014-01-22 18:56:00 +08:00
categories: Java IT
tags: Java Spring IoC DI
---

* content
{:toc}

> When writing a complex Java application, application classes should be as independent as possible of other Java classes to increase the possibility to reuse these classes and to test them independently of other classes while unit testing. Dependency Injection (or sometime called wiring) helps in gluing these classes together and at the same time keeping them independent.  

> IoC (Inversion of Control) - We removed total control from the owner class and kept it somewhere else (i.e. XML configuration file) and the dependency (i.e. the class being used by the owner class) is being injected into the owner class through a Class Constructor or Setter. Thus the flow of control has been "inverted" by Dependency Injection (DI) because you have effectively delegated dependances to some external system.  

> "The question is, what aspect of control are (they) inverting?" Martin Fowler(敏捷开发方法的创始人之一, 软件开发"教父") posed this question about Inversion of Control (IoC) on his site in 2004. Fowler suggested renaming the principle to make it more self-explanatory and came up with Dependency Injection.  


The owner class being injected will have to specify the class name inside though it's not required to initiate it. This limits the implementation of the injecting bean, which has to be the same full quolified name.  
To move further, we can decouple this by declaring an interface. Then we using Spring to inject various implementations who implements the same interface. By this mean, we advanced the decoupling the 'caller' and the implementation. When it's required to switch to another implementation, we can just modify Spring config file without re-compilation.  
An example shows below:  






Spring Config file:

```html
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- Definition for textEditor bean -->
    <bean id="textEditor" class="di.useinterface.TextEditor">
        <constructor-arg ref="spellChecker"/>
    </bean>

    <!-- Definition for spellChecker bean, try to switch the class between SpellCheckerImplA and SpellCheckerImplB without recomplie the code-->
    <bean id="spellChecker" class="di.useinterface.SpellCheckerImplA"></bean>
</beans>
```

<br/>  
Class TextEditor.java

```java
public class TextEditor {
    private SpellChecker spellChecker;

    public TextEditor(SpellChecker spellChecker) {
        System.out.println("Inside TextEditor constructor." );
        this.spellChecker = spellChecker;
    }
    public void spellCheck() {
        spellChecker.checkSpelling();
    }
}
```

<br/>
Interface SpellChecker.java

```java
interface SpellChecker {
    void checkSpelling();
}
```

<br/>
Class SpellCheckerImplA.java

```java
public class SpellCheckerImplA implements SpellChecker{
    public SpellCheckerImplA(){
        System.out.println("Inside SpellCheckerImplA constructor." );
    }
    public void checkSpelling() {
        System.out.println("Inside SpellCheckerImplA checkSpelling." );
    }
}
```

<br/>
Class SpellCheckerImplB.java

```java
public class SpellCheckerImplB implements SpellChecker{
    public SpellCheckerImplB(){
        System.out.println("Inside SpellCheckerImplB constructor." );
    }
    public void checkSpelling() {
        System.out.println("Inside SpellCheckerImplB checkSpelling." );
    }
}
```

<br/>
MainApp.java

```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainApp {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("BeansDiConstructorInt.xml");

        TextEditor te = (TextEditor) context.getBean("textEditor");
        te.spellCheck();
    }
}
```

<br/>
Run 

```
C:\spring_4x_demo>java -cp .;C:\spring_4x_demo\lib\*; MainApp
Inside SpellCheckerImplA constructor.
Inside TextEditor constructor.
Inside SpellCheckerImplA checkSpelling.
```

<br/>
Change Spring Config file without recompiling the codes

```html
...
    <bean id="spellChecker" class="di.useinterface.SpellCheckerImplB"></bean>
...
```
<br/>
  
Run again

```
C:\spring_4x_demo>java -cp .;C:\spring_4x_demo\lib\*; MainApp
Inside SpellCheckerImplB constructor.
Inside TextEditor constructor.
Inside SpellCheckerImplB checkSpelling.
```
