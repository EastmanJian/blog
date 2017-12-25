---
layout: post
title: "Spring MVC Framework"
date: 2013-12-30 10:18:00 +08:00
categories: Web IT
tags: Spring MVC
---

* content
{:toc}


# MVC Pattern
Spring Web MVC framework provides Model-View-Controller (MVC) architecture and ready components that can be used to develop flexible and loosely coupled web applications.
* The Model encapsulates the application data and in general they will consist of POJO.
* The View is responsible for rendering the model data and in general it generates HTML output that the client's browser can interpret.
* The Controller is responsible for processing user requests and building an appropriate model and passes it to the view for rendering.

For more, refer to [MVC Pattern](https://eastmanjian.cn/blog/2012/01/28/mvc/)

# DispatcherServlet
* The Spring Web MVC framework is designed around a DispatcherServlet that handles all the HTTP requests and responses.  
![Spring MVC Diagram](https://ejres-1253687085.picgz.myqcloud.com/img/spring/spring-mvc-impl.png)






* Handling sequence of incoming HTTP Request
    1. After receiving an HTTP request, DispatcherServlet consults the HandlerMapping to call the appropriate Controller.
    2. The Controller takes the request and calls the appropriate service methods based on used GET or POST method. The service method will set model data based on defined business logic and returns view name to the DispatcherServlet.
    3. The DispatcherServlet will take help from ViewResolver to pick up the defined view for the request.
    4. Once view is finalized, The DispatcherServlet passes the model data to the view which is finally rendered on the browser.
		
# View Resolvers
* Spring 4.0 has 13 types of View Resolvers. Some of them are:
    - InternalResourceViewResolver
    - BeanNameViewResolver
    - XmlViewResolver

# Spring’s JSP form tag library
As of version 2.0, Spring provides a comprehensive set of data binding-aware tags for handling form elements when using JSP and Spring Web MVC. 


# Page redirect: 
In the controller return, add 'redirect:anotherPath' to redirect to another page.



# Access static pages / resources
* Spring MVC Framework can access static pages along with dynamic pages with the help of &lt;mvc:resources&gt; tag in Spring Config. 
* The mapping attribute of &lt;mvc:resources&gt; must be an Ant pattern that specifies the URL pattern of an http requests.
* The location attribute of &lt;mvc:resources&gt; must specify one or more valid resource directory locations having static pages including images, stylesheets, JavaScript, and other static content. Multiple resource locations may be specified using a comma-separated list of values.


# Exception Handling 
* Make use of SimpleMappingExceptionResolver in spring config for exception page mapping.
* Use @ExceptionHandler({exceptionName.class}) annotation to specify the exception handler in the controller.

# Examples
* [Basic - DispatcherServlet, InternalResourceViewResolver, BeanNameViewResolver](https://eastmanjian.cn/spring_4x_mvc_demo/hellospring.do) [![icon](https://img.shields.io/badge/-Source%20Code-lightgrey.svg)](https://github.com/EastmanJian/spring_4x_mvc_demo)
* [Form - TagLib, Data binding, ModelAndView, @ModelAttribute](https://eastmanjian.cn/spring_4x_mvc_form_demo/student) [![icon](https://img.shields.io/badge/-Source%20Code-lightgrey.svg)](https://github.com/EastmanJian/spring_4x_mvc_form_demo)
* [Page Redirect, Access static pages or resources](https://eastmanjian.cn/spring_4x_mvc_redirect_demo/index) [![icon](https://img.shields.io/badge/-Source%20Code-lightgrey.svg)](https://github.com/EastmanJian/spring_4x_mvc_redirect_demo)
* [Exception Handling, SimpleMappingExceptionResolver, @ExceptionHandler](https://eastmanjian.cn/spring_4x_mvc_exception_demo/student) [![icon](https://img.shields.io/badge/-Source%20Code-lightgrey.svg)](https://github.com/EastmanJian/spring_4x_mvc_exception_demo)



# References
- docs.spring.io
- Spring in Action, 4th Edition
- www.tutorialspoint.com/spring


