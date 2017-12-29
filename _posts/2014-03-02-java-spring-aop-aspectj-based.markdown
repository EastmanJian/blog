---
layout: post
title: "Spring AOP - @Aspect based custom aspect implementation"
date: 2014-03-02 21:28:00 +08:00
categories: Java IT
tags: Java Spring AOP
---

* content
{:toc}

### Notes about @Aspect based custom aspect
* The @AspectJ support is enabled by including the following element inside your XML Schema-based configuration file.  
　　`<aop:aspectj-autoproxy/>`
* Use the following annotations in the aspect class.
    - @Aspect //annotate an aspect class
    - @Pointcut("execution(* ccc.xxxxx.yyyyyy.*.*(..))")  //Declaring a pointcut using expression 
    - @Before("pointcutSignature()")  //Declaring advices
    - @After("pointcutSignature()")  //Declaring advices
    - @AfterReturning("pointcutSignature()")  //Declaring advices
    - @AfterThrowing("pointcutSignature()")  //Declaring advices
    - @Around("pointcutSignature()")  //Declaring advices
* Need the same libs as the same as XML Schema based implementation.


### Example  

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

Spring Config (the package name in this example is aop.annotation)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">

    <aop:aspectj-autoproxy/>

    <!-- Definition for student bean -->
    <bean id="student" class="aop.annotation.Student">
        <property name="name" value="Zara"/>
        <property name="age" value="11"/>
    </bean>

    <!-- Definition for logging aspect -->
    <bean id="logging" class="aop.annotation.Logging"/>
</beans>
```
<br/>

Logging.java

```java
import org.aspectj.lang.annotation.*;

@Aspect
public class Logging {
    /** Following is the definition for a pointcut to select
     *  all the methods available. So advice will be called
     *  for all the methods.
     */
    @Pointcut("execution(* aop.annotation.*.*(..))") //expression
    private void selectAll(){}   //signature

    /**
     * This is the method which I would like to execute before a selected method execution.
     */
    @Before("selectAll()")
    public void beforeAdvice(){
        System.out.println("Going to setup student profile.");
    }

    /**
     * This is the method which I would like to execute after a selected method execution.
     */
    @After("selectAll()")
    public void afterAdvice(){
        System.out.println("Student profile has been setup.");
    }

    /**
     * This is the method which I would like to execute when any method returns.
     */
    @AfterReturning(pointcut = "selectAll()", returning = "retVal")
    public void afterReturningAdvice(Object retVal){
        System.out.println("Returning:" + retVal.toString() );
    }

    /**
     * This is the method which I would like to execute if there is an exception raised by any method.
     */
    @AfterThrowing(pointcut = "selectAll()", throwing = "ex")
    public void AfterThrowingAdvice(IllegalArgumentException ex){
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
        ApplicationContext context = new ClassPathXmlApplicationContext("BeansAopAnnotation.xml");

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
	at aop.annotation.Student.printThrowException(Student.java:27)
	at aop.annotation.Student$$FastClassBySpringCGLIB$$46dbf9c8.invoke(<generated>)
...
```
<br/>

