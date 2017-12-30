---
layout: post
title: "Redis Frequently Used Commands and Examples"
date: 2017-02-14 20:37:00 +08:00
categories: Web IT
tags: Redis NoSQL
---

* content
{:toc}


# @string: SET, GET, DEL, INCR, SETNX, INCRBY, DECR, DECRBY, GETSET, MSET, MGET, SETBIT, GETBIT, BITOP, BITCOUNT, BITPOS,

### key-value store, often referred to as a NoSQL database.

SET - store the value. Redis will store our data permanently.  
GET - retrieve the value with a given key.  
GETSET - Set the string value of a key and return its old value  
MSET - Set multiple keys to multiple values  
MGET - Get the values of all the given keys  







```shell
127.0.0.1:6379> SET server:name "fido"
OK
127.0.0.1:6379> GET server:name
"fido"

127.0.0.1:6379> set mykey somevalue
OK
//ask SET to fail if the key already exists
127.0.0.1:6379> set mykey newval nx
(nil)
//ask SET to succeed only if the key already exists
127.0.0.1:6379> set mykey newval xx
OK
127.0.0.1:6379> get mykey
"newval"

127.0.0.1:6379> getset mykey myValue
"newval"
127.0.0.1:6379> get mykey
"myValue"

127.0.0.1:6379> mset a 10 b 20 c 30
OK
127.0.0.1:6379> mget a b c
1) "10"
2) "20"
3) "30"
```



### DEL, INCR, SETNX  

DEL - delete a given key and associated value  
SETNX - (SET-if-not-exists) that sets a key only if it does not already exist  
INCR - atomically increment a number stored at a given key.   
- INCR is an atomic operation. It will not have concurrency problem in case of multiple client access.  

INCRBY - Increment the integer value of a key by the given amount  
DECR - Decrement the integer value of a key by one  
DECRBY -  Decrement the integer value of a key by the given number  

```shell
127.0.0.1:6379> set connections 10
OK
127.0.0.1:6379> incr connections
(integer) 11
127.0.0.1:6379> incr connections
(integer) 12
127.0.0.1:6379> DEL connections
(integer) 1
127.0.0.1:6379> get connections
(nil)
127.0.0.1:6379> INCR connections
(integer) 1
127.0.0.1:6379> get connections
"1"
127.0.0.1:6379> SETNX connections 3
(integer) 0
127.0.0.1:6379> get connections
"1"
127.0.0.1:6379> SETNX portnum 3000
(integer) 1
127.0.0.1:6379> GET portnum
"3000"
127.0.0.1:6379> incrby portnum 100
(integer) 3100
```


### Bitmaps  
Bitmaps are not an actual data type, but a set of bit-oriented operations defined on the String type.

SETBIT - Sets or clears the bit at offset in the string value stored at key  
GETBIT - Returns the bit value at offset in the string value stored at key  
BITOP - Perform bitwise operations between strings. The provided operations are AND, OR, XOR and NOT.  
BITCOUNT - Count set bits in a string  
BITPOS - Find first bit set (1) or clear (0) in a string  

User cases  
* Real time analytics of all kinds.  
* Storing space efficient but high performance boolean information associated with object IDs.

```shell
127.0.0.1:6379> setbit bitkey 0 1
(integer) 0
127.0.0.1:6379> setbit bitkey 10 1
(integer) 0
127.0.0.1:6379> getbit bitkey 0
(integer) 1
127.0.0.1:6379> getbit bitkey 1
(integer) 0
127.0.0.1:6379> getbit bitkey 2
(integer) 0
127.0.0.1:6379> getbit bitkey 3
(integer) 0
127.0.0.1:6379> getbit bitkey 10
(integer) 1
127.0.0.1:6379> get bitkey
"\x80 "
127.0.0.1:6379> bitcount bitkey
(integer) 2

127.0.0.1:6379> SET key1 "foobar"
OK
127.0.0.1:6379> SET key2 "abcdef"
OK
127.0.0.1:6379> BITOP AND dest key1 key2
(integer) 6
127.0.0.1:6379> GET dest
"``bc``ab"

127.0.0.1:6379> setbit mybit 4 1
(integer) 0
127.0.0.1:6379> BITPOS mybit 1
(integer) 4
```


# @list: RPUSH, LPUSH, LLEN, LRANGE, LPOP, RPOP, LTRIM, BRPOP, BLPOP, RPOPLPUSH, BRPOPLPUSH 

### Data Structure - list
RPUSH - Append one or multiple values to a list. (add on the Right)  
LPUSH - Prepend one or multiple values to a list. (add on the Left)  
LLEN - Get the length of a list  
LRANGE - Gives a subset of the list  
- Para 1: the index of the first element you want to retrieve
- Para 2: the index of the last element. 
- Both the indexes can be negative, a value of -1 is the last element, -2 is the penultimate element of the list, and so forth.
- Zero based  

LPOP - Remove and get the first element in a list  
RPOP - Remove and get the last element in a list  
LTRIM -  Trim a list to the specified range  
- useful pattern: doing a List push operation + a List trim operation together in order to add a new element and discard elements exceeding a limit. 

**Notes**: 
* use HELP @list to list a group of commands for working with List
* Redis lists are implemented via Linked Lists. (Not implemented via Array).
* Redis list is able to add elements to a very long list in a very fast way.
* Accessing an element by index is very fast in lists implemented with an Array (constant time indexed access) and not so fast in lists implemented by linked lists.
* When fast access to the middle of a large collection of elements is important, use sorted set instead.
* RPUSH/LPUSH are variadic commands, meaning that you are free to push multiple elements into a list in a single call.
* Use cases
    * Remember the latest updates posted by users into a social network.
    * Communication between processes, using a consumer-producer pattern where the producer pushes items into a list, and a consumer (usually a worker) consumes those items and executed actions. 
	
	
```shell
127.0.0.1:6379> RPUSH friends "Alice"
(integer) 1
127.0.0.1:6379> RPUSH friends "Bob"
(integer) 2
127.0.0.1:6379> LPUSH friends "Sam"
(integer) 3
127.0.0.1:6379> get friends
(error) WRONGTYPE Operation against a key holding the wrong kind of value
127.0.0.1:6379> LLEN friends
(integer) 3
127.0.0.1:6379> HELP LLEN

  LLEN key
  summary: Get the length of a list
  since: 1.0.0
  group: list

127.0.0.1:6379> LRANGE friends
(error) ERR wrong number of arguments for 'lrange' command
127.0.0.1:6379> LRANGE friends 0 -1
1) "Sam"
2) "Alice"
3) "Bob"
127.0.0.1:6379> LRANGE friends 0 1
1) "Sam"
2) "Alice"
127.0.0.1:6379> LRANGE friends 1 2
1) "Alice"
2) "Bob"
127.0.0.1:6379> LPOP friends
"Sam"
127.0.0.1:6379> RPOP friends
"Bob"
127.0.0.1:6379> LLEN friends
(integer) 1
127.0.0.1:6379> LRANGE friends 0 -1
1) "Alice"

127.0.0.1:6379> RPUSH friends "Tom" "Endora" "Violet Lai"
(integer) 4
127.0.0.1:6379> LRANGE friends 0 -1
1) "Alice"
2) "Tom"
3) "Endora"
4) "Violet Lai"

127.0.0.1:6379> ltrim friends -2 -1
OK
127.0.0.1:6379> LRANGE friends 0 -1
1) "Endora"
2) "Violet Lai"
```


### Blocking operations on lists (like long-polling), BRPOP, BLPOP
The usual producer / consumer setup, and can be implemented in the following simple way:  
* To push items into the list, producers call LPUSH.
* To extract / process items from the list, consumers call RPOP.  

However it is possible that sometimes the list is empty and there is nothing to process, so RPOP just returns NULL. In this case a consumer is forced to wait some time and retry again with RPOP. This is called polling, and is not a good idea in this context because it has several drawbacks:    
1. Forces Redis and clients to process useless commands (all the requests when the list is empty will get no actual work done, they'll just return NULL).
2. Adds a delay to the processing of items, since after a worker receives a NULL, it waits some time. To make the delay smaller, we could wait less between calls to RPOP, with the effect of amplifying problem number 1, i.e. more useless calls to Redis.

So Redis implements commands called BRPOP and BLPOP which are versions of RPOP and LPOP able to block if the list is empty: they'll return to the caller only when a new element is added to the list, or when a user-specified timeout is reached.

```shell
//client of producer 
127.0.0.1:6379> LPUSH taskQueue do_run
(integer) 1

//client of consumer
127.0.0.1:6379> BRPOP taskQueue 15
1) "taskQueue"
2) "do_run"
127.0.0.1:6379> BRPOP taskQueue 30
(blocking here because no item in the taskQueue, wait for 30 secnods in max)

//client of producer 
127.0.0.1:6379> LPUSH taskQueue do_sleep
(integer) 1

//client of consumer
1) "taskQueue"
2) "do_sleep"
(7.62s)
(receive another task from producer in 30 seconds, the blocking is released)
```


### RPOPLPUSH
RPOPLPUSH - Remove the last element in a list, prepend it to another list and return it  
BRPOPLPUSH - Pop a value from a list, push it to another list and return it; or block until one is available. (todo: make example)  

```shell
127.0.0.1:6379> lrange taskQueue 0 -1
1) "do_sleep"
2) "do_rest"
3) "do_work"
127.0.0.1:6379> RPOPLPUSH taskQueue taskQueue1
"do_work"
127.0.0.1:6379> lrange taskQueue 0 -1
1) "do_sleep"
2) "do_rest"
127.0.0.1:6379> lrange taskQueue1 0 -1
1) "do_work"
127.0.0.1:6379> RPOPLPUSH taskQueue taskQueue1
"do_rest"
127.0.0.1:6379> lrange taskQueue 0 -1
1) "do_sleep"
127.0.0.1:6379> lrange taskQueue1 0 -1
1) "do_rest"
2) "do_work"
127.0.0.1:6379> RPOPLPUSH taskQueue taskQueue1
"do_sleep"
127.0.0.1:6379> lrange taskQueue 0 -1
(empty list or set)
127.0.0.1:6379> lrange taskQueue1 0 -1
1) "do_sleep"
2) "do_rest"
3) "do_work"
```

# @set: SADD, SREM, SISMEMBER, SMEMBERS, SUNION, SCARD, SINTER,  SUNIONSTORE, SPOP, SRANDMEMBER

### Data Structure - Set
A set is similar to a list, except it does not have a specific order and each element may only appear once.  
SADD - adds the given value to the set  
SREM - removes the given value from the set  
SISMEMBER - tests if the given value is in the set. It returns 1 if the value is there and 0 if it is not.  
SMEMBERS - returns a list of all the members of this set.  
SUNION - combines two or more sets and returns the list of all elements.  
SCARD - Get the number of members in a set  

Note: use HELP @set to list a group of commands for working with set

```shell
127.0.0.1:6379> SADD superpowers "flight"
(integer) 1
127.0.0.1:6379> SADD superpowers "x-ray vision"
(integer) 1
127.0.0.1:6379> SADD superpowers "reflexes"
(integer) 1
127.0.0.1:6379> SREM superpowers "reflexes"
(integer) 1
127.0.0.1:6379> SISMEMBER superpowers "flight"
(integer) 1
127.0.0.1:6379> SISMEMBER superpowers "reflexes"
(integer) 0
127.0.0.1:6379> SMEMBERS superpowers
1) "x-ray vision"
2) "flight"
127.0.0.1:6379> SADD birdpowers "pecking"
(integer) 1
127.0.0.1:6379> SADD birdpowers "flight"
(integer) 1
127.0.0.1:6379> SUNION superpowers birdpowers
1) "pecking"
2) "flight"
3) "x-ray vision"
127.0.0.1:6379> SCARD birdpowers
(integer) 2
```


### Using SET to implement data model tags, SINTER  
SINTER - Intersect multiple sets  
Set Use cases:  
* Sets are good for expressing relations between objects. e.g. implement tags.

```shell
//article ID 1000 is tagged with tags 1, 2, 5 and 77, a set can associate these tag IDs with the news item
> sadd news:1000:tags 1 2 5 77
(integer) 4

// get all the tags for a given object 
> smembers news:1000:tags
1. 5
2. 1
3. 77
4. 2
```

```shell
//have the inverse relation,  the list of all the news tagged with a given tag
127.0.0.1:6379> sadd tag:1:news 1000
(integer) 1
127.0.0.1:6379> sadd tag:2:news 1000 1001
(integer) 2
127.0.0.1:6379> sadd tag:5:news 1000 1003 1019
(integer) 3
127.0.0.1:6379> sadd tag:77:news 1000 1019 1052
(integer) 3

//want a list of all the objects with the tags 1, 2, 5, and 77 together. 
127.0.0.1:6379> sinter tag:1:news tag:2:news tag:5:news tag:77:news
1) "1000"

//want a list of all the objects with the tags  5 and 77 together. 
127.0.0.1:6379> sinter tag:5:news tag:77:news
1) "1000"
2) "1019"
```

### Using SET to implement a data model of a web-based poker game
SUNIONSTORE - Add multiple sets and store the resulting set in a key  
SPOP - Remove and return one or multiple random members from a set  
SRANDMEMBER -  Get one or multiple random members from a set  

```shell
//Represent the poker deck with a set. Use a one-char prefix for (C)lubs, (D)iamonds, (H)earts, (S)pades:
127.0.0.1:6379> sadd deck C1 C2 C3 C4 C5 C6 C7 C8 C9 C10 CJ CQ CK D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 DJ DQ DK H1 H2 H3 H4 H5 H6 H7 H8 H9 H10 HJ HQ HK S1 S2 S3 S4 S5 S6 S7 S8 S9 S10 SJ SQ SK
(integer) 52

//copy deck to game:1:deck using SUNIONSTORE
127.0.0.1:6379> sunionstore game:1:deck deck
(integer) 52

//provide the first player with five cards, The SPOP command removes a random element
127.0.0.1:6379> spop game:1:deck
"S9"
127.0.0.1:6379> spop game:1:deck
"D6"
127.0.0.1:6379> spop game:1:deck
"S7"
127.0.0.1:6379> spop game:1:deck
"D7"
127.0.0.1:6379> spop game:1:deck
"HK"

//you can see in a second copy and spop, the five cards are different.
127.0.0.1:6379> sunionstore game:2:deck deck
(integer) 52
127.0.0.1:6379> spop game:2:deck
"D5"
127.0.0.1:6379> spop game:2:deck
"D2"
127.0.0.1:6379> spop game:2:deck
"DK"
127.0.0.1:6379> spop game:2:deck
"S9"
127.0.0.1:6379> spop game:2:deck
"D10"

//randomly pick some cards from deck
127.0.0.1:6379> SRANDMEMBER deck 2
1) "H1"
2) "SJ"
127.0.0.1:6379> SRANDMEMBER deck 5
1) "C3"
2) "SK"
3) "D3"
4) "H7"
5) "C4"
127.0.0.1:6379> SCARD deck
(integer) 52
```


# @sorted_set: ZADD, ZRANGE, ZCARD, ZRANGEBYSCORE, ZREMRANGEBYSCORE, ZRANK, ZREVRANK, ZRANGEBYLEX, ZREVRANGEBYLEX, ZREMRANGEBYLEX, ZLEXCOUNT

### Data Structure - Sorted Set
Sets are a very handy data type, but as they are unsorted they don't work well for a number of problems. This is why Redis 1.2 introduced Sorted Sets.  
A sorted set is similar to a regular set, but now each value has an associated score. This score is used to sort the elements in the set.  
ZADD - Add one or more members to a sorted set, or update its score if it already exists. With O(log(N)) time complexity, as such, sorted sets are suitable when there are tons of updates.  
ZRANGE  - Return a range of members in a sorted set, by index. Can be used to get the top N members. Use WITHSCORES argument to return the scores as well.   
ZCARD - Get the number of members in a sorted set  

Notes:   
* use HELP @sorted_set to list a group of commands for working with Sorted Set
* Elements in a sorted sets are taken in order (they are not ordered on request).
* They are ordered according to the following rule
    - If A and B are two elements with a different score, then A > B if A.score is > B.score.
    - If A and B have exactly the same score, then A > B if the A string is lexicographically greater than the B string. A and B strings can't be equal since sorted sets only have unique elements.
    - Sorted sets are implemented via a dual-ported data structure containing both a skip list and a hash table, so every time we add an element Redis performs an O(log(N)) operation.
    - When we ask for sorted elements Redis does not have to do any work at all, because it's already all sorted.
		
```shell
127.0.0.1:6379> ZADD hackers 1906 "Grace Hopper"
(integer) 1
127.0.0.1:6379> ZADD hackers 1953 "Richard Stallman"
(integer) 1
127.0.0.1:6379> ZADD hackers 1965 "Yukihiro Matsumoto"
(integer) 1
127.0.0.1:6379> ZADD hackers 1916 "Claude Shannon"
(integer) 1
127.0.0.1:6379> ZADD hackers 1969 "Linus Torvalds"
(integer) 1
127.0.0.1:6379> ZADD hackers 1957 "Sophie Wilson"
(integer) 1
127.0.0.1:6379> ZADD hackers 1912 "Alan Turing"
(integer) 1
127.0.0.1:6379> ZRANGE hackers 0 -1
1) "Grace Hopper"
2) "Alan Turing"
3) "Claude Shannon"
4) "Alan Kay"
5) "Richard Stallman"
6) "Sophie Wilson"
7) "Yukihiro Matsumoto"
8) "Linus Torvalds"
127.0.0.1:6379> ZRANGE hackers 2 4
1) "Claude Shannon"
2) "Alan Kay"
3) "Richard Stallman"
127.0.0.1:6379> ZCARD hackers
(integer) 8

//get the top 4 eldest hackers
127.0.0.1:6379> zrange hackers 0 3
1) "Grace Hopper"
2) "Alan Turing"
3) "Claude Shannon"
4) "Alan Kay"

127.0.0.1:6379> zrange hackers 0 -1 withscores
 1) "Grace Hopper"
 2) "1906"
 3) "Alan Turing"
 4) "1912"
 5) "Claude Shannon"
 6) "1916"
 7) "Alan Kay"
 8) "1940"
 9) "Richard Stallman"
10) "1953"
11) "Sophie Wilson"
12) "1957"
13) "Yukihiro Matsumoto"
14) "1965"
15) "Linus Torvalds"
16) "1969"
```

### ZRANGEBYSCORE, ZREMRANGEBYSCORE, ZRANK, ZREVRANK
ZRANGEBYSCORE -  Return a range of members in a sorted set, by score  
* Use -inf to represent for negative infinite.  

ZREMRANGEBYSCORE - Remove all members in a sorted set within the given scores  
ZRANK - Determine the index of a member in a sorted set  
ZREVRANK - Determine the index of a member in a sorted set, with scores ordered from high to low 

```shell
127.0.0.1:6379> ZRANGE hackers 0 -1 WITHSCORES
 1) "Grace Hopper"
 2) "1906"
 3) "Alan Turing"
 4) "1912"
 5) "Claude Shannon"
 6) "1916"
 7) "Alan Kay"
 8) "1940"
 9) "Richard Stallman"
10) "1953"
11) "Sophie Wilson"
12) "1957"
13) "Yukihiro Matsumoto"
14) "1965"
15) "Linus Torvalds"
16) "1969"
127.0.0.1:6379> ZRANGEBYSCORE hackers -inf 1950
1) "Grace Hopper"
2) "Alan Turing"
3) "Claude Shannon"
4) "Alan Kay"
127.0.0.1:6379> ZREMRANGEBYSCORE hackers 1941 1960
(integer) 2
127.0.0.1:6379> ZRANGE hackers 0 -1 WITHSCORES
 1) "Grace Hopper"
 2) "1906"
 3) "Alan Turing"
 4) "1912"
 5) "Claude Shannon"
 6) "1916"
 7) "Alan Kay"
 8) "1940"
 9) "Yukihiro Matsumoto"
10) "1965"
11) "Linus Torvalds"
12) "1969"
127.0.0.1:6379> ZRANK hackers "Alan Kay"
(integer) 3
127.0.0.1:6379> ZREVRANK hackers "Alan Kay"
(integer) 2
```

### Lexicographical scores  
With recent versions of Redis 2.8, a new feature was introduced that allows getting ranges lexicographically, assuming elements in a sorted set are all inserted with the same identical score.

ZRANGEBYLEX - Return a range of members in a sorted set, by lexicographical range  
* Valid start and stop must start with ( or \[, in order to specify if the range item is respectively exclusive or inclusive.   
* The special values of + or - for start and stop have the special meaning or positively infinite and negatively infinite strings  

ZREVRANGEBYLEX -  Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.  
ZREMRANGEBYLEX - Remove all members in a sorted set between the given lexicographical range  
ZLEXCOUNT - Count the number of members in a sorted set between a given lexicographical range  

```shell
127.0.0.1:6379> zrange hackers:lex 0 -1
1) "Alan Kay"
2) "Alan Turing"
3) "Anita Borg"
4) "Claude Shannon"
5) "Hedy Lamarr"
6) "Linus Torvalds"
7) "Richard Stallman"
8) "Sophie Wilson"
9) "Yukihiro Matsumoto"
127.0.0.1:6379> zrangebylex hackers:lex [C [P
1) "Claude Shannon"
2) "Hedy Lamarr"
3) "Linus Torvalds"
127.0.0.1:6379> zlexcount hackers:lex [C [P
(integer) 3
127.0.0.1:6379> zrevrangebylex hackers:lex [P [C
1) "Linus Torvalds"
2) "Hedy Lamarr"
3) "Claude Shannon"
127.0.0.1:6379> zrangebylex hackers:lex ("Linus Torvalds" +
1) "Richard Stallman"
2) "Sophie Wilson"
3) "Yukihiro Matsumoto"
```

# @hash: HSET, HGETALL, HMSET, HGET, HMGET, HINCRBY

### Data Structure - Hashes
Hashes are maps between string fields and string values with a single key, so they are the perfect data type to represent objects.  
HSET -  Set the string value of a hash field  
HGETALL - Get all the fields and values in a hash  
HMSET - Set multiple hash fields to multiple values  
HGET - Get the value of a hash field  
HMGET - Get the values of all the given hash fields  
HINCRBY - Increment the integer value of a hash field by the given number (atomic operation)  

Note: use HELP @hash to list a group of commands for working with Hashes

```shell
127.0.0.1:6379> HSET user:1000 name "John Smith"
(integer) 1
127.0.0.1:6379> HSET user:1000 email "john.smith@example.com"
(integer) 1
127.0.0.1:6379> HSET user:1000 password "s3cret"
(integer) 1
127.0.0.1:6379> HGETALL user:1000
1) "name"
2) "John Smith"
3) "email"
4) "john.smith@example.com"
5) "password"
6) "s3cret"
127.0.0.1:6379>   HMSET user:1001 name "Mary Jones" password "hidden" email "mjones@example.com"
OK
127.0.0.1:6379> HGETALL user:1001
1) "name"
2) "Mary Jones"
3) "password"
4) "hidden"
5) "email"
6) "mjones@example.com"
127.0.0.1:6379> HGET user:1001 name
"Mary Jones"

127.0.0.1:6379> HSET user:1000 visits 10
(integer) 1
127.0.0.1:6379> HINCRBY user:1000 visits 1
(integer) 11
127.0.0.1:6379> HINCRBY user:1000 visits 10
(integer) 21
127.0.0.1:6379> HGETALL user:1000
1) "name"
2) "John Smith"
3) "email"
4) "john.smith@example.com"
5) "password"
6) "s3cret"
7) "visits"
8) "21"
127.0.0.1:6379> HDEL user:1000 visits
(integer) 1
127.0.0.1:6379> HGETALL user:1000
1) "name"
2) "John Smith"
3) "email"
4) "john.smith@example.com"
5) "password"
6) "s3cret"
127.0.0.1:6379> HINCRBY user:1000 visits 1
(integer) 1
127.0.0.1:6379> HGETALL user:1000
1) "name"
2) "John Smith"
3) "email"
4) "john.smith@example.com"
5) "password"
6) "s3cret"
7) "visits"
8) "1"

127.0.0.1:6379> hmget user:1000 name email
1) "John Smith"
2) "john.smith@example.com"
```

# @generic: EXPIRE, PEXPIRE, TTL, PERSIST, KEYS, EXISTS, DEL

EXPIRE, TTL, PERSIST  
EXPIRE - Tell Redis that a key should only exist for a certain length of time.  
* Use SET key EX seconds to set expire time for a key directly.  

TTL - (Time To Live) test how long a key will exist.  
* The -2 for the TTL of the key means that the key does not exist (anymore). 
* A -1 for the TTL of the key means that it will never expire. 
* If you SET a key, its TTL will be reset.

PERSIST -  Remove the expiration from a key  
PEXPIRE -  Set a key's time to live in milliseconds  

```shell
127.0.0.1:6379> SET resource:lock "Redis Demo"
OK
127.0.0.1:6379> TTL resource:lock
(integer) -1
127.0.0.1:6379> EXPIRE resource:lock 120
(integer) 1
127.0.0.1:6379> TTL resource:lock
(integer) 110
127.0.0.1:6379> TTL resource:lock
(integer) 94
127.0.0.1:6379> TTL resource:lock
(integer) -2
127.0.0.1:6379> SET resource:lock "Redis Demo 1"
OK
127.0.0.1:6379> EXPIRE resource:lock 60
(integer) 1
127.0.0.1:6379> TTL resource:lock
(integer) 53
127.0.0.1:6379> SET resource:lock "Redis Demo 2"
OK
127.0.0.1:6379> TTL resource:lock
(integer) -1

127.0.0.1:6379> TTL portnum
(integer) -1
127.0.0.1:6379> EXPIRE portnum 120
(integer) 1
127.0.0.1:6379> TTL portnum
(integer) 114
127.0.0.1:6379> PERSIST portnum
(integer) 1
127.0.0.1:6379> TTL portnum
(integer) -1

127.0.0.1:6379> set key 100 ex 10
OK
127.0.0.1:6379> TTL key
(integer) 7
127.0.0.1:6379> TTL key
(integer) -2

127.0.0.1:6379> pexpire portnum 120000
(integer) 1
127.0.0.1:6379> TTL portnum
(integer) 116
```


### KEYS, EXISTS, DEL, TYPE
KEYS - Find all keys matching the given pattern.  
Supported glob-style patterns:  
* h?llo matches hello, hallo and hxllo
* h*llo matches hllo and heeeello
* h\[ae\]llo matches hello and hallo, but not hillo
* h\[^e\]llo matches hallo, hbllo, ... but not hello
* h\[a-b\]llo matches hallo and hbllo

EXISTS - Determine if a key exists  
DEL - delete a given key and associated value  
TYPE - Determine the type stored at key  

```shell
127.0.0.1:6379> keys *
 1) "birdpowers"
 2) "user:1001"
 3) "portnum"
 4) "connections"
 5) "friends"
 6) "server:name"
 7) "user:1000"
 8) "foo"
 9) "superpowers"
10) "resource:lock"
11) "hackers"
127.0.0.1:6379> keys u*
1) "user:1001"
2) "user:1000"

127.0.0.1:6379> exists hackers
(integer) 1

127.0.0.1:6379> exists foo
(integer) 1
127.0.0.1:6379> DEL foo
(integer) 1
127.0.0.1:6379> exists foo
(integer) 0

127.0.0.1:6379> type server:name
string
127.0.0.1:6379> type hackers
zset
127.0.0.1:6379> type user:1000
hash
```

# @HyperLogLogs (HLL), PFADD, PFCOUNT

* A HyperLogLog is a probabilistic data structure used in order to count unique things (technically this is referred to estimating the cardinality of a set).
* Commands:  
	PFADD -  Adds the specified elements to the specified HyperLogLog.  
	PFCOUNT - Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).  

* Use case
    - counting unique queries performed by users in a search form every day.

* Notes:
    - Usually counting unique items requires using an amount of memory proportional to the number of items you want to count, because you need to remember the elements you have already seen in the past in order to avoid counting them multiple times. However there is a set of algorithms that trade memory for precision: you end with an estimated measure with a standard error, which in the case of the Redis implementation is less than 1%. The magic of this algorithm is that you no longer need to use an amount of memory proportional to the number of items counted, and instead can use a constant amount of memory! 12k bytes in the worst case, or a lot less if your HyperLogLog (We'll just call them HLL from now) has seen very few elements.
    - You can call GET to serialize a HLL, and SET to deserialize it back to the server.

```shell
127.0.0.1:6379> pfadd hll a b c d
(integer) 1
127.0.0.1:6379> pfcount hll
(integer) 4
127.0.0.1:6379> get hll
"HYLL\x01\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00\\{\x80Dv\x80P\xb1\x84K\xfb\x80BZ"
127.0.0.1:6379> type hll
string
```

# @server: INFO, SAVE, BGSAVE, CONFIG GET, CONFIG SET, CONFIG REWRITE, FLUSHALL

### Server info
INFO - Get information and statistics about the server  

```shell
127.0.0.1:6379> info
# Server
redis_version:4.0.2
redis_git_sha1:00000000
redis_git_dirty:0
redis_build_id:c321e233ebb53d0e
redis_mode:standalone
os:Linux 4.4.0-98-generic x86_64
arch_bits:64
multiplexing_api:epoll
atomicvar_api:atomic-builtin
gcc_version:5.4.0
process_id:3974
run_id:a14fb2a09f67951d408289451ccfd07ebe2337ea
tcp_port:6379
uptime_in_seconds:41710
uptime_in_days:0
hz:10
lru_clock:1238045
executable:/srv/redis-4.0.2/src/redis-server
config_file:

# Clients
connected_clients:1
client_longest_output_list:0
client_biggest_input_buf:0
blocked_clients:0

# Memory
used_memory:836896
used_memory_human:817.28K
used_memory_rss:10211328
used_memory_rss_human:9.74M
used_memory_peak:877648
used_memory_peak_human:857.08K
used_memory_peak_perc:95.36%
used_memory_overhead:816478
used_memory_startup:765480
used_memory_dataset:20418
used_memory_dataset_perc:28.59%
total_system_memory:996495360
total_system_memory_human:950.33M
used_memory_lua:37888
used_memory_lua_human:37.00K
maxmemory:0
maxmemory_human:0B
maxmemory_policy:noeviction
mem_fragmentation_ratio:12.20
mem_allocator:jemalloc-4.0.3
active_defrag_running:0
lazyfree_pending_objects:0

# Persistence
loading:0
rdb_changes_since_last_save:0
rdb_bgsave_in_progress:0
rdb_last_save_time:1511187165
rdb_last_bgsave_status:ok
rdb_last_bgsave_time_sec:1
rdb_current_bgsave_time_sec:-1
rdb_last_cow_size:2519040
aof_enabled:0
aof_rewrite_in_progress:0
aof_rewrite_scheduled:0
aof_last_rewrite_time_sec:-1
aof_current_rewrite_time_sec:-1
aof_last_bgrewrite_status:ok
aof_last_write_status:ok
aof_last_cow_size:0

# Stats
total_connections_received:5
total_commands_processed:152
instantaneous_ops_per_sec:0
total_net_input_bytes:7194
total_net_output_bytes:61086
instantaneous_input_kbps:0.00
instantaneous_output_kbps:0.00
rejected_connections:0
sync_full:0
sync_partial_ok:0
sync_partial_err:0
expired_keys:1
evicted_keys:0
keyspace_hits:93
keyspace_misses:4
pubsub_channels:0
pubsub_patterns:0
latest_fork_usec:135
migrate_cached_sockets:0
slave_expires_tracked_keys:0
active_defrag_hits:0
active_defrag_misses:0
active_defrag_key_hits:0
active_defrag_key_misses:0

# Replication
role:master
connected_slaves:0
master_replid:242369e7b3f25e7297fef9dbdeeacb2275666666
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0

# CPU
used_cpu_sys:34.80
used_cpu_user:16.79
used_cpu_sys_children:0.04
used_cpu_user_children:0.00

# Cluster
cluster_enabled:0

# Keyspace
db0:keys=27,expires=0,avg_ttl=0
```


### Persistence
SAVE - Synchronously save the dataset to disk  
BGSAVE - Asynchronously save the dataset to disk  


### Config
CONFIG GET -  Get the value of a configuration parameter  
CONFIG SET - Set a configuration parameter to the given value  
CONFIG REWRITE -  Rewrite the configuration file with the in memory configuration  

e.g. AUTH passwd config and login

### Data Maintenance
FLUSHALL - Remove all keys from all databases  

# @transactions, MULTI, EXEC, DISCARD, WATCH, UNWATCH

* All the commands in a transaction are serialized and executed sequentially. It can never happen that a request issued by another client is served in the middle of the execution of a Redis transaction. This guarantees that the commands are executed as a single isolated operation.
* Either all of the commands or none are processed, so a Redis transaction is also atomic. 
* Redis does not support roll backs, because
    - Redis commands can fail only if called with a wrong syntax (and the problem is not detectable during the command queueing), or against keys holding the wrong data type: this means that in practical terms a failing command is the result of a programming errors, and a kind of error that is very likely to be detected during development, and not in production.
    - Redis is internally simplified and faster because it does not need the ability to roll back.
    - Given that no one can save the programmer from his or her errors, and that the kind of errors required for a Redis command to fail are unlikely to enter in production, we selected the simpler and faster approach of not supporting roll backs on errors.
* Commands
    - MULTI - Mark the start of a transaction block
    - EXEC - Execute all commands issued after MULTI
    - DISCARD - Discard all commands issued after MULTI
    - WATCH - Watch the given keys to determine execution of the MULTI/EXEC block
    - UNWATCH - Forget about all watched keys
		


e.g. MULTI, EXEC

```shell
eastmanjian.cn:6379> MULTI
OK
eastmanjian.cn:6379> INCR foo1
QUEUED
eastmanjian.cn:6379> INCR bar1
QUEUED
eastmanjian.cn:6379> EXEC
1) (integer) 1
2) (integer) 1
```

e.g. value is changed after MULTI is issued.

```shell
//client 1
eastmanjian.cn:6379> get foo1
"1"
eastmanjian.cn:6379> get bar1
"1"
eastmanjian.cn:6379> MULTI
OK
eastmanjian.cn:6379> INCR foo1
QUEUED

//client 2
127.0.0.1:6379> INCR foo1
(integer) 2

//client 1
eastmanjian.cn:6379> EXEC
1) (integer) 3
eastmanjian.cn:6379> get foo1
"3"
```


e.g. DISCARD

```shell
eastmanjian.cn:6379> get foo1
"3"
eastmanjian.cn:6379> MULTI
OK
eastmanjian.cn:6379> INCR foo1
QUEUED
eastmanjian.cn:6379> DISCARD
OK
eastmanjian.cn:6379> get foo1
"3"
```

e.g. WATCH

```shell
//Client 1
eastmanjian.cn:6379> get bar1
"1"
eastmanjian.cn:6379> WATCH bar1
OK
eastmanjian.cn:6379> MULTI
OK
eastmanjian.cn:6379> INCR bar1
QUEUED

//client 2
127.0.0.1:6379> INCR bar1
(integer) 2

//client 1
eastmanjian.cn:6379> EXEC
(nil)
eastmanjian.cn:6379> get bar1
"2"
```


# References
* http://try.redis.io/
* https://redis.io/commands
