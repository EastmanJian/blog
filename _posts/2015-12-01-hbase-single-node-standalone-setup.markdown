---
layout: post
title: "Single-node, Standalone HBase Setup"
date: 2015-12-01 09:18:00 +08:00
categories: BigData IT
tags: HBase HDFS ZooKeeper cluster
---

* content
{:toc}

This article records a practical installation HBase standalone mode in a single-node.

### Environment 
GNU/Linux, Ubuntu 15.x +

### Procedure: Download, Configure, and Start and Stop HBase in Standalone Mode
* Disable Ubunto 127.0.1.1 loopback IP if it's used

```shell
hduser@local-ubuntu-vm:~$ sudo vi /etc/hosts
127.0.0.1       localhost
#127.0.1.1       localhost
192.168.2.140 master local.ubuntu.vm
```

Note: Prior to HBase 0.94.x, HBase expected the loopback IP address to be 127.0.0.1. Ubuntu and some other distributions default to 127.0.1.1 and this will cause problems for you.

* Check JDK version if it's suit for the current HBase version

|HBase Version|JDK 7|JDK 8|
|-------------|-----|-----|
|1.1          |yes  |Running with JDK 8 will work but is not well tested.|

Note: HBase will neither build nor compile with Java 6.






```shell
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ java -version
openjdk version "1.7.0_51"
OpenJDK Runtime Environment (build 1.7.0_51)
OpenJDK 64-Bit Server VM (build 25.51-b12, mixed mode)
```
		
* Create dedicate Linux user account for HBase

```shell
$ sudo addgroup hbasegrp
$ sudo adduser --ingroup hbasegrp hbaseusr
$ sudo usermod -aG sudo hbaseusr
$ sudo usermod -aG hadoop hbaseusr
$ sudo id hbaseusr
uid=1004(hbaseusr) gid=1004(hbasegrp) groups=1004(hbasegrp),27(sudo),1002(hadoop)
```


* Download HBase package and unzip

```shell
hbaseusr@local-ubuntu-vm:/usr/local$ sudo wget http://mirror.bit.edu.cn/apache/hbase/1.1.0/hbase-1.1.0-bin.tar.gz
...
hbaseusr@local-ubuntu-vm:/usr/local$ sudo tar xzvf hbase-1.1.0-bin.tar.gz
...
hbaseusr@local-ubuntu-vm:/usr/local$ sudo chown -R hbaseusr:hbasegrp hbase-1.1.0/
hbaseusr@local-ubuntu-vm:/usr/local$ sudo ln -s hbase-1.1.0 hbase
hbaseusr@local-ubuntu-vm:/usr/local$ sudo chown -R hbaseusr:hbasegrp hbase
```

* Configure JAVA_HOME env var in conf/hbase-env.sh

```shell
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ vi conf/hbase-env.sh
...
# The java implementation to use.  Java 1.7+ required.
export JAVA_HOME=/usr
```

> Note: Most modern Linux operating systems provide a mechanism, such as /usr/bin/alternatives on RHEL or CentOS, for transparently switching between versions of executables such as Java. In this case, you can set JAVA_HOME to the directory containing the symbolic link to bin/java, which is usually /usr.
		
* Configure HBase and ZooKeeper data directories in conf/hbase-site.xml

```xml
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ vi conf/hbase-site.xml
...
<configuration>
  <property>
    <name>hbase.rootdir</name>
    <value>file:///home/hbaseusr/hbase</value>
  </property>
  <property>
    <name>hbase.zookeeper.property.dataDir</name>
    <value>/home/hbaseusr/zookeeper</value>
  </property>
</configuration>
```

> Notes:   
> * You do not need to create the HBase data directory. HBase will do this for you. If you create the directory, HBase will attempt to do a migration, which is not what you want.
> * The 'file:/' prefix is how we denote local filesystem. 
> * To home HBase on an existing instance of HDFS, set the hbase.rootdir to point at a directory up on your instance:  e.g. hdfs://namenode.example.org:8020/hbase.

* Start HBase

```shell
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ bin/start-hbase.sh
starting master, logging to /usr/local/hbase/bin/../logs/hbase-hbaseusr-master-local-ubuntu-vm.out
OpenJDK 64-Bit Server VM warning: ignoring option PermSize=128m; support was removed in 8.0
OpenJDK 64-Bit Server VM warning: ignoring option MaxPermSize=128m; support was removed in 8.0
		
#check the started processes
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ jps
89142 Jps
88828 HMaster
		
#check output file and logs
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ cat /usr/local/hbase/bin/../logs/hbase-hbaseusr-master-local-ubuntu-vm.out
OpenJDK 64-Bit Server VM warning: ignoring option PermSize=128m; support was removed in 8.0
OpenJDK 64-Bit Server VM warning: ignoring option MaxPermSize=128m; support was removed in 8.0
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ cat /usr/local/hbase/bin/../logs/hbase-hbaseusr-master-local-ubuntu-vm.log 
```
		
> Notes:  
> * The bin/start-hbase.sh script is provided as a convenient way to start HBase. 
> * You can use the jps command to verify that you have one running process called HMaster.
> * In standalone mode HBase runs all daemons within this single JVM, including   
>      - HMaster  
>      - HRegionServer (single)  
>      - ZooKeeper  
				
* Visit the HBase Web UI
URL: http://local.ubuntu.vm:16010 (local.ubuntu.vm should point to the host where hbase is up)  

![Hbase Web Home](https://ejres-1253687085.picgz.myqcloud.com/img/hbase/hbase-web-home.png)


* Stop HBase

```shell
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ bin/stop-hbase.sh
stopping hbase..................
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ jps
90166 Jps
```

### Procedure: Try HBase basic commands. 

* Connect to HBase 

```shell
#Start HBase first before run the shell
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ bin/hbase shell
HBase Shell; enter 'help<RETURN>' for list of supported commands.
Type "exit<RETURN>" to leave the HBase Shell
Version 1.1.0, r930b9a55528fe45d8edce7af42fef2d35e77677a, Thu Apr  6 19:36:54 PDT 2015

hbase(main):001:0> 
```

* Display HBase Shell Help Text

```shell
hbase(main):001:0> help
HBase Shell, version 1.1.0, r930b9a55528fe45d8edce7af42fef2d35e77677a, Thu Apr  6 19:36:54 PDT 2015
Type 'help "COMMAND"', (e.g. 'help "get"' -- the quotes are necessary) for help on a specific command.
Commands are grouped. Type 'help "COMMAND_GROUP"', (e.g. 'help "general"') for help on a command group.
 
COMMAND GROUPS:
  Group name: general
  Commands: status, table_help, version, whoami
 
  Group name: ddl
  Commands: alter, alter_async, alter_status, create, describe, disable, disable_all, drop, drop_all, enable, enable_all, exists, get_table, is_disabled, is_enabled, list, locate_region, show_filters
 
  Group name: namespace
  Commands: alter_namespace, create_namespace, describe_namespace, drop_namespace, list_namespace, list_namespace_tables
 
  Group name: dml
  Commands: append, count, delete, deleteall, get, get_counter, get_splits, incr, put, scan, truncate, truncate_preserve
 
  Group name: tools
  Commands: assign, balance_switch, balancer, balancer_enabled, catalogjanitor_enabled, catalogjanitor_run, catalogjanitor_switch, close_region, compact, compact_rs, flush, major_compact, merge_region, move, normalize, normalizer_enabled, normalizer_switch, split, splitormerge_enabled, splitormerge_switch, trace, unassign, wal_roll, zk_dump
 
  Group name: replication
  Commands: add_peer, append_peer_tableCFs, disable_peer, disable_table_replication, enable_peer, enable_table_replication, get_peer_config, list_peer_configs, list_peers, list_replicated_tables, remove_peer, remove_peer_tableCFs, set_peer_tableCFs, show_peer_tableCFs
 
  Group name: snapshots
  Commands: clone_snapshot, delete_all_snapshot, delete_snapshot, delete_table_snapshots, list_snapshots, list_table_snapshots, restore_snapshot, snapshot
 
  Group name: configuration
  Commands: update_all_config, update_config
 
  Group name: quotas
  Commands: list_quotas, set_quota
 
  Group name: security
  Commands: grant, list_security_capabilities, revoke, user_permission
 
  Group name: procedures
  Commands: abort_procedure, list_procedures
 
  Group name: visibility labels
  Commands: add_labels, clear_auths, get_auths, list_labels, set_auths, set_visibility
 
SHELL USAGE:
Quote all names in HBase Shell such as table and column names.  Commas delimit
command parameters.  Type <RETURN> after entering a command to run it.
Dictionaries of configuration used in the creation and alteration of tables are
Ruby Hashes. They look like this:
 
  {'key1' => 'value1', 'key2' => 'value2', ...}
 
and are opened and closed with curley-braces.  Key/values are delimited by the
'=>' character combination.  Usually keys are predefined constants such as
NAME, VERSIONS, COMPRESSION, etc.  Constants do not need to be quoted.  Type
'Object.constants' to see a (messy) list of all constants in the environment.
 
If you are using binary keys or values and need to enter them in the shell, use
double-quote'd hexadecimal representation. For example:
 
  hbase> get 't1', "key\x03\x3f\xcd"
  hbase> get 't1', "key\003\023\011"
  hbase> put 't1', "test\xef\xff", 'f1:', "\x01\x33\x40"
 
The HBase shell is the (J)Ruby IRB with the above HBase-specific commands added.
For more on the HBase Shell, see http://hbase.apache.org/book.html
hbase(main):002:0>
```

* Create tables and list their information - command: create, list

```shell
hbase(main):002:0> create 'test', 'cf'
0 row(s) in 1.5140 seconds
 
=> Hbase::Table - test
hbase(main):004:0> list
TABLE
test
1 row(s) in 0.0240 seconds
 
=> ["test"]
hbase(main):005:0> create 'test1', 'cf'
0 row(s) in 1.2460 seconds
 
=> Hbase::Table - test1
hbase(main):006:0> list
TABLE
test
test1
2 row(s) in 0.0080 seconds
 
=> ["test", "test1"]
hbase(main):007:0> list 'test'
TABLE
test
1 row(s) in 0.0150 seconds
 
=> ["test"]
```

* Put data into the table and scan the data - command:put, scan

```shell
hbase(main):009:0> put 'test', 'row1', 'cf:a', 'value1'
0 row(s) in 0.2410 seconds
 
hbase(main):010:0> put 'test', 'row2', 'cf:b', 'value2'
0 row(s) in 0.0050 seconds
 
hbase(main):011:0> put 'test', 'row3', 'cf:c', 'value3'
0 row(s) in 0.0100 seconds
 
hbase(main):012:0> scan 'test'
ROW                                    COLUMN+CELL
 row1                                  column=cf:a, timestamp=1512123133786, value=value1
 row2                                  column=cf:b, timestamp=1512123143631, value=value2
 row3                                  column=cf:c, timestamp=1512123162147, value=value3
3 row(s) in 0.0360 seconds
```

```shell
#help of the 'put' command
hbase(main):008:0> help 'put'
Put a cell 'value' at specified table/row/column and optionally
timestamp coordinates.  To put a cell value into table 'ns1:t1' or 't1'
at row 'r1' under column 'c1' marked with the time 'ts1', do:
 
  hbase> put 'ns1:t1', 'r1', 'c1', 'value'
  hbase> put 't1', 'r1', 'c1', 'value'
  hbase> put 't1', 'r1', 'c1', 'value', ts1
  hbase> put 't1', 'r1', 'c1', 'value', {ATTRIBUTES=>{'mykey'=>'myvalue'}}
  hbase> put 't1', 'r1', 'c1', 'value', ts1, {ATTRIBUTES=>{'mykey'=>'myvalue'}}
  hbase> put 't1', 'r1', 'c1', 'value', ts1, {VISIBILITY=>'PRIVATE|SECRET'}
 
The same commands also can be run on a table reference. Suppose you had a reference
t to table 't1', the corresponding command would be:
 
  hbase> t.put 'r1', 'c1', 'value', ts1, {ATTRIBUTES=>{'mykey'=>'myvalue'}}
```

* Get a single row of data - command: get

```shell
hbase(main):013:0> get 'test', 'row1'
COLUMN                                 CELL
 cf:a                                  timestamp=1512123133786, value=value1
1 row(s) in 0.0270 seconds 
```

* Disable and enable a table - command: disable, enable

```shell
hbase(main):014:0> disable 'test'
0 row(s) in 2.2990 seconds
 
hbase(main):017:0> scan 'test'
ROW                                    COLUMN+CELL
 
ERROR: test is disabled.
 
Here is some help for this command:
...
 
hbase(main):015:0> enable 'test'
0 row(s) in 1.2750 seconds
```

* Drop the table - command: drop

```shell
hbase(main):018:0> drop 'test'
0 row(s) in 1.2710 seconds

Note: table must be disabled before drop
hbase(main):020:0> drop 'test1'
 
ERROR: Table test1 is enabled. Disable it first.
```

* Quit the shell - command: quit

```shell
hbase(main):025:0> quit
hbaseusr@local-ubuntu-vm:/usr/local/hbase$
```

	

### Reference
* https://hbase.apache.org/book.html


