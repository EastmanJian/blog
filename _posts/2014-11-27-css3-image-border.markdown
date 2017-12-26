---
layout: post
title: "CSS3 image border"
date: 2014-11-27 16:09:00 +08:00
categories: Web IT
tags: CSS3
---

* content
{:toc}


CSS3 supports image border. It uses an image and separated it into 9 parts (九宫格), use each part as elements with repeating to build a border.  
Sample style sheet:  
```css
.className {
    border: 30px solid transparent;
    border-image: url(https://example.com/path/to/image) 108 108 round;
}
```





Full example [here](https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fcss3_border_image.html).

The border image is divided and reassemble to make the border, as illustrates below.  
![border image](https://ejres-1253687085.picgz.myqcloud.com/img/css3/image-border.png)