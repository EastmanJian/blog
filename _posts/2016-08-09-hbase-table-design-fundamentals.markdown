---
layout: post
title: "HBase Table Design Fundamentals"
date: 2016-08-09 17:01:00 +08:00
categories: BigData IT
tags: HBase design
---

* content
{:toc}

# HBase Table Design Fundamentals
* Designing HBase tables, therefore, involves taking a different approach from what works in RDBMS.
* Designing HBase tables can be defined as answering the following questions in the context of a use case:
    1. What should the row key structure be and what should it contain? This is most important. In order to define that effectively, it is important to define the access patterns (read as well as write) up front. (ref: Rowkey Design)
    2. How many column families should the table have? (ref: Table Schema Rules Of Thumb, Number of column families)
    3. What data goes into what column family?
    4. How many columns are in each column family?
    5. What should the column names be? Although column names don’t need to be defined on table creation, you need to know them when you write or read data.
    6. What information should go into the cells?
    7. How many versions should be stored for each cell? (ref: Number of Versions)
* To define the schema, several properties about HBase’s tables have to be taken into account.
    - Indexing is only done based on the Key.
    - Tables are stored sorted based on the row key. Each region in the table is responsible for a part of the row key space and is identified by the start and end row key. The region contains a sorted list of rows from the start key to the end key.
    - Everything in HBase tables is stored as a byte[ ]. There are no types.
    - Atomicity is guaranteed only at a row level. There is no atomicity guarantee across rows, which means that there are no multi-row transactions.
    - Column families have to be defined up front at table creation time.
    - Column qualifiers are dynamic and can be defined at write time. They are stored as byte[ ] so you can even put data in them.
* A good way to learn these concepts is through example problems (case studies)
    - Case Study: Twitter relationships (users following other users)
    - Case Study: List Data per User

