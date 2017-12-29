---
layout: post
title: "SASS / SCSS - a CSS complier, Get It Work - Env Setup and Run"
date: 2016-10-30 12:12:00 +08:00
categories: Web IT
tags: SASS SCSS CSS Ruby
---

* content
{:toc}

> Sass (syntactically awesome stylesheets) is a style sheet language initially designed by Hampton Catlin and developed by Natalie Weizenbaum.  
> Sass is a scripting language that is interpreted or compiled into Cascading Style Sheets (CSS).  

> Bootstrap 4 switched from Less to Sass for our source CSS files.

Sass consists of two syntaxes - SASS and SCSS. The functionality is the same, only the format is different.  

Markdown一下安装同点样compile SASS/SCSS. 

Sass need Ruby to run, install [Ruby](http://www.ruby-lang.org) first if it does not exists.






# Example (Windows)
```
//make sure Ruby is installed
C:\>ruby -v
...  

//check gem sources
C:\>gem sources -l
*** CURRENT SOURCES ***

https://ruby.taobao.org/

//install sass using gem from the above source
C:\>gem install sass
…
Successfully installed sass-3.4.22
Parsing documentation for sass-3.4.22
Done installing documentation for sass after 3 seconds
1 gem installed

//check sass version
C:\>sass -v
Sass 3.4.22 

//install compass
C:\>gem install compass
    Compass is charityware. If you love it, please donate on our behalf at http://umdf.org/compass Thanks!
Successfully installed compass-1.0.3
Parsing documentation for compass-1.0.3
Done installing documentation for compass after 0 seconds
1 gem installed

//find a scss to try to compile
H:\workspaces\HTML_CSS_Demo\scss>type variable.scss
$nav-color: #ff5546;
nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
}

//compile
H:\workspaces\HTML_CSS_Demo\scss>sass variable.scss variable.css

H:\workspaces\HTML_CSS_Demo\scss>dir
 Volume in drive H is Buffalo 1T
 Volume Serial Number is FC76-63B7

 Directory of H:\workspaces\HTML_CSS_Demo\scss

2016-10-30  01:18 PM    <DIR>          .
2016-10-30  01:18 PM    <DIR>          ..
2016-10-30  01:18 PM    <DIR>          .sass-cache
2016-10-30  01:18 PM                89 variable.css
2016-10-30  01:18 PM               156 variable.css.map
2016-10-30  01:16 PM                88 variable.scss
               3 File(s)            333 bytes
               3 Dir(s)  153,661,231,104 bytes free

H:\workspaces\HTML_CSS_Demo\scss>type variable.css
nav {
  width: 100px;
  color: #ff5546; }

/*# sourceMappingURL=variable.css.map */

H:\workspaces\HTML_CSS_Demo\scss>type variable.css.map
{
"version": 3,
"mappings": "AACA,GAAI;EAEF,KAAK,EADG,KAAK;EAEb,KAAK,EAJK,OAAO",
"sources": ["variable.scss"],
"names": [],
"file": "variable.css"
}

H:\workspaces\HTML_CSS_Demo\scss>sass variable.scss:var.css  --style compact

H:\workspaces\HTML_CSS_Demo\scss>type var.css
nav { width: 100px; color: #ff5546; }

/*# sourceMappingURL=var.css.map */
```

