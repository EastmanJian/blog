---
layout: post
title: "User Guide of DELIGHTALK Commenting System (Demo Available)"
date: 2017-12-04 22:13:00 +08:00
categories: App IT
tags: RESTful Redis JavaScript CSS
---

* content
{:toc}


About DELIGHTALK
----------------
[![GitHub release](https://img.shields.io/badge/Release-1.0-blue.svg)](https://github.com/EastmanJian/delightalk/)  
**Delightalk** is an open source web page commenting system. It's lightweight, fast, pluginable and extensible. And it can easily be pluged into your website.  
Please find a demo web page [![Here](https://img.shields.io/badge/-here-green.svg)](https://eastmanjian.cn/delightalk/pageJsTest.html).  

PS: Fed up with advertising and dirty injecting codes, I decided to build a comment system for my blog. Also, the service (@eastmanjian.cn) or codes (@github.com) are open to you.  


![Delightalk Sample](https://ejres-1253687085.picgz.myqcloud.com/img/delightalk/Delightalk_sample1.jpg)






Features
--------
- Fast access powered by in-memory NoSQL data storage
- Pluginable to any webpage
- Configurable for site name, and the number of historical comments to be retrieved
- Support user named or ananymous comments
- Logged user IP
- You can setup and extend data storage with other DBMS  

**Up coming features**
- Emoji
- Agree or disagree a comment
- User location identified by IP
- Incrementally read more historical comments
- Configurable placeholder texts, random pickup if more than one placeholder texts.
- Slim plugin scripts by providing more default configurations
- Management Console to deal with site comments.

How to plug Delightalk into your website?
-----------------------------------------
### Using existing REST service provided by eastmanjian.cn
The easiest way is just to plug the following codes into your web page where you wish the comments appear.
```html
<!-- Delightalk codes --> 
<div id="delightalk"></div>
<link rel="stylesheet" type="text/css" href="https://eastmanjian.cn/delightalk/css/delightalk.css">
<link rel="stylesheet" type="text/css" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css">
<script>var delightParams = {siteName: "your_app_id", previousComments: 10};</script>
<script src="https://eastmanjian.cn/delightalk/js/delightalk.js"></script>
```
In the *delightParams*, specify your your web application id (*your_app_id*) and the number of comments to show (*previousComments*).  
**That's All!**  
You'll be able to see the Delightalk comment section in your web page.  
  
By doing this, you use the shared data storage in eastmanjian.cn, where a Redis in-memory data storage is provided. But due to memory limitation, currently only 100mb memory is reserved for all users (not each user :-). If the data exceed 100mb, they will be evicted on a LFU (Least Frequently Usage) basis.  
Alternatively, you can setup your own data storage and REST service in your own server, as describe below.  

### Setup data storage and REST service
1. Download the whole Delightalk project from GitHub.
2. Setup Redis (4.0.2 or above). For detail, refer to https://redis.io/download.
3. Configure *src/main/resources/redis.properties* for the Redis connection parameters.
4. Change the *delightParams.restServiceUrl* parameter in *src/main/webapp/js/delightalk.js* to your domain URL location.  
e.g.  
```js
delightParams.restServiceUrl = "https://your.domian.name/delightalk/rest/"; 
```
5. Build the project by Maven. e.g. 'mvn package'
6. Deploy the generated delightalk.war to your web application server.
7. Change the URL for *delightalk.css* and *delightalk.js* in the plugin codes.  
e.g.  

```html
<!-- Delightalk codes --> 
<div id="delightalk"></div>
<link rel="stylesheet" type="text/css" href="https://your.domain.name/delightalk/css/delightalk.css">
<link rel="stylesheet" type="text/css" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css">
<script>var delightParams = {siteName: "your_app_id", previousComments: 10};</script>
<script src="https://your.domain.name/delightalk/js/delightalk.js"></script>
```

Notes:   
- If you use other data storage (any NoSQL DB or RDBMS), you need to implement the *com.ej.delightalk.dao.CommentsDAO* interface to provide data communications with your data storage.


Architecture
------------
[![Architecture](https://img.shields.io/badge/Architecture-RESTful-brightgreen.svg)](https://github.com/EastmanJian/delightalk/blob/master/ARCHITECTURE.MD)

License
-------
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/EastmanJian/delightalk/blob/master/LICENSE)
