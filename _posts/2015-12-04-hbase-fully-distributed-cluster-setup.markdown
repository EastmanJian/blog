---
layout: post
title: "Fully Distributed HBase Cluster Setup"
date: 2015-12-04 10:58:00 +08:00
categories: BigData IT
tags: HBase HDFS ZooKeeper cluster
---

* content
{:toc}

This article records a practical installation of a fully distributed HBase cluster.

### Environment 
GNU/Linux, Ubuntu 15.x +

### Target Distributed Cluster Demo Architecture

|Node Name|Master|ZooKeeper|RegionServer|
|---------|------|---------|------------|
|local.ubuntu.vm (master)   |yes    |yes|no |
|local.ubuntu.vm2 (slave-a) |backup |yes|yes|
|local.ubuntu.vm3 (slave-b) |no     |yes|yes|

HDFS is running on the above cluster as supporting file system.







### Prerequisite
* Install 3 VMs as HBase Pseudo-Distributed Mode  
Ref: [Pseudo-Distributed Mode HBase Install](https://eastmanjian.cn/blog/2015/12/03/hbase-pseudo-distributed-mode-setup/)  


* Start HDFS Cluster with one mater and two slaves  
Ref: [Hadoop (HDFS+MapReduce/YARN) Cluster Setup](https://eastmanjian.cn/blog/2015/11/29/hadoop-multi-node-cluster-installation/)

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ sbin/start-dfs.sh
Starting namenodes on [master]
master: starting namenode, logging to /usr/local/hadoop-2.7.1/logs/hadoop-hduser-namenode-local-ubuntu-vm.out
master: starting datanode, logging to /usr/local/hadoop-2.7.1/logs/hadoop-hduser-datanode-local-ubuntu-vm.out
slave-b: starting datanode, logging to /usr/local/hadoop-2.7.1/logs/hadoop-hduser-datanode-local-ubuntu-vm3.out
slave-a: starting datanode, logging to /usr/local/hadoop-2.7.1/logs/hadoop-hduser-datanode-local-ubuntu-vm2.out
Starting secondary namenodes [0.0.0.0]
0.0.0.0: starting secondarynamenode, logging to /usr/local/hadoop-2.7.1/logs/hadoop-hduser-secondarynamenode-local-ubuntu-vm.out
hduser@local-ubuntu-vm:/usr/local/hadoop$ jps
6545 SecondaryNameNode
6188 NameNode
6701 Jps
6350 DataNode
hduser@local-ubuntu-vm2:/usr/local/hadoop/etc/hadoop$ jps
6423 Jps
6312 DataNode
hduser@local-ubuntu-vm3:/usr/local/hadoop$ jps
4656 DataNode
4776 Jps
```

![HDFS DataNotes](https://ejres-1253687085.picgz.myqcloud.com/img/hbase/hdfs-cluster-3vm.png)
		 
* Configure Passwordless SSH Access from master to slave-a and slave-b  
This step should have done during step HDFS.

* Standardize the host names

```shell
$ vi /etc/hosts
127.0.0.1       localhost
192.168.2.140 master local.ubuntu.vm local-ubuntu-vm
192.168.2.207 slave-a local.ubuntu.vm2 local-ubuntu-vm2
192.168.2.163 slave-b local.ubuntu.vm3 local-ubuntu-vm3
```

> Note: Use multiple hostnames just for compatible for other applications. 

### Prepare master node
* Put slave-a and slave-b's hostname into conf/regionservers

```shell
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ vi conf/regionservers
slave-a
slave-b
```

* Create a new config file conf/backup-masters and put slave-a's hostname inside

```shell
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ vi conf/backup-masters
slave-a 
```

* Configure ZooKeeper hosts in conf/hbase-site.xml

```xml
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ vi conf/hbase-site.xml
<configuration>
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
  <property>
    <name>hbase.zookeeper.quorum</name>
    <value>master,slave-a,slave-b</value>
  </property>
  <property>
    <name>hbase.zookeeper.property.dataDir</name>
    <value>/home/hbaseusr/zookeeper</value>
  </property>
</configuration>
```

> Notes:   
> * In reality, you should carefully consider your ZooKeeper configuration. You can find out more about configuring ZooKeeper in zookeeper section. This configuration will direct HBase to start and manage a ZooKeeper instance on each node of the cluster.
> * Everywhere in your configuration that you have referred to master as localhost, change the reference to point to the hostname that the other nodes will use to refer to master.

### Prepare slave nodes
Each node of your cluster needs to have the same configuration information.   
Copy the contents of the conf/ directory from master node to the conf/ directory on slaves.

```shell
hbaseusr@local-ubuntu-vm:/usr/local/hbase/conf$ scp * hbaseusr@slave-a:/usr/local/hbase/conf
hadoop-metrics2-hbase.properties                       100% 1811     1.8KB/s   00:00
backup-masters                                         100%    9     0.0KB/s   00:00
hbase-env.cmd                                          100% 4537     4.4KB/s   00:00
hbase-env.sh                                           100% 7451     7.3KB/s   00:00
hbase-policy.xml                                       100% 2257     2.2KB/s   00:00
hbase-site.xml                                         100% 1474     1.4KB/s   00:00
log4j.properties                                       100% 4722     4.6KB/s   00:00
regionservers                                          100%   17     0.0KB/s   00:00
hbaseusr@local-ubuntu-vm:/usr/local/hbase/conf$ scp * hbaseusr@slave-b:/usr/local/hbase/conf
... 
```

### Start and Test the Cluster
* Start the Cluster and verify the processes

```shell
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ bin/start-hbase.sh
slave-b: starting zookeeper, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-zookeeper-local-ubuntu-vm3.out
master: starting zookeeper, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-zookeeper-local-ubuntu-vm.out
slave-a: starting zookeeper, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-zookeeper-local-ubuntu-vm2.out
starting master, logging to /usr/local/hbase/logs/hbase-hbaseusr-master-local-ubuntu-vm.out
OpenJDK 64-Bit Server VM warning: ignoring option PermSize=128m; support was removed in 8.0
OpenJDK 64-Bit Server VM warning: ignoring option MaxPermSize=128m; support was removed in 8.0
slave-b: starting regionserver, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-regionserver-local-ubuntu-vm3.out
slave-a: starting regionserver, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-regionserver-local-ubuntu-vm2.out
... (JVM warning same as above)
slave-a: starting master, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-master-local-ubuntu-vm2.out
... (JVM warning same as above)

hbaseusr@local-ubuntu-vm:/usr/local/hbase$ jps
8498 HQuorumPeer
8565 HMaster
8783 Jps
hbaseusr@local-ubuntu-vm2:/usr/local/hbase$ jps
8275 HRegionServer
8588 Jps
8364 HMaster
8173 HQuorumPeer
hbaseusr@local-ubuntu-vm3:/usr/local/hbase$ jps
6528 Jps
6256 HQuorumPeer
6363 HRegionServer
```

		 
> Notes:  
> * The HQuorumPeer process is a ZooKeeper instance which is controlled and started by HBase. 
> * If you use ZooKeeper this way, it is limited to one instance per cluster node and is appropriate for testing only. 
> * If ZooKeeper is run outside of HBase, the process is called QuorumPeer. For more about ZooKeeper configuration, including using an external ZooKeeper instance with HBase, see zookeeper section.

* Browse to the Web UI.  
Master (http://local.ubuntu.vm:16010)

![Cluster Region Servers](https://ejres-1253687085.picgz.myqcloud.com/img/hbase/region-servers-cluster.png)

Backup Master

![Cluster Backup Master](https://ejres-1253687085.picgz.myqcloud.com/img/hbase/backup-masters-cluster.png)

Slave (from link of the Master Web UI)

![slave-a](https://ejres-1253687085.picgz.myqcloud.com/img/hbase/slave-a.png)  
![slave-b](https://ejres-1253687085.picgz.myqcloud.com/img/hbase/slave-b.png)

* Try some HBase shell commands  
Ref: [Single-node, Standalone HBase Setup](https://eastmanjian.cn/blog/2015/12/01/hbase-single-node-standalone-setup/)

* Test node failure  
With a three-node cluster you have configured, things will not be very resilient. 
You can still test the behavior of the primary Master or a RegionServer by killing the associated processes and watching the logs.
		
Stop slave-b VM and check the HBase Web UI.

![Node Failure](https://ejres-1253687085.picgz.myqcloud.com/img/hbase/node-fail.png)


### Official References
* https://hbase.apache.org/book.html

