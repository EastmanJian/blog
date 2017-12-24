---
layout: post
title: "Switching Style Sheets in a single HTML page"
date: 2014-11-12 20:32:00 +08:00
categories: Web IT
tags: CSS, CSS3, JavaScript
---

* content
{:toc}


CSS Separates format and style from HTML page content structure. It's a great improvement since HTML 4.0. In general web page design, three parts should be separated. They are the structure, style, and data.
实现样式和结构嘅分离，结构和数据嘅分离，喺网页设计一个好重要嘅原则。
  
The demo below shows the separation between web page structure and style.  
* [Multiple CSS in a single HTML page](https://eastmanjian.github.io/HTML_CSS_Demo/css_basic_demo.html)

Note: Use **document.styleSheets[n]** to retrieve the style sheet object in case multiple style sheet in one HTML file. Use the **disabled** property to control the active status of each style sheet.  
Ref: [W3 Schools](https://www.w3schools.com/css/css_intro.asp)

有个网站叫[CSS Zen Garden](http://www.csszengarden.com/)。里面汇聚咗好多CSS高手，利用不同嘅CSS对同一内容嘅一页HTML进行渲染，而焕发出各种惊艳嘅效果。推荐去观摩学习下。