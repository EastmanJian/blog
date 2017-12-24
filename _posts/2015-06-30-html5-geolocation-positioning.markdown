---
layout: post
title: "HTML5 new feature - Geolocation positioning"
date: 2015-06-30 22:15:00 +08:00
categories: Web IT
tags: HTML5 JavaScript
---

* content
{:toc}


地理定位是HTML5的一个新特性。使用时注意下面几点：
* If the browser supports, **navigator.geolocation** is not null.
* Use the **getCurrentPosition()** method to get the user's position.
* If the **getCurrentPosition(showPosition)** method is successful, it returns a **coordinates object** to the function specified in the parameter of showPosition.
* The **second parameter** of the **getCurrentPosition()** method is used to handle errors. It specifies a function to run if it fails to get the user's location. 
* Use **watchPosition()** to return the current position of the user and continues to return updated position as the user moves (like the GPS in a car).
* Use **clearWatch()** to stops the watchPosition() method.

Please find demo web pages below.






1) [Get your current geolocation](https://eastmanjian.github.io/HTML_CSS_Demo/html5_geolocation.html) ([Source Code](https://github.com/EastmanJian/HTML_CSS_Demo/blob/gh-pages/html5_geolocation.html))  
2) [Let the map follow your position](https://eastmanjian.github.io/HTML_CSS_Demo/html5_geolocation_watch.html) ([Source Code](https://github.com/EastmanJian/HTML_CSS_Demo/blob/gh-pages/html5_geolocation_watch.html))  

第二个例子最好在手机上打开，然后到街上走走看看效果。


If your browser support HTML5 geolocation, the result would look like below.   
(因为土啬的关系，Google Map不一定能看到哦)  
![geolocation sample](https://ejres-1253687085.picgz.myqcloud.com/img/html5/geolocation-sample.png)

