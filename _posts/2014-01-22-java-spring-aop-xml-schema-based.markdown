---
layout: post
title: "Spring AOP - XML Schema based custom aspect implementation"
date: 2014-01-22 21:14:00 +08:00
categories: Java IT
tags: Java Spring AOP
---

* content
{:toc}

> One of the key components of Spring is the Aspect Oriented Programming (AOP) framework.  
> 
> The functions that span multiple points of an application are called cross-cutting concerns and these cross-cutting concerns are conceptually separate from the application's business logic.   
> 　　e.g. aspects examples like: logging, declarative transactions, security, caching, etc.  
> 
> The key unit of modularity in OOP is the class, whereas in AOP the unit of modularity is the aspect.   
>
> DI vs APO  
> * DI helps you decouple your application objects from each other,   
> * AOP helps you decouple cross-cutting concerns from the objects that they affect.  
> 
> The AOP module of Spring Framework provides an aspect-oriented programming implementation allowing you to define method-interceptors to intercept an application and pointcuts to cleanly decouple code that implements functionality that should be separated.   
> 　　e.g. when a method is executed, you can add extra functionality before or after the method execution.  

### Example: XML Schema based custom aspect implementation

Dependency  

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
</dependency><dependency>
    <groupId>aopalliance</groupId>
    <artifactId>aopalliance</artifactId>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjrt</artifactId>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
</dependency>
```
<br/>

Spring Config (the package name in this example is aop.xmlschema)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">

    <aop:config>
        <aop:aspect id="log" ref="logging">
            <aop:pointcut id="selectAll" expression="execution(* aop.xmlschema.*.*(..))"/>

            <aop:before pointcut-ref="selectAll" method="beforeAdvice"/>
            <aop:after pointcut-ref="selectAll" method="afterAdvice"/>
            <aop:after-returning pointcut-ref="selectAll" returning="retVal" method="afterReturningAdvice"/>
            <aop:after-throwing pointcut-ref="selectAll" throwing="ex" method="AfterThrowingAdvice"/>
        </aop:aspect>
    </aop:config>

    <!-- Definition for student bean -->
    <bean id="student" class="aop.xmlschema.Student">
        <property name="name" value="Zara"/>
        <property name="age" value="11"/>
    </bean>

    <!-- Definition for logging aspect -->
    <bean id="logging" class="aop.xmlschema.Logging"/>
</beans>
```
<br/>

Logging.java

```java
public class Logging {
    /**
     * This is the method which I would like to execute before a selected method execution.
     */
    public void beforeAdvice() {
        System.out.println("Going to setup student profile.");
    }

    /**
     * This is the method which I would like to execute after a selected method execution.
     */
    public void afterAdvice() {
        System.out.println("Student profile has been setup.");
    }

    /**
     * This is the method which I would like to execute when any method returns.
     */
    public void afterReturningAdvice(Object retVal) {
        System.out.println("Returning:" + retVal.toString());
    }

    /**
     * This is the method which I would like to execute if there is an exception raised.
     */
    public void AfterThrowingAdvice(IllegalArgumentException ex) {
        System.out.println("There has been an exception: " + ex.toString());
    }
}
```
<br/>

Student.java

```java
public class Student {
    private Integer age;
    private String name;

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getAge() {
        System.out.println("Age : " + age);
        return age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        System.out.println("Name : " + name);
        return name;
    }

    public void printThrowException() {
        System.out.println("Exception raised");
        throw new IllegalArgumentException();
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
        ApplicationContext context = new ClassPathXmlApplicationContext("BeansAopXmlSchema.xml");

        Student student = (Student) context.getBean("student");
        student.getName();
        student.getAge();
        student.printThrowException();
    }
}
```
<br/>

Run output

```
Going to setup student profile.
Name : Zara
Student profile has been setup.
Returning:Zara
Going to setup student profile.
Age : 11
Student profile has been setup.
Returning:11
Going to setup student profile.
Exception raised
Student profile has been setup.
There has been an exception: java.lang.IllegalArgumentException
Exception in thread "main" java.lang.IllegalArgumentException
	at aop.xmlschema.Student.printThrowException(Student.java:27)
	at aop.xmlschema.Student$$FastClassBySpringCGLIB$$a5c1e9b9.invoke(<generated>)
	at org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:204)
...
(other exception content)
```
<br/>

If you want to execute your advice before or after a particular method, you can define your pointcut to narrow down your execution by replacing stars (*) in pointcut definition with the actual class and method names.  
e.g.  

```xml
...
   <aop:pointcut id = "selectAll" expression = "execution(* aop.xmlschema.Student.getName(..))"/>
...
```
<br/>

Run output

```
Going to setup student profile.
Name : Zara
Student profile has been setup.
Age : 11
Exception raised
...
(other exception content)
```


