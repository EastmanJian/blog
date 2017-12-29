---
layout: post
title: "Interesting behavior of Chrome to prevent XSS(Cross Site Scripting)"
date: 2014-12-19 14:57:00 +08:00
categories: Web IT
tags: XSS JSP JEE
---

* content
{:toc}

When I was working on a front end tool project, I met an interesting XSS Audit error in Chrome. At that time I was trying to get user's submitted script and embeded it into the web page, Chrome prompted the below error message.  

![XSS Audit](https://ejres-1253687085.picgz.myqcloud.com/img/jee/xss-auditor-chrome-x-xss-protection.png)  
It looks a security mechanism for browser to prevent XSS (Cross Site Scripting) if the same content is transferred from a request and back by a response.  
However, it is what I need in this project.  

To resolve it, I added scramble codes in both client side the server side. It's just a matter of global replece.  
From the error message, it should be able to resolve it by another way to add 'X-XSS-Protection' in the response header.
