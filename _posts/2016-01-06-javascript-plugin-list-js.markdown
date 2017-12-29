---
layout: post
title: "Found a wonderful JavaScript plug-in for searching, sorting, filtering - List.js"
date: 2016-01-06 09:55:00 +08:00
categories: Web IT
tags: JavaScript
---

* content
{:toc}

A young man Jonny made this wonderful plugin. Visit [listjs.com](http://listjs.com/).  

> Features - Tiny, invisible and simple, yet powerful and incredibly fast vanilla JavaScript that adds search, sort, filters and flexibility to plain HTML lists, tables, or anything.
> It has a fuzzy search algorithm with parameters.
> * searchClass - String, default: fuzzy-search
> > What is the class of the search field?
> * location Int, default: 0
> > Approximately where in the text is the pattern expected to be found?
> * distance Int, default: 100
> > Determines how close the match must be to the fuzzy location (specified above). An exact letter match which is ‘distance’ characters away from the fuzzy location would score as a complete mismatch. A distance of 0 requires the match be at the exact location specified, a threshold of 1000 would require a perfect match to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
> * threshold Int, default: 0.4
> > At what point does the match algorithm give up. A threshold of 0.0 requires a perfect match (of both letters and location), a threshold of 1.0 would match anything.
> * multiSearch Boolean, default: true
> > Subtract arguments from the searchString or put searchString as only argument






A Demo [here](https://eastmanjian.cn/js_demo/tiy.jsp?sample=plugin%2Flist%2FfuzzzySearchMoreContent.html).
[![List.js](https://ejres-1253687085.picgz.myqcloud.com/img/javascript/list-js.png)](https://eastmanjian.cn/blog/archive/)
