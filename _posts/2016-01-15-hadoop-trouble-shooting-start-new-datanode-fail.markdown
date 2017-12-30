---
layout: post
title: "Hadoop: Trouble Shooting: Fail to start a new DataNode"
date: 2016-01-15 22:19:00 +08:00
categories: BigData IT
tags: Hadoop HDFS cluster
---

* content
{:toc}

		
### Symptom  
After added another node (the VM is copied from existing VM) into existing Cluster, when start DataNode, prompts the following error.  

```shell
#local-ubuntu-vm3 (slave-b) is added to original cluster local-ubuntu-vm(master) and local-ubuntu-vm2(slave-a)
hduser@local-ubuntu-vm3:/usr/local/hadoop/etc/hadoop$ cat /usr/local/hadoop-2.7.1/logs/hadoop-hduser-datanode-local-ubuntu-vm3.log
 
2015-12-02 12:03:12,454 INFO org.apache.hadoop.hdfs.server.datanode.DataNode: Unsuccessfully sent block report 0xd3ba9bd632c09a30,  containing 1 storage report(s), of which we sent 0. The reports had 26 total blocks and used 0 RPC(s). This took 0 msec to generate and 13 msecs for RPC and NN processing. Got back no commands.
2015-12-02 12:03:12,455 WARN org.apache.hadoop.hdfs.server.datanode.DataNode: Block pool BP-435890327-192.168.2.140-1512032866281 (Datanode Uuid 0f7d336a-5f4e-4fc4-9cd1-f3974f67f4d2) service to master/192.168.2.140:9000 is shutting down
org.apache.hadoop.ipc.RemoteException(org.apache.hadoop.hdfs.protocol.UnregisteredNodeException): Data node DatanodeRegistration(192.168.2.163:50010, datanodeUuid=0f7d336a-5f4e-4fc4-9cd1-f3974f67f4d2, infoPort=50075, infoSecurePort=0, ipcPort=50020, storageInfo=lv=-57;cid=CID-257d9fab-86ba-44f6-b582-f47f6b30c536;nsid=1505358991;c=1512032866281) is attempting to report storage ID 0f7d336a-5f4e-4fc4-9cd1-f3974f67f4d2. Node 192.168.2.140:50010 is expected to serve this storage.
        at org.apache.hadoop.hdfs.server.blockmanagement.DatanodeManager.getDatanode(DatanodeManager.java:575)
        at org.apache.hadoop.hdfs.server.blockmanagement.BlockManager.processReport(BlockManager.java:2125)
        at org.apache.hadoop.hdfs.server.namenode.NameNodeRpcServer$1.call(NameNodeRpcServer.java:1461)
        at org.apache.hadoop.hdfs.server.namenode.NameNodeRpcServer$1.call(NameNodeRpcServer.java:1458)
        at java.util.concurrent.FutureTask.run(FutureTask.java:266)
        at org.apache.hadoop.hdfs.server.blockmanagement.BlockManager$BlockReportProcessingThread.processQueue(BlockManager.java:4169)
        at org.apache.hadoop.hdfs.server.blockmanagement.BlockManager$BlockReportProcessingThread.run(BlockManager.java:4148)
 
        at org.apache.hadoop.ipc.Client.getRpcResponse(Client.java:1493)
        at org.apache.hadoop.ipc.Client.call(Client.java:1439)
        at org.apache.hadoop.ipc.Client.call(Client.java:1349)
        at org.apache.hadoop.ipc.ProtobufRpcEngine$Invoker.invoke(ProtobufRpcEngine.java:227)
        at org.apache.hadoop.ipc.ProtobufRpcEngine$Invoker.invoke(ProtobufRpcEngine.java:116)
        at com.sun.proxy.$Proxy15.blockReport(Unknown Source)
        at org.apache.hadoop.hdfs.protocolPB.DatanodeProtocolClientSideTranslatorPB.blockReport(DatanodeProtocolClientSideTranslatorPB.java:215)
        at org.apache.hadoop.hdfs.server.datanode.BPServiceActor.blockReport(BPServiceActor.java:388)
        at org.apache.hadoop.hdfs.server.datanode.BPServiceActor.offerService(BPServiceActor.java:697)
        at org.apache.hadoop.hdfs.server.datanode.BPServiceActor.run(BPServiceActor.java:841)
        at java.lang.Thread.run(Thread.java:748)
2015-12-02 12:03:12,456 WARN org.apache.hadoop.hdfs.server.datanode.DataNode: Ending block pool service for: Block pool BP-435890327-192.168.2.140-1512032866281 (Datanode Uuid 0f7d336a-5f4e-4fc4-9cd1-f3974f67f4d2) service to master/192.168.2.140:9000
2015-12-02 12:03:12,457 INFO org.apache.hadoop.hdfs.server.datanode.DataNode: Removed Block pool BP-435890327-192.168.2.140-1512032866281 (Datanode Uuid 0f7d336a-5f4e-4fc4-9cd1-f3974f67f4d2)
2015-12-02 12:03:12,457 INFO org.apache.hadoop.hdfs.server.datanode.fsdataset.impl.FsDatasetImpl: Removing block pool BP-435890327-192.168.2.140-1512032866281
2015-12-02 12:03:12,458 WARN org.apache.hadoop.fs.CachingGetSpaceUsed: Thread Interrupted waiting to refresh disk information: sleep interrupted
2015-12-02 12:03:14,463 WARN org.apache.hadoop.hdfs.server.datanode.DataNode: Exiting Datanode
2015-12-02 12:03:14,477 INFO org.apache.hadoop.hdfs.server.datanode.DataNode: SHUTDOWN_MSG:
/************************************************************
SHUTDOWN_MSG: Shutting down DataNode at slave-b/192.168.2.163
************************************************************/
```

### Resolution

Clearn up the {hadoop.tmp.dir} on the new node.   
Restart HDFS.

