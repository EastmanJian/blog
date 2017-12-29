---
layout: post
title: "Hadoop (HDFS+MapReduce/YARN) Cluster Setup"
date: 2015-11-29 18:24:00 +08:00
categories: BigData IT
tags: Hadoop HDFS MapReduce YARN
---

* content
{:toc}

		
# Approach
* Setup two (or more) Pseudo-Distibute Mode machines, and then turn them as one true Cluster, one master and one slave.   

![HDFS Cluster Setup Approach](https://ejres-1253687085.picgz.myqcloud.com/img/hadoop/hdfs-cluster-1.png)







* Target Cluster Architecture  
Hadoop 1.x

![Target Hadoop 1x](https://ejres-1253687085.picgz.myqcloud.com/img/hadoop/target-hadoop-1x.png)

Hadoop 2.x

![Target Hadoop 2x](https://ejres-1253687085.picgz.myqcloud.com/img/hadoop/target-hadoop-2x.png)

**Notes:** 
> * In hadoop 1.x - 
>     - Typically one machine in the cluster is designated as the NameNode and another machine the as JobTracker, exclusively. These are the actual “master nodes”. The rest of the machines in the cluster act as both DataNode and TaskTracker. These are the slaves or “worker nodes”.
> * In hadoop 2.x - 
>     - Typically one machine in the cluster is designated as the NameNode and another machine as the ResourceManager, exclusively. These are the masters. Other services (such as Web App Proxy Server and MapReduce Job History server) are usually run either on dedicated hardware or on shared infrastructure, depending upon the load. The rest of the machines in the cluster act as both DataNode and NodeManager. These are the slaves.
>     - HDFS daemons are 
>         - NameNode
>         - SecondaryNameNode
>         - DataNode
>     - YARN daemons are 
>         - ResourceManager
>         - NodeManager
>         - WebAppProxy
>         - JobHistoryServer
>     - If MapReduce is to be used, then the MapReduce Job History Server will also be running. 
>     - For large installations, these are generally running on separate hosts.
	
# Setup as Single-Node Cluster at two machines

* Setup Hadoop Single-Node Cluster on master machine
Run demo MapReduce WordCount program successfully.

		

	


* Setup Hadoop Single-Node Cluster on slave machine
		
Hadoop config files are the same as below
		
```shell
hduser@local-ubuntu-vm:/usr/local/hadoop/etc/hadoop$ cat core-site.xml
...
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000</value>
    </property>
    <property>
        <name>hadoop.tmp.dir</name>
        <value>/usr/local/hadoop_tmp_dir</value>
    </property>
</configuration>
hduser@local-ubuntu-vm:/usr/local/hadoop/etc/hadoop$ cat mapred-site.xml
...
<configuration> <!--below can be commented if want to try without yarn -->
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
    <property>
        <name>mapreduce.map.memory.mb</name>
        <value>128</value>
    </property>
    <property>
        <name>mapreduce.reduce.memory.mb</name>
        <value>128</value>
    </property>
    <property>
        <name>yarn.app.mapreduce.am.resource.mb</name>
        <value>768</value>
    </property>
</configuration>

hduser@local-ubuntu-vm:/usr/local/hadoop/etc/hadoop$ cat yarn-site.xml
…
<configuration>
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
    <property>
        <name>yarn.resourcemanager.address</name>
        <value>127.0.0.1:8032</value>
    </property>
    <property>
        <name>yarn.resourcemanager.scheduler.address</name>
        <value>127.0.0.1:8030</value>
    </property>
    <property>
        <name>yarn.resourcemanager.resource-tracker.address</name>
        <value>127.0.0.1:8031</value>
    </property>
    <property>
        <name>yarn.scheduler.minimum-allocation-mb</name>
        <value>1500</value>
    </property>
    <property>
        <name>yarn.scheduler.maximum-allocation-mb</name>
        <value>1500</value>
    </property>
</configuration>
```

# "Merge" two Single-Node Pseudo Clusters to one real Multi-Node Cluster
* Shutdown each single-node cluster

```shell
$ sbin/stop-yarn.sh   
$ sbin/stop-dfs.sh
```


	
* Networking and SSH access

```shell
#Host file both at VM1 and VM2
hduser@local-ubuntu-vm(2):$ vi /etc/hosts
...
192.168.2.140 master
192.168.2.207 slave
		
#authorization
      hduser@local-ubuntu-vm:/usr/local/hadoop$ ssh-copy-id -i ~/.ssh/id_rsa.pub  -p 28411 hduser@slave
#Test the SSH access. Master should be able to access itself and slave.
hduser@local-ubuntu-vm:/usr/local/hadoop$ ssh master
hduser@local-ubuntu-vm:~$ exit
hduser@local-ubuntu-vm:/usr/local/hadoop$ ssh slave
hduser@local-ubuntu-vm2:~$ exit
```
		
* Configuration - conf/masters (master only) (Hadoop 1.x only, Hadoop 2.x does not need this file, )
		
* Configuration - conf/slaves (master only)

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop/etc/hadoop$ vi slaves
master
slave
```

**Notes:**  
> If you have additional slave nodes, just add them to the conf/slaves file, one hostname per line.

```shell
master
slave
anotherslave01
anotherslave02
anotherslave03
```

> The conf/slaves file on master is used only by the scripts like bin/start-dfs.sh or bin/stop-dfs.sh. For example, if you want to add DataNodes on the fly (which is not described in this tutorial yet), you can “manually” start the DataNode daemon on a new slave machine via bin/hadoop-daemon.sh start datanode. Using the conf/slaves file on the master simply helps you to make “full” cluster restarts easier.
	
* Configuration - conf/*-site.xml (all machines)
This includes the following config files.
    - etc/hadoop/core-site.xml
    - etc/hadoop/hdfs-site.xml
    - etc/hadoop/yarn-site.xml
    - etc/hadoop/mapred-site.xml
The example below try to configure the minimum set of parameters as a demo. Also cater the VM resources (especially memory). Refer to official guide for all important parameters. If a parameter is not set, the Hadoop framework should use the default value specified in http://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-hdfs/*-default.xml.

```shell
/usr/local/hadoop/etc/hadoop$ vi core-site.xml
...
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://master:9000</value>
    </property>
    <property>
        <name>hadoop.tmp.dir</name>
        <value>/usr/local/hadoop_tmp_dir</value>
    </property>
</configuration>
 
/usr/local/hadoop/etc/hadoop$ vi hdfs-site.xml
...
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>2</value>
    </property>
</configuration>
 
/usr/local/hadoop/etc/hadoop$ vi yarn-site.xml
...
<configuration>
    <property>
        <name>yarn.resourcemanager.hostname</name>
        <value>master</value>
    </property>
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
    <property>
        <name>yarn.scheduler.minimum-allocation-mb</name>
        <value>1500</value>
    </property>
    <property>
        <name>yarn.scheduler.maximum-allocation-mb</name>
        <value>1500</value>
    </property>
</configuration>
 
/usr/local/hadoop/etc/hadoop$ vi mapred-site.xml
...
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
    <property>
        <name>mapreduce.map.memory.mb</name>
        <value>128</value>
    </property>
    <property>
        <name>mapreduce.reduce.memory.mb</name>
        <value>128</value>
    </property>
    <property>
        <name>yarn.app.mapreduce.am.resource.mb</name>
        <value>768</value>
    </property>
</configuration>
```

		
* Formatting the HDFS filesystem via the NameNode

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hdfs namenode -format
...
```
	
* Starting the multi-node cluster - HDFS daemons
Env Var

```shell
#for convenient, add the following env var if they don't exist
hduser@local-ubuntu-vm:/usr/local/hadoop$ vi ~/.bashrc
...
export HADOOP_HOME=/usr/local/hadoop
export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
export HADOOP_YARN_HOME=$HADOOP_HOME
```

Start the HDFS NameNode on the designated node:

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ $HADOOP_PREFIX/sbin/hadoop-daemon.sh --config $HADOOP_CONF_DIR --script hdfs start namenode
starting namenode, logging to /usr/local/hadoop/logs/hadoop-hduser-namenode-local-ubuntu-vm.out
hduser@local-ubuntu-vm:/usr/local/hadoop$ jps
37569 NameNode
37644 Jps
```
	
Start a HDFS DataNode with the following command on each designated node as hdfs: (start the DataNode at Mater server will trigger the slave DataNodes to start)

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ $HADOOP_PREFIX/sbin/hadoop-daemons.sh --config $HADOOP_CONF_DIR --script hdfs start datanode
master: starting datanode, logging to /usr/local/hadoop-2.7.1/logs/hadoop-hduser-datanode-local-ubuntu-vm.out
slave: starting datanode, logging to /usr/local/hadoop-2.7.1/logs/hadoop-hduser-datanode-local-ubuntu-vm2.out
		
#check the Java processes
hduser@local-ubuntu-vm:/usr/local/hadoop$ jps
39220 DataNode
39301 Jps
39052 NameNode
hduser@local-ubuntu-vm2:/usr/local/hadoop$ jps
5991 DataNode
6073 Jps

#Check the files under {hadoop.tmp.dir} after namenode is formatted and dfs is stated at each cluster servers
hduser@local-ubuntu-vm:/usr/local/hadoop$ find /usr/local/hadoop_tmp_dir/
/usr/local/hadoop_tmp_dir/
/usr/local/hadoop_tmp_dir/dfs
/usr/local/hadoop_tmp_dir/dfs/name
/usr/local/hadoop_tmp_dir/dfs/name/in_use.lock
/usr/local/hadoop_tmp_dir/dfs/name/current
/usr/local/hadoop_tmp_dir/dfs/name/current/edits_0000000000000000001-0000000000000000001
/usr/local/hadoop_tmp_dir/dfs/name/current/fsimage_0000000000000000000
/usr/local/hadoop_tmp_dir/dfs/name/current/VERSION
/usr/local/hadoop_tmp_dir/dfs/name/current/seen_txid
/usr/local/hadoop_tmp_dir/dfs/name/current/fsimage_0000000000000000000.md5
/usr/local/hadoop_tmp_dir/dfs/name/current/edits_inprogress_0000000000000000002
/usr/local/hadoop_tmp_dir/dfs/data
/usr/local/hadoop_tmp_dir/dfs/data/in_use.lock
/usr/local/hadoop_tmp_dir/dfs/data/current
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/VERSION
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/rbw
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/finalized
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/dfsUsed
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/scanner.cursor
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/tmp
/usr/local/hadoop_tmp_dir/dfs/data/current/VERSION
hduser@local-ubuntu-vm2:/usr/local/hadoop$ find /usr/local/hadoop_tmp_dir/
/usr/local/hadoop_tmp_dir/
/usr/local/hadoop_tmp_dir/dfs
/usr/local/hadoop_tmp_dir/dfs/data
/usr/local/hadoop_tmp_dir/dfs/data/in_use.lock
/usr/local/hadoop_tmp_dir/dfs/data/current
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/VERSION
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/rbw
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/finalized
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/scanner.cursor
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/tmp
/usr/local/hadoop_tmp_dir/dfs/data/current/VERSION
```

Or you can start both NameNode and DataNodes with a utility script if SSH is configured.

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ sbin/start-dfs.sh
Starting namenodes on [master]
master: starting namenode, logging to /usr/local/hadoop-2.7.1/logs/hadoop-hduser-namenode-local-ubuntu-vm.out
master: starting datanode, logging to /usr/local/hadoop-2.7.1/logs/hadoop-hduser-datanode-local-ubuntu-vm.out
slave: starting datanode, logging to /usr/local/hadoop-2.7.1/logs/hadoop-hduser-datanode-local-ubuntu-vm2.out
Starting secondary namenodes [0.0.0.0]
0.0.0.0: starting secondarynamenode, logging to /usr/local/hadoop-2.7.1/logs/hadoop-hduser-secondarynamenode-local-ubuntu-vm.out
hduser@local-ubuntu-vm:/usr/local/hadoop$ jps
40037 DataNode
39910 NameNode
40377 Jps
40265 SecondaryNameNode
hduser@local-ubuntu-vm2:/usr/local/hadoop$ jps
6278 DataNode
6363 Jps
```

* Try to put a file into HDFS and check the blocks in the {hadoop.tmp.dir} on each cluster servers.   
Because property dfs.replication is set to 2, there should be 2 replications on both servers.

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hdfs dfs -mkdir -p /user/hduser/test
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hdfs dfs -put ./share/hadoop/tools/lib/aws-java-sdk-bundle-1.11.199.jar test
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hdfs dfs -ls -R /
...
-rw-r--r--   2 hduser supergroup   71148216 2015-11-30 17:41 /user/hduser/test/aws-java-sdk-bundle-1.11.199.jar
hduser@local-ubuntu-vm:/usr/local/hadoop$ du -sh /usr/local/hadoop_tmp_dir/
74M     /usr/local/hadoop_tmp_dir/
hduser@local-ubuntu-vm:/usr/local/hadoop$  find /usr/local/hadoop_tmp_dir/
...
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/finalized/subdir0/subdir0/blk_1073741825_1001.meta
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/finalized/subdir0/subdir0/blk_1073741825
...
hduser@local-ubuntu-vm:/usr/local/hadoop$ ll /usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/finalized/subdir0/subdir0/blk*
-rw-r--r-- 1 hduser hadoop 71148216 Nov 30 17:41 /usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/finalized/subdir0/subdir0/blk_1073741825
-rw-r--r-- 1 hduser hadoop   555855 Nov 30 17:41 /usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/finalized/subdir0/subdir0/blk_1073741825_1001.meta
 
hduser@local-ubuntu-vm2:/usr/local/hadoop$ du -sh /usr/local/hadoop_tmp_dir/
69M     /usr/local/hadoop_tmp_dir/
hduser@local-ubuntu-vm2:/usr/local/hadoop$ bin/hdfs dfs -ls -R /
...
-rw-r--r--   2 hduser supergroup   71148216 2015-11-30 17:41 /user/hduser/test/aws-java-sdk-bundle-1.11.199.jar
hduser@local-ubuntu-vm2:/usr/local/hadoop$ find /usr/local/hadoop_tmp_dir/
...
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/finalized/subdir0/subdir0/blk_1073741825_1001.meta
/usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/finalized/subdir0/subdir0/blk_1073741825
...
hduser@local-ubuntu-vm2:/usr/local/hadoop$ ll /usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/finalized/subdir0/subdir0/blk*
-rw-r--r-- 1 hduser hadoop 71148216 Nov 30 17:41 /usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/finalized/subdir0/subdir0/blk_1073741825
-rw-r--r-- 1 hduser hadoop   555855 Nov 30 17:41 /usr/local/hadoop_tmp_dir/dfs/data/current/BP-435890327-192.168.2.140-1512032866281/current/finalized/subdir0/subdir0/blk_1073741825_1001.meta
```

* Browse the web interface for the NameNode
URL: http://local.ubuntu.vm:50070 (local.ubuntu.vm is 192.168.2.140)

![HDFS Cluster Web 1](https://ejres-1253687085.picgz.myqcloud.com/img/hadoop/hdfs-cluster-web-1.png)  
![HDFS Cluster Web 2](https://ejres-1253687085.picgz.myqcloud.com/img/hadoop/hdfs-cluster-web-2.png)

* Starting the multi-node cluster - YARN daemons
Start the YARN ResourceManager on master host

```shell
hduser@local-ubuntu-vm:~$ $HADOOP_YARN_HOME/sbin/yarn-daemon.sh --config $HADOOP_CONF_DIR start resourcemanager
starting resourcemanager, logging to /usr/local/hadoop/logs/yarn-hduser-resourcemanager-local-ubuntu-vm.out
hduser@local-ubuntu-vm:~$ jps
75541 Jps
40037 DataNode
39910 NameNode
40265 SecondaryNameNode
75325 ResourceManager 
```

Start a NodeManager on each designated host. (run the command on master node will trigger the slave nodes to start NodeManager)

```shell
hduser@local-ubuntu-vm:~$ $HADOOP_YARN_HOME/sbin/yarn-daemons.sh --config $HADOOP_CONF_DIR start nodemanager
master: starting nodemanager, logging to /usr/local/hadoop-2.7.1/logs/yarn-hduser-nodemanager-local-ubuntu-vm.out
slave: starting nodemanager, logging to /usr/local/hadoop-2.7.1/logs/yarn-hduser-nodemanager-local-ubuntu-vm2.out
hduser@local-ubuntu-vm:~$ jps
40037 DataNode
39910 NameNode
75688 NodeManager
40265 SecondaryNameNode
75821 Jps
75325 ResourceManager
hduser@local-ubuntu-vm2:~$ jps
6961 NodeManager
6278 DataNode
7101 Jps
```
		
If there is a standalone WebAppProxy server, start it with the command below. However, property yarn.web-proxy.address should be configured at yarn-site.xml first. If it's not configured, then the proxy will run as part of the RM. (Refer to yarn-default.xml)

```shell
$HADOOP_YARN_HOME/sbin/yarn-daemon.sh --config $HADOOP_CONF_DIR start proxyserver
```

Or, if etc/hadoop/slaves and ssh trusted access is configured, all of the YARN processes can be started with a utility script.

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ sbin/start-yarn.sh
starting yarn daemons
starting resourcemanager, logging to /usr/local/hadoop/logs/yarn-hduser-resourcemanager-local-ubuntu-vm.out
master: starting nodemanager, logging to /usr/local/hadoop-2.7.1/logs/yarn-hduser-nodemanager-local-ubuntu-vm.out
slave: starting nodemanager, logging to /usr/local/hadoop-2.7.1/logs/yarn-hduser-nodemanager-local-ubuntu-vm2.out
hduser@local-ubuntu-vm:/usr/local/hadoop$ jps
76562 Jps
40037 DataNode
39910 NameNode
76215 ResourceManager
76344 NodeManager
40265 SecondaryNameNode
hduser@local-ubuntu-vm2:~$ jps
7426 Jps
6278 DataNode
7290 NodeManager
```
	
Start a MapReduce JobHistory Server.

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ sbin/mr-jobhistory-daemon.sh --config $HADOOP_CONF_DIR start historyserver
starting historyserver, logging to /usr/local/hadoop/logs/mapred-hduser-historyserver-local-ubuntu-vm.out
hduser@local-ubuntu-vm:/usr/local/hadoop$ jps
76789 Jps
40037 DataNode
76740 JobHistoryServer
39910 NameNode
76215 ResourceManager
76344 NodeManager
40265 SecondaryNameNode 
```
		
* Better user accounts setting for operations
In general, it is recommended that HDFS and YARN run as separate users. In the majority of installations, HDFS processes execute as ‘hdfs’ account. YARN is typically using the ‘yarn’ account. MapReduce JobHistory Server process is typically using 'mapred' account.  
In this example, we use account 'hduser' as both 'hdfs' and 'yarn'.
	
* Running demo MapReduce jobs - WordCount2

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop fs -ls -R /user/hduser/input
-rw-r--r--   2 hduser supergroup         24 2015-11-30 20:36 /user/hduser/input/file01
-rw-r--r--   2 hduser supergroup         33 2015-11-30 20:36 /user/hduser/input/file02
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop fs -cat input/*
Hello World, Bye World!
Hello Hadoop, Goodbye to hadoop.
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop jar ejlib/wc.jar ej.hadoop.mapreduce.WordCount2 input output
15/11/30 20:38:27 INFO client.RMProxy: Connecting to ResourceManager at master/192.168.2.140:8032
15/11/30 20:38:28 WARN hdfs.DataStreamer: Caught exception
java.lang.InterruptedException
        at java.lang.Object.wait(Native Method)
        at java.lang.Thread.join(Thread.java:1252)
        at java.lang.Thread.join(Thread.java:1326)
        at org.apache.hadoop.hdfs.DataStreamer.closeResponder(DataStreamer.java:980)
        at org.apache.hadoop.hdfs.DataStreamer.endBlock(DataStreamer.java:630)
        at org.apache.hadoop.hdfs.DataStreamer.run(DataStreamer.java:807)
15/11/30 20:38:28 INFO input.FileInputFormat: Total input files to process : 2
...
15/11/30 20:38:28 INFO mapreduce.JobSubmitter: number of splits:2
15/11/30 20:38:29 INFO Configuration.deprecation: yarn.resourcemanager.system-metrics-publisher.enabled is deprecated. Instead, use yarn.system-metrics-publisher.enabled
15/11/30 20:38:29 INFO mapreduce.JobSubmitter: Submitting tokens for job: job_1512042556940_0001
15/11/30 20:38:29 INFO impl.YarnClientImpl: Submitted application application_1512042556940_0001
15/11/30 20:38:30 INFO mapreduce.Job: The url to track the job: http://master:8088/proxy/application_1512042556940_0001/
15/11/30 20:38:30 INFO mapreduce.Job: Running job: job_1512042556940_0001
15/11/30 20:38:40 INFO mapreduce.Job: Job job_1512042556940_0001 running in uber mode : false
15/11/30 20:38:40 INFO mapreduce.Job:  map 0% reduce 0%
15/11/30 20:38:54 INFO mapreduce.Job:  map 100% reduce 0%
15/11/30 20:39:00 INFO mapreduce.Job:  map 100% reduce 100%
15/11/30 20:39:01 INFO mapreduce.Job: Job job_1512042556940_0001 completed successfully
15/11/30 20:39:01 INFO mapreduce.Job: Counters: 50
        File System Counters
                FILE: Number of bytes read=117
                FILE: Number of bytes written=605366
                FILE: Number of read operations=0
                FILE: Number of large read operations=0
                FILE: Number of write operations=0
                HDFS: Number of bytes read=273
                HDFS: Number of bytes written=67
                HDFS: Number of read operations=9
                HDFS: Number of large read operations=0
                HDFS: Number of write operations=2
        Job Counters
                Launched map tasks=2
                Launched reduce tasks=1
                Data-local map tasks=2
                Total time spent by all maps in occupied slots (ms)=23407
                Total time spent by all reduces in occupied slots (ms)=4121
                Total time spent by all map tasks (ms)=23407
                Total time spent by all reduce tasks (ms)=4121
                Total vcore-milliseconds taken by all map tasks=23407
                Total vcore-milliseconds taken by all reduce tasks=4121
                Total megabyte-milliseconds taken by all map tasks=35110500
                Total megabyte-milliseconds taken by all reduce tasks=6181500
        Map-Reduce Framework
                Map input records=2
                Map output records=9
                Map output bytes=93
                Map output materialized bytes=123
                Input split bytes=216
                Combine input records=9
                Combine output records=9
                Reduce input groups=8
                Reduce shuffle bytes=123
                Reduce input records=9
                Reduce output records=8
                Spilled Records=18
                Shuffled Maps =2
                Failed Shuffles=0
                Merged Map outputs=2
                GC time elapsed (ms)=592
                CPU time spent (ms)=2250
                Physical memory (bytes) snapshot=560574464
                Virtual memory (bytes) snapshot=5695606784
                Total committed heap usage (bytes)=307437568
        Shuffle Errors
                BAD_ID=0
                CONNECTION=0
                IO_ERROR=0
                WRONG_LENGTH=0
                WRONG_MAP=0
                WRONG_REDUCE=0
        ej.hadoop.mapreduce.WordCount2$TokenizerMapper$CountersEnum
                INPUT_WORDS=9
        File Input Format Counters
                Bytes Read=57
        File Output Format Counters
                Bytes Written=67
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop fs -cat output/*
Bye     1
Goodbye 1
Hadoop, 1
Hello   2
World!  1
World,  1
hadoop. 1
to      1
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop fs -cat wordcount/pattern.txt
\.
\,
\!
to
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop jar ejlib/wc.jar ej.hadoop.mapreduce.WordCount2 -Dwordcount.case.sensitive=false input output2 -skip wordcount/pattern.txt
15/11/30 20:40:25 INFO client.RMProxy: Connecting to ResourceManager at master/192.168.2.140:8032
15/11/30 20:40:26 INFO input.FileInputFormat: Total input files to process : 2
15/11/30 20:40:26 WARN hdfs.DataStreamer: Caught exception
java.lang.InterruptedException
        at java.lang.Object.wait(Native Method)
        at java.lang.Thread.join(Thread.java:1252)
        at java.lang.Thread.join(Thread.java:1326)
        at org.apache.hadoop.hdfs.DataStreamer.closeResponder(DataStreamer.java:980)
        at org.apache.hadoop.hdfs.DataStreamer.endBlock(DataStreamer.java:630)
        at org.apache.hadoop.hdfs.DataStreamer.run(DataStreamer.java:807)
15/11/30 20:40:26 INFO mapreduce.JobSubmitter: number of splits:2
15/11/30 20:40:26 INFO Configuration.deprecation: yarn.resourcemanager.system-metrics-publisher.enabled is deprecated. Instead, use yarn.system-metrics-publisher.enabled
15/11/30 20:40:26 INFO mapreduce.JobSubmitter: Submitting tokens for job: job_1512042556940_0002
15/11/30 20:40:26 INFO impl.YarnClientImpl: Submitted application application_1512042556940_0002
15/11/30 20:40:26 INFO mapreduce.Job: The url to track the job: http://master:8088/proxy/application_1512042556940_0002/
15/11/30 20:40:26 INFO mapreduce.Job: Running job: job_1512042556940_0002
15/11/30 20:40:35 INFO mapreduce.Job: Job job_1512042556940_0002 running in uber mode : false
15/11/30 20:40:35 INFO mapreduce.Job:  map 0% reduce 0%
15/11/30 20:40:45 INFO mapreduce.Job:  map 100% reduce 0%
15/11/30 20:40:50 INFO mapreduce.Job:  map 100% reduce 100%
15/11/30 20:40:50 INFO mapreduce.Job: Job job_1512042556940_0002 completed successfully
15/11/30 20:40:50 INFO mapreduce.Job: Counters: 50
        File System Counters
                FILE: Number of bytes read=79
                FILE: Number of bytes written=609130
                FILE: Number of read operations=0
                FILE: Number of large read operations=0
                FILE: Number of write operations=0
                HDFS: Number of bytes read=273
                HDFS: Number of bytes written=41
                HDFS: Number of read operations=9
                HDFS: Number of large read operations=0
                HDFS: Number of write operations=2
        Job Counters
                Launched map tasks=2
                Launched reduce tasks=1
                Data-local map tasks=2
                Total time spent by all maps in occupied slots (ms)=15154
                Total time spent by all reduces in occupied slots (ms)=3239
                Total time spent by all map tasks (ms)=15154
                Total time spent by all reduce tasks (ms)=3239
                Total vcore-milliseconds taken by all map tasks=15154
                Total vcore-milliseconds taken by all reduce tasks=3239
                Total megabyte-milliseconds taken by all map tasks=22731000
                Total megabyte-milliseconds taken by all reduce tasks=4858500
        Map-Reduce Framework
                Map input records=2
                Map output records=8
                Map output bytes=82
                Map output materialized bytes=85
                Input split bytes=216
                Combine input records=8
                Combine output records=6
                Reduce input groups=5
                Reduce shuffle bytes=85
                Reduce input records=6
                Reduce output records=5
                Spilled Records=12
                Shuffled Maps =2
                Failed Shuffles=0
                Merged Map outputs=2
                GC time elapsed (ms)=414
                CPU time spent (ms)=1850
                Physical memory (bytes) snapshot=605872128
                Virtual memory (bytes) snapshot=5695606784
                Total committed heap usage (bytes)=307437568
        Shuffle Errors
                BAD_ID=0
                CONNECTION=0
                IO_ERROR=0
                WRONG_LENGTH=0
                WRONG_MAP=0
                WRONG_REDUCE=0
        ej.hadoop.mapreduce.WordCount2$TokenizerMapper$CountersEnum
                INPUT_WORDS=8
        File Input Format Counters
                Bytes Read=57
        File Output Format Counters
                Bytes Written=41
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop fs -cat output2/*
bye     1
goodbye 1
hadoop  2
hello   2
world   2
```


* Browse the web interface of the ResourceManager / NodeManager. 
URL: http://local.ubuntu.vm:8088

![Cluster Resource Manager 1](https://ejres-1253687085.picgz.myqcloud.com/img/hadoop/cluster-resource-mgr-1.png)  
![Cluster Resource Manager 2](https://ejres-1253687085.picgz.myqcloud.com/img/hadoop/cluster-resource-mgr-2.png)  
![Cluster Resource Manager 3](https://ejres-1253687085.picgz.myqcloud.com/img/hadoop/cluster-resource-mgr-3.png)  

* Browse the web interface of the  MapReduce JobHistory. 
URL: http://local.ubuntu.vm:19888

![Job History](https://ejres-1253687085.picgz.myqcloud.com/img/hadoop/job-history-1.png)
		
* Stopping the MapReduce Job History Server

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ $HADOOP_PREFIX/sbin/mr-jobhistory-daemon.sh --config $HADOOP_CONF_DIR stop historyserver
stopping historyserver
```

* Stopping the multi-node cluster - YARN daemons

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ sbin/stop-yarn.sh
stopping yarn daemons
stopping resourcemanager
master: stopping nodemanager
slave: stopping nodemanager
master: nodemanager did not stop gracefully after 5 seconds: killing with kill -9
slave: nodemanager did not stop gracefully after 5 seconds: killing with kill -9
no proxyserver to stop
hduser@local-ubuntu-vm:/usr/local/hadoop$ jps
76148 Jps
40037 DataNode
39910 NameNode
40265 SecondaryNameNode
hduser@local-ubuntu-vm2:~$ jps
6278 DataNode
7215 Jps
``` 
	
* Stopping the multi-node cluster - HDFS daemons
		
```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ sbin/stop-dfs.sh
Stopping namenodes on [master]
master: stopping namenode
master: stopping datanode
slave: stopping datanode
Stopping secondary namenodes [0.0.0.0]
0.0.0.0: no secondarynamenode to stop
hduser@local-ubuntu-vm:/usr/local/hadoop$ jps
39742 Jps
hduser@local-ubuntu-vm2:/usr/local/hadoop$ jps
6174 Jps 
```
		
# In case one node in the cluster is down, the display in Web Interfaces

![Node Down](https://ejres-1253687085.picgz.myqcloud.com/img/hadoop/node-down.png)

		
# References
* Official recommended tutorial: http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-multi-node-cluster/    
		  (version 1.x, some parameters are outdated.)  
* Official Doc: http://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/ClusterSetup.html   
		  (version 2.x)
