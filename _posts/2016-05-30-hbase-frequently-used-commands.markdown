---
layout: post
title: "HBase Frequently Used Commands and Examples"
date: 2016-05-30 15:57:00 +08:00
categories: BigData IT
tags: HBase
---

* content
{:toc}

# Command Group - general

<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> help







```shell
hbase(main):001:0> help
HBase Shell, version 1.3.1, r930b9a55528fe45d8edce7af42fef2d35e77677a, Thu Apr  6 19:36:54 PDT 2016
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


<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> status

```shell
hbase(main):060:0> status
1 active master, 1 backup masters, 2 servers, 0 dead, 1.5000 average load
```

<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> table_help

```shell
hbase(main):061:0> table_help
Help for table-reference commands.

You can either create a table via 'create' and then manipulate the table via commands like 'put', 'get', etc.
See the standard help information for how to use each of these commands.

However, as of 0.96, you can also get a reference to a table, on which you can invoke commands.
For instance, you can get create a table and keep around a reference to it via:

   hbase> t = create 't', 'cf'

Or, if you have already created the table, you can get a reference to it:

   hbase> t = get_table 't'

You can do things like call 'put' on the table:

  hbase> t.put 'r', 'cf:q', 'v'

which puts a row 'r' with column family 'cf', qualifier 'q' and value 'v' into table t.

To read the data out, you can scan the table:

  hbase> t.scan

which will read all the rows in table 't'.

Essentially, any command that takes a table name can also be done via table reference.
Other commands include things like: get, delete, deleteall,
get_all_columns, get_counter, count, incr. These functions, along with
the standard JRuby object methods are also available via tab completion.

For more information on how to use each of these commands, you can also just type:

   hbase> t.help 'scan'

which will output more information on how to use that command.

You can also do general admin actions directly on a table; things like enable, disable,
flush and drop just by typing:

   hbase> t.enable
   hbase> t.flush
   hbase> t.disable
   hbase> t.drop

Note that after dropping a table, your reference to it becomes useless and further usage
is undefined (and not recommended).
```


<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> version

```shell
hbase(main):062:0> version
1.3.1, r930b9a55528fe45d8edce7af42fef2d35e77677a, Thu Apr  6 19:36:54 PDT 2016
```

<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> whoami

```shell
hbase(main):063:0> whoami
hbaseusr (auth:SIMPLE)
    groups: hbasegrp, sudo, hadoop, supergroup
```


<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> quit

```shell
hbase(main):025:0> quit
hbaseusr@local-ubuntu-vm:/usr/local/hbase$
```

# Command Group - ddl

**Commands**: alter, alter_async, alter_status, create, describe, disable, disable_all, drop, drop_all, enable, enable_all, exists, get_table, is_disabled, is_enabled, list, locate_region, show_filters

<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> create, list

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

<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> describe

```shell
hbase(main):064:0> describe 'test'
Table test is ENABLED
test
COLUMN FAMILIES DESCRIPTION
{NAME => 'cf', BLOOMFILTER => 'ROW', VERSIONS => '1', IN_MEMORY => 'false', KEEP_DELETED_CELLS => 'FALSE', DATA_BLOCK_ENCODING => 'NONE
', TTL => 'FOREVER', COMPRESSION => 'NONE', MIN_VERSIONS => '0', BLOCKCACHE => 'true', BLOCKSIZE => '65536', REPLICATION_SCOPE => '0'}
1 row(s) in 0.1230 seconds
```


<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> disable, enable

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

<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> drop

```shell
hbase(main):018:0> drop 'test'
0 row(s) in 1.2710 seconds
```

> Note: table must be disabled before drop

```shell
hbase(main):020:0> drop 'test1'
 
ERROR: Table test1 is enabled. Disable it first.
```


<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> alter the maximum number of versions for a column family

```shell
hbase(main):021:0> scan 'test', {RAW => true, VERSIONS => 10}
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value8
 row1                              column=cf:a, timestamp=1512141543717, value=value7
 row2                              column=cf:b, timestamp=1512274276116, type=DeleteColumn
 row3                              column=cf:, timestamp=1512275018966, type=DeleteFamily
 row3                              column=cf:b, timestamp=1512274997889, type=DeleteColumn
 row3                              column=cf:c, timestamp=1512141557557, value=value3
3 row(s) in 0.0350 seconds
  
hbase(main):022:0> describe 'test'
Table test is ENABLED
test
COLUMN FAMILIES DESCRIPTION
{NAME => 'cf', BLOOMFILTER => 'ROW', VERSIONS => '1', IN_MEMORY => 'false', KEEP_DELETED_CELLS => 'FALSE', DATA_BLOCK_ENCODING => 'NONE
', TTL => 'FOREVER', COMPRESSION => 'NONE', MIN_VERSIONS => '0', BLOCKCACHE => 'true', BLOCKSIZE => '65536', REPLICATION_SCOPE => '0'}
1 row(s) in 0.0960 seconds
 
hbase(main):023:0> alter 'test', NAME => 'cf', VERSIONS => 5 #alter the number of versions from default 1 to 5
Updating all regions with the new schema...
0/1 regions updated.
1/1 regions updated.
Done.
0 row(s) in 2.9730 seconds
 
hbase(main):024:0> describe 'test'
Table test is ENABLED
test
COLUMN FAMILIES DESCRIPTION
{NAME => 'cf', BLOOMFILTER => 'ROW', VERSIONS => '5', IN_MEMORY => 'false', KEEP_DELETED_CELLS => 'FALSE', DATA_BLOCK_ENCODING => 'NONE
', TTL => 'FOREVER', COMPRESSION => 'NONE', MIN_VERSIONS => '0', BLOCKCACHE => 'true', BLOCKSIZE => '65536', REPLICATION_SCOPE => '0'}
1 row(s) in 0.0160 seconds
 
hbase(main):025:0> scan 'test'
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value8
1 row(s) in 0.0460 seconds
 
hbase(main):026:0> scan 'test', {RAW => true, VERSIONS => 10} #after alter, the old versions and tombstone data are removed
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value8
1 row(s) in 0.0380 seconds
 
hbase(main):027:0> put 'test', 'row1', 'cf:a', 'value9'
0 row(s) in 0.0260 seconds
 
hbase(main):028:0> put 'test', 'row1', 'cf:a', 'value10'
0 row(s) in 0.0190 seconds
 
hbase(main):029:0> put 'test', 'row1', 'cf:a', 'value11'
0 row(s) in 0.0110 seconds
 
hbase(main):030:0> put 'test', 'row1', 'cf:a', 'value12'
0 row(s) in 0.0160 seconds
 
hbase(main):031:0> put 'test', 'row1', 'cf:a', 'value13'
0 row(s) in 0.0100 seconds
 
hbase(main):032:0> put 'test', 'row1', 'cf:a', 'value14'
0 row(s) in 0.0140 seconds
 
hbase(main):033:0> put 'test', 'row1', 'cf:a', 'value15'
0 row(s) in 0.0140 seconds
 
hbase(main):034:0> scan 'test', {RAW => true, VERSIONS => 10}
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512286412401, value=value15
 row1                              column=cf:a, timestamp=1512286410688, value=value14
 row1                              column=cf:a, timestamp=1512286408587, value=value13
 row1                              column=cf:a, timestamp=1512286406988, value=value12
 row1                              column=cf:a, timestamp=1512286405292, value=value11
 row1                              column=cf:a, timestamp=1512286403522, value=value10
 row1                              column=cf:a, timestamp=1512286401060, value=value9
 row1                              column=cf:a, timestamp=1512141543817, value=value8
1 row(s) in 0.0510 seconds
 
hbase(main):035:0> scan 'test'
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512286412401, value=value15
1 row(s) in 0.0190 seconds
```

> Note: use HColumnDescriptor in Java API



<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> alter the minimum number of versions for a column family

```shell
hbase(main):050:0> scan 'test', {RAW => true, VERSIONS => 10}
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512286412401, value=value15
 row1                              column=cf:a, timestamp=1512286410688, value=value14
 row1                              column=cf:a, timestamp=1512286408587, value=value13
 row1                              column=cf:a, timestamp=1512286406988, value=value12
 row1                              column=cf:a, timestamp=1512286405292, value=value11
 row1                              column=cf:a, timestamp=1512286403522, value=value10
 row1                              column=cf:a, timestamp=1512286401060, value=value9
 row1                              column=cf:a, timestamp=1512141543817, value=value8
1 row(s) in 0.0420 seconds
 
hbase(main):051:0> alter 'test', NAME => 'cf', MIN_VERSIONS => 2
Updating all regions with the new schema...
0/1 regions updated.
1/1 regions updated.
Done.
0 row(s) in 2.9610 seconds
 
hbase(main):052:0> scan 'test', {VERSIONS => 10} #after alter, the table seems compacted with the maximum VERSIONS 
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512286412401, value=value15
 row1                              column=cf:a, timestamp=1512286410688, value=value14
 row1                              column=cf:a, timestamp=1512286408587, value=value13
 row1                              column=cf:a, timestamp=1512286406988, value=value12
 row1                              column=cf:a, timestamp=1512286405292, value=value11
1 row(s) in 0.0500 seconds
 
hbase(main):053:0> describe 'test'
Table test is ENABLED
test
COLUMN FAMILIES DESCRIPTION
{NAME => 'cf', BLOOMFILTER => 'ROW', VERSIONS => '5', IN_MEMORY => 'false', KEEP_DELETED_CELLS => 'FALSE', DATA_BLOCK_ENCODING => 'NONE
', TTL => 'FOREVER', COMPRESSION => 'NONE', MIN_VERSIONS => '2', BLOCKCACHE => 'true', BLOCKSIZE => '65536', REPLICATION_SCOPE => '0'}
1 row(s) in 0.0170 seconds
```


# Command Group - namespace

<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> create_namespace, drop_namespace, describe_namespace, alter_namespace, list_namespace, list_namespace_tables

```shell
hbase(main):065:0> create_namespace 'my_ns'
0 row(s) in 1.2420 seconds
 
hbase(main):066:0> create 'my_ns:my_table', 'fam'
0 row(s) in 2.3590 seconds

=> Hbase::Table - my_ns:my_table
 
hbase(main):083:0> list_namespace
NAMESPACE
default
hbase
my_ns
3 row(s) in 0.0220 seconds
 
hbase(main):085:0> list_namespace_tables 'default'
TABLE
test
1 row(s) in 0.0370 seconds
 
hbase(main):086:0> list_namespace_tables 'my_ns'
TABLE
my_table
1 row(s) in 0.0050 seconds
 
hbase(main):087:0> list_namespace_tables 'hbase'
TABLE
meta
namespace
2 row(s) in 0.0040 seconds
 
hbase(main):067:0> drop_namespace 'my_ns'
ERROR: org.apache.hadoop.hbase.constraint.ConstraintException: Only empty namespaces can be removed. Namespace my_ns has 1 tables
        at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
        at sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:62)
        at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
        at java.lang.reflect.Constructor.newInstance(Constructor.java:423)
        at org.apache.hadoop.ipc.RemoteException.instantiateException(RemoteException.java:106)
        at org.apache.hadoop.ipc.RemoteException.unwrapRemoteException(RemoteException.java:95)
        at org.apache.hadoop.hbase.util.ForeignExceptionUtil.toIOException(ForeignExceptionUtil.java:45)
        at org.apache.hadoop.hbase.procedure2.RemoteProcedureException.fromProto(RemoteProcedureException.java:114)
        at org.apache.hadoop.hbase.master.procedure.ProcedureSyncWait.waitForProcedureToComplete(ProcedureSyncWait.java:85)
        at org.apache.hadoop.hbase.master.HMaster$15.run(HMaster.java:2717)
        at org.apache.hadoop.hbase.master.procedure.MasterProcedureUtil.submitProcedure(MasterProcedureUtil.java:133)
        at org.apache.hadoop.hbase.master.HMaster.deleteNamespace(HMaster.java:2705)
        at org.apache.hadoop.hbase.master.MasterRpcServices.deleteNamespace(MasterRpcServices.java:496)
        at org.apache.hadoop.hbase.protobuf.generated.MasterProtos$MasterService$2.callBlockingMethod(MasterProtos.java:58601)
        at org.apache.hadoop.hbase.ipc.RpcServer.call(RpcServer.java:2339)
        at org.apache.hadoop.hbase.ipc.CallRunner.run(CallRunner.java:123)
        at org.apache.hadoop.hbase.ipc.RpcExecutor$Handler.run(RpcExecutor.java:188)
        at org.apache.hadoop.hbase.ipc.RpcExecutor$Handler.run(RpcExecutor.java:168)
Caused by: org.apache.hadoop.ipc.RemoteException(org.apache.hadoop.hbase.constraint.ConstraintException): Only empty namespaces can be removed. Namespace my_ns has 1 tables
        at org.apache.hadoop.hbase.master.procedure.DeleteNamespaceProcedure.prepareDelete(DeleteNamespaceProcedure.java:256)
        at org.apache.hadoop.hbase.master.procedure.DeleteNamespaceProcedure.executeFromState(DeleteNamespaceProcedure.java:83)
        at org.apache.hadoop.hbase.master.procedure.DeleteNamespaceProcedure.executeFromState(DeleteNamespaceProcedure.java:49)
        at org.apache.hadoop.hbase.procedure2.StateMachineProcedure.execute(StateMachineProcedure.java:139)
        at org.apache.hadoop.hbase.procedure2.Procedure.doExecute(Procedure.java:499)
        at org.apache.hadoop.hbase.procedure2.ProcedureExecutor.execProcedure(ProcedureExecutor.java:1148)
        at org.apache.hadoop.hbase.procedure2.ProcedureExecutor.execLoop(ProcedureExecutor.java:943)
        at org.apache.hadoop.hbase.procedure2.ProcedureExecutor.execLoop(ProcedureExecutor.java:896)
        at org.apache.hadoop.hbase.procedure2.ProcedureExecutor.access$400(ProcedureExecutor.java:78)
        at org.apache.hadoop.hbase.procedure2.ProcedureExecutor$2.run(ProcedureExecutor.java:498)

Here is some help for this command:
Drop the named namespace. The namespace must be empty.
 
hbase(main):068:0> describe_namespace 'my_ns'
DESCRIPTION
{NAME => 'my_ns'}
1 row(s) in 0.0220 seconds
 
hbase(main):069:0> help 'alter_namespace'
Alter namespace properties.

To add/modify a property:

  hbase> alter_namespace 'ns1', {METHOD => 'set', 'PROPERTY_NAME' => 'PROPERTY_VALUE'}

To delete a property:

  hbase> alter_namespace 'ns1', {METHOD => 'unset', NAME=>'PROPERTY_NAME'}
hbase(main):070:0> alter_namespace 'my_ns', {METHOD => 'set', 'PROPERTY_NAME' => 'PROPERTY_VALUE'}
0 row(s) in 0.6340 seconds
 
hbase(main):071:0> describe_namespace 'my_ns'
DESCRIPTION
{NAME => 'my_ns', PROPERTY_NAME => 'PROPERTY_VALUE'}
1 row(s) in 0.0090 seconds
 
hbase(main):072:0> alter_namespace 'my_ns', {METHOD => 'unset', NAME=>'PROPERTY_NAME'}
0 row(s) in 0.6200 seconds
 
hbase(main):073:0> describe_namespace 'my_ns'
DESCRIPTION
{NAME => 'my_ns'}
1 row(s) in 0.0130 seconds 
 
hbase(main):078:0> disable 'my_ns:my_table'
0 row(s) in 2.2620 seconds
 
hbase(main):079:0> drop  'my_ns:my_table'
0 row(s) in 1.2650 seconds
 
hbase(main):080:0> drop_namespace 'my_ns'
0 row(s) in 0.8710 seconds
```

# Command Group - dml

**Commands**: append, count, delete, deleteall, get, get_counter, get_splits, incr, put, scan, truncate, truncate_preserve

<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> put, scan

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


<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> get a row, get a column

```shell
hbase(main):002:0> scan 'test', {RAW => true, VERSIONS => 10} #get raw data, with last 10 versions
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value1
 row2                              column=cf:b, timestamp=1512274276116, type=DeleteColumn
 row2                              column=cf:b, timestamp=1512273697101, value=value4
 row2                              column=cf:b, timestamp=1512273580400, value=value2
 row3                              column=cf:a, timestamp=1512274498487, value=value5
 row3                              column=cf:c, timestamp=1512141557557, value=value3
3 row(s) in 0.0770 seconds
 
hbase(main):003:0> get 'test', 'row3'
COLUMN                             CELL
 cf:a                              timestamp=1512274498487, value=value5
 cf:c                              timestamp=1512141557557, value=value3
1 row(s) in 0.0450 seconds
 
hbase(main):004:0> get 'test', 'row3', 'cf:a'
COLUMN                             CELL
 cf:a                              timestamp=1512274498487, value=value5
1 row(s) in 0.0190 seconds
```

<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> delete, deleteall, tombstones, scan with old versions

```shell
hbase(main):002:0> scan 'test', {RAW => true, VERSIONS => 10}
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value1
 row2                              column=cf:b, timestamp=1512273697101, value=value4
 row2                              column=cf:b, timestamp=1512273580400, value=value2
 row3                              column=cf:a, timestamp=1512274498487, value=value5
 row3                              column=cf:c, timestamp=1512141557557, value=value3
3 row(s) in 0.0770 seconds
 
hbase(main):102:0> delete 'test', 'row2', 'cf:b'
0 row(s) in 0.0910 seconds
 
hbase(main):005:0> scan 'test'
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value1
 row3                              column=cf:a, timestamp=1512274498487, value=value5
 row3                              column=cf:c, timestamp=1512141557557, value=value3
2 row(s) in 0.0710 seconds
 
hbase(main):002:0> scan 'test', {RAW => true, VERSIONS => 10}
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value1
 row2                              column=cf:b, timestamp=1512274276116, type=DeleteColumn #tomestone
 row2                              column=cf:b, timestamp=1512273697101, value=value4
 row2                              column=cf:b, timestamp=1512273580400, value=value2
 row3                              column=cf:a, timestamp=1512274498487, value=value5
 row3                              column=cf:c, timestamp=1512141557557, value=value3
3 row(s) in 0.0770 seconds
 
 
hbase(main):006:0> put 'test', 'row3', 'cf:b', 'value6'
0 row(s) in 0.0390 seconds
 
hbase(main):008:0> scan 'test', {RAW => true, VERSIONS => 10}
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value1
 row2                              column=cf:b, timestamp=1512274276116, type=DeleteColumn #tomestone
 row2                              column=cf:b, timestamp=1512273697101, value=value4
 row2                              column=cf:b, timestamp=1512273580400, value=value2
 row3                              column=cf:a, timestamp=1512274498487, value=value5
 row3                              column=cf:b, timestamp=1512274928084, value=value6
 row3                              column=cf:c, timestamp=1512141557557, value=value3
3 row(s) in 0.0490 seconds
 
hbase(main):009:0> delete 'test', 'row3', 'cf:b'
0 row(s) in 0.0450 seconds
 
hbase(main):010:0> scan 'test'
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value1
 row3                              column=cf:a, timestamp=1512274498487, value=value5
 row3                              column=cf:c, timestamp=1512141557557, value=value3
2 row(s) in 0.0390 seconds
 
hbase(main):011:0> deleteall 'test', 'row3'
0 row(s) in 0.0160 seconds
 
hbase(main):012:0> scan 'test'
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value1
1 row(s) in 0.0240 seconds
 
hbase(main):013:0> scan 'test', {RAW => true, VERSIONS => 10}
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value1
 row2                              column=cf:b, timestamp=1512274276116, type=DeleteColumn #tomestone
 row2                              column=cf:b, timestamp=1512273697101, value=value4
 row2                              column=cf:b, timestamp=1512273580400, value=value2
 row3                              column=cf:, timestamp=1512275018966, type=DeleteFamily  #tomestone
 row3                              column=cf:a, timestamp=1512274498487, value=value5
 row3                              column=cf:b, timestamp=1512274997889, type=DeleteColumn #tomestone
 row3                              column=cf:b, timestamp=1512274928084, value=value6
 row3                              column=cf:c, timestamp=1512141557557, value=value3
3 row(s) in 0.0600 seconds
```

<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> delete specific version, a delete cell suppresses older versions

```shell
hbase(main):099:0> scan 't1', {VERSIONS => 5}
ROW                                COLUMN+CELL
 row1                              column=cf1:a, timestamp=1512291971850, value=value3
 row1                              column=cf1:a, timestamp=1512291964281, value=value2
 row1                              column=cf1:a, timestamp=1512291956083, value=value1
 row1                              column=cf1:b, timestamp=1512291983423, value=value5
 row1                              column=cf1:b, timestamp=1512291978487, value=value4
 row2                              column=cf1:a, timestamp=1512291988538, value=value6
 row2                              column=cf1:b, timestamp=1512292000026, value=value8
 row2                              column=cf1:b, timestamp=1512291994105, value=value7
2 row(s) in 0.0290 seconds
 
hbase(main):100:0> delete 't1', 'row1', 'cf1:a', 1512291964281
0 row(s) in 0.0190 seconds
 
hbase(main):101:0> scan 't1', {VERSIONS => 5}
ROW                                COLUMN+CELL
 row1                              column=cf1:a, timestamp=1512291971850, value=value3
 row1                              column=cf1:b, timestamp=1512291983423, value=value5
 row1                              column=cf1:b, timestamp=1512291978487, value=value4
 row2                              column=cf1:a, timestamp=1512291988538, value=value6
 row2                              column=cf1:b, timestamp=1512292000026, value=value8
 row2                              column=cf1:b, timestamp=1512291994105, value=value7
2 row(s) in 0.0280 seconds
 
hbase(main):102:0> scan 't1', {RAW=>true, VERSIONS => 5}
ROW                                COLUMN+CELL
 row1                              column=cf1:a, timestamp=1512291971850, value=value3
 row1                              column=cf1:a, timestamp=1512291964281, type=DeleteColumn
 row1                              column=cf1:a, timestamp=1512291964281, value=value2
 row1                              column=cf1:a, timestamp=1512291956083, value=value1
 row1                              column=cf1:b, timestamp=1512291983423, value=value5
 row1                              column=cf1:b, timestamp=1512291978487, value=value4
 row2                              column=cf1:a, timestamp=1512291988538, value=value6
 row2                              column=cf1:b, timestamp=1512292000026, value=value8
 row2                              column=cf1:b, timestamp=1512291994105, value=value7
2 row(s) in 0.0330 seconds
```

<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> put with version number, version ordering, put with same version number to overwrite value

```shell
hbase(main):013:0> scan 'test', {RAW => true, VERSIONS => 10}
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value1
...
 
hbase(main):015:0> put 'test', 'row1', 'cf:a', 'value7', 1512141543717  #put an earlier version
0 row(s) in 0.0230 seconds
 
hbase(main):016:0> scan 'test'   #only the largest version is returned (may not be the latest one written). 
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value1
1 row(s) in 0.0230 seconds
 
hbase(main):017:0> scan 'test', {RAW => true, VERSIONS => 10}
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value1
 row1                              column=cf:a, timestamp=1512141543717, value=value7
...
3 row(s) in 0.0760 seconds
 
hbase(main):019:0> put 'test', 'row1', 'cf:a', 'value8', 1512141543817 #put with a same version number as the latest version
0 row(s) in 0.0270 seconds
 
hbase(main):020:0> get 'test', 'row1'  #the latest version cell value is alerted 
COLUMN                             CELL
 cf:a                              timestamp=1512141543817, value=value8
1 row(s) in 0.0110 seconds
 
hbase(main):021:0> scan 'test', {RAW => true, VERSIONS => 10}
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512141543817, value=value8
 row1                              column=cf:a, timestamp=1512141543717, value=value7
 row2                              column=cf:b, timestamp=1512274276116, type=DeleteColumn
 row3                              column=cf:, timestamp=1512275018966, type=DeleteFamily
 row3                              column=cf:b, timestamp=1512274997889, type=DeleteColumn
 row3                              column=cf:c, timestamp=1512141557557, value=value3
3 row(s) in 0.0350 seconds
```

<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> scan / get last N versions, get version range

```shell
hbase(main):070:0> scan 'test', {VERSIONS => 10} #scan last 10 valid logical versions (not RAW)
ROW                                COLUMN+CELL
 row1                              column=cf:a, timestamp=1512286412401, value=value15
 row1                              column=cf:a, timestamp=1512286410688, value=value14
 row1                              column=cf:a, timestamp=1512286408587, value=value13
 row1                              column=cf:a, timestamp=1512286406988, value=value12
 row1                              column=cf:a, timestamp=1512286405292, value=value11
1 row(s) in 0.0400 seconds
 
#get a specific timestamp version
hbase(main):060:0> get 'test', 'row1', {COLUMN => 'cf:a', TIMESTAMP => 1512286412401}
COLUMN                             CELL
 cf:a                              timestamp=1512286412401, value=value15
1 row(s) in 0.0100 seconds
 
#get the latest 10 versions from 1512286406988(inclusive) to 1512286410688(exclusive)
hbase(main):071:0> get 'test', 'row1', {COLUMN => 'cf:a', TIMERANGE => [1512286406988,1512286410688], VERSIONS => 10}
COLUMN                             CELL
 cf:a                              timestamp=1512286408587, value=value13
 cf:a                              timestamp=1512286406988, value=value12
1 row(s) in 0.0200 seconds
 
#get the latest 3 versions
hbase(main):067:0> get 'test', 'row1', {COLUMN => 'cf:a', VERSIONS => 3}
COLUMN                             CELL
 cf:a                              timestamp=1512286412401, value=value15
 cf:a                              timestamp=1512286410688, value=value14
 cf:a                              timestamp=1512286408587, value=value13
1 row(s) in 0.0130 seconds
 
#same effect as above
hbase(main):072:0> get 'test', 'row1', {COLUMN => 'cf:a', TIMERANGE => [1512286405292,9999999999999], VERSIONS => 3}
COLUMN                             CELL
 cf:a                              timestamp=1512286412401, value=value15
 cf:a                              timestamp=1512286410688, value=value14
 cf:a                              timestamp=1512286408587, value=value13
1 row(s) in 0.0120 seconds
 
#get the latest 3 versions prior to 1512286410688(exclusive)
hbase(main):073:0> get 'test', 'row1', {COLUMN => 'cf:a', TIMERANGE => [0,1512286410688], VERSIONS => 3}
COLUMN                             CELL
 cf:a                              timestamp=1512286408587, value=value13
 cf:a                              timestamp=1512286406988, value=value12
 cf:a                              timestamp=1512286405292, value=value11
1 row(s) in 0.0290 seconds
```

>Note: in HBase API, 
> *	to return more than one version, see Get.setMaxVersions()
> * to return versions other than the latest, see Get.setTimeRange()

<i class="fa fa-keyboard-o fa-2x" aria-hidden="true"></i> Scan with filter, rowkey filter, value filter

```shell
#create table
create 'test1', 'lf', 'sf'
lf: column family of LONG values (binary value)
-- sf: column family of STRING values
 
#import data
put 'test1', 'user1|ts1', 'sf:c1', 'sku1'
put 'test1', 'user1|ts2', 'sf:c1', 'sku188'
put 'test1', 'user1|ts3', 'sf:s1', 'sku123'

put 'test1', 'user2|ts4', 'sf:c1', 'sku2'
put 'test1', 'user2|ts5', 'sf:c2', 'sku288'
put 'test1', 'user2|ts6', 'sf:s1', 'sku222'

# rowkey: a user (userX), and when (tsX) 
# column name: Operation for a specific product (value：skuXXX), 
#   e.g c1: click from homepage; c2: click from ad; s1: search from homepage; b1: buy

#Query examples

# whose value = sku188
scan 'test1', FILTER=>"ValueFilter(=,'binary:sku188')"
ROW                          COLUMN+CELL                    
 user1|ts2                   column=sf:c1, timestamp=1409122354918, value=sku188
 
# whose value contains 88
scan 'test1', FILTER=>"ValueFilter(=,'substring:88')"
ROW                          COLUMN+CELL    
 user1|ts2                   column=sf:c1, timestamp=1409122354918, value=sku188
 user2|ts5                   column=sf:c2, timestamp=1409122355030, value=sku288
  
 
#user who click in via advertisement (column = c2), and the value contains 88
scan 'test1', FILTER=>"ColumnPrefixFilter('c2') AND ValueFilter(=,'substring:88')"
ROW                          COLUMN+CELL
 user2|ts5                   column=sf:c2, timestamp=1409122355030, value=sku288

# user who click in via search engine, (column = s), the value contains 123 or 222
scan 'test1', FILTER=>"ColumnPrefixFilter('s') AND ( ValueFilter(=,'substring:123') OR ValueFilter(=,'substring:222') )"
ROW                          COLUMN+CELL
 user1|ts3                   column=sf:s1, timestamp=1409122354954, value=sku123
 user2|ts6                   column=sf:s1, timestamp=1409122355970, value=sku222
 
# rowkey begins with user1
scan 'test1', FILTER => "PrefixFilter ('user1')"
ROW                          COLUMN+CELL
 user1|ts1                   column=sf:c1, timestamp=1409122354868, value=sku1
 user1|ts2                   column=sf:c1, timestamp=1409122354918, value=sku188
 user1|ts3                   column=sf:s1, timestamp=1409122354954, value=sku123
 
#FirstKeyOnlyFilter: one rowkey may have multiple versions, get a value from a key with first column and first version.
#KeyOnlyFilter: only retrieve the key, don't retrieve the value
scan 'test1', FILTER=>"FirstKeyOnlyFilter() AND ValueFilter(=,'binary:sku188') AND KeyOnlyFilter()"
ROW                          COLUMN+CELL
 user1|ts2                   column=sf:c1, timestamp=1409122354918, value=
 
# start from rowkey user1|ts2 and on, find all rowkeys begin with user1
scan 'test1', {STARTROW=>'user1|ts2', FILTER => "PrefixFilter ('user1')"}
ROW                          COLUMN+CELL
 user1|ts2                   column=sf:c1, timestamp=1409122354918, value=sku188
 user1|ts3                   column=sf:s1, timestamp=1409122354954, value=sku123 
 
# start from rowkey user1|ts2, get all rowkeys begin with user2
scan 'test1', {STARTROW=>'user1|ts2', STOPROW=>'user2'}
ROW                          COLUMN+CELL
 user1|ts2                   column=sf:c1, timestamp=1409122354918, value=sku188
 user1|ts3                   column=sf:s1, timestamp=1409122354954, value=sku123

# retrieve all rowkeys who contains ts3
import org.apache.hadoop.hbase.filter.CompareFilter
import org.apache.hadoop.hbase.filter.SubstringComparator
import org.apache.hadoop.hbase.filter.RowFilter
scan 'test1', {FILTER => RowFilter.new(CompareFilter::CompareOp.valueOf('EQUAL'), SubstringComparator.new('ts3'))}
ROW                          COLUMN+CELL
 user1|ts3                   column=sf:s1, timestamp=1409122354954, value=sku123 

# retrieve all rowkeys who contains ts
import org.apache.hadoop.hbase.filter.CompareFilter
import org.apache.hadoop.hbase.filter.SubstringComparator
import org.apache.hadoop.hbase.filter.RowFilter
scan 'test1', {FILTER => RowFilter.new(CompareFilter::CompareOp.valueOf('EQUAL'), SubstringComparator.new('ts'))}
ROW                          COLUMN+CELL
 user1|ts1                   column=sf:c1, timestamp=1409122354868, value=sku1
 user1|ts2                   column=sf:c1, timestamp=1409122354918, value=sku188
 user1|ts3                   column=sf:s1, timestamp=1409122354954, value=sku123
 user2|ts4                   column=sf:c1, timestamp=1409122354998, value=sku2
 user2|ts5                   column=sf:c2, timestamp=1409122355030, value=sku288
 user2|ts6                   column=sf:s1, timestamp=1409122355970, value=sku222
 
# add new test data
put 'test1', 'user2|err', 'sf:s1', 'sku999'

#retrieve all rowkeys begin with user, the data inserted above does not match the regexp, hence it's not appear in the scan result
import org.apache.hadoop.hbase.filter.RegexStringComparator
import org.apache.hadoop.hbase.filter.CompareFilter
import org.apache.hadoop.hbase.filter.SubstringComparator
import org.apache.hadoop.hbase.filter.RowFilter
scan 'test1', {FILTER => RowFilter.new(CompareFilter::CompareOp.valueOf('EQUAL'),RegexStringComparator.new('^user\d+\|ts\d+$'))}
ROW                          COLUMN+CELL
 user1|ts1                   column=sf:c1, timestamp=1409122354868, value=sku1
 user1|ts2                   column=sf:c1, timestamp=1409122354918, value=sku188
 user1|ts3                   column=sf:s1, timestamp=1409122354954, value=sku123
 user2|ts4                   column=sf:c1, timestamp=1409122354998, value=sku2
 user2|ts5                   column=sf:c2, timestamp=1409122355030, value=sku288
 user2|ts6                   column=sf:s1, timestamp=1409122355970, value=sku222

# add another test data
put 'test1', 'user1|ts9', 'sf:b1', 'sku1'

# retrieve the columns begins with b1, and te value contains sku1
scan 'test1', FILTER=>"ColumnPrefixFilter('b1') AND ValueFilter(=,'binary:sku1')"
ROW                          COLUMN+CELL                                                                       
 user1|ts9                   column=sf:b1, timestamp=1409124908668, value=sku1

# the usage of SingleColumnValueFilter，retrieve the columns begins with b1, and te value contains sku1
import org.apache.hadoop.hbase.filter.CompareFilter
import org.apache.hadoop.hbase.filter.SingleColumnValueFilter
import org.apache.hadoop.hbase.filter.SubstringComparator
scan 'test1', {COLUMNS => 'sf:b1', FILTER => SingleColumnValueFilter.new(Bytes.toBytes('sf'), Bytes.toBytes('b1'), CompareFilter::CompareOp.valueOf('EQUAL'), Bytes.toBytes('sku1'))}
ROW                          COLUMN+CELL
 user1|ts9                   column=sf:b1, timestamp=1409124908668, value=sku1

# The usage of hbase zkcli 
hbase zkcli
ls /
[hbase, zookeeper]
 
[zk: hadoop000:2181(CONNECTED) 1] ls /hbase
[meta-region-server, backup-masters, table, draining, region-in-transition, running, table-lock, master, namespace, hbaseid, online-snapshot, replication, splitWAL, recovering-regions, rs]
 
[zk: hadoop000:2181(CONNECTED) 2] ls /hbase/table
[member, test1, hbase:meta, hbase:namespace]
 
[zk: hadoop000:2181(CONNECTED) 3] ls /hbase/table/test1
[]
 
[zk: hadoop000:2181(CONNECTED) 4] get /hbase/table/test1
?master:60000}l$??lPBUF
cZxid = 0x107
ctime = Wed Aug 27 14:52:21 HKT 2014
mZxid = 0x10b
mtime = Wed Aug 27 14:52:22 HKT 2014
pZxid = 0x107
cversion = 0
dataVersion = 2
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 31
numChildren = 0
```


