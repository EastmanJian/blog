---
layout: post
title: "HTML5 new feature - Canvas"
date: 2015-07-05 22:15:00 +08:00
categories: Web IT
tags: HTML5 JavaScript
---

* content
{:toc}


Canvas是HTML5的一个新特性。使用时注意下面几点：
* The &lt;canvas&gt; element is used to **draw** graphics, **on the fly**, on a web page, via **scripting** (usually JavaScript).
* The &lt;canvas&gt; element is only a container for graphics. You must use a script to actually draw the graphics.
* Canvas has several **methods** for drawing paths, boxes, circles, text, and adding images.
* By **default**, the &lt;canvas&gt; element has **no border** and **no content**.
* Always specify an **id attribute** (to be referred to in a script), and a width and height attribute to define the size of the canvas.
* You can have **multiple** &lt;canvas&gt; elements on one HTML page.
* **getContext("2d")** object is a built-in HTML5 object, with many properties and methods for drawing paths, boxes, circles, text, images, and more.
* **fillStyle** property can be a CSS color, a gradient, or a pattern. The default fillStyle is #000000 (black).
* The canvas is a **two-dimensional** grid. The **upper-left** corner of the canvas has coordinate **(0,0)**
* Canvas is rendered pixel by **pixel**. (not like SVG)
* You can save the resulting image as .png or .jpg.

Please find a demo web page below.






[HTML5 Canvas Basic](https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fhtml5_canvas.html) 

[CodePen](codepen.io)的大神们用Canvas制作的很对炫酷，令人叹为观止的效果。拿几个出来享享眼福。
- [Dynamic Point Mesh Animation with HTML5 Canvas](https://codepen.io/dudleystorey/pen/NbNjjX)
- [Rain on HTML5 Canvas](https://codepen.io/ruigewaard/pen/JHDdF?q=html5+canvas&limit=all&type=type-pens)
- [sphere in html5 canvas](https://codepen.io/paultrone/pen/XbLWMj?q=html5+canvas&limit=all&type=type-pens)
- [3D particles to a 2D canvas](https://codepen.io/borian/pen/oKwGA?q=html5+canvas&limit=all&type=type-pens)
- [Mario Bros](https://codepen.io/GianlucaGuarini/pen/anwFE?limit=all&page=2&q=html5+canvas)

