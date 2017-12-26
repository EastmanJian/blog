---
layout: post
title: "Making a nav bar using CSS3 shadow transition effect"
date: 2014-11-02 16:09:00 +08:00
categories: Web IT
tags: CSS3
---

* content
{:toc}


A demo using CSS3 transition feature to make a navigation bar. With mouse hover, the option is surrounded by a shadow.  
Sample style sheet:  
```css
.options {
    ...
    transition: box-shadow 1s;
}

.options:hover {
    box-shadow: 0px 0px 3px 3px red;
}
```

Full example [here](https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fcss3_transition_shadow.html).