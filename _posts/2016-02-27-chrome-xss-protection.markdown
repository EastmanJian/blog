---
layout: post
title: "Interesting behavior of Chrome to prevent XSS(Cross Site Scripting)"
date: 2016-02-27 14:57:00 +08:00
categories: Web IT
tags: XSS JSP JEE
---

* content
{:toc}

### Notes about HTML DOM EventListener and Event Propagation
* The addEventListener() method attaches an event handler to an element without overwriting existing event handlers.
* You can add many event handlers to one element.
* You can add many event handlers of the same type to one element, e.g. two "click" events.
* You can add event listeners to any DOM object not only HTML elements. e.g. the window, the xmlHttpRequest object.
* When using the addEventListener() method, the JavaScript is seperated from the HTML markup, for better readability and allows you to add event listeners even when you do not control the HTML markup.
* You can easily remove an event listener by using the removeEventListener() method.
* When passing parameter values, use an "anonymous function" that calls the specified function with the parameters
* Two ways of event propagation: Event Bubbling or Event Capturing
     - Event propagation is a way of defining the element order when an event occurs. 
		> e.g.   
		> If you have a &lt;p&gt; element inside a &lt;div&gt; element, and the user clicks on the &lt;p&gt; element, which element's &quot;click&quot; event should be handled first?  
     - In bubbling the inner most element's event is handled first and then the outer. 
		> e.g.  
		> the &lt;p&gt; element's click event is handled first, then the &lt;div&gt; element's click event.  
     - In capturing the outer most element's event is handled first and then the inner  
		> e.g.  
		> the &lt;div&gt; element's click event will be handled first, then the &lt;p&gt; element's click event.  
     - With the addEventListener() method you can specify the propagation type by using the "useCapture" parameter. Default value is false.  
		`addEventListener(event, function, useCapture);`

Demo link [here](https://eastmanjian.cn/js_demo/tiy.jsp?sample=dom%2Fevent_propagation_capturing_bubbling.html).





![Bubbling](https://ejres-1253687085.picgz.myqcloud.com/img/javascript/propagation-bubbling.png)  
![Capturing](https://ejres-1253687085.picgz.myqcloud.com/img/javascript/propagation-capturing.png)
