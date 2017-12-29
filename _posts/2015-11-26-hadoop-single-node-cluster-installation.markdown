---
layout: post
title: "Hadoop (HDFS+MapReduce/YARN) Single-Node Cluster Installation (Pseudo-Distributed Mode Setup)"
date: 2015-11-26 18:24:00 +08:00
categories: BigData IT
tags: Hadoop HDFS MapReduce YARN
---

* content
{:toc}

		
# Prerequisites
* GNU/Linux (env: Ubuntu 10.04 LTS +, CenOS 6.0 +)
* Setup JDK, require 1.6+, (env: Installed JDK 1.8)







# Basic Installation and Configuration
### Adding a dedicated Hadoop system user: hduser@hadoop

* While that’s not required it is recommended because it helps to separate the Hadoop installation from other software applications and user accounts running on the same machine (think: security, permissions, backups, etc).

```shell
#Unbuntu
eastman@ubuntu:~$ sudo addgroup hadoop
Adding group 'hadoop' (GID 1002) ...
Done.
eastman@ubuntu:~$ sudo adduser --ingroup hadoop hduser
Adding user 'hduser' ...
Adding new user 'hduser' (1002) with group 'hadoop' ...
Creating home directory '/home/hduser' ...
Copying files from '/etc/skel' ...
Enter new UNIX password: hadooppass
Retype new UNIX password: hadooppass
passwd: password updated successfully
Changing the user information for hduser
Enter the new value, or press ENTER for the default
        Full Name []: Hadoop System User
        Room Number []:
        Work Phone []:
        Home Phone []:
        Other []:
Is the information correct? [Y/n] Y
```

```shell
#CentOS
root@VM_95_53_centos:/
$ groupadd hadoop
root@VM_95_53_centos:/
$ adduser -N hduser
root@VM_95_53_centos:/
$ usermod -g hadoop hduser
 root@VM_95_53_centos:
$ usermod -aG sudo hduser 
```

### Enable user 'hduser' SSH access to your local machine

```shell
hduser@ubuntu:~$ ssh-keygen -t rsa -P ""
Generating public/private rsa key pair.
Enter file in which to save the key (/home/hduser/.ssh/id_rsa):
Created directory '/home/hduser/.ssh'.
Your identification has been saved in /home/hduser/.ssh/id_rsa.
Your public key has been saved in /home/hduser/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:63B0lWSIA/iUrhZ6nrdVB0KZmUCjIxZiVAV2McYRLsc hduser@ubuntu
The key's randomart image is:
+---[RSA 2048]----+
|ooo++@O+.* .o    |
|....*o+oB .o .   |
|  o.oE  ... o    |
| . .+.o  . o     |
|   . o  S o .    |
|  . +  . + .     |
|   + .. +        |
|    o .=         |
|     ....        |
+----[SHA256]-----+
hduser@ubuntu:~$ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
hduser@ubuntu:~$ cat ~/.ssh/authorized_keys
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDDn4Exc6M1yqXBDAlhhHrUl6JLYgg9M8iTOyoJu5a8wuxhrVbKhESRWJYpZlEf9Tf+ntX6w8jS96xcbw4YeWJD+Fc+v9crHv11qD44SpSPBlUs8J1/67nBUL2Dx2ATKOJB2DPztRRjxliskq83T8flCNVLgos2tzd+T+qIxXskErZMaMmVeBqpQMIHBZaR0fkGr5U4sL2Q3X3gUjXolPgZLodzOzw0wBdIf/UVG3w6eY3fWjB52QvdwKy0Cade7HSSySAgsHhFeKZrRedon7uprZ6TmTvY/pdG6fDaw2NDqpaUjt8sll0u+tXMjWUPSyuRZ0SpxkmSxtLSiJPyxDd7 hduser@ubuntu
#use 'ssh -p <port_num> localhost' if you are not using the default ssh port 22.
hduser@ubuntu:~$ ssh localhost  
The authenticity of host 'localhost (127.0.0.1)' can't be established.
ECDSA key fingerprint is SHA256:Gy7eHEzeoRqIzJTOB1zaK/oMrsQTqslhf9teouVPMr0.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'localhost' (ECDSA) to the list of known hosts.
Welcome to Ubuntu 16.04.2 LTS (GNU/Linux 4.4.0-101-generic x86_64)
 
 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage
 
206 packages can be updated.
1 update is a security update.
 
*** System restart required ***
Last login: Wed Nov 22 16:46:28 2015 from 192.168.2.9
hduser@ubuntu:~$ exit
logout
Connection to localhost closed.
```
	

### Disabling IPv6 because YARN will bind to IPv6 ip but while you're using IPv4 actually.

### Hadoop installation - download and unzip

* Download latest stable version from http://hadoop.apache.org/releases.html 
* Un-zip the tar ball, and change the owner to hduser

```shell
eastman@ubuntu:/usr/local$ sudo wget http://www-eu.apache.org/dist/hadoop/common/hadoop-2.7.1/hadoop-2.7.1.tar.gz
eastman@ubuntu:/usr/local$ ll
...
-rwxr-xr-x  1 root root 366744329 Nov 22 17:56 hadoop-2.7.1.tar.gz*
eastman@ubuntu:/usr/local$ sudo tar xzf hadoop-2.7.1.tar.gz
eastman@ubuntu:/usr/local$ du -sh ./hadoop-2.7.1
862M   ./hadoop-2.7.1 
eastman@ubuntu:/usr/local$ sudo ln -s ./hadoop-2.7.1 hadoop
eastman@ubuntu:/usr/local$ ll
lrwxrwxrwx  1 root    root           14 Nov 22 18:07 hadoop -> ./hadoop-2.7.1/
drwxr-xr-x  9 eastman eastman      4096 Nov 14 07:28 hadoop-2.7.1/
...

eastman@ubuntu:/usr/local$ sudo chown -R hduser:hadoop hadoop
eastman@ubuntu:/usr/local$ sudo chown -R hduser:hadoop hadoop-2.7.1
```		 
		
### Add env var, alias, etc.. into user hduser ~/.bashrc

```shell
hduser@ubuntu:~$ vi .bashrc
...
# Set Hadoop-related environment variables
export HADOOP_HOME=/usr/local/hadoop

# Set JAVA_HOME 
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/jre

# Some convenient aliases and functions for running Hadoop-related commands
unalias fs &> /dev/null
alias fs="hadoop fs"
unalias hls &> /dev/null
alias hls="fs -ls"

# If you have LZO compression enabled in your Hadoop cluster and
# compress job outputs with LZOP
# Conveniently inspect an LZOP compressed file from the command
# line; run via:
#
# $ lzohead /hdfs/path/to/lzop/compressed/file.lzo
#
# Requires installed 'lzop' command.
#
lzohead () {
    hadoop fs -cat $1 | lzop -dc | head -1000 | less
}

# Add Hadoop bin/ directory to PATH
export PATH=$PATH:$HADOOP_HOME/bin
```

### JAVA_HOME setting in etc/hadoop/hadoop-env.sh

```shell
hduser@ubuntu:/usr/local/hadoop$ vi etc/hadoop/hadoop-env.sh
...
export JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64/jre"

#Add following line if you use another ssh port number
export HADOOP_SSH_OPTS="-p 28411"
```	
	

### Try hadoop command

```shell
hduser@ubuntu:/usr/local/hadoop$ bin/hadoop
Usage: hadoop [--config confdir] [COMMAND | CLASSNAME]
  CLASSNAME            run the class named CLASSNAME
 or
  where COMMAND is one of:
  fs                   run a generic filesystem user client
  version              print the version
  jar <jar>            run a jar file
                       note: please use "yarn jar" to launch
                             YARN applications, not this command.
  checknative [-a|-h]  check native hadoop and compression libraries availability
  distcp <srcurl> <desturl> copy file or directories recursively
  archive -archiveName NAME -p <parent path> <src>* <dest> create a hadoop archive
  classpath            prints the class path needed to get the
                       Hadoop jar and the required libraries
  credential           interact with credential providers
  daemonlog            get/set the log level for each daemon
  trace                view and modify Hadoop tracing settings
 
Most commands print help when invoked w/o parameters.
hduser@ubuntu:/usr/local/hadoop$ bin/hadoop version
Hadoop 2.7.1
...
```

### Try Standalone MapReduce Operation

```shell
hduser@ubuntu:/usr/local/hadoop$ mkdir input
hduser@ubuntu:/usr/local/hadoop$ cp etc/hadoop/* input
hduser@ubuntu:/usr/local/hadoop$ ll input/
total 56
drwxr-xr-x  2 hduser hadoop  4096 Nov 23 13:20 ./
drwxr-xr-x 10 hduser hadoop  4096 Nov 23 13:20 ../
-rw-r--r--  1 hduser hadoop  7861 Nov 23 13:20 capacity-scheduler.xml
-rw-r--r--  1 hduser hadoop   774 Nov 23 13:20 core-site.xml
-rw-r--r--  1 hduser hadoop 10206 Nov 23 13:20 hadoop-policy.xml
-rw-r--r--  1 hduser hadoop   775 Nov 23 13:20 hdfs-site.xml
-rw-r--r--  1 hduser hadoop   620 Nov 23 13:20 httpfs-site.xml
-rw-r--r--  1 hduser hadoop  3518 Nov 23 13:20 kms-acls.xml
-rw-r--r--  1 hduser hadoop  5939 Nov 23 13:20 kms-site.xml
-rw-r--r--  1 hduser hadoop   690 Nov 23 13:20 yarn-site.xml
hduser@ubuntu:/usr/local/hadoop$ bin/hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.1.jar grep input output 'dfs[a-z.]+'
15/11/23 13:20:54 INFO Configuration.deprecation: session.id is deprecated. Instead, use dfs.metrics.session-id
15/11/23 13:20:54 INFO jvm.JvmMetrics: Initializing JVM Metrics with processName=JobTracker, sessionId=
15/11/23 13:20:54 INFO input.FileInputFormat: Total input files to process : 8
15/11/23 13:20:54 INFO mapreduce.JobSubmitter: number of splits:8
...
15/11/23 13:20:56 INFO mapreduce.Job:  map 0% reduce 0%
...
15/11/23 13:20:58 INFO mapreduce.Job:  map 100% reduce 100%
15/11/23 13:20:58 INFO mapreduce.Job: Job job_local1196488428_0002 completed successfully
15/11/23 13:20:58 INFO mapreduce.Job: Counters: 30
        File System Counters
                FILE: Number of bytes read=1287692
                FILE: Number of bytes written=3123302
                FILE: Number of read operations=0
                FILE: Number of large read operations=0
                FILE: Number of write operations=0
        Map-Reduce Framework
                Map input records=1
                Map output records=1
                Map output bytes=17
                Map output materialized bytes=25
                Input split bytes=126
                Combine input records=0
                Combine output records=0
                Reduce input groups=1
                Reduce shuffle bytes=25
                Reduce input records=1
                Reduce output records=1
                Spilled Records=2
                Shuffled Maps =1
                Failed Shuffles=0
                Merged Map outputs=1
                GC time elapsed (ms)=33
                Total committed heap usage (bytes)=270336000
        Shuffle Errors
                BAD_ID=0
                CONNECTION=0
                IO_ERROR=0
                WRONG_LENGTH=0
                WRONG_MAP=0
                WRONG_REDUCE=0
        File Input Format Counters
                Bytes Read=123
        File Output Format Counters
                Bytes Written=23
#full sample log here

hduser@local-ubuntu-vm:/usr/local/hadoop$ ll output/
total 20
drwxr-xr-x  2 hduser hadoop 4096 Nov 25 20:22 ./
drwxr-xr-x 12 hduser hadoop 4096 Nov 25 20:22 ../
-rw-r--r--  1 hduser hadoop  220 Nov 25 20:22 part-r-00000
-rw-r--r--  1 hduser hadoop   12 Nov 25 20:22 .part-r-00000.crc
-rw-r--r--  1 hduser hadoop    0 Nov 25 20:22 _SUCCESS
-rw-r--r--  1 hduser hadoop    8 Nov 25 20:22 ._SUCCESS.crc
 hduser@local-ubuntu-vm:/usr/local/hadoop$ cat output/*
6       dfs.audit.logger
4       dfs.class
3       dfs.logger
3       dfs.server.namenode.
2       dfs.audit.log.maxbackupindex
2       dfs.period
2       dfs.audit.log.maxfilesize
1       dfs.log
1       dfs.file
1       dfs.servers
1       dfsadmin
1       dfsmetrics.log
1       dfs.replication
```
	
# Setup Pseudo-Distributed Mode, run a demo MapReduce job
Hadoop can also be run on a single-node in a pseudo-distributed mode where each Hadoop daemon runs in a separate Java process.
	
### Configuration for Pseudo-Distributed Mode
Configure core-ste.xml and hdfs-site.xml

```shell
# fs.defaultFS configure the name of the default file system. 
# The default hadoop.tmp.dir property value is /tmp/hadoop-${user.name} , config it to use another path /usr/local/hadoop_tmp_dir instead.
hduser@ubuntu:/usr/local/hadoop$ sudo mkdir /usr/local/hadoop_tmp_dir
hduser@ubuntu:/usr/local/hadoop$ sudo chown hduser:hadoop /usr/local/hadoop_tmp_dir
hduser@ubuntu:/usr/local/hadoop$ vi etc/hadoop/core-site.xml
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

# dfs.replication configure Default block replication.  
#cluster default 3 replications, because it's single node Pseduo-Distributed Mode, set the 1 here
Ref: Doc > Configuration > hdfs-default.xml
hduser@ubuntu:/usr/local/hadoop$ vi etc/hadoop/hdfs-site.xml
...
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value> 
    </property>
</configuration>
```
	
### Ensure you can SSH to local machine


### Format the filesystem

```shell
hduser@ubuntu:/usr/local/hadoop$ bin/hdfs namenode -format
15/11/23 14:14:57 INFO namenode.NameNode: STARTUP_MSG:
/************************************************************
STARTUP_MSG: Starting NameNode
STARTUP_MSG:   host = ubuntu/127.0.1.1
STARTUP_MSG:   args = [-format]
STARTUP_MSG:   version = 2.7.1
STARTUP_MSG:   classpath = /usr/local/hadoop-2.7.1/etc/hadoop:...
STARTUP_MSG:   build = https://git-wip-us.apache.org/repos/asf/hadoop.git -r 756ebc8394e473ac25feac05fa493f6d612e6c50; compiled by 'arsuresh' on 2015-11-13T23:15Z
STARTUP_MSG:   java = 1.8.0_151
************************************************************/
15/11/23 14:14:57 INFO namenode.NameNode: registered UNIX signal handlers for [TERM, HUP, INT]
15/11/23 14:14:57 INFO namenode.NameNode: createNameNode [-format]
Formatting using clusterid: CID-ac144f6e-0225-4c7d-9cf7-5e629a21055f
15/11/23 14:14:58 INFO namenode.FSEditLog: Edit logging is async:true
15/11/23 14:14:58 INFO namenode.FSNamesystem: KeyProvider: null
15/11/23 14:14:58 INFO namenode.FSNamesystem: fsLock is fair: true
15/11/23 14:14:58 INFO namenode.FSNamesystem: Detailed lock hold time metrics enabled: false
15/11/23 14:14:58 INFO namenode.FSNamesystem: fsOwner             = hduser (auth:SIMPLE)
15/11/23 14:14:58 INFO namenode.FSNamesystem: supergroup          = supergroup
15/11/23 14:14:58 INFO namenode.FSNamesystem: isPermissionEnabled = true
15/11/23 14:14:58 INFO namenode.FSNamesystem: HA Enabled: false
15/11/23 14:14:58 INFO common.Util: dfs.datanode.fileio.profiling.sampling.percentage set to 0. Disabling file IO profiling
15/11/23 14:14:58 INFO blockmanagement.DatanodeManager: dfs.block.invalidate.limit: configured=1000, counted=60, effected=1000
15/11/23 14:14:58 INFO blockmanagement.DatanodeManager: dfs.namenode.datanode.registration.ip-hostname-check=true
15/11/23 14:14:58 INFO blockmanagement.BlockManager: dfs.namenode.startup.delay.block.deletion.sec is set to 000:00:00:00.000
15/11/23 14:14:58 INFO blockmanagement.BlockManager: The block deletion will start around 2015 Nov 23 14:14:58
15/11/23 14:14:58 INFO util.GSet: Computing capacity for map BlocksMap
15/11/23 14:14:58 INFO util.GSet: VM type       = 64-bit
15/11/23 14:14:58 INFO util.GSet: 2.0% max memory 966.7 MB = 19.3 MB
15/11/23 14:14:58 INFO util.GSet: capacity      = 2^21 = 2097152 entries
15/11/23 14:14:58 INFO blockmanagement.BlockManager: dfs.block.access.token.enable=false
15/11/23 14:14:58 WARN conf.Configuration: No unit for dfs.namenode.safemode.extension(30000) assuming MILLISECONDS
15/11/23 14:14:58 INFO blockmanagement.BlockManagerSafeMode: dfs.namenode.safemode.threshold-pct = 0.9990000128746033
15/11/23 14:14:58 INFO blockmanagement.BlockManagerSafeMode: dfs.namenode.safemode.min.datanodes = 0
15/11/23 14:14:58 INFO blockmanagement.BlockManagerSafeMode: dfs.namenode.safemode.extension = 30000
15/11/23 14:14:58 INFO blockmanagement.BlockManager: defaultReplication         = 1
15/11/23 14:14:58 INFO blockmanagement.BlockManager: maxReplication             = 512
15/11/23 14:14:58 INFO blockmanagement.BlockManager: minReplication             = 1
15/11/23 14:14:58 INFO blockmanagement.BlockManager: maxReplicationStreams      = 2
15/11/23 14:14:58 INFO blockmanagement.BlockManager: replicationRecheckInterval = 3000
15/11/23 14:14:58 INFO blockmanagement.BlockManager: encryptDataTransfer        = false
15/11/23 14:14:58 INFO blockmanagement.BlockManager: maxNumBlocksToLog          = 1000
15/11/23 14:14:58 INFO namenode.FSNamesystem: Append Enabled: true
15/11/23 14:14:58 INFO util.GSet: Computing capacity for map INodeMap
15/11/23 14:14:58 INFO util.GSet: VM type       = 64-bit
15/11/23 14:14:58 INFO util.GSet: 1.0% max memory 966.7 MB = 9.7 MB
15/11/23 14:14:58 INFO util.GSet: capacity      = 2^20 = 1048576 entries
15/11/23 14:14:58 INFO namenode.FSDirectory: ACLs enabled? false
15/11/23 14:14:58 INFO namenode.FSDirectory: XAttrs enabled? true
15/11/23 14:14:58 INFO namenode.NameNode: Caching file names occurring more than 10 times
15/11/23 14:14:58 INFO snapshot.SnapshotManager: Loaded config captureOpenFiles: falseskipCaptureAccessTimeOnlyChange: false
15/11/23 14:14:58 INFO util.GSet: Computing capacity for map cachedBlocks
15/11/23 14:14:58 INFO util.GSet: VM type       = 64-bit
15/11/23 14:14:58 INFO util.GSet: 0.25% max memory 966.7 MB = 2.4 MB
15/11/23 14:14:58 INFO util.GSet: capacity      = 2^18 = 262144 entries
15/11/23 14:14:58 INFO metrics.TopMetrics: NNTop conf: dfs.namenode.top.window.num.buckets = 10
15/11/23 14:14:58 INFO metrics.TopMetrics: NNTop conf: dfs.namenode.top.num.users = 10
15/11/23 14:14:58 INFO metrics.TopMetrics: NNTop conf: dfs.namenode.top.windows.minutes = 1,5,25
15/11/23 14:14:58 INFO namenode.FSNamesystem: Retry cache on namenode is enabled
15/11/23 14:14:58 INFO namenode.FSNamesystem: Retry cache will use 0.03 of total heap and retry cache entry expiry time is 600000 millis
15/11/23 14:14:58 INFO util.GSet: Computing capacity for map NameNodeRetryCache
15/11/23 14:14:58 INFO util.GSet: VM type       = 64-bit
15/11/23 14:14:58 INFO util.GSet: 0.029999999329447746% max memory 966.7 MB = 297.0 KB
15/11/23 14:14:58 INFO util.GSet: capacity      = 2^15 = 32768 entries
15/11/23 14:14:58 INFO namenode.FSImage: Allocated new BlockPoolId: BP-362363891-127.0.1.1-1511417698487
15/11/23 14:14:58 INFO common.Storage: Storage directory /tmp/hadoop-hduser/dfs/name has been successfully formatted.
15/11/23 14:14:58 INFO namenode.FSImageFormatProtobuf: Saving image file /tmp/hadoop-hduser/dfs/name/current/fsimage.ckpt_0000000000000000000 using no compression
15/11/23 14:14:58 INFO namenode.FSImageFormatProtobuf: Image file /tmp/hadoop-hduser/dfs/name/current/fsimage.ckpt_0000000000000000000 of size 323 bytes saved in 0 seconds.
15/11/23 14:14:58 INFO namenode.NNStorageRetentionManager: Going to retain 1 images with txid >= 0
15/11/23 14:14:58 INFO namenode.NameNode: SHUTDOWN_MSG:
/************************************************************
SHUTDOWN_MSG: Shutting down NameNode at ubuntu/127.0.1.1
************************************************************/ 
```

```shell
#check the hadoop.tmp.dir folder structure and files after format
hduser@local-ubuntu-vm:/usr/local/hadoop$ find /usr/local/hadoop_tmp_dir -type d
/usr/local/hadoop_tmp_dir
/usr/local/hadoop_tmp_dir/dfs
/usr/local/hadoop_tmp_dir/dfs/name
/usr/local/hadoop_tmp_dir/dfs/name/current
hduser@local-ubuntu-vm:/usr/local/hadoop$ find /usr/local/hadoop_tmp_dir -type f
/usr/local/hadoop_tmp_dir/dfs/name/current/fsimage_0000000000000000000
/usr/local/hadoop_tmp_dir/dfs/name/current/VERSION
/usr/local/hadoop_tmp_dir/dfs/name/current/seen_txid
/usr/local/hadoop_tmp_dir/dfs/name/current/fsimage_0000000000000000000.md5
hduser@local-ubuntu-vm:/usr/local/hadoop$ ll /usr/local/hadoop_tmp_dir/dfs/name/current
total 24
drwxr-xr-x 2 hduser hadoop 4096 Nov 24 12:02 ./
drwxr-xr-x 3 hduser hadoop 4096 Nov 24 12:02 ../
-rw-r--r-- 1 hduser hadoop  322 Nov 24 12:02 fsimage_0000000000000000000
-rw-r--r-- 1 hduser hadoop   62 Nov 24 12:02 fsimage_0000000000000000000.md5
-rw-r--r-- 1 hduser hadoop    2 Nov 24 12:02 seen_txid
-rw-r--r-- 1 hduser hadoop  217 Nov 24 12:02 VERSION
```

### Start HDFS NameNode daemon and DataNode daemon

```shell
hduser@ubuntu:/usr/local/hadoop$ sbin/start-dfs.sh
Starting namenodes on [localhost]
localhost: starting namenode, logging to /usr/local/hadoop-2.7.1/logs/hadoop-hduser-namenode-ubuntu.out
localhost: starting datanode, logging to /usr/local/hadoop-2.7.1/logs/hadoop-hduser-datanode-ubuntu.out
Starting secondary namenodes [0.0.0.0]
The authenticity of host '0.0.0.0 (0.0.0.0)' can't be established.
ECDSA key fingerprint is SHA256:Gy7eHEzeoRqIzJTOB1zaK/oMrsQTqslhf9teouVPMr0.
Are you sure you want to continue connecting (yes/no)? yes
0.0.0.0: Warning: Permanently added '0.0.0.0' (ECDSA) to the list of known hosts.
0.0.0.0: starting secondarynamenode, logging to /usr/local/hadoop-2.7.1/logs/hadoop-hduser-secondarynamenode-ubuntu.out
```

```shell
#check the log files
hduser@ubuntu:/usr/local/hadoop$ cat /usr/local/hadoop-2.7.1/logs/hadoop-hduser-namenode-ubuntu.out
ulimit -a for user hduser
core file size          (blocks, -c) 0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 3605
max locked memory       (kbytes, -l) 64
max memory size         (kbytes, -m) unlimited
open files                      (-n) 1024
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 3605
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
hduser@ubuntu:/usr/local/hadoop$ cat /usr/local/hadoop-2.7.1/logs/hadoop-hduser-datanode-ubuntu.out
ulimit -a for user hduser
core file size          (blocks, -c) 0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 3605
max locked memory       (kbytes, -l) 64
max memory size         (kbytes, -m) unlimited
open files                      (-n) 1024
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 3605
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
hduser@ubuntu:/usr/local/hadoop$ cat /usr/local/hadoop-2.7.1/logs/hadoop-hduser-secondarynamenode-ubuntu.out
ulimit -a for user hduser
core file size          (blocks, -c) 0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 3605
max locked memory       (kbytes, -l) 64
max memory size         (kbytes, -m) unlimited
open files                      (-n) 1024
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 3605
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited

#Check Java process
hduser@ubuntu:/usr/local/hadoop$ jps
78016 DataNode
78468 Jps
78198 SecondaryNameNode
77870 NameNode

#check top
hduser@ubuntu:/usr/local/hadoop$ top
top - 14:47:30 up 1 day, 23:08,  4 users,  load average: 0.00, 0.00, 0.00
Tasks: 249 total,   1 running, 248 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.3 us,  0.3 sy,  0.0 ni, 99.0 id,  0.3 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem :   973140 total,    78112 free,   693088 used,   201940 buff/cache
KiB Swap:  1021948 total,   578648 free,   443300 used.    82652 avail Mem
 
   PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM     TIME+ COMMAND
 77674 hduser    20   0   45248   3772   3772 S  0.0  0.4   0:00.01 systemd
 77675 hduser    20   0  211224   1376      0 S  0.0  0.1   0:00.00 (sd-pam)
 77706 hduser    20   0   97496   4148   3380 S  0.0  0.4   0:00.09 sshd
 77707 hduser    20   0   24380   3624   3288 S  0.0  0.4   0:00.06 bash
 77870 hduser    20   0 2699244 138908  24092 S  0.3 14.3   0:06.13 java
 78016 hduser    20   0 2688216 123728  23836 S  0.0 12.7   0:05.32 java
 78198 hduser    20   0 2659496 116208  24104 S  0.0 11.9   0:03.62 java

#Check Listening Ports
hduser@ubuntu:/usr/local/hadoop$ sudo netstat -plte | grep hduser
tcp        0      0 *:50010                 *:*                     LISTEN      hduser     283675      78016/java
tcp        0      0 *:50075                 *:*                     LISTEN      hduser     283961      78016/java
tcp        0      0 *:50020                 *:*                     LISTEN      hduser     283966      78016/java
tcp        0      0 localhost:9000          *:*                     LISTEN      hduser     282902      77870/java
tcp        0      0 *:50090                 *:*                     LISTEN      hduser     285061      78198/java
tcp        0      0 localhost:39253         *:*                     LISTEN      hduser     283680      78016/java
tcp        0      0 *:50070                 *:*                     LISTEN      hduser     282895      77870/java
```
	
	
### Browse the web interface for the NameNode
Default: http://localhost:50070

![HDFS Web 1](https://ejres-1253687085.picgz.myqcloud.com/img/hadoop/hdfs-web-1.png)  
![HDFS Web 2](https://ejres-1253687085.picgz.myqcloud.com/img/hadoop/hdfs-web-1.png)  
![HDFS Web 3](https://ejres-1253687085.picgz.myqcloud.com/img/hadoop/hdfs-web-3.png)  

	
### MapReduce job demo - Make the HDFS directories required to execute MapReduce jobs
For HDFS, the current working directory is the HDFS home directory /user/<username> that often has to be created manually.

```shell
hduser@ubuntu:/usr/local/hadoop$ bin/hdfs dfs -mkdir -p /user/hduser
hduser@ubuntu:/usr/local/hadoop$ bin/hdfs dfs -ls /user
drwxr-xr-x   - hduser supergroup          0 2015-11-23 16:07 /user/hduser 
```

### MapReduce job demo - Copy the input files into the distributed filesystem

```shell
hduser@ubuntu:/usr/local/hadoop$ bin/hdfs dfs -put etc/hadoop input
15/11/23 16:14:14 WARN hdfs.DataStreamer: Caught exception
java.lang.InterruptedException
        at java.lang.Object.wait(Native Method)
        at java.lang.Thread.join(Thread.java:1252)
        at java.lang.Thread.join(Thread.java:1326)
        at org.apache.hadoop.hdfs.DataStreamer.closeResponder(DataStreamer.java:980)
        at org.apache.hadoop.hdfs.DataStreamer.endBlock(DataStreamer.java:630)
        at org.apache.hadoop.hdfs.DataStreamer.run(DataStreamer.java:807)
 ...
#The above warning can be ignored. Ref: issue HDFS-10429
```

```shell
#Check the files copied to HDFS
hduser@ubuntu:/usr/local/hadoop$ bin/hdfs dfs -ls -R /user/hduser
drwxr-xr-x   - hduser supergroup          0 2015-11-23 16:14 /user/hduser/input
-rw-r--r--   1 hduser supergroup      20480 2015-11-23 16:14 /user/hduser/input/.hadoop-env.sh.swp
-rw-r--r--   1 hduser supergroup       7861 2015-11-23 16:14 /user/hduser/input/capacity-scheduler.xml
-rw-r--r--   1 hduser supergroup       1335 2015-11-23 16:14 /user/hduser/input/configuration.xsl
-rw-r--r--   1 hduser supergroup       1211 2015-11-23 16:14 /user/hduser/input/container-executor.cfg
-rw-r--r--   1 hduser supergroup        884 2015-11-23 16:14 /user/hduser/input/core-site.xml
-rw-r--r--   1 hduser supergroup       3804 2015-11-23 16:14 /user/hduser/input/hadoop-env.cmd
-rw-r--r--   1 hduser supergroup       4726 2015-11-23 16:14 /user/hduser/input/hadoop-env.sh
-rw-r--r--   1 hduser supergroup       2490 2015-11-23 16:14 /user/hduser/input/hadoop-metrics.properties
-rw-r--r--   1 hduser supergroup       2598 2015-11-23 16:14 /user/hduser/input/hadoop-metrics2.properties
-rw-r--r--   1 hduser supergroup      10206 2015-11-23 16:14 /user/hduser/input/hadoop-policy.xml
-rw-r--r--   1 hduser supergroup        867 2015-11-23 16:14 /user/hduser/input/hdfs-site.xml
-rw-r--r--   1 hduser supergroup       2230 2015-11-23 16:14 /user/hduser/input/httpfs-env.sh
-rw-r--r--   1 hduser supergroup       1657 2015-11-23 16:14 /user/hduser/input/httpfs-log4j.properties
-rw-r--r--   1 hduser supergroup         21 2015-11-23 16:14 /user/hduser/input/httpfs-signature.secret
-rw-r--r--   1 hduser supergroup        620 2015-11-23 16:14 /user/hduser/input/httpfs-site.xml
-rw-r--r--   1 hduser supergroup       3518 2015-11-23 16:14 /user/hduser/input/kms-acls.xml
-rw-r--r--   1 hduser supergroup       3139 2015-11-23 16:14 /user/hduser/input/kms-env.sh
-rw-r--r--   1 hduser supergroup       1788 2015-11-23 16:14 /user/hduser/input/kms-log4j.properties
-rw-r--r--   1 hduser supergroup       5939 2015-11-23 16:14 /user/hduser/input/kms-site.xml
-rw-r--r--   1 hduser supergroup      14016 2015-11-23 16:14 /user/hduser/input/log4j.properties
-rw-r--r--   1 hduser supergroup       1076 2015-11-23 16:14 /user/hduser/input/mapred-env.cmd
-rw-r--r--   1 hduser supergroup       1507 2015-11-23 16:14 /user/hduser/input/mapred-env.sh
-rw-r--r--   1 hduser supergroup       4113 2015-11-23 16:14 /user/hduser/input/mapred-queues.xml.template
-rw-r--r--   1 hduser supergroup        758 2015-11-23 16:14 /user/hduser/input/mapred-site.xml.template
-rw-r--r--   1 hduser supergroup         10 2015-11-23 16:14 /user/hduser/input/slaves
-rw-r--r--   1 hduser supergroup       2316 2015-11-23 16:14 /user/hduser/input/ssl-client.xml.example
-rw-r--r--   1 hduser supergroup       2697 2015-11-23 16:14 /user/hduser/input/ssl-server.xml.example
-rw-r--r--   1 hduser supergroup       2250 2015-11-23 16:14 /user/hduser/input/yarn-env.cmd
-rw-r--r--   1 hduser supergroup       4876 2015-11-23 16:14 /user/hduser/input/yarn-env.sh
-rw-r--r--   1 hduser supergroup        690 2015-11-23 16:14 /user/hduser/input/yarn-site.xml
```
	
### MapReduce job demo - Run one of the MapReduce examples provided

```shell
#This example do world count according to given RegExp pattern.
hduser@ubuntu:/usr/local/hadoop$ bin/hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.1.jar grep input output 'dfs[a-z.]+'
```
	
	
### MapReduce job demo - Examine the output files
Copy the output files from the distributed filesystem to the local filesystem and examine them:

```shell
hduser@ubuntu:/usr/local/hadoop$ rm -r output ##remove if output folder already exists
hduser@ubuntu:/usr/local/hadoop$ bin/hdfs dfs -get output output
hduser@ubuntu:/usr/local/hadoop$ ll output/
total 12
drwxr-xr-x  2 hduser hadoop 4096 Nov 23 16:42 ./
drwxr-xr-x 12 hduser hadoop 4096 Nov 23 16:42 ../
-rw-r--r--  1 hduser hadoop  220 Nov 23 16:42 part-r-00000
-rw-r--r--  1 hduser hadoop    0 Nov 23 16:42 _SUCCESS
hduser@ubuntu:/usr/local/hadoop$ cat output/*
6       dfs.audit.logger
4       dfs.class
3       dfs.logger
3       dfs.server.namenode.
2       dfs.audit.log.maxbackupindex
2       dfs.period
2       dfs.audit.log.maxfilesize
1       dfs.log
1       dfs.file
1       dfs.servers
1       dfsadmin
1       dfsmetrics.log
1       dfs.replication 
```

```shell
#Compare with local files
hduser@ubuntu:/usr/local/hadoop$ grep -E 'dfs[a-z.]+' etc/hadoop/*
etc/hadoop/hadoop-env.cmd:set HADOOP_NAMENODE_OPTS=-Dhadoop.security.logger=%HADOOP_SECURITY_LOGGER% -Dhdfs.audit.logger=%HDFS_AUDIT_LOGGER% %HADOOP_NAMENODE_OPTS%
etc/hadoop/hadoop-env.cmd:set HADOOP_SECONDARYNAMENODE_OPTS=-Dhadoop.security.logger=%HADOOP_SECURITY_LOGGER% -Dhdfs.audit.logger=%HDFS_AUDIT_LOGGER% %HADOOP_SECONDARYNAMENODE_OPTS%
etc/hadoop/hadoop-env.sh:export HADOOP_NAMENODE_OPTS="-Dhadoop.security.logger=${HADOOP_SECURITY_LOGGER:-INFO,RFAS} -Dhdfs.audit.logger=${HDFS_AUDIT_LOGGER:-INFO,NullAppender} $HADOOP_NAMENODE_OPTS"
etc/hadoop/hadoop-env.sh:export HADOOP_SECONDARYNAMENODE_OPTS="-Dhadoop.security.logger=${HADOOP_SECURITY_LOGGER:-INFO,RFAS} -Dhdfs.audit.logger=${HDFS_AUDIT_LOGGER:-INFO,NullAppender} $HADOOP_SECONDARYNAMENODE_OPTS"
etc/hadoop/hadoop-metrics.properties:dfs.class=org.apache.hadoop.metrics.spi.NullContext
etc/hadoop/hadoop-metrics.properties:#dfs.class=org.apache.hadoop.metrics.file.FileContext
etc/hadoop/hadoop-metrics.properties:#dfs.period=10
etc/hadoop/hadoop-metrics.properties:#dfs.fileName=/tmp/dfsmetrics.log
etc/hadoop/hadoop-metrics.properties:# dfs.class=org.apache.hadoop.metrics.ganglia.GangliaContext
etc/hadoop/hadoop-metrics.properties:# dfs.class=org.apache.hadoop.metrics.ganglia.GangliaContext31
etc/hadoop/hadoop-metrics.properties:# dfs.period=10
etc/hadoop/hadoop-metrics.properties:# dfs.servers=localhost:8649
etc/hadoop/hadoop-policy.xml:    dfsadmin and mradmin commands to refresh the security policy in-effect.
etc/hadoop/hdfs-site.xml:        <name>dfs.replication</name>
etc/hadoop/log4j.properties:hdfs.audit.logger=INFO,NullAppender
etc/hadoop/log4j.properties:hdfs.audit.log.maxfilesize=256MB
etc/hadoop/log4j.properties:hdfs.audit.log.maxbackupindex=20
etc/hadoop/log4j.properties:log4j.logger.org.apache.hadoop.hdfs.server.namenode.FSNamesystem.audit=${hdfs.audit.logger}
etc/hadoop/log4j.properties:log4j.additivity.org.apache.hadoop.hdfs.server.namenode.FSNamesystem.audit=false
etc/hadoop/log4j.properties:log4j.appender.RFAAUDIT.MaxFileSize=${hdfs.audit.log.maxfilesize}
etc/hadoop/log4j.properties:log4j.appender.RFAAUDIT.MaxBackupIndex=${hdfs.audit.log.maxbackupindex}
etc/hadoop/log4j.properties:#log4j.logger.org.apache.hadoop.hdfs.server.namenode.FSNamesystem.audit=DEBUG
etc/hadoop/log4j.properties:# Specify -Ddatanode.webhdfs.logger=INFO,HTTPDRFA on datanode startup to
etc/hadoop/log4j.properties:#datanode.webhdfs.logger=INFO,console
etc/hadoop/log4j.properties:#log4j.logger.datanode.webhdfs=${datanode.webhdfs.logger}
etc/hadoop/log4j.properties:#log4j.appender.HTTPDRFA.File=${hadoop.log.dir}/hadoop-datanode-webhdfs.log
``` 

Or View the output files on the distributed filesystem directly.

```shell
hduser@ubuntu:/usr/local/hadoop$ bin/hdfs dfs -cat output/*
6       dfs.audit.logger
4       dfs.class
3       dfs.logger
3       dfs.server.namenode.
2       dfs.audit.log.maxbackupindex
2       dfs.period
2       dfs.audit.log.maxfilesize
1       dfs.log
1       dfs.file
1       dfs.servers
1       dfsadmin
1       dfsmetrics.log
1       dfs.replication
```


# run a MapReduce job on YARN in pseudo-distributed mode
### Configure etc/hadoop/mapred-site.xml
Configure the runtime framework for executing MapReduce jobs. Can be one of local, classic or yarn. Ref: Doc > Configuration > mapred-default.xml

```shell
hduser@ubuntu:/usr/local/hadoop$ cp etc/hadoop/mapred-site.xml.template etc/hadoop/mapred-site.xml
hduser@ubuntu:/usr/local/hadoop$ vim etc/hadoop/mapred-site.xml
 …
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
</configuration>
```

	
### Configure etc/hadoop/yarn-site.xml
Configure a comma separated list of services. Ref: Doc > Configuration > yarn-default.xml

```shell
hduser@ubuntu:/usr/local/hadoop$ vim etc/hadoop/yarn-site.xml
 …
<configuration>
<!-- Site specific YARN configuration properties -->
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
</configuration>
```

### Start YARN ResourceManager daemon and NodeManager daemon

```shell
hduser@ubuntu:/usr/local/hadoop$ sbin/start-yarn.sh
starting yarn daemons
starting resourcemanager, logging to /usr/local/hadoop-2.7.1/logs/yarn-hduser-resourcemanager-ubuntu.out
localhost: starting nodemanager, logging to /usr/local/hadoop-2.7.1/logs/yarn-hduser-nodemanager-ubuntu.out 
```

```shell
hduser@ubuntu:/usr/local/hadoop$ jps
81456 ResourceManager
78016 DataNode
78198 SecondaryNameNode
81599 NodeManager
77870 NameNode
81758 Jps
```

### Browse the web interface for the ResourceManager. 
Default: http://localhost:8088/

![Resource Manager](https://ejres-1253687085.picgz.myqcloud.com/img/hadoop/resource-mgr-1.png)
	
### Run one of the MapReduce examples provided

```shell
#This example do world count according to given RegExp pattern.
hduser@ubuntu:/usr/local/hadoop$ bin/hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.1.jar grep input output 'dfs[a-z.]+'
	
Std output sample: 
...
(ResourceManager was killed due to out of memory)
...
```
	

Try to cut down the memory setting and run again.

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ vi etc/hadoop/mapred-site.xml
...
    <property>
        <name>mapreduce.map.memory.mb</name>
        <value>64</value>
    </property>
    <property>
        <name>mapreduce.reduce.memory.mb</name>
        <value>64</value>
    </property>
    <property>
        <name>yarn.app.mapreduce.am.resource.mb</name>
        <value>512</value>
    </property>
 
hduser@local-ubuntu-vm:/usr/local/hadoop$ vi etc/hadoop/yarn-site.xml
...
    <property>
        <name>yarn.scheduler.minimum-allocation-mb</name>
        <value>512</value>
    </property>
    <property>
        <name>yarn.scheduler.maximum-allocation-mb</name>
        <value>768</value>
    </property>
```

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.1.jar grep input output 'dfs[a-z.]+'
 
15/11/24 14:04:17 INFO client.RMProxy: Connecting to ResourceManager at /127.0.0.1:8032
15/11/24 14:04:18 INFO input.FileInputFormat: Total input files to process : 30
15/11/24 14:04:18 INFO mapreduce.JobSubmitter: number of splits:30
15/11/24 14:04:19 INFO Configuration.deprecation: yarn.resourcemanager.system-metrics-publisher.enabled is deprecated. Instead, use yarn.system-metrics-publisher.enabled
15/11/24 14:04:19 INFO mapreduce.JobSubmitter: Submitting tokens for job: job_1511503447665_0001
15/11/24 14:04:19 INFO impl.YarnClientImpl: Submitted application application_1511503447665_0001
15/11/24 14:04:19 INFO mapreduce.Job: The url to track the job: http://local-ubuntu-vm:8088/proxy/application_1511503447665_0001/
15/11/24 14:04:19 INFO mapreduce.Job: Running job: job_1511503447665_0001
15/11/24 14:04:28 INFO mapreduce.Job: Job job_1511503447665_0001 running in uber mode : false
15/11/24 14:04:28 INFO mapreduce.Job:  map 0% reduce 0%
15/11/24 14:04:34 INFO mapreduce.Job: Job job_1511503447665_0001 failed with state FAILED due to: Application application_1511503447665_0001 failed 2 times due to AM Container for appattempt_1511503447665_0001_000002 exited with  exitCode: -103
Failing this attempt.Diagnostics: [2015-11-24 14:04:33.349]Container [pid=10029,containerID=container_1511503447665_0001_02_000001] is running beyond virtual memory limits. Current usage: 139.4 MB of 512 MB physical memory used; 2.6 GB of 1.0 GB virtual memory used. Killing container.
Dump of the process-tree for container_1511503447665_0001_02_000001 :
        |- PID PPID PGRPID SESSID CMD_NAME USER_MODE_TIME(MILLIS) SYSTEM_TIME(MILLIS) VMEM_USAGE(BYTES) RSSMEM_USAGE(PAGES) FULL_CMD_LINE
        |- 10029 10028 10029 10029 (bash) 0 0 14643200 762 /bin/bash -c /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java -Djava.io.tmpdir=/usr/local/hadoop_tmp_dir/nm-local-dir/usercache/hduser/appcache/application_1511503447665_0001/container_1511503447665_0001_02_000001/tmp -Dlog4j.configuration=container-log4j.properties -Dyarn.app.container.log.dir=/usr/local/hadoop-2.7.1/logs/userlogs/application_1511503447665_0001/container_1511503447665_0001_02_000001 -Dyarn.app.container.log.filesize=0 -Dhadoop.root.logger=INFO,CLA -Dhadoop.root.logfile=syslog  -Xmx1024m org.apache.hadoop.mapreduce.v2.app.MRAppMaster 1>/usr/local/hadoop-2.7.1/logs/userlogs/application_1511503447665_0001/container_1511503447665_0001_02_000001/stdout 2>/usr/local/hadoop-2.7.1/logs/userlogs/application_1511503447665_0001/container_1511503447665_0001_02_000001/stderr
        |- 10038 10029 10029 10029 (java) 462 12 2764288000 34916 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java -Djava.io.tmpdir=/usr/local/hadoop_tmp_dir/nm-local-dir/usercache/hduser/appcache/application_1511503447665_0001/container_1511503447665_0001_02_000001/tmp -Dlog4j.configuration=container-log4j.properties -Dyarn.app.container.log.dir=/usr/local/hadoop-2.7.1/logs/userlogs/application_1511503447665_0001/container_1511503447665_0001_02_000001 -Dyarn.app.container.log.filesize=0 -Dhadoop.root.logger=INFO,CLA -Dhadoop.root.logfile=syslog -Xmx1024m org.apache.hadoop.mapreduce.v2.app.MRAppMaster
[2015-11-24 14:04:33.349]
[2015-11-24 14:04:33.381]Container killed on request. Exit code is 143[2015-11-24 14:04:33.381]
[2015-11-24 14:04:33.424]Container exited with a non-zero exit code 143. [2015-11-24 14:04:33.424]
For more detailed output, check the application tracking page: http://local-ubuntu-vm:8088/cluster/app/application_1511503447665_0001 Then click on links to logs of each attempt.
. Failing the application.
15/11/24 14:04:34 INFO mapreduce.Job: Counters: 0
15/11/24 14:04:34 INFO client.RMProxy: Connecting to ResourceManager at /127.0.0.1:8032
15/11/24 14:04:34 WARN hdfs.DataStreamer: Caught exception
java.lang.InterruptedException
        at java.lang.Object.wait(Native Method)
        at java.lang.Thread.join(Thread.java:1252)
        at java.lang.Thread.join(Thread.java:1326)
        at org.apache.hadoop.hdfs.DataStreamer.closeResponder(DataStreamer.java:980)
        at org.apache.hadoop.hdfs.DataStreamer.endBlock(DataStreamer.java:630)
        at org.apache.hadoop.hdfs.DataStreamer.run(DataStreamer.java:807)
15/11/24 14:04:34 INFO input.FileInputFormat: Total input files to process : 0
15/11/24 14:04:34 WARN hdfs.DataStreamer: Caught exception
java.lang.InterruptedException
        at java.lang.Object.wait(Native Method)
        at java.lang.Thread.join(Thread.java:1252)
        at java.lang.Thread.join(Thread.java:1326)
        at org.apache.hadoop.hdfs.DataStreamer.closeResponder(DataStreamer.java:980)
        at org.apache.hadoop.hdfs.DataStreamer.closeInternal(DataStreamer.java:844)
        at org.apache.hadoop.hdfs.DataStreamer.run(DataStreamer.java:840)
15/11/24 14:04:34 INFO mapreduce.JobSubmitter: number of splits:0
15/11/24 14:04:34 INFO mapreduce.JobSubmitter: Submitting tokens for job: job_1511503447665_0002
15/11/24 14:04:34 INFO impl.YarnClientImpl: Submitted application application_1511503447665_0002
15/11/24 14:04:34 INFO mapreduce.Job: The url to track the job: http://local-ubuntu-vm:8088/proxy/application_1511503447665_0002/
15/11/24 14:04:34 INFO mapreduce.Job: Running job: job_1511503447665_0002

15/11/24 14:04:45 INFO mapreduce.Job: Job job_1511503447665_0002 running in uber mode : false
15/11/24 14:04:45 INFO mapreduce.Job:  map 0% reduce 0%
15/11/24 14:04:45 INFO mapreduce.Job: Job job_1511503447665_0002 failed with state FAILED due to: Application application_1511503447665_0002 failed 2 times due to AM Container for appattempt_1511503447665_0002_000002 exited with  exitCode: -103
Failing this attempt.Diagnostics: [2015-11-24 14:04:45.509]Container [pid=10199,containerID=container_1511503447665_0002_02_000001] is running beyond virtual memory limits. Current usage: 142.5 MB of 512 MB physical memory used; 2.6 GB of 1.0 GB virtual memory used. Killing container.
Dump of the process-tree for container_1511503447665_0002_02_000001 :
        |- PID PPID PGRPID SESSID CMD_NAME USER_MODE_TIME(MILLIS) SYSTEM_TIME(MILLIS) VMEM_USAGE(BYTES) RSSMEM_USAGE(PAGES) FULL_CMD_LINE
        |- 10208 10199 10199 10199 (java) 464 9 2764288000 35721 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java -Djava.io.tmpdir=/usr/local/hadoop_tmp_dir/nm-local-dir/usercache/hduser/appcache/application_1511503447665_0002/container_1511503447665_0002_02_000001/tmp -Dlog4j.configuration=container-log4j.properties -Dyarn.app.container.log.dir=/usr/local/hadoop-2.7.1/logs/userlogs/application_1511503447665_0002/container_1511503447665_0002_02_000001 -Dyarn.app.container.log.filesize=0 -Dhadoop.root.logger=INFO,CLA -Dhadoop.root.logfile=syslog -Xmx1024m org.apache.hadoop.mapreduce.v2.app.MRAppMaster
        |- 10199 10198 10199 10199 (bash) 0 0 14643200 769 /bin/bash -c /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java -Djava.io.tmpdir=/usr/local/hadoop_tmp_dir/nm-local-dir/usercache/hduser/appcache/application_1511503447665_0002/container_1511503447665_0002_02_000001/tmp -Dlog4j.configuration=container-log4j.properties -Dyarn.app.container.log.dir=/usr/local/hadoop-2.7.1/logs/userlogs/application_1511503447665_0002/container_1511503447665_0002_02_000001 -Dyarn.app.container.log.filesize=0 -Dhadoop.root.logger=INFO,CLA -Dhadoop.root.logfile=syslog  -Xmx1024m org.apache.hadoop.mapreduce.v2.app.MRAppMaster 1>/usr/local/hadoop-2.7.1/logs/userlogs/application_1511503447665_0002/container_1511503447665_0002_02_000001/stdout 2>/usr/local/hadoop-2.7.1/logs/userlogs/application_1511503447665_0002/container_1511503447665_0002_02_000001/stderr
[2015-11-24 14:04:45.509]
[2015-11-24 14:04:45.536]Container killed on request. Exit code is 143[2015-11-24 14:04:45.536]
[2015-11-24 14:04:45.553]Container exited with a non-zero exit code 143. [2015-11-24 14:04:45.553]
For more detailed output, check the application tracking page: http://local-ubuntu-vm:8088/cluster/app/application_1511503447665_0002 Then click on links to logs of each attempt.
. Failing the application.
15/11/24 14:04:45 INFO mapreduce.Job: Counters: 0
```

Analysis - ref: TS: 2.6 GB of 1.0 GB virtual memory used. Killing container.
	
Modified the configurations as below and try again. 

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ vi etc/hadoop/mapred-site.xml
 …
    <property>
        <name>mapreduce.map.memory.mb</name>
        <value>64</value>
    </property>
    <property>
        <name>mapreduce.reduce.memory.mb</name>
        <value>64</value>
    </property>
    <property>
        <name>yarn.app.mapreduce.am.resource.mb</name>
        <value>768</value>
    </property>
 
hduser@local-ubuntu-vm:/usr/local/hadoop$ vi etc/hadoop/yarn-site.xml
…
    <property>
        <name>yarn.scheduler.minimum-allocation-mb</name>
        <value>1500</value>
    </property>
    <property>
        <name>yarn.scheduler.maximum-allocation-mb</name>
        <value>1500</value>
    </property>
```

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.1.jar grep input output 'dfs[a-z.]+'
15/11/26 14:00:57 INFO client.RMProxy: Connecting to ResourceManager at /127.0.0.1:8032
15/11/26 14:00:58 INFO input.FileInputFormat: Total input files to process : 30
15/11/26 14:00:58 WARN hdfs.DataStreamer: Caught exception
java.lang.InterruptedException
        at java.lang.Object.wait(Native Method)
        at java.lang.Thread.join(Thread.java:1252)
        at java.lang.Thread.join(Thread.java:1326)
        at org.apache.hadoop.hdfs.DataStreamer.closeResponder(DataStreamer.java:980)
        at org.apache.hadoop.hdfs.DataStreamer.endBlock(DataStreamer.java:630)
        at org.apache.hadoop.hdfs.DataStreamer.run(DataStreamer.java:807)
15/11/26 14:00:58 INFO mapreduce.JobSubmitter: number of splits:30
15/11/26 14:00:58 INFO Configuration.deprecation: yarn.resourcemanager.system-metrics-publisher.enabled is deprecated. Instead, use yarn.system-metrics-publisher.enabled
15/11/26 14:00:58 INFO mapreduce.JobSubmitter: Submitting tokens for job: job_1511675996699_0001
15/11/26 14:00:59 INFO impl.YarnClientImpl: Submitted application application_1511675996699_0001
15/11/26 14:00:59 INFO mapreduce.Job: The url to track the job: http://local-ubuntu-vm:8088/proxy/application_1511675996699_0001/
15/11/26 14:00:59 INFO mapreduce.Job: Running job: job_1511675996699_0001
15/11/26 14:01:10 INFO mapreduce.Job: Job job_1511675996699_0001 running in uber mode : false
15/11/26 14:01:10 INFO mapreduce.Job:  map 0% reduce 0%
15/11/26 14:01:27 INFO mapreduce.Job:  map 13% reduce 0%
15/11/26 14:01:41 INFO mapreduce.Job:  map 20% reduce 0%
15/11/26 14:01:42 INFO mapreduce.Job:  map 27% reduce 0%
15/11/26 14:01:56 INFO mapreduce.Job:  map 40% reduce 0%
15/11/26 14:02:09 INFO mapreduce.Job:  map 43% reduce 0%
15/11/26 14:02:10 INFO mapreduce.Job:  map 50% reduce 0%
15/11/26 14:02:20 INFO mapreduce.Job:  map 60% reduce 17%
15/11/26 14:02:26 INFO mapreduce.Job:  map 60% reduce 20%
15/11/26 14:02:31 INFO mapreduce.Job:  map 70% reduce 20%
15/11/26 14:02:38 INFO mapreduce.Job:  map 70% reduce 23%
15/11/26 14:02:42 INFO mapreduce.Job:  map 80% reduce 23%
15/11/26 14:02:44 INFO mapreduce.Job:  map 80% reduce 27%
15/11/26 14:02:53 INFO mapreduce.Job:  map 90% reduce 27%
15/11/26 14:02:56 INFO mapreduce.Job:  map 90% reduce 30%
15/11/26 14:03:04 INFO mapreduce.Job:  map 100% reduce 30%
15/11/26 14:03:05 INFO mapreduce.Job:  map 100% reduce 100%
15/11/26 14:03:06 INFO mapreduce.Job: Job job_1511675996699_0001 completed successfully
15/11/26 14:03:07 INFO mapreduce.Job: Counters: 49
        File System Counters
                FILE: Number of bytes read=384
                FILE: Number of bytes written=6265790
                FILE: Number of read operations=0
                FILE: Number of large read operations=0
                FILE: Number of write operations=0
                HDFS: Number of bytes read=94896
                HDFS: Number of bytes written=488
                HDFS: Number of read operations=93
                HDFS: Number of large read operations=0
                HDFS: Number of write operations=2
        Job Counters
                Launched map tasks=30
                Launched reduce tasks=1
                Data-local map tasks=30
                Total time spent by all maps in occupied slots (ms)=354938
                Total time spent by all reduces in occupied slots (ms)=69254
                Total time spent by all map tasks (ms)=354938
                Total time spent by all reduce tasks (ms)=69254
                Total vcore-milliseconds taken by all map tasks=354938
                Total vcore-milliseconds taken by all reduce tasks=69254
                Total megabyte-milliseconds taken by all map tasks=532407000
                Total megabyte-milliseconds taken by all reduce tasks=103881000
        Map-Reduce Framework
                Map input records=2401
                Map output records=28
                Map output bytes=663
                Map output materialized bytes=558
                Input split bytes=3654
                Combine input records=28
                Combine output records=15
                Reduce input groups=13
                Reduce shuffle bytes=558
                Reduce input records=15
                Reduce output records=13
                Spilled Records=30
                Shuffled Maps =30
                Failed Shuffles=0
                Merged Map outputs=30
                GC time elapsed (ms)=7419
                CPU time spent (ms)=14020
                Physical memory (bytes) snapshot=7261794304
                Virtual memory (bytes) snapshot=58795667456
                Total committed heap usage (bytes)=4657373184
        Shuffle Errors
                BAD_ID=0
                CONNECTION=0
                IO_ERROR=0
                WRONG_LENGTH=0
                WRONG_MAP=0
                WRONG_REDUCE=0
        File Input Format Counters
                Bytes Read=91242
        File Output Format Counters
                Bytes Written=488
15/11/26 14:03:07 INFO client.RMProxy: Connecting to ResourceManager at /127.0.0.1:8032
15/11/26 14:03:07 INFO input.FileInputFormat: Total input files to process : 1
15/11/26 14:03:07 WARN hdfs.DataStreamer: Caught exception
java.lang.InterruptedException
        at java.lang.Object.wait(Native Method)
        at java.lang.Thread.join(Thread.java:1252)
        at java.lang.Thread.join(Thread.java:1326)
        at org.apache.hadoop.hdfs.DataStreamer.closeResponder(DataStreamer.java:980)
        at org.apache.hadoop.hdfs.DataStreamer.endBlock(DataStreamer.java:630)
        at org.apache.hadoop.hdfs.DataStreamer.run(DataStreamer.java:807)
15/11/26 14:03:07 WARN hdfs.DataStreamer: Caught exception
java.lang.InterruptedException
        at java.lang.Object.wait(Native Method)
        at java.lang.Thread.join(Thread.java:1252)
        at java.lang.Thread.join(Thread.java:1326)
        at org.apache.hadoop.hdfs.DataStreamer.closeResponder(DataStreamer.java:980)
        at org.apache.hadoop.hdfs.DataStreamer.endBlock(DataStreamer.java:630)
        at org.apache.hadoop.hdfs.DataStreamer.run(DataStreamer.java:807)
15/11/26 14:03:07 INFO mapreduce.JobSubmitter: number of splits:1
15/11/26 14:03:07 INFO mapreduce.JobSubmitter: Submitting tokens for job: job_1511675996699_0002
15/11/26 14:03:07 INFO impl.YarnClientImpl: Submitted application application_1511675996699_0002
15/11/26 14:03:07 INFO mapreduce.Job: The url to track the job: http://local-ubuntu-vm:8088/proxy/application_1511675996699_0002/
15/11/26 14:03:07 INFO mapreduce.Job: Running job: job_1511675996699_0002
15/11/26 14:03:20 INFO mapreduce.Job: Job job_1511675996699_0002 running in uber mode : false
15/11/26 14:03:20 INFO mapreduce.Job:  map 0% reduce 0%
15/11/26 14:03:25 INFO mapreduce.Job:  map 100% reduce 0%
15/11/26 14:03:31 INFO mapreduce.Job:  map 100% reduce 100%
15/11/26 14:03:31 INFO mapreduce.Job: Job job_1511675996699_0002 completed successfully
15/11/26 14:03:31 INFO mapreduce.Job: Counters: 49
        File System Counters
                FILE: Number of bytes read=330
                FILE: Number of bytes written=403597
                FILE: Number of read operations=0
                FILE: Number of large read operations=0
                FILE: Number of write operations=0
                HDFS: Number of bytes read=619
                HDFS: Number of bytes written=220
                HDFS: Number of read operations=7
                HDFS: Number of large read operations=0
                HDFS: Number of write operations=2
        Job Counters
                Launched map tasks=1
                Launched reduce tasks=1
                Data-local map tasks=1
                Total time spent by all maps in occupied slots (ms)=3156
                Total time spent by all reduces in occupied slots (ms)=3245
                Total time spent by all map tasks (ms)=3156
                Total time spent by all reduce tasks (ms)=3245
                Total vcore-milliseconds taken by all map tasks=3156
                Total vcore-milliseconds taken by all reduce tasks=3245
                Total megabyte-milliseconds taken by all map tasks=4734000
                Total megabyte-milliseconds taken by all reduce tasks=4867500
        Map-Reduce Framework
                Map input records=13
                Map output records=13
                Map output bytes=298
                Map output materialized bytes=330
                Input split bytes=131
                Combine input records=0
                Combine output records=0
                Reduce input groups=5
                Reduce shuffle bytes=330
                Reduce input records=13
                Reduce output records=13
                Spilled Records=26
                Shuffled Maps =1
                Failed Shuffles=0
                Merged Map outputs=1
                GC time elapsed (ms)=132
                CPU time spent (ms)=780
                Physical memory (bytes) snapshot=387907584
                Virtual memory (bytes) snapshot=3799310336
                Total committed heap usage (bytes)=202379264
        Shuffle Errors
                BAD_ID=0
                CONNECTION=0
                IO_ERROR=0
                WRONG_LENGTH=0
                WRONG_MAP=0
                WRONG_REDUCE=0
        File Input Format Counters
                Bytes Read=488
        File Output Format Counters
                Bytes Written=220 
```

```shell
#check the result
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hdfs dfs -cat output/*
6       dfs.audit.logger
4       dfs.class
3       dfs.logger
3       dfs.server.namenode.
2       dfs.audit.log.maxbackupindex
2       dfs.period
2       dfs.audit.log.maxfilesize
1       dfs.log
1       dfs.file
1       dfs.servers
1       dfsadmin
1       dfsmetrics.log
1       dfs.replication

Check the Yarn console result.
```

Check mem

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ free -h
              total        used        free      shared  buff/cache   available
Mem:           2.9G        1.4G        1.1G         11M        449M        1.2G
Swap:          997M         27M        970M
```


# Reference
* Official Doc: http://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/SingleCluster.html (version 2.7.1)
