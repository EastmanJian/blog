---
layout: post
title: "Adding a New HDFS DataNode to an Existing Hadoop Cluster"
date: 2016-01-16 22:16:00 +08:00
categories: BigData IT
tags: Hadoop HDFS
---

* content
{:toc}

		
Following are the points to note when you add a new HDFS DataNode to an existing Hadoop cluster  
* DataNode should have the same installation and configurations (*-site.xml) 
* Master Node has passwordless SSH Access to the new node.
* Add the new node hostname to the master node's etc/hadoop/slaves.
* Clean up the new node's {hadoop.tmp.dir} if it's not empty. 
* Start DataNode daemon on the new node.  Or Restart cluster HDFS.

**References**  
* [Hadoop: Trouble Shooting: Fail to start a new DataNode](https://eastmanjian.cn/blog/2016/01/15/hadoop-trouble-shooting-start-new-datanode-fail/)

