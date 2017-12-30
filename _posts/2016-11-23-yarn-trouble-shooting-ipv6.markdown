---
layout: post
title: "YARN: Trouble Shooting: Run MapReduce Job on YARN err, IPv6 issue"
date: 2016-11-23 22:48:00 +08:00
categories: BigData IT
tags: Hadoop MapReduce YARN cluster
---

* content
{:toc}

		
### Symptom  
Fail to run a MapReduce Job on YARN, and shows the error below:  





```shell
hduser@ubuntu:/usr/local/hadoop$ bin/hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.1.jar grep input output 'dfs[a-z.]+'
16/11/23 21:47:18 INFO client.RMProxy: Connecting to ResourceManager at /0.0.0.0:8032
16/11/23 21:47:20 INFO input.FileInputFormat: Total input files to process : 29
16/11/23 21:47:20 WARN hdfs.DataStreamer: Caught exception
java.lang.InterruptedException
        at java.lang.Object.wait(Native Method)
        at java.lang.Thread.join(Thread.java:1252)
        at java.lang.Thread.join(Thread.java:1326)
        at org.apache.hadoop.hdfs.DataStreamer.closeResponder(DataStreamer.java:980)
        at org.apache.hadoop.hdfs.DataStreamer.endBlock(DataStreamer.java:630)
        at org.apache.hadoop.hdfs.DataStreamer.run(DataStreamer.java:807)
16/11/23 21:47:20 WARN hdfs.DataStreamer: Caught exception
java.lang.InterruptedException
        at java.lang.Object.wait(Native Method)
        at java.lang.Thread.join(Thread.java:1252)
        at java.lang.Thread.join(Thread.java:1326)
        at org.apache.hadoop.hdfs.DataStreamer.closeResponder(DataStreamer.java:980)
        at org.apache.hadoop.hdfs.DataStreamer.endBlock(DataStreamer.java:630)
        at org.apache.hadoop.hdfs.DataStreamer.run(DataStreamer.java:807)
16/11/23 21:47:20 INFO mapreduce.JobSubmitter: number of splits:29
16/11/23 21:47:21 INFO Configuration.deprecation: yarn.resourcemanager.system-metrics-publisher.enabled is deprecated. Instead, use yarn.system-metrics-publisher.enabled
16/11/23 21:47:21 INFO mapreduce.JobSubmitter: Submitting tokens for job: job_1511444725105_0001
16/11/23 21:47:22 INFO impl.YarnClientImpl: Submitted application application_1511444725105_0001
16/11/23 21:47:22 INFO mapreduce.Job: The url to track the job: http://ubuntu:8088/proxy/application_1511444725105_0001/
16/11/23 21:47:22 INFO mapreduce.Job: Running job: job_1511444725105_0001
16/11/23 21:47:35 INFO mapreduce.Job: Job job_1511444725105_0001 running in uber mode : false
16/11/23 21:47:35 INFO mapreduce.Job:  map 0% reduce 0%
16/11/23 21:48:12 INFO ipc.Client: Retrying connect to server: 0.0.0.0/0.0.0.0:8032. Already tried 0 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)
16/11/23 21:48:13 INFO ipc.Client: Retrying connect to server: 0.0.0.0/0.0.0.0:8032. Already tried 1 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)
16/11/23 21:48:14 INFO ipc.Client: Retrying connect to server: 0.0.0.0/0.0.0.0:8032. Already tried 2 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)
16/11/23 21:48:15 INFO ipc.Client: Retrying connect to server: 0.0.0.0/0.0.0.0:8032. Already tried 3 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)
16/11/23 21:48:16 INFO ipc.Client: Retrying connect to server: 0.0.0.0/0.0.0.0:8032. Already tried 4 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)
16/11/23 21:48:17 INFO ipc.Client: Retrying connect to server: 0.0.0.0/0.0.0.0:8032. Already tried 5 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)
16/11/23 21:48:18 INFO ipc.Client: Retrying connect to server: 0.0.0.0/0.0.0.0:8032. Already tried 6 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)
16/11/23 21:48:19 INFO ipc.Client: Retrying connect to server: 0.0.0.0/0.0.0.0:8032. Already tried 7 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)
16/11/23 21:48:20 INFO ipc.Client: Retrying connect to server: 0.0.0.0/0.0.0.0:8032. Already tried 8 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)
16/11/23 21:48:21 INFO ipc.Client: Retrying connect to server: 0.0.0.0/0.0.0.0:8032. Already tried 9 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)
16/11/23 21:48:21 INFO retry.RetryInvocationHandler: java.net.ConnectException: Your endpoint configuration is wrong; For more details see:  http://wiki.apache.org/hadoop/UnsetHostnameOrPort, while invoking ApplicationClientProtocolPBClientImpl.getApplicationReport over null. Trying to failover immediately.
```


### Cause
The YARN ResourceManager endpoint (8032) was bound to IPv6, however, the job was trying to connect to IPv4 endpoints.

```shell
# the check port number and its related protocol
hduser@ubuntu:/usr/local/hadoop$ netstat -plten
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       User       Inode       PID/Program name
tcp        0      0 0.0.0.0:50010           0.0.0.0:*               LISTEN      1002       31388       2767/java
tcp        0      0 0.0.0.0:50075           0.0.0.0:*               LISTEN      1002       31676       2767/java
tcp        0      0 127.0.0.1:45468         0.0.0.0:*               LISTEN      1002       31395       2767/java
tcp        0      0 0.0.0.0:50020           0.0.0.0:*               LISTEN      1002       31681       2767/java
tcp        0      0 0.0.0.0:50090           0.0.0.0:*               LISTEN      1002       33059       2946/java
tcp        0      0 127.0.1.1:53            0.0.0.0:*               LISTEN      0          17818       -
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      0          18495       -
tcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN      0          16166       -
tcp6       0      0 :::13562                :::*                    LISTEN      1002       37357       3230/java
tcp6       0      0 127.0.1.1:8030          :::*                    LISTEN      1002       33850       3103/java
tcp6       0      0 127.0.1.1:8031          :::*                    LISTEN      1002       33547       3103/java
tcp6       0      0 127.0.1.1:8032          :::*                    LISTEN      1002       34127       3103/java
tcp6       0      0 127.0.1.1:8033          :::*                    LISTEN      1002       37365       3103/java
tcp6       0      0 :::8040                 :::*                    LISTEN      1002       36411       3230/java
tcp6       0      0 :::8042                 :::*                    LISTEN      1002       37360       3230/java
tcp6       0      0 :::39436                :::*                    LISTEN      1002       36403       3230/java
tcp6       0      0 :::22                   :::*                    LISTEN      0          18497       -
tcp6       0      0 127.0.1.1:8088          :::*                    LISTEN      1002       36397       3103/java

# the Protocol of IPv6 is running
hduser@ubuntu:/usr/local/hadoop$ ifconfig
ens33     Link encap:Ethernet  HWaddr 00:0c:29:f7:53:78
          inet addr:192.168.2.140  Bcast:192.168.2.255  Mask:255.255.255.0
          inet6 addr: fe80::12a2:8dab:e468:c59a/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:655 errors:0 dropped:0 overruns:0 frame:0
          TX packets:691 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:59957 (59.9 KB)  TX bytes:76687 (76.6 KB)

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:1018 errors:0 dropped:0 overruns:0 frame:0
          TX packets:1018 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1
          RX bytes:98671 (98.6 KB)  TX bytes:98671 (98.6 KB)
```

### Resolution
Disable IPv6 in the linux machine.

e.g. Ubuntu

```shell
#Before disable IPV6
root@ubuntu:~# ifconfig
ens33     Link encap:Ethernet  HWaddr 00:0c:29:f7:53:78
          inet addr:192.168.2.140  Bcast:192.168.2.255  Mask:255.255.255.0
          inet6 addr: fe80::12a2:8dab:e468:c59a/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:114 errors:0 dropped:0 overruns:0 frame:0
          TX packets:169 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:12060 (12.0 KB)  TX bytes:19163 (19.1 KB)
 
lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:280 errors:0 dropped:0 overruns:0 frame:0
          TX packets:280 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1
          RX bytes:20115 (20.1 KB)  TX bytes:20115 (20.1 KB)
 
 
#Method 1
root@ubuntu:~# vi /etc/sysctl.conf
##Add the following lines into /etc/sysctl.conf
# disable ipv6
net.ipv6.conf.all.disable_ipv6=1
net.ipv6.conf.default.disable_ipv6=1
net.ipv6.conf.lo.disable_ipv6=1
 
root@ubuntu:~#  sysctl -p
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1
 
 
#Method 2
root@ubuntu:~# vi /etc/default/grub
#add ipv6.disable=1 into GRUB_CMDLINE_LINUX in file /etc/default/grub to disable ipv6
GRUB_CMDLINE_LINUX="find_preseed=/preseed.cfg auto noprompt priority=critical locale=en_US ipv6.disable=1"
root@ubuntu:~# update-grub2
Generating grub configuration file ...
Warning: Setting GRUB_TIMEOUT to a non-zero value when GRUB_HIDDEN_TIMEOUT is set is no longer supported.
Found background image: ubuntu_kylin_grub_bg.tga
Found linux image: /boot/vmlinuz-4.4.0-101-generic
Found initrd image: /boot/initrd.img-4.4.0-101-generic
Found linux image: /boot/vmlinuz-4.4.0-98-generic
Found initrd image: /boot/initrd.img-4.4.0-98-generic
Found memtest86+ image: /boot/memtest86+.elf
Found memtest86+ image: /boot/memtest86+.bin
done
 
#After disable IPV6
root@ubuntu:~# ifconfig
ens33     Link encap:Ethernet  HWaddr 00:0c:29:f7:53:78
          inet addr:192.168.2.140  Bcast:192.168.2.255  Mask:255.255.255.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:1227 errors:0 dropped:0 overruns:0 frame:0
          TX packets:1255 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:108304 (108.3 KB)  TX bytes:134856 (134.8 KB)
 
lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:2924 errors:0 dropped:0 overruns:0 frame:0
          TX packets:2924 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1
          RX bytes:277666 (277.6 KB)  TX bytes:277666 (277.6 KB)

```