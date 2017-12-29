---
layout: post
title: "YARN: Trouble Shooting: /bin/java: No such file or directory"
date: 2016-03-25 22:31:00 +08:00
categories: BigData IT
tags: Hadoop MapReduce YARN
---

* content
{:toc}

		
### Symptom  
Run a MapReduce job on YARN, shows the following err

```shell
...
/bin/bash: /bin/java: No such file or directory
...
```






### Cause  
YARN is trying to locate the JRE /bin/java, but it's unable to find it.


### Resolution
Create a symbolic link 'java' under /bin and point it to the target executable 'java' path.

```shell
root@ubuntu:/bin# ln -s /etc/alternatives/java java
```
