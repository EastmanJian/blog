---
layout: post
title: "Where there is a Wall, there is a Way. VPS+SS+Router实现全家WIFI科学上网"
date: 2017-01-03 12:07:00 +08:00
categories: Network IT
tags: VPS GFW router SS Shadowsocks VPN
---

* content
{:toc}

## Why we need a way to cross the great firewall?
Only three words - you know the answer. (咪呃我，明明是系四个字。仲系讲中文啦 - 你懂的！鉴于有歪果仁同事问科学上网的事，我还是用英文写吧。)  
But why there is a GFW? Read this and believe it is true.
> 　　设墙的原因是因为国外不真不实颠覆共产党抹黑的西方势力。这个世界媒体舆论都是他们控制的。所以我们要在这样一个环境里设置一道墙。待到我们有能力和西方势力一样强大的媒体舆论，一个公正的舆论环境我们就不需要墙了。 不自由是绝对违反人性，我觉得你怕是不知道人性的可怕。人民有时是可爱的，但是绝对需要强力的管控。  
> 　　　　　　　　————from 铁血精选

Tried a few ways. Like the free tools, VPN services, etc.. But most of the time, those free tools introduce Trojans to my PC. And some VPN services are not stable and even expensive.   
Recently, recommended by one of my college classmate. I tried the way using a VPS, setup Shadowsocks(SS) service there, and configure SS client on the router. It costs you a little for renting a VPS, however, as a result, the house members are able to surf the free internet when they connect to the Wifi. Letlet is happy to chat with her friends in Facebook. 妈妈再也不用担心我只上百度不上谷歌了。  
Following are the notes of my experience to setup the stuff. Don't hesitate to tell me if you got a better way.  
Here you go!





## VPS + Shadowsocks + Router, WIFI without GFW  
### 1. Rent a VPS(Virtual Private Server) from abroad.
I chose [Bandwagon](https://bandwagonhost.com/) because it has a high cost-performance ratio. Sometime the official website is difficult to reach. I'm not sure if it is affected by the GFW. In case you cannot reach it, you can try its non-official Chinese website 搬瓦工(banwagong.cn).  Of course, you can choose whatever VPS vendor you like.  
![Bandwagon Host](https://ejres-1253687085.picgz.myqcloud.com/img/network/BandwagonHost.jpg)  

The virtual servers are located in several cities of US. I selected the lowest price scheme, which costs $19.99 per year. (折算RMB大约11元/月, 吃个饭盒的钱)
![VPS Scheme](https://ejres-1253687085.picgz.myqcloud.com/img/network/VPS19dollar.jpg)  

The machine is located in Los Angeles. Wow, 10GB SSD and 512 RAM, 10GB bandwidth per month. It should be no problem watch a few dozens of Videos from YouTube. And you should be able to do more with the machine than just crossing the GFW. 如果你喜欢折腾的话，还能用这机器搬弄好多东东, 11元/月的价值远不止于科学上网。


### 2. Install OS on the VPS 
By default, CentOS (a Red Hat based Linux OS) 6 x86 is installed on the VPS.  
![default OS](https://ejres-1253687085.picgz.myqcloud.com/img/network/defaultOS.jpg)  

It must be upgraded to CentOS 6 32bit or 64bit to support SS service. Bandwagon provided one-click system installation in its control panel (KiwiVM). So, let's click it. Note that system should be stopped before new installation.  
![CentOS 64bit](https://ejres-1253687085.picgz.myqcloud.com/img/network/CentOS64bitInstall.jpg)  

After a while, new OS will be installed. The root password will be reset. And a new SSH port will be provided. 
![new OS root passswd](https://ejres-1253687085.picgz.myqcloud.com/img/network/newRootPass.png)


### 3. Install Shadowsocks Server
Originally, you would need to install SS server software in the VPS by yourself. But after a period of time, Bandwagon found that most Chinese people rent their server to do this, why not make it easier? Then here comes the one-click SS server installation in its control panel. 看来搬瓦工为了打开中国市场，专门研究了消费者的行为，量身订造了一键安装功能啊。  

Go to KiwiVM -> Shadowsocks Server -> click Install Shadowsocks Server.  
![SS Installation](https://ejres-1253687085.picgz.myqcloud.com/img/network/SSInstallation.jpg)

Wait for a few minutes until the SS server is installed successfully.  
![SS Installed](https://ejres-1253687085.picgz.myqcloud.com/img/network/SSInstalled.png)

The control panel will let you know the parameters accessing the SS server. And it also tells you how to how to install SS client on your PC.  
![SS Status](https://ejres-1253687085.picgz.myqcloud.com/img/network/SSserverPara.jpg)
But go beyond that, I'm going to tell you the way to setup the SS client on a router. Then everyone connect to the router WIFI can share the SS service.  
Note that it's better to change the port number to another one because 443 is used for HTTPS service. In case you provide HTTPS service on your VPS, there will be a port number conflict.  

For your interest, the SS service just occupied a litter resource from the VPS. From the screen capture below, less than 2% memory is used. That's why I was saying $19.99 per year worths not only crossing the GFW.  
![Mem SS Server](https://ejres-1253687085.picgz.myqcloud.com/img/network/MemOfSSserver.png)


### 4. Configure SS in a Router
In principle, you can choose any router which supports SS configuration. My classmate recommends to use a NETGEAR router with ASUS Merlin (梅林) firmware. It's proved to be working fine. Believe me I'm not advertising here.  
![Netgear](https://ejres-1253687085.picgz.myqcloud.com/img/network/NETGEAR.jpg)  
我长得像个路由吗?🙈

Login the router console  
![Merlin login](https://ejres-1253687085.picgz.myqcloud.com/img/network/MerlinLogin.jpg)

Go to Advanced Settings -> Shadowsocks  
![Merlin SS](https://ejres-1253687085.picgz.myqcloud.com/img/network/MerlinSS.jpg)

Add a SS account node using the parameters (IP, Port, Password, Encryption Method) given by the VPS SS service. Test the abroad connections if it's working fine.  
![Merlin SS setting](https://ejres-1253687085.picgz.myqcloud.com/img/network/MerlinSSac.jpg)  
There is an usage mode setting in the Merlin SS account page, I chose the 'gfwlist' mode so that only the GFW black-listed foreign websites will pass through SS. Otherwise, if all local visiting goes through SS, they will become slower and consume the bandwidth of the VPS, as there is 10GB bandwidth limitation of this scheme.

In the SS setting main page, select the new node just added, click 'Submit'.  
![Merlin SS AC](https://ejres-1253687085.picgz.myqcloud.com/img/network/MerlinSSsubmit.png)

After a moment, the SS client is started.    
![Start SS](https://ejres-1253687085.picgz.myqcloud.com/img/network/MerlinStartSS.png)  
Just as it prompts, **Enjoy surfing internet without Great Fire Wall!**  

Try it in browser.  
![GoogleYoutubeFacebook](https://ejres-1253687085.picgz.myqcloud.com/img/network/GoogleFacebookYoutube.jpg)  
![MobileGoogle](https://ejres-1253687085.picgz.myqcloud.com/img/network/MobileGoogle.jpg)  
到此为止，配置完成，开始享受科学上网的乐趣吧！


