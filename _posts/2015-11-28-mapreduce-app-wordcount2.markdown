---
layout: post
title: "MapReduce Application Example - WordCount2"
date: 2015-11-28 21:59:00 +08:00
categories: BigData IT
tags: Hadoop HDFS MapReduce YARN cluster
---

* content
{:toc}

This article records a practical installation of Hadoop (HDFS+MapReduce/YARN) single-node cluster (Pseudo-Distributed Mode).

### WordCount2 MapReduce Application
This app counts the number of occurrences of each word in a given input set. 

Beyond a simeple WordCount example, this example demonstrates additional MapReduce framework features below.  
* Demonstrates how applications can access configuration parameters in the setup method of the Mapper (and Reducer) implementations.
* Demonstrates how the DistributedCache can be used to distribute read-only data needed by the jobs. Here it allows the user to specify word-patterns to skip while counting.
* Demonstrates the utility of the GenericOptionsParser to handle generic Hadoop command-line options.
* Demonstrates how applications can use Counters and how they can set application-specific status information passed to the map (and reduce) method.





### Source Code

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.Counter;
import org.apache.hadoop.util.GenericOptionsParser;
import org.apache.hadoop.util.StringUtils;

public class WordCount2 {

    public static class TokenizerMapper
            extends Mapper<Object, Text, Text, IntWritable>{

        static enum CountersEnum { INPUT_WORDS }

        private final static IntWritable one = new IntWritable(1);
        private Text word = new Text();

        private boolean caseSensitive;
        private Set<String> patternsToSkip = new HashSet<String>();

        private Configuration conf;
        private BufferedReader fis;

        @Override
        /**
         * Override the setup() method to handle command line properties
         */
        public void setup(Context context) throws IOException, InterruptedException {
            //access configuration parameters
            conf = context.getConfiguration();

            //Get the wordcount.case.sensitive property from command line. If not specified, default to true.
            caseSensitive = conf.getBoolean("wordcount.case.sensitive", true);
            if (conf.getBoolean("wordcount.skip.patterns", false)) {
                URI[] patternsURIs = Job.getInstance(conf).getCacheFiles();
                //loop each cached files to get all the defined skip patterns.
                for (URI patternsURI : patternsURIs) {
                    Path patternsPath = new Path(patternsURI.getPath());
                    String patternsFileName = patternsPath.getName().toString();
                    parseSkipFile(patternsFileName);
                }
            }
        }

        /**
         * put the patterns from the pattern file into a set patternsToSkip.
         * @param fileName
         */
        private void parseSkipFile(String fileName) {
            try {
                fis = new BufferedReader(new FileReader(fileName));
                String pattern = null;
                while ((pattern = fis.readLine()) != null) {
                    patternsToSkip.add(pattern);
                }
            } catch (IOException ioe) {
                System.err.println("Caught exception while parsing the cached file '"
                        + StringUtils.stringifyException(ioe));
            }
        }

        @Override
        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            //case sensitive handling
            String line = (caseSensitive) ? value.toString() : value.toString().toLowerCase();
            //skip pattern handling
            for (String pattern : patternsToSkip) {
                line = line.replaceAll(pattern, "");
            }
            StringTokenizer itr = new StringTokenizer(line);
            while (itr.hasMoreTokens()) {
                word.set(itr.nextToken());
                context.write(word, one);
                // Use Counters and set application-specific status information passed to the map (and reduce) method
                // Get the Counter for the given groupName and counterName.
                // The counter result can be found in the job output
                Counter counter = context.getCounter(CountersEnum.class.getName(), CountersEnum.INPUT_WORDS.toString());
                counter.increment(1);
            }
        }
    }

    public static class IntSumReducer extends Reducer<Text,IntWritable,Text,IntWritable> {
        private IntWritable result = new IntWritable();
        public void reduce(Text key, Iterable<IntWritable> values, Context context )
                throws IOException, InterruptedException {
            int sum = 0;
            for (IntWritable val : values) {
                sum += val.get();
            }
            result.set(sum);
            context.write(key, result);
        }
    }

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();

        //Use GenericOptionsParser to handle generic Hadoop command-line options
        GenericOptionsParser optionParser = new GenericOptionsParser(conf, args);
        String[] remainingArgs = optionParser.getRemainingArgs();
        if ((remainingArgs.length != 2) && (remainingArgs.length != 4)) {
            System.err.println("Usage: wordcount <in> <out> [-skip skipPatternFile]");
            System.exit(2);
        }
        Job job = Job.getInstance(conf, "word count");
        job.setJarByClass(WordCount2.class);
        job.setMapperClass(TokenizerMapper.class);
        job.setCombinerClass(IntSumReducer.class);
        job.setReducerClass(IntSumReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);

        List<String> otherArgs = new ArrayList<String>();
        for (int i=0; i < remainingArgs.length; ++i) {
            if ("-skip".equals(remainingArgs[i])) {
                //Using DistributedCache to distribute the word skip patterns file.
                job.addCacheFile(new Path(remainingArgs[++i]).toUri());
                job.getConfiguration().setBoolean("wordcount.skip.patterns", true);
            } else {
                otherArgs.add(remainingArgs[i]);
            }
        }
        FileInputFormat.addInputPath(job, new Path(otherArgs.get(0)));
        FileOutputFormat.setOutputPath(job, new Path(otherArgs.get(1)));

        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
} 
```

### Dependencies

```xml
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-common</artifactId>
    <version>2.7.1</version>
</dependency>
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-hdfs</artifactId>
    <version>2.7.1</version>
</dependency>
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-auth</artifactId>
    <version>2.7.1</version>
</dependency>
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-mapreduce-client-jobclient</artifactId>
    <version>2.7.1</version>
    <scope>provided</scope>
</dependency>
```

### Build Env Setting

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ cat ~/.bashrc
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/jre
export PATH=$JAVA_HOME/bin:$PATH:$HADOOP_HOME/bin
export HADOOP_CLASSPATH=/usr/lib/jvm/java-8-openjdk-amd64/lib/tools.jar
```

### Compile WordCount2.java and create a jar

```shell
#put the file to the build env
hduser@local-ubuntu-vm:/usr/local/hadoop$ find ej/
...
ej/hadoop/mapreduce/WordCount2.java
ej/hadoop/mapreduce/WordCount.java
#compile
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop com.sun.tools.javac.Main ej/hadoop/mapreduce/WordCount2.java
hduser@local-ubuntu-vm:/usr/local/hadoop$ find ej/
ej/hadoop/mapreduce/WordCount2$TokenizerMapper.class
ej/hadoop/mapreduce/WordCount2$TokenizerMapper$CountersEnum.class
ej/hadoop/mapreduce/WordCount2.class
ej/hadoop/mapreduce/WordCount2$IntSumReducer.class
...
#pack to jar
hduser@local-ubuntu-vm:/usr/local/hadoop$ jar cvf ejlib/wc.jar ej/hadoop/mapreduce/WordCount*.class
added manifest
adding: ej/hadoop/mapreduce/WordCount2.class(in = 2533) (out= 1354)(deflated 46%)
adding: ej/hadoop/mapreduce/WordCount2$IntSumReducer.class(in = 1782) (out= 746)(deflated 58%)
adding: ej/hadoop/mapreduce/WordCount2$TokenizerMapper.class(in = 4625) (out= 2094)(deflated 54%)
...
hduser@local-ubuntu-vm:/usr/local/hadoop$ jar tvf ejlib/wc.jar
     0 Wed Nov 29 20:38:26 HKT 2015 META-INF/
    69 Wed Nov 29 20:38:26 HKT 2015 META-INF/MANIFEST.MF
  2533 Wed Nov 29 20:37:48 HKT 2015 ej/hadoop/mapreduce/WordCount2.class
  1782 Wed Nov 29 20:37:48 HKT 2015 ej/hadoop/mapreduce/WordCount2$IntSumReducer.class
  4625 Wed Nov 29 20:37:48 HKT 2015 ej/hadoop/mapreduce/WordCount2$TokenizerMapper.class
  1190 Wed Nov 29 20:37:48 HKT 2015 ej/hadoop/mapreduce/WordCount2$TokenizerMapper$CountersEnum.class
```

### The Demo input files

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop fs -ls -R /user/hduser
…
-rw-r--r--   1 hduser supergroup         24 2015-11-29 20:32 /user/hduser/input/file01
-rw-r--r--   1 hduser supergroup         33 2015-11-29 20:32 /user/hduser/input/file02
…
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop fs -cat /user/hduser/input/file01
Hello World, Bye World!
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop fs -cat /user/hduser/input/file02
Hello Hadoop, Goodbye to hadoop.
```

### Run WordCount2 with default configurations and check the output

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop jar ejlib/wc.jar ej.hadoop.mapreduce.WordCount2 input output2
...
15/11/29 20:40:07 INFO mapreduce.Job:  map 100% reduce 100%
15/11/29 20:40:07 INFO mapreduce.Job: Job job_local316116904_0001 completed successfully
15/11/29 20:40:07 INFO mapreduce.Job: Counters: 36
  File System Counters
       FILE: Number of bytes read=28491
       FILE: Number of bytes written=1473361
       FILE: Number of read operations=0
       FILE: Number of large read operations=0
       FILE: Number of write operations=0
       HDFS: Number of bytes read=147
       HDFS: Number of bytes written=67
       HDFS: Number of read operations=22
       HDFS: Number of large read operations=0
       HDFS: Number of write operations=5
  Map-Reduce Framework
       Map input records=2
       Map output records=9
       Map output bytes=93
       Map output materialized bytes=123
       Input split bytes=222
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
       GC time elapsed (ms)=67
       Total committed heap usage (bytes)=506671104
  Shuffle Errors
	   ...
  ej.hadoop.mapreduce.WordCount2$TokenizerMapper$CountersEnum
       INPUT_WORDS=9
  File Input Format Counters
       Bytes Read=57
  File Output Format Counters
       Bytes Written=67


hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop fs -ls -R /user/hduser
…
drwxr-xr-x   - hduser supergroup          0 2015-11-29 20:40 /user/hduser/output2
-rw-r--r--   1 hduser supergroup          0 2015-11-29 20:40 /user/hduser/output2/_SUCCESS
-rw-r--r--   1 hduser supergroup         67 2015-11-29 20:40 /user/hduser/output2/part-r-00000
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop fs -cat output2/*
Bye    1
Goodbye 1
Hadoop, 1
Hello  2
World! 1
World, 1
hadoop. 1
to     1
```

### Run WordCount2 with word skip configuration file pattern.txt, and check the output

```shell
#here is the file pattern.txt put in hdfs
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop fs -cat wordcount/pattern.txt
\.
\,
\!
to

#Run
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop jar ejlib/wc.jar ej.hadoop.mapreduce.WordCount2 input output2a -skip wordcount/pattern.txt
...

#Check the output
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop fs -cat output2a/*
Bye    1
Goodbye 1
Hadoop 1
Hello  2
World  2
hadoop 1
```

### Run WordCount2 with word skip configuration file pattern.txt and disable case-sensitive option, check the output

```shell
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop jar ejlib/wc.jar ej.hadoop.mapreduce.WordCount2 -Dwordcount.case.sensitive=false input output2b -skip wordcount/pattern.txt
...
hduser@local-ubuntu-vm:/usr/local/hadoop$ bin/hadoop fs -cat output2b/*
bye    1
goodbye 1
hadoop 2
hello  2
world  2
```

### Reference  
* http://hadoop.apache.org/docs/stable/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html#Example:_WordCount_v2.0
* http://hadoop.apache.org/docs/current/api/index.html

