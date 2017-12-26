---
layout: post
title: "HTML5 new feature - Server Sent Event, Message Pushing from Server"
date: 2015-10-23 11:47:00 +08:00
categories: Web IT
tags: HTML5 Javascript
---

* content
{:toc}


# Notes
* A server-sent event is when a web page automatically gets updates from a server.
* This was also possible before, but the web page would have to ask if any updates were available. With server-sent events, the updates come automatically.
* Examples: Facebook/Twitter updates, stock price updates, news feeds, sport results, etc.
* Set the "Content-Type" header to "text/event-stream"
* Specify that the page should not cache
* Output the data to send (Always start with "data: ")
* EventSource should be from the same domain (server)







# Sample codes
```javascript
if (typeof(EventSource) !== "undefined") { //check browser support
    var source = new EventSource("https://example.com/path/to/the/message/source");
    source.onmessage = function (event) {
        //message handling
        ...
    };
} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent event.";
}
```


# Examples
* [sever push dates](https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.cn%2Fhtml5_demo%2Fhtml5_server_sent_event.html)
* [server push registered users count](https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.cn%2Fhtml5_demo%2Fhtml5_sse_demo_cnt.html)


# Observations  
When monitor the network communication, the SSE session type is eventsource.  
![f12](https://ejres-1253687085.picgz.myqcloud.com/img/html5/sse-observation1.png)

It's an HTTP session with request accept type text/event-stream. The Connection at the request header is set to keep-alive, and the Cache Control is no-cache to avoid data update is being cached.  
![event stream](https://ejres-1253687085.picgz.myqcloud.com/img/html5/sse-observation2.png)

The message body is being sent as a data feild in the Event Stream.  
![data](https://ejres-1253687085.picgz.myqcloud.com/img/html5/sse-observation3.png)

# Browser Support  
Not all the browsers support HTML5 Server-Sent Event.  
From my test, it works well on Chrome and Firefox. But it's not working on Edge unfortunately.

