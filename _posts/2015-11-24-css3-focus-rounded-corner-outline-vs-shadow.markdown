---
layout: post
title: "Tune the Rounded Corner Effect on a Focused Element"
date: 2015-11-24 11:18:00 +08:00
categories: Web IT
tags: CSS3
---

* content
{:toc}

CSS3 has a rounded corner style `border-radius` to make a rounded element. But when it is used in an input element, if the element is focused, the focused effect is not in a rounded corner style. This makes the UI ugly.  
![focus-outline](https://ejres-1253687085.picgz.myqcloud.com/img/css3/border-radius-focus-outline.png)  
To solve this problem, you can use outline style `-moz-outline-radius` to tune the outline's rounded corner effect. However, this works only in **Firefox**! 
其他Browser真喺冇药可救喽么？  
This is the way out: use shadow to replace outline.  
First, we tune of the original outline effect by `outline: none;`. Then we use the pseudo class `:focus` and set the `box-shadow` style.  
Wow, 咁就靓仔好多啦。  
![focus-shadow](https://ejres-1253687085.picgz.myqcloud.com/img/css3/border-radius-focus-shadow.png)

Demo link [here](https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fcss3_focus_rounded_corner.html).


