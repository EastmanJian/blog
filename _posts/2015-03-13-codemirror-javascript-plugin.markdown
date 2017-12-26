---
layout: post
title: "CodeMirror JavaScript plugin - code editor in browser, with syntax highlight"
date: 2015-03-13 10:56:00 +08:00
categories: Web IT
tags: JavaScript
---

* content
{:toc}


CodeMirror is a versatile text editor implemented in JavaScript for the browser. It is specialized for editing code, and comes with a number of language modes and addonsthat implement more advanced editing functionality.  
It does not require any js framework (e.g. jQuery) support.

### Example 1  
#### Code  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Basic Usage of CodeMirror</title>
    <script src="https://codemirror.net/lib/codemirror.js"></script>
    <link rel="stylesheet" href="https://codemirror.net/lib/codemirror.css">
    <script src="https://codemirror.net/mode/javascript/javascript.js"></script>
</head>
<body>

<script>
    var myCodeMirror = CodeMirror(document.body, {
        value: "function myScript(){return 100;}\n",
        mode:  "javascript"
    });
</script>
</body>
</html>
```






#### Result

![codemirror](https://ejres-1253687085.picgz.myqcloud.com/img/javascript/codemirror-eg1.png)


### Example 2  
Turn a textarea into a code editor, with html+javascript+css syntax highlight, with line number.  
Example link [here](https://eastmanjian.cn/js_demo/tiy.jsp?sample=plugin%2FcodeMirror%2Ftextarea_htmlmix.html).


### Example 3
Using the codeMirror API, get/set the code editor content.  
Example link [here](https://eastmanjian.cn/js_demo/tiy.jsp?sample=plugin%2FcodeMirror%2Fcodemirror_api.html).

