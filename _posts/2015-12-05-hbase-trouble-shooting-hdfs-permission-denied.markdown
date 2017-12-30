---
layout: post
title: "HBase: Trouble Shooting: HDFS Permission Denied"
date: 2015-12-05 17:42:00 +08:00
categories: BigData IT
tags: HBase HDFS
---

* content
{:toc}

# Symptom

```shell
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ cat /usr/local/hbase/bin/../logs/hbase-hbaseusr-master-local-ubuntu-vm.log
...
2015-12-01 22:40:14,150 FATAL [master:16000.activeMasterManager] master.HMaster: Failed to become active master
org.apache.hadoop.security.AccessControlException: Permission denied: user=hbaseusr, access=WRITE, inode="/":hduser:supergroup:drwxr-xr-x
        at org.apache.hadoop.hdfs.server.namenode.FSPermissionChecker.check(FSPermissionChecker.java:342)
        at org.apache.hadoop.hdfs.server.namenode.FSPermissionChecker.checkPermission(FSPermissionChecker.java:251)
...
```

# Cause

By default, HBase uses `supergroup` as the group of the files in HDFS, but the current linux system does not have this group.

# Resolution
* Option1  
Add the user to supergroup. If the supergroup does not exist, create it first.

```shell
$ sudo addgroup supergroup
$ sudo usermod -aG supergroup hbaseusr
```

* Option 2  
Create a new group as Hadoop super user group. e.g. `hdsupergrp`.  
Add the user to the group created above. The user account to startup HDFS should be added to this group as well.  
Then edit hdfs-site.xml property and add this property dfs.permissions.superusergroup, value will be your super group name.  
Restart HDFS.  

Ref: https://stackoverflow.com/questions/24184306/how-to-add-user-in-supergroup-of-hdfs-in-linux
