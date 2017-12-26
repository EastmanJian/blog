---
layout: post
title: "CSS3 rounded corner border feature"
date: 2014-11-17 15:58:00 +08:00
categories: Web IT
tags: CSS3
---

* content
{:toc}


CSS3 support rounded corner border, which is widely used in most fancy web pages.  
Sample style sheet:  
```css
div.test1 {
    border-radius:20px;
    -moz-border-radius:25px; /* old Firefox */
}
div.test2 {
    border-radius: 50px 0 30px 0/50px 0 10px 0;
}

.rounded-circle {
    border-radius: 50%;
}
```

Full example [here](https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fcss3_border_round.html).