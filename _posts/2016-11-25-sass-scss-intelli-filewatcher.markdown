---
layout: post
title: "Auto compile for SCSS/SASS files in IntelliJ using FileWatchers plugin"
date: 2016-11-25 13:51:00 +08:00
categories: Web IT
tags: SASS SCSS IntelliJ
---

* content
{:toc}

The FileWatchers plugin in IntelliJ can auto detect the file changes and execute specific actions. Here it's used to monitor the SCSS file changes and then auto compile them into css.  
Setup steps as follows:  

* Install FileWatchers plugin. IntelliJ > File > Settings > Plugin, tick FileWatchers. Install it if it's not yet.  
![filewatchers1](https://ejres-1253687085.picgz.myqcloud.com/img/sass/intellij-filewatchers-1.png)






* Add a watcher, choose Compass SCSS template  
![filewatchers2](https://ejres-1253687085.picgz.myqcloud.com/img/sass/intellij-filewatchers-2.png)

* Input the program path and the argument  
e.g.  
Program: C:\Ruby24-x64\bin\sass.bat  
Argument: --no-cache --update $FileName$:$FileNameWithoutExtension$.css  
//output the compiled css file in the same directory  
![filewatchers3](https://ejres-1253687085.picgz.myqcloud.com/img/sass/intellij-filewatchers-3.png)

* Test a scss file  
![filewatchers4](https://ejres-1253687085.picgz.myqcloud.com/img/sass/intellij-filewatchers-4.png)  

* The css and css.map file is generated automatically once the scss file is changed.   
![filewatchers5](https://ejres-1253687085.picgz.myqcloud.com/img/sass/intellij-filewatchers-5.png)