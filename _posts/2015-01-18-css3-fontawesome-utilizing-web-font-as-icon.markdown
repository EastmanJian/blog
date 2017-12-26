---
layout: post
title: "Font Awesome - utilizing CSS3 web font as icon"
date: 2015-01-18 12:31:00 +08:00
categories: Web IT
tags: CSS3
---

* content
{:toc}


fa-ambulance <i class="fa fa-ambulance" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-ambulance fa-l" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-ambulance fa-lg" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-ambulance fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-ambulance fa-3x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-ambulance fa-4x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-ambulance fa-5x" aria-hidden="true"></i>  
fa-american-sign-language-interpreting <i class="fa fa-american-sign-language-interpreting" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-american-sign-language-interpreting fa-l" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-american-sign-language-interpreting fa-lg" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-american-sign-language-interpreting fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-american-sign-language-interpreting fa-3x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-american-sign-language-interpreting fa-4x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-american-sign-language-interpreting fa-5x" aria-hidden="true"></i>  
fa-angellist <i class="fa fa-angellist" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-angellist fa-l" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-angellist fa-lg" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-angellist fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-angellist fa-3x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-angellist fa-4x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-angellist fa-5x" aria-hidden="true"></i>  
fa-birthday-cake <i class="fa fa-birthday-cake" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-birthday-cake fa-l" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-birthday-cake fa-lg" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-birthday-cake fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-birthday-cake fa-3x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-birthday-cake fa-4x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-birthday-cake fa-5x" aria-hidden="true"></i>  
fa-birthday-cake <i class="fa fa-birthday-cake" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-birthday-cake fa-l" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-birthday-cake fa-lg" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-birthday-cake fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-birthday-cake fa-3x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-birthday-cake fa-4x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-birthday-cake fa-5x" aria-hidden="true"></i>  
fa-twitter-square <i class="fa fa-twitter-square" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-twitter-square fa-l" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-twitter-square fa-lg" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-twitter-square fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-twitter-square fa-3x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-twitter-square fa-4x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-twitter-square fa-5x" aria-hidden="true"></i>  

[List of Fontawesome 4 Icons](https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Ffontawesome.html)





The above fancy icons are not built by img tab, but they are actually CSS3 web fonts. They are scalable without affecting the precision. (Try to zoom the browser to see the effect.)  
[fontawesome.io](http://fontawesome.io/) provided a set of such fonts with pretty drawn icons.  

> Font Awesome gives you scalable vector icons that can instantly be customized — size, color, drop shadow, and anything that can be done with the power of CSS.

Look into the css file, you can find that it utilize CSS3 @font-face rule to load a set of eot, ttf, woff, ... format web fonts. And then it defines a set of CSS pseudo classes to use the web fonts, so that if you use the &lt;i&gt; tag and specify a class name, it will be converted the the target icon.

See font-awesome.min.css below:


```css
...

@font-face {
  font-family: 'FontAwesome';
  src: url('../fonts/fontawesome-webfont.eot?v=4.7.0');
  src: url('../fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('../fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('../fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'), url('../fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('../fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');
  font-weight: normal;
  font-style: normal;
}
.fa {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fa-glass:before {
  content: "\f000";
}
.fa-music:before {
  content: "\f001";
}
.fa-search:before {
  content: "\f002";
}
.fa-envelope-o:before {
  content: "\f003";
}
.fa-heart:before {
  content: "\f004";
}
.fa-star:before {
  content: "\f005";
}
.fa-star-o:before {
  content: "\f006";
}
.fa-user:before {
  content: "\f007";
}
.fa-film:before {
  content: "\f008";
}

...
```

If you download the web font file, you can open it with any font editing tools to see the code and font (icon) mapping.  
[![Open Font Awesome Web Font in FontLab](https://ejres-1253687085.picgz.myqcloud.com/img/css3/fontawesome-web-font.png)](https://ejres-1253687085.picgz.myqcloud.com/img/css3/fontawesome-web-font.png)

