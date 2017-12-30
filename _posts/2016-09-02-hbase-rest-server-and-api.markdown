---
layout: post
title: "HBase REST Server and REST API Examples"
date: 2016-09-02 17:11:00 +08:00
categories: BigData IT
tags: HBase RESTful
---

* content
{:toc}

# Overview
* REST - Representational State Transfer, introduced in 2000 in the doctoral dissertation of Roy Fielding, one of the principal authors of the HTTP specification.
* In general, REST allows client-server interactions via an API that is tied to the URL itself. 
* There is a REST server included with HBase, which exposes HBase tables, rows, cells, and metadata as URL specified resources.





# Using REST Endpoints
* With placeholder server (e.g. http://example.com:8000), you can request plain text (the default), XML , or JSON 
    - Plain test  - no header for plain text
    - XML -  header "Accept: text/xml" 
    - JSON - "Accept: application/json"
    - Protocol buffers - "Accept: application/x-protobuf"
* Request Methods (HTTP Verb) 
    - GET - requests for queries, 
    - PUT or POST - requests for creation or mutation, 
    - DELETE - deletion.
* The following endpoints are supported by HBase REST server
    - Cluster-Wide Endpoints
    - Namespace Endpoints
    - Table Endpoints
    - Endpoints for Get Operations
    - Endpoints for Scan Operations
    - Endpoints for Put Operations


# Examples

e.g. start HBase REST service

```shell
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ bin/hbase-daemon.sh start rest
starting rest, logging to /usr/local/hbase/logs/hbase-hbaseusr-rest-local-ubuntu-vm.out
 
#check the log, process, and listening ports
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ cat /usr/local/hbase/logs/hbase-hbaseusr-rest-local-ubuntu-vm.log
...
2017-12-04 22:59:20,223 INFO  [main] http.HttpServer: Jetty bound to port 8085
2017-12-04 22:59:20,223 INFO  [main] mortbay.log: jetty-6.1.26
2017-12-04 22:59:20,733 INFO  [main] mortbay.log: Started SelectChannelConnector@0.0.0.0:8085
2017-12-04 22:59:20,739 INFO  [main] mortbay.log: jetty-6.1.26
2017-12-04 22:59:20,742 INFO  [main] mortbay.log: Started SelectChannelConnector@0.0.0.0:8080

hbaseusr@local-ubuntu-vm:/usr/local/hbase$ jps
...
42635 RESTServer
hbaseusr@local-ubuntu-vm:/usr/local/hbase$ netstat -plte | grep 42635
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
tcp        0      0 *:http-alt (8080)       *:*                     LISTEN      hbaseusr   744594      42635/java
tcp        0      0 *:8085                  *:*                     LISTEN      hbaseusr   744587      42635/java 
```

## Cluster-Wide Endpoints

|Endpoint|HTTP Verb|Description|
|--------|---------|-----------|
|/version/cluster|GET|Version of HBase running on this cluster|
|/status/cluster|GET|Cluster status|
|/|GET|List of all non-system tables|


e.g. get the Version of HBase running on this cluster, in XML or JSON format

```shell
hbaseusr@local-ubuntu-vm3:~$ curl -vi -X GET -H "Accept: text/xml" "http://local.ubuntu.vm:8080/version/cluster"
Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying 192.168.2.140...
* Connected to local.ubuntu.vm (192.168.2.140) port 8080 (#0)
> GET /version/cluster HTTP/1.1
> Host: local.ubuntu.vm:8080
> User-Agent: curl/7.47.0
> Accept: text/xml
>
< HTTP/1.1 200 OK
HTTP/1.1 200 OK
< Cache-Control: no-cache
Cache-Control: no-cache
< Content-Type: text/xml
Content-Type: text/xml
< Content-Length: 93
Content-Length: 93
<
* Connection #0 to host local.ubuntu.vm left intact
<?xml version="1.0" encoding="UTF-8" standalone="yes"?><ClusterVersion>1.3.1</ClusterVersion> 

hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: text/xml" "http://local.ubuntu.vm:8080/version/cluster"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?><ClusterVersion>1.3.1</ClusterVersion>

hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/version/cluster"
"1.3.1"

hbaseusr@local-ubuntu-vm3:~$ curl -vi -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/version/cluster"
Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying 192.168.2.140...
* Connected to local.ubuntu.vm (192.168.2.140) port 8080 (#0)
> GET /version/cluster HTTP/1.1
> Host: local.ubuntu.vm:8080
> User-Agent: curl/7.47.0
> Accept: application/json
>
< HTTP/1.1 200 OK
HTTP/1.1 200 OK
< Cache-Control: no-cache
Cache-Control: no-cache
< Content-Type: application/json
Content-Type: application/json
< Transfer-Encoding: chunked
Transfer-Encoding: chunked
<
* Connection #0 to host local.ubuntu.vm left intact
"1.3.1"
```


e.g. get cluster status

```json
#the original JSON result is not pretty formatted.
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/status/cluster"
 {
        "regions": 6,
        "requests": 0,
        "averageLoad": 3.0,
        "LiveNodes": [{
                "name": "slave-b:16020",
                "startCode": 1512203725848,
                "requests": 0,
                "heapSizeMB": 42,
                "maxHeapSizeMB": 353,
                "Region": [{
                        "name": "Zm9sbG93ZXIsLDE1MTIzNTYwNzQ2NjguNDk4YTU5N2QxYTk2MjJmNzhjZTdhMzI4ODA4NjM2ZDEu",
                        "stores": 1,
                        "storefiles": 1,
                        "storefileSizeMB": 0,
                        "memstoreSizeMB": 0,
                        "storefileIndexSizeMB": 0,
                        "readRequestsCount": 22,
                        "writeRequestsCount": 6,
                        "rootIndexSizeKB": 0,
                        "totalStaticIndexSizeKB": 0,
                        "totalStaticBloomSizeKB": 0,
                        "totalCompactingKVs": 0,
                        "currentCompactedKVs": 0
                },
                {
                        "name": "aGJhc2U6bWV0YSwsMQ==",
                        "stores": 1,
                        "storefiles": 1,
                        "storefileSizeMB": 0,
                        "memstoreSizeMB": 0,
                        "storefileIndexSizeMB": 0,
                        "readRequestsCount": 2369,
                        "writeRequestsCount": 21,
                        "rootIndexSizeKB": 0,
                        "totalStaticIndexSizeKB": 0,
                        "totalStaticBloomSizeKB": 0,
                        "totalCompactingKVs": 65,
                        "currentCompactedKVs": 65
                },
                {
                        "name": "aGJhc2U6bmFtZXNwYWNlLCwxNTEyMTQwOTg2OTgwLjA5MzY5N2M2OWQ5NzdjNjFiZTQ3ZjlhMTA3NzY3Y2ExLg==",
                        "stores": 1,
                        "storefiles": 1,
                        "storefileSizeMB": 0,
                        "memstoreSizeMB": 0,
                        "storefileIndexSizeMB": 0,
                        "readRequestsCount": 13,
                        "writeRequestsCount": 5,
                        "rootIndexSizeKB": 0,
                        "totalStaticIndexSizeKB": 0,
                        "totalStaticBloomSizeKB": 0,
                        "totalCompactingKVs": 3,
                        "currentCompactedKVs": 3
                },
                {
                        "name": "bXlfbnM6bXlfdGFibGUsLDE1MTIyNzE1MTU1MjguZjE5MTRiMTAxNjc4ZjIyOTUyYTVmNTUzZTc0MDk2ZGIu",
                        "stores": 1,
                        "storefiles": 0,
                        "storefileSizeMB": 0,
                        "memstoreSizeMB": 0,
                        "storefileIndexSizeMB": 0,
                        "readRequestsCount": 0,
                        "writeRequestsCount": 0,
                        "rootIndexSizeKB": 0,
                        "totalStaticIndexSizeKB": 0,
                        "totalStaticBloomSizeKB": 0,
                        "totalCompactingKVs": 0,
                        "currentCompactedKVs": 0
                }]
        },
        {
                "name": "slave-a:16020",
                "startCode": 1512203728789,
                "requests": 0,
                "heapSizeMB": 15,
                "maxHeapSizeMB": 427,
                "Region": [{
                        "name": "dDEsLDE1MTIyOTE5MjQxMTYuMGJmZjM4MTdmMWI4YjFjMjY4MmU2ZjIxNTBiNTIwZDgu",
                        "stores": 2,
                        "storefiles": 2,
                        "storefileSizeMB": 0,
                        "memstoreSizeMB": 0,
                        "storefileIndexSizeMB": 0,
                        "readRequestsCount": 20,
                        "writeRequestsCount": 16,
                        "rootIndexSizeKB": 0,
                        "totalStaticIndexSizeKB": 0,
                        "totalStaticBloomSizeKB": 0,
                        "totalCompactingKVs": 0,
                        "currentCompactedKVs": 0
                },
                {
                        "name": "dGVzdCwsMTUxMjE0MTUyNzUwOC43MmEwODZlZWM2OGY1NDJkZTZlY2IyZTBkMjE3NTEyYS4=",
                        "stores": 1,
                        "storefiles": 2,
                        "storefileSizeMB": 0,
                        "memstoreSizeMB": 0,
                        "storefileIndexSizeMB": 0,
                        "readRequestsCount": 19,
                        "writeRequestsCount": 0,
                        "rootIndexSizeKB": 0,
                        "totalStaticIndexSizeKB": 0,
                        "totalStaticBloomSizeKB": 0,
                        "totalCompactingKVs": 0,
                        "currentCompactedKVs": 0
                }]
        }],
        "DeadNodes": []
}
```

e.g. List of all non-system tables

```shell
aseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/"
{"table":[{"name":"follower"},{"name":"my_ns:my_table"},{"name":"t1"},{"name":"test"}]}
```

## Namespace Endpoints

|Endpoint|HTTP Verb|Description|
|--------|---------|-----------|
|/namespaces                  |GET   |List all namespaces                              |
|/namespaces/namespace          |GET   |Describe a specific namespace                      |
|/namespaces/namespace          |POST  |Create a new namespace                          |
|/namespaces/namespace/tables |GET   |List all tables in a specific namespace          |
|/namespaces/namespace        |PUT   |Alter an existing namespace. Currently not used.|    
|/namespaces/namespace        |DELETE|Delete a namespace. The namespace must be empty.|

e.g. Create a new namespace, list all namespaces, delete namespace, alter namespace

```shell
hbaseusr@local-ubuntu-vm3:~$ curl -X PUT -H "Accept: application/json" "http://local.ubuntu.vm:8080/namespaces/special_ns"
Namespace 'special_ns' does not exist. Use REST POST to create the namespace.

hbaseusr@local-ubuntu-vm3:~$ curl -X POST -H "Accept: application/json" "http://local.ubuntu.vm:8080/namespaces/special_ns"

hbase(main):001:0> list_namespace
list_namespace          list_namespace_tables
hbase(main):001:0> list_namespace
NAMESPACE
default
hbase
my_ns
special_ns
4 row(s) in 0.5580 seconds

hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/namespaces/"
{"Namespace":["default","hbase","my_ns","special_ns"]}

hbaseusr@local-ubuntu-vm3:~$ curl -X DELETE -H "Accept: application/json" "http://local.ubuntu.vm:8080/namespaces/special_ns"

hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/namespaces/"
{"Namespace":["default","hbase","my_ns"]}
```

## Table Endpoints

|Endpoint|HTTP Verb|Description|
|--------|---------|-----------|    
|/table/schema  |GET    |Describe the schema of the specified table.                                  |
|/table/schema  |POST   |Create a new table, or replace an existing table’s schema                    |
|/table/schema  |PUT    |Update an existing table with the provided schema fragment                   |
|/table/schema  |DELETE |Delete the table. You must use the /table/schema endpoint, not just /table/. |   
|/table/regions |GET    |List the table regions                                                       |


e.g. Describe the schema of the specified table.

```shell
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/follower/schema"
{
        "name": "follower",
        "ColumnSchema": [{
                "name": "f",
                "BLOOMFILTER": "ROW",
                "VERSIONS": "1",
                "IN_MEMORY": "false",
                "KEEP_DELETED_CELLS": "FALSE",
                "DATA_BLOCK_ENCODING": "NONE",
                "TTL": "2147483647",
                "COMPRESSION": "NONE",
                "MIN_VERSIONS": "0",
                "BLOCKCACHE": "true",
                "BLOCKSIZE": "65536",
                "REPLICATION_SCOPE": "0"
        }],
        "IS_META": "false"
}
```

e.g. Create a new table

```shell
hbaseusr@local-ubuntu-vm3:~$ curl -X POST -H "Accept: text/xml" -H "Content-Type: text/xml" -d '<?xml version="1.0" encoding="UTF-8"?><TableSchema name="users"><ColumnSchema name="cf" /></TableSchema>' "http://local.ubuntu.vm:8080/users/schema"

#list the existing tables
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080"
{"table":[{"name":"follower"},{"name":"my_ns:my_table"},{"name":"t1"},{"name":"test"},{"name":"users"}]}
```

e.g. Update an existing table with the provided schema fragment

```shell
#check before update
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/users/schema"
{"name":"users","ColumnSchema":[{"name":"cf","BLOOMFILTER":"ROW","VERSIONS":"1","IN_MEMORY":"false","KEEP_DELETED_CELLS":"FALSE","DATA_BLOCK_ENCODING":"NONE","TTL":"2147483647","COMPRESSION":"NONE","MIN_VERSIONS":"0","BLOCKCACHE":"true","BLOCKSIZE":"65536","REPLICATION_SCOPE":"0"}],"IS_META":"false"} 
 
#update
hbaseusr@local-ubuntu-vm3:~$ curl -X PUT -H "Accept: text/xml" -H "Content-Type: text/xml" -d '<?xml version="1.0" encoding="UTF-8"?><TableSchema name="users"><ColumnSchema name="cf" KEEP_DELETED_CELLS="true" /></TableSchema>' "http://local.ubuntu.vm:8080/users/schema"
 
#check after update
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/users/schema"                                                     {"name":"users","ColumnSchema":[{"name":"cf","BLOOMFILTER":"ROW","VERSIONS":"1","IN_MEMORY":"false","KEEP_DELETED_CELLS":"true","DATA_BLOCK_ENCODING":"NONE","TTL":"2147483647","COMPRESSION":"NONE","MIN_VERSIONS":"0","BLOCKCACHE":"true","BLOCKSIZE":"65536","REPLICATION_SCOPE":"0"}],"IS_META":"false"}
```

e.g. Delete the table (seems don't need to disable table first, not like shell command).

```shell
#list the existing tables before delete
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080"
{"table":[{"name":"follower"},{"name":"my_ns:my_table"},{"name":"t1"},{"name":"test"},{"name":"users"}]}
#delete
hbaseusr@local-ubuntu-vm3:~$ curl -X DELETE -H "Accept: application/json" "http://local.ubuntu.vm:8080/users/schema"

#list the existing tables after delete
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080"
{"table":[{"name":"follower"},{"name":"my_ns:my_table"},{"name":"t1"},{"name":"test"}]}
```

e.g. list the table regions

```shell
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/follower/regions"
{"name":"follower","Region":[{"id":1512356074668,"startKey":"","endKey":"","location":"slave-b:16020","name":"follower,,1512356074668.498a597d1a9622f78ce7a328808636d1."}]}
```

## Endpoints for Get Operations

|Endpoint|HTTP Verb|Description|
|--------|---------|-----------|
|/table/row|GET|Get all columns of a single row. Values are Base-64 encoded. This requires the "Accept" request header with a type that can hold multiple columns (like xml, json or protobuf).|
|/table/row/column:qualifier/timestamp|GET|Get the value of a single column. Values are Base-64 encoded. (Seems this get a value which version is the latest be less than timestamp)|
|/table/row/column:qualifier|GET|Get the value of a single column. Values are Base-64 encoded.|
|/table/row/column:qualifier/?v=number_of_versions|GET|Multi-Get a specified number of versions of a given cell. Values are Base-64 encoded.|


e.g. get a row, a cell, with or without timestamp, number of versions (note that the values are base64 encoded)

```shell
hbase(main):016:0> scan 'test', {VERSIONS => 10}
ROW                               COLUMN+CELL
 row1                             column=cf:a, timestamp=1512286412401, value=value15
 row1                             column=cf:a, timestamp=1512286410688, value=value14
 row1                             column=cf:a, timestamp=1512286408587, value=value13
 row1                             column=cf:a, timestamp=1512286406988, value=value12
 row1                             column=cf:a, timestamp=1512286405292, value=value11
 row2                             column=cf:a, timestamp=1512439589892, value=value16
 row2                             column=cf:b, timestamp=1512439602162, value=value17
 row2                             column=cf:c, timestamp=1512439607376, value=value18
 row3                             column=cf:a, timestamp=1512439615019, value=value19
 row3                             column=cf:c, timestamp=1512442881867, value=value22
 row3                             column=cf:c, timestamp=1512442878963, value=value21
 row3                             column=cf:c, timestamp=1512439620633, value=value20
3 row(s) in 0.0920 seconds
 
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/row2"
{
        "Row": [{
                "key": "cm93Mg==",
                "Cell": [{
                        "column": "Y2Y6YQ==",
                        "timestamp": 1512439589892,
                        "$": "dmFsdWUxNg=="
                },
                {
                        "column": "Y2Y6Yg==",
                        "timestamp": 1512439602162,
                        "$": "dmFsdWUxNw=="
                },
                {
                        "column": "Y2Y6Yw==",
                        "timestamp": 1512439607376,
                        "$": "dmFsdWUxOA=="
                }]
        }]
}

hbaseusr@local-ubuntu-vm3:~$ echo cm93Mg== | base64 -d
row2
hbaseusr@local-ubuntu-vm3:~$ echo Y2Y6YQ== | base64 -d
cf:a
hbaseusr@local-ubuntu-vm3:~$ echo dmFsdWUxNg== | base64 -d
value16 
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/row3/cf:c"
{
        "Row": [{
                "key": "cm93Mw==",
                "Cell": [{
                        "column": "Y2Y6Yw==",
                        "timestamp": 1512442881867,
                        "$": "dmFsdWUyMg=="
                }]
        }]
}
hbaseusr@local-ubuntu-vm3:~$ echo dmFsdWUyMg== | base64 -d
value22

hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/row3/cf:c/1512442878963"
{"Row":[{"key":"cm93Mw==","Cell":[{"column":"Y2Y6Yw==","timestamp":1512439620633,"$":"dmFsdWUyMA=="}]}]}
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/row3/cf:c/1512442878964"
{"Row":[{"key":"cm93Mw==","Cell":[{"column":"Y2Y6Yw==","timestamp":1512442878963,"$":"dmFsdWUyMQ=="}]}]}

hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/row3/cf:c?v=2"
{
        "Row": [{
                "key": "cm93Mw==",
                "Cell": [{
                        "column": "Y2Y6Yw==",
                        "timestamp": 1512442881867,
                        "$": "dmFsdWUyMg=="
                },
                {
                        "column": "Y2Y6Yw==",
                        "timestamp": 1512442878963,
                        "$": "dmFsdWUyMQ=="
                }]
        }]
}
```


## Endpoints for Scan Operations

|Endpoint|HTTP Verb|Description|
|--------|---------|-----------|
|/table/scanner/|PUT|Get a Scanner object. Required by all other Scan operations. Adjust the batch parameter to the number of rows the scan should return in a batch. See the next example for adding filters to your scanner. The scanner endpoint URL is returned as the Location in the HTTP response. The other examples in this table assume that the scanner endpoint is http://example.com:8000/users/scanner/145869072824375522207.|
|/table/scanner/|PUT|To supply filters to the Scanner object or configure the Scanner in any other way, you can create a text file and add your filter to the file. For example, to return only rows for which keys start with <codeph>u123</codeph> and use a batch size of 100, the filter file would look like this: [source,xml] ---- &lt;Scanner batch=&quot;100&quot;&gt; &lt;filter&gt; { &quot;type&quot;: &quot;PrefixFilter&quot;, &quot;value&quot;: &quot;u123&quot; } &lt;/filter&gt; &lt;/Scanner&gt; ---- Pass the file to the -d argument of the curl request.|
|/table/scanner/scanner-id|GET|Get the next batch from the scanner. Cell values are byte-encoded. If the scanner has been exhausted, HTTP status 204 is returned.|
|/table/scanner/scanner-id|DELETE|Deletes the scanner and frees the resources it used.|


e.g. get a scanner, supply filter, get the next batch, delete the scanner

```shell
hbase(main):032:0> scan 'test', {VERSIONS => 10}
ROW                               COLUMN+CELL
 anotherRow                       column=cf:c, timestamp=1512443904723, value=value23
 anotherRow                       column=cf:c, timestamp=1512443900145, value=value22
 row1                             column=cf:a, timestamp=1512286412401, value=value15
 row1                             column=cf:a, timestamp=1512286410688, value=value14
 row1                             column=cf:a, timestamp=1512286408587, value=value13
 row1                             column=cf:a, timestamp=1512286406988, value=value12
 row1                             column=cf:a, timestamp=1512286405292, value=value11
 row2                             column=cf:a, timestamp=1512439589892, value=value16
 row2                             column=cf:b, timestamp=1512439602162, value=value17
 row2                             column=cf:c, timestamp=1512439607376, value=value18
 row3                             column=cf:a, timestamp=1512439615019, value=value19
 row3                             column=cf:c, timestamp=1512442881867, value=value22
 row3                             column=cf:c, timestamp=1512442878963, value=value21
 row3                             column=cf:c, timestamp=1512439620633, value=value20
 row4                             column=cf:b, timestamp=1512443948926, value=value24
 row5                             column=cf:a, timestamp=1512444000024, value=value25
 row6                             column=cf:b, timestamp=1512444010245, value=value26
 row7                             column=cf:c, timestamp=1512444017553, value=value27
8 row(s) in 0.0990 seconds

hbaseusr@local-ubuntu-vm3:~$ curl -vi -X PUT -H "Accept: application/json" -H "Content-Type: text/xml" -d '<Scanner batch="5"/>' "http://local.ubuntu.vm:8080/test/scanner/"
*   Trying 192.168.2.140...
* Connected to local.ubuntu.vm (192.168.2.140) port 8080 (#0)
> PUT /test/scanner/ HTTP/1.1
> Host: local.ubuntu.vm:8080
> User-Agent: curl/7.47.0
> Accept: application/json
> Content-Type: text/xml
> Content-Length: 20
>
* upload completely sent off: 20 out of 20 bytes
< HTTP/1.1 201 Created
HTTP/1.1 201 Created
< Location: http://local.ubuntu.vm:8080/test/scanner/15124448792116edd373c
Location: http://local.ubuntu.vm:8080/test/scanner/15124448792116edd373c
< Content-Length: 0
Content-Length: 0
< 
* Connection #0 to host local.ubuntu.vm left intact
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/scanner/15124448792116edd373c"
{"Row":[{"key":"YW5vdGhlclJvdw==","Cell":[{"column":"Y2Y6Yw==","timestamp":1512443904723,"$":"dmFsdWUyMw=="},{"column":"Y2Y6Yw==","timestamp":1512443900145,"$":"dmFsdWUyMg=="}]},{"key":"cm93MQ==","Cell":[{"column":"Y2Y6YQ==","timestamp":1512286412401,"$":"dmFsdWUxNQ=="},{"column":"Y2Y6YQ==","timestamp":1512286410688,"$":"dmFsdWUxNA=="},{"column":"Y2Y6YQ==","timestamp":1512286408587,"$":"dmFsdWUxMw=="}]}]}
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/scanner/15124448792116edd373c"
{"Row":[{"key":"cm93MQ==","Cell":[{"column":"Y2Y6YQ==","timestamp":1512286406988,"$":"dmFsdWUxMg=="},{"column":"Y2Y6YQ==","timestamp":1512286405292,"$":"dmFsdWUxMQ=="}]},{"key":"cm93Mg==","Cell":[{"column":"Y2Y6YQ==","timestamp":1512439589892,"$":"dmFsdWUxNg=="},{"column":"Y2Y6Yg==","timestamp":1512439602162,"$":"dmFsdWUxNw=="},{"column":"Y2Y6Yw==","timestamp":1512439607376,"$":"dmFsdWUxOA=="}]}]}
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/scanner/15124448792116edd373c"
{"Row":[{"key":"cm93Mw==","Cell":[{"column":"Y2Y6YQ==","timestamp":1512439615019,"$":"dmFsdWUxOQ=="},{"column":"Y2Y6Yw==","timestamp":1512442881867,"$":"dmFsdWUyMg=="},{"column":"Y2Y6Yw==","timestamp":1512442878963,"$":"dmFsdWUyMQ=="},{"column":"Y2Y6Yw==","timestamp":1512439620633,"$":"dmFsdWUyMA=="}]},{"key":"cm93NA==","Cell":[{"column":"Y2Y6Yg==","timestamp":1512443948926,"$":"dmFsdWUyNA=="}]}]}
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/scanner/15124448792116edd373c"
{"Row":[{"key":"cm93NQ==","Cell":[{"column":"Y2Y6YQ==","timestamp":1512444000024,"$":"dmFsdWUyNQ=="}]},{"key":"cm93Ng==","Cell":[{"column":"Y2Y6Yg==","timestamp":1512444010245,"$":"dmFsdWUyNg=="}]},{"key":"cm93Nw==","Cell":[{"column":"Y2Y6Yw==","timestamp":1512444017553,"$":"dmFsdWUyNw=="}]}]}
hbaseusr@local-ubuntu-vm3:~$ curl -vi -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/scanner/15124448792116edd373c"
Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying 192.168.2.140...
* Connected to local.ubuntu.vm (192.168.2.140) port 8080 (#0)
> GET /test/scanner/15124448792116edd373c HTTP/1.1
> Host: local.ubuntu.vm:8080
> User-Agent: curl/7.47.0
> Accept: application/json
>
< HTTP/1.1 204 No Content
HTTP/1.1 204 No Content
< Content-Type: application/json
Content-Type: application/json
<
* Connection #0 to host local.ubuntu.vm left intact
 
hbaseusr@local-ubuntu-vm3:~$ curl -vi -X DELETE -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/scanner/15124448792116edd373c"
*   Trying 192.168.2.140...
* Connected to local.ubuntu.vm (192.168.2.140) port 8080 (#0)
> DELETE /test/scanner/15124448792116edd373c HTTP/1.1
> Host: local.ubuntu.vm:8080
> User-Agent: curl/7.47.0
> Accept: application/json
>
< HTTP/1.1 200 OK
HTTP/1.1 200 OK
< Content-Length: 0
Content-Length: 0
<
* Connection #0 to host local.ubuntu.vm left intact 
```

e.g. get a scanner with filter in a file, get the next batch, delete the scanner

```shell
hbase(main):032:0> scan 'test', {VERSIONS => 10}
ROW                               COLUMN+CELL
 anotherRow                       column=cf:c, timestamp=1512443904723, value=value23
 anotherRow                       column=cf:c, timestamp=1512443900145, value=value22
 row1                             column=cf:a, timestamp=1512286412401, value=value15
 row1                             column=cf:a, timestamp=1512286410688, value=value14
 row1                             column=cf:a, timestamp=1512286408587, value=value13
 row1                             column=cf:a, timestamp=1512286406988, value=value12
 row1                             column=cf:a, timestamp=1512286405292, value=value11
 row2                             column=cf:a, timestamp=1512439589892, value=value16
 row2                             column=cf:b, timestamp=1512439602162, value=value17
 row2                             column=cf:c, timestamp=1512439607376, value=value18
 row3                             column=cf:a, timestamp=1512439615019, value=value19
 row3                             column=cf:c, timestamp=1512442881867, value=value22
 row3                             column=cf:c, timestamp=1512442878963, value=value21
 row3                             column=cf:c, timestamp=1512439620633, value=value20
 row4                             column=cf:b, timestamp=1512443948926, value=value24
 row5                             column=cf:a, timestamp=1512444000024, value=value25
 row6                             column=cf:b, timestamp=1512444010245, value=value26
 row7                             column=cf:c, timestamp=1512444017553, value=value27
8 row(s) in 0.0990 seconds


hbaseusr@local-ubuntu-vm3:~$ vi source.xml
 <Scanner batch="10"> <filter> { "type": "PrefixFilter", "value": "row" } </filter> </Scanner>
hbaseusr@local-ubuntu-vm3:~$ curl -vi -X PUT -H "Accept: application/json" -H "Content-Type: text/xml" -d @source.xml "http://local.ubuntu.vm:8080/test/scanner/"
*   Trying 192.168.2.140...
* Connected to local.ubuntu.vm (192.168.2.140) port 8080 (#0)
> PUT /test/scanner/ HTTP/1.1
> Host: local.ubuntu.vm:8080
> User-Agent: curl/7.47.0
> Accept: application/json
> Content-Type: text/xml
> Content-Length: 93
>
* upload completely sent off: 93 out of 93 bytes
< HTTP/1.1 201 Created
HTTP/1.1 201 Created
< Location: http://local.ubuntu.vm:8080/test/scanner/1512445964843186e2a28
Location: http://local.ubuntu.vm:8080/test/scanner/1512445964843186e2a28
< Content-Length: 0
Content-Length: 0
<
* Connection #0 to host local.ubuntu.vm left intact
 
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/scanner/1512445964843186e2a28"
{"Row":[{"key":"YW5vdGhlclJvdw==","Cell":[{"column":"Y2Y6Yw==","timestamp":1512443904723,"$":"dmFsdWUyMw=="},{"column":"Y2Y6Yw==","timestamp":1512443900145,"$":"dmFsdWUyMg=="}]},{"key":"cm93MQ==","Cell":[{"column":"Y2Y6YQ==","timestamp":1512286412401,"$":"dmFsdWUxNQ=="},{"column":"Y2Y6YQ==","timestamp":1512286410688,"$":"dmFsdWUxNA=="},{"column":"Y2Y6YQ==","timestamp":1512286408587,"$":"dmFsdWUxMw=="},{"column":"Y2Y6YQ==","timestamp":1512286406988,"$":"dmFsdWUxMg=="},{"column":"Y2Y6YQ==","timestamp":1512286405292,"$":"dmFsdWUxMQ=="}]},{"key":"cm93Mg==","Cell":[{"column":"Y2Y6YQ==","timestamp":1512439589892,"$":"dmFsdWUxNg=="},{"column":"Y2Y6Yg==","timestamp":1512439602162,"$":"dmFsdWUxNw=="},{"column":"Y2Y6Yw==","timestamp":1512439607376,"$":"dmFsdWUxOA=="}]}]}
hbaseusr@local-ubuntu-vm3:~$ curl -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/scanner/1512445964843186e2a28"
{"Row":[{"key":"cm93Mw==","Cell":[{"column":"Y2Y6YQ==","timestamp":1512439615019,"$":"dmFsdWUxOQ=="},{"column":"Y2Y6Yw==","timestamp":1512442881867,"$":"dmFsdWUyMg=="},{"column":"Y2Y6Yw==","timestamp":1512442878963,"$":"dmFsdWUyMQ=="},{"column":"Y2Y6Yw==","timestamp":1512439620633,"$":"dmFsdWUyMA=="}]},{"key":"cm93NA==","Cell":[{"column":"Y2Y6Yg==","timestamp":1512443948926,"$":"dmFsdWUyNA=="}]},{"key":"cm93NQ==","Cell":[{"column":"Y2Y6YQ==","timestamp":1512444000024,"$":"dmFsdWUyNQ=="}]},{"key":"cm93Ng==","Cell":[{"column":"Y2Y6Yg==","timestamp":1512444010245,"$":"dmFsdWUyNg=="}]},{"key":"cm93Nw==","Cell":[{"column":"Y2Y6Yw==","timestamp":1512444017553,"$":"dmFsdWUyNw=="}]}]}
hbaseusr@local-ubuntu-vm3:~$ curl -vi -X GET -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/scanner/1512445964843186e2a28"
Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying 192.168.2.140...
* Connected to local.ubuntu.vm (192.168.2.140) port 8080 (#0)
> GET /test/scanner/1512445964843186e2a28 HTTP/1.1
> Host: local.ubuntu.vm:8080
> User-Agent: curl/7.47.0
> Accept: application/json
>
< HTTP/1.1 204 No Content
HTTP/1.1 204 No Content
< Content-Type: application/json
Content-Type: application/json
<
* Connection #0 to host local.ubuntu.vm left intact
hbaseusr@local-ubuntu-vm3:~$ curl -vi -X DELETE -H "Accept: application/json" "http://local.ubuntu.vm:8080/test/scanner/1512445964843186e2a28"
*   Trying 192.168.2.140...
* Connected to local.ubuntu.vm (192.168.2.140) port 8080 (#0)
> DELETE /test/scanner/1512445964843186e2a28 HTTP/1.1
> Host: local.ubuntu.vm:8080
> User-Agent: curl/7.47.0
> Accept: application/json
>
< HTTP/1.1 200 OK
HTTP/1.1 200 OK
< Content-Length: 0
Content-Length: 0
<
* Connection #0 to host local.ubuntu.vm left intact
```


## Endpoints for Put Operations

|Endpoint|HTTP Verb|Description|
|--------|---------|-----------|
|/table/row_key|PUT|Write a row to a table. The row, column qualifier, and value must each be Base-64 encoded. To encode a string, use the&nbsp;base64 command-line utility. To decode the string, use&nbsp;base64 -d. The payload is in the&nbsp;--dataargument, and the&nbsp;/users/fakerow&nbsp;value is a placeholder. Insert multiple rows by adding them to the&nbsp;&lt;CellSet&gt;&nbsp;element. You can also save the data to be inserted to a file and pass it to the&nbsp;-dparameter with syntax like&nbsp;-d @filename.txt.|


e.g. put with JSON or XML format

```shell
hbase(main):034:0> scan 't1'
ROW                               COLUMN+CELL
 row1                             column=cf1:a, timestamp=1512291971850, value=value3
1 row(s) in 0.0350 seconds

hbaseusr@local-ubuntu-vm3:~$ curl -vi -X PUT -H "Accept: application/json" -H "Content-Type: application/json" -d '{"Row":[{"key":"cm93NQ==", "Cell": [{"column":"Y2YxOmU=", "$":"dmFsdWU1"}]}]}' "http://local.ubuntu.vm:8080/t1/fakerow"
*   Trying 192.168.2.140...
* Connected to local.ubuntu.vm (192.168.2.140) port 8080 (#0)
> PUT /t1/fakerow HTTP/1.1
> Host: local.ubuntu.vm:8080
> User-Agent: curl/7.47.0
> Accept: application/json
> Content-Type: application/json
> Content-Length: 77
>
* upload completely sent off: 77 out of 77 bytes
< HTTP/1.1 200 OK
HTTP/1.1 200 OK
< Content-Length: 0
Content-Length: 0

<
* Connection #0 to host local.ubuntu.vm left intact
 
hbase(main):038:0> scan 't1'
ROW                               COLUMN+CELL
 row1                             column=cf1:a, timestamp=1512291971850, value=value3
 row5                             column=cf1:e, timestamp=1512447466216, value=value5

hbaseusr@local-ubuntu-vm3:~$ curl -vi -X PUT -H "Accept: text/xml" -H "Content-Type: text/xml" -d '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><CellSet><Row key="cm93Nw=="><Cell column="Y2YxOmU=">dmFsdWU2</Cell></Row></CellSet>' "http://local.ubuntu.vm:8080/t1/anyrow"
*   Trying 192.168.2.140...
* Connected to local.ubuntu.vm (192.168.2.140) port 8080 (#0)
> PUT /t1/anyrow HTTP/1.1
> Host: local.ubuntu.vm:8080
> User-Agent: curl/7.47.0
> Accept: text/xml
> Content-Type: text/xml
> Content-Length: 139
>
* upload completely sent off: 139 out of 139 bytes
< HTTP/1.1 200 OK
HTTP/1.1 200 OK
< Content-Length: 0
Content-Length: 0

<
* Connection #0 to host local.ubuntu.vm left intact
 
hbase(main):040:0> scan 't1'
ROW                               COLUMN+CELL
 row1                             column=cf1:a, timestamp=1512291971850, value=value3
 row5                             column=cf1:e, timestamp=1512447466216, value=value5
 row7                             column=cf1:e, timestamp=1512447718899, value=value6 
```


