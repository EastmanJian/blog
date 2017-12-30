---
layout: post
title: "Pseudo-Distributed Mode HBase Install"
date: 2015-12-03 10:25:00 +08:00
categories: BigData IT
tags: HBase HDFS ZooKeeper cluster
---

* content
{:toc}

This article records a practical installation of HBase Pseudo-Distributed Mode in a single machine.

### Environment 
GNU/Linux, Ubuntu 15.x +

### Pseudo-distributed mode vs Standalone Mode
Pseudo-distributed mode means that HBase still runs completely on a single host, but each HBase daemon (HMaster, HRegionServer, and ZooKeeper) runs as a separate process; in standalone mode all daemons ran in one JVM process/instance.






### Configure cluster and HDFS directory

```xml
#Add property hbase.cluster.distributed, change hbase.rootdir to HDFS path
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ vi conf/hbase-site.xml
...

<property>
  <name>hbase.cluster.distributed</name>
  <value>true</value>
</property>
<property>
  <name>hbase.rootdir</name>
  <!-- local file system -->
  <!-- <value>file:///home/hbaseusr/hbase</value> -->
  <!-- HDFS -->
  <value>hdfs://local.ubuntu.vm:9000/hbase</value>
</property> 
```

> Notes:   
> * The HDFS path should have the same root URI as the property fs.defaultFS defined in Hadoop config file core-site.xml.
> > hduser@local-ubuntu-vm:/usr/local/hadoop$ cat etc/hadoop/core-site.xml  
> > ...  
> >     &lt;property&gt;  
> >         &lt;name&gt;fs.defaultFS&lt;/name&gt;  
> >         &lt;value&gt;hdfs://local.ubuntu.vm:9000&lt;/value&gt;  
> >     &lt;/property&gt;&nbsp;  
> > ...  
> * You do not need to create the directory in HDFS. HBase will do this for you. If you create the directory, HBase will attempt to do a migration, which is not what you want.
	
### Enable hbaseusr account to SSH localhost

```shell
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ ssh-keygen -t rsa -P ""
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

### Add hbaseusr account to supergroup

```shell
$ sudo addgroup supergroup
$ sudo usermod -aG supergroup hbaseusr
```

> Note: this step make it possible for hbaseusr to create /hbase directory under HDFS. Otherwise, there will be Permission Denied error. Ref: TS: Failed to start HBase main process HMaster under Cluster or Pseudo-cluster with HDFS enabled. Permission Denied.

### Start HBase

```shell
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ bin/start-hbase.sh
localhost: starting zookeeper, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-zookeeper-local-ubuntu-vm.out
starting master, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-master-local-ubuntu-vm.out
OpenJDK 64-Bit Server VM warning: ignoring option PermSize=128m; support was removed in 8.0
OpenJDK 64-Bit Server VM warning: ignoring option MaxPermSize=128m; support was removed in 8.0
starting regionserver, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-1-regionserver-local-ubuntu-vm.out

#check java process
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ jps
95219 HRegionServer
95060 HQuorumPeer
95129 HMaster
95466 Jps
 
#check the files created under HDFS /hbase
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ ../hadoop/bin/hadoop fs -ls -R / | grep "/hbase"
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/.tmp
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/.tmp/data
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/.tmp/data/hbase
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:10 /hbase/MasterProcWALs
-rw-r--r--   3 hbaseusr supergroup          0 2015-12-01 23:10 /hbase/MasterProcWALs/state-00000000000000000002.log
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/WALs
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/WALs/master,16201,1512140975929
-rw-r--r--   3 hbaseusr supergroup        199 2015-12-01 23:09 /hbase/WALs/master,16201,1512140975929/master%2C16201%2C1512140975929.1512140987880
-rw-r--r--   3 hbaseusr supergroup        195 2015-12-01 23:09 /hbase/WALs/master,16201,1512140975929/master%2C16201%2C1512140975929.1512140988364
-rw-r--r--   3 hbaseusr supergroup         83 2015-12-01 23:09 /hbase/WALs/master,16201,1512140975929/master%2C16201%2C1512140975929.1512140989215
-rw-r--r--   3 hbaseusr supergroup        270 2015-12-01 23:09 /hbase/WALs/master,16201,1512140975929/master%2C16201%2C1512140975929.meta.1512140986653.meta
-rw-r--r--   3 hbaseusr supergroup        611 2015-12-01 23:09 /hbase/WALs/master,16201,1512140975929/master%2C16201%2C1512140975929.meta.1512140987557.meta
-rw-r--r--   3 hbaseusr supergroup         83 2015-12-01 23:09 /hbase/WALs/master,16201,1512140975929/master%2C16201%2C1512140975929.meta.1512140987986.meta
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/default
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase/meta
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase/meta/.tabledesc
-rw-r--r--   3 hbaseusr supergroup        398 2015-12-01 23:09 /hbase/data/hbase/meta/.tabledesc/.tableinfo.0000000001
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase/meta/.tmp
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase/meta/1588230740
-rw-r--r--   3 hbaseusr supergroup         32 2015-12-01 23:09 /hbase/data/hbase/meta/1588230740/.regioninfo
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase/meta/1588230740/info
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase/meta/1588230740/recovered.edits
-rw-r--r--   3 hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase/meta/1588230740/recovered.edits/3.seqid
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase/namespace
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase/namespace/.tabledesc
-rw-r--r--   3 hbaseusr supergroup        312 2015-12-01 23:09 /hbase/data/hbase/namespace/.tabledesc/.tableinfo.0000000001
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase/namespace/.tmp
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase/namespace/093697c69d977c61be47f9a107767ca1
-rw-r--r--   3 hbaseusr supergroup         42 2015-12-01 23:09 /hbase/data/hbase/namespace/093697c69d977c61be47f9a107767ca1/.regioninfo
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase/namespace/093697c69d977c61be47f9a107767ca1/info
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase/namespace/093697c69d977c61be47f9a107767ca1/recovered.edits
-rw-r--r--   3 hbaseusr supergroup          0 2015-12-01 23:09 /hbase/data/hbase/namespace/093697c69d977c61be47f9a107767ca1/recovered.edits/2.seqid
-rw-r--r--   3 hbaseusr supergroup         42 2015-12-01 23:09 /hbase/hbase.id
-rw-r--r--   3 hbaseusr supergroup          7 2015-12-01 23:09 /hbase/hbase.version
drwxr-xr-x   - hbaseusr supergroup          0 2015-12-01 23:09 /hbase/oldWALs
-rw-r--r--   3 hbaseusr supergroup        363 2015-12-01 23:09 /hbase/oldWALs/master%2C16201%2C1512140975929.1512140984417
-rw-r--r--   3 hbaseusr supergroup        258 2015-12-01 23:09 /hbase/oldWALs/master%2C16201%2C1512140975929.meta.1512140985742.meta
```


> Notes:  
> * The HQuorumPeer process is a ZooKeeper instance which is controlled and started by HBase. 
> * If you use ZooKeeper this way, it is limited to one instance per cluster node and is appropriate for testing only. 
> * If ZooKeeper is run outside of HBase, the process is called QuorumPeer. For more about ZooKeeper configuration, including using an external ZooKeeper instance with HBase, see zookeeper section.

### Try some HBase shell commands
Ref: [Single-node, Standalone HBase Setup](https://eastmanjian.cn/blog/2015/12/01/hbase-single-node-standalone-setup/)  

### Start and stop local backup HBase Master (HMaster) servers.

```shell
#check the process and listening ports before start backup HMasters
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ jps
95219 HRegionServer
95060 HQuorumPeer
95129 HMaster
96063 Jps
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ netstat -plte | grep hbaseusr | grep 95129
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
tcp        0      0 master:16000            *:*                     LISTEN      hbaseusr   615989      95129/java
tcp        0      0 *:16010                 *:*                     LISTEN      hbaseusr   616176      95129/java
 
#Start backup HMasters
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ bin/local-master-backup.sh start 2 5
starting master, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-2-master-local-ubuntu-vm.out
starting master, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-5-master-local-ubuntu-vm.out
 
#check the processes, listening TCP ports and Web UI after start backup HMasters
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ jps
96337 HMaster
96275 HMaster
95219 HRegionServer
95060 HQuorumPeer
95129 HMaster
96524 Jps
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ netstat -plte | grep hbaseusr
(Not all processes could be identified, non-owned process info will not be shown, you would have to be root to see it all.)
tcp        0      0 master:16000            *:*                     LISTEN      hbaseusr   615989      95129/java
tcp        0      0 master:16002            *:*                     LISTEN      hbaseusr   625567      96275/java
tcp        0      0 master:16005            *:*                     LISTEN      hbaseusr   625732      96337/java
tcp        0      0 *:16010                 *:*                     LISTEN      hbaseusr   616176      95129/java
tcp        0      0 *:16012                 *:*                     LISTEN      hbaseusr   625731      96275/java
tcp        0      0 *:16015                 *:*                     LISTEN      hbaseusr   625762      96337/java
...
	
	
#Stop backup HMasters
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ cat /tmp/hbase-hbaseusr-2-master.pid | xargs kill -9
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ cat /tmp/hbase-hbaseusr-5-master.pid | xargs kill -9
```

![Backup Masters](https://ejres-1253687085.picgz.myqcloud.com/img/hbase/backup-masters.png)

> Note: Running multiple HMaster instances on the same hardware does not make sense in a production environment, in the same way that running a pseudo-distributed cluster does not make sense for production. This step is offered for testing and learning purposes only.
	
### Start and stop additional local RegionServers

```shell
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ bin/local-regionservers.sh start 2 3 4
starting regionserver, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-2-regionserver-local-ubuntu-vm.out
starting regionserver, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-3-regionserver-local-ubuntu-vm.out
starting regionserver, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-4-regionserver-local-ubuntu-vm.out

#checkings after start additional local RegionServers
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ jps
96849 HRegionServer
95219 HRegionServer
96722 HRegionServer
95060 HQuorumPeer
95129 HMaster
96781 HRegionServer
97182 Jps
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ netstat -plte | grep -E '95219|96849|96722|96781'
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
tcp        0      0 master:16201            *:*                     LISTEN      hbaseusr   616154      95219/java
tcp        0      0 master:16202            *:*                     LISTEN      hbaseusr   627625      96722/java
tcp        0      0 master:16203            *:*                     LISTEN      hbaseusr   627813      96781/java
tcp        0      0 master:16204            *:*                     LISTEN      hbaseusr   627986      96849/java
tcp        0      0 *:16301                 *:*                     LISTEN      hbaseusr   616207      95219/java
tcp        0      0 *:16302                 *:*                     LISTEN      hbaseusr   627971      96722/java
tcp        0      0 *:16303                 *:*                     LISTEN      hbaseusr   628015      96781/java
tcp        0      0 *:16304                 *:*                     LISTEN      hbaseusr   628042      96849/java


#Stop
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ bin/local-regionservers.sh stop 2 3 4
stopping regionserver.
stopping regionserver.
stopping regionserver.........
```

![Region Servers](https://ejres-1253687085.picgz.myqcloud.com/img/hbase/region-servers.png)

> Note: The HRegionServer manages the data in its StoreFiles as directed by the HMaster. Generally, one HRegionServer runs per node in the cluster. Running multiple HRegionServers on the same system can be useful for testing in pseudo-distributed mode.
	

### Reference
* https://hbase.apache.org/book.html
