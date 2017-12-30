---
layout: post
title: "Maven maven-surefire-plugin"
date: 2014-09-21 18:08:00 +08:00
categories: Java IT
tags: Maven Java
---

* content
{:toc}

# Notes
Surefire controls the test lifecycle phase of a maven build.  
Ref: https://maven.apache.org/surefire/maven-surefire-plugin/index.html

The following examples show how to use the Surefire Plugin in more advanced use cases (Official examples):
* Using TestNG
* Using JUnit
* Using POJO Tests
* Skipping Tests
* Skip After Failure
* Inclusions and Exclusions of Tests
* Running a Single Test
* Re-run Failing Tests
* Class Loading and Forking
* Debugging Tests
* Using System Properties
* Configuring the Classpath
* Selecting Providers
* Fork Options and Parallel Test Execution
* Using Console Logs
* Shutdown of Forked JVM






# Running a Set of Methods in a Single Test Class
As of Surefire 2.7.3, you can also run only a subset of the tests in a test class.  
NOTE : This feature is supported only for Junit 4.x and TestNG. Use syntax e.g. `foo/MyTest.java`, `**/MyTest.java`, `MyTest` for `test` parameter (see includes/excludes).  

You should use the following syntax:  
`mvn -Dtest=TestCircle#mytest test`

You can use patterns too  
`mvn -Dtest=TestCircle#test* test`

Since of Surefire Plugin 2.19 you can select multiple methods (JUnit 4, JUnit 4.7+ and TestNG):  
`mvn -Dtest=TestCircle#testOne+testTwo test`

Note this feature was available in JUnit 4 provider only since of Surefire Plugin 2.12.1.


# Examples

💡 skip tests in maven build

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.5</version>
            <configuration>
                <skipTests>true</skipTests>
            </configuration>
        </plugin>
        ...
    </plugins>
</build>
```

💡 include or exclude specific test classes

By default, maven build seems only executes the test classes associated with normal classes. If additional test classes you want to execute, need to explicitly specify them in pom.xml
H:\workspaces\jmockit_demo\pom.xml

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.20</version>
            <configuration>
                <includes>
                    <include>**/*Test.java</include>
                    <include>**/MyServiceTestBy*.java</include>
                </includes>
                <excludes>
                    <exclude>**/AppTest.java</exclude>
                </excludes>
            </configuration>
        </plugin>
    </plugins>
</build>
```
 
💡 skill failure test

By default, Maven stop the build in case test failure. But sometimes (like TDD), we want to continue the build even there are some test case failure.  
`<testFailureIgnore>true</testFailureIgnore>`

or  
`mvn test -Dmaven.test.failure.ignore=true`


💡 Running tests in parallel (For both Junit & TestNG )

```xml
<plugin>  
  <groupId>org.apache.maven.plugins</groupId>  
  <artifactId>maven-surefire-plugin</artifactId>  
  <version>2.17</version>  
  <configuration>  
       <parallel>methods</parallel>  
       <threadCount>10</threadCount>
  </configuration>  
</plugin>  
```


💡 Skipping Tests After First Failure  
To skip remaining tests after first failure or error has happened set configuration parameter skipAfterFailureCount to 1.

```xml
<configuration>  
    <skipAfterFailureCount >1</skipAfterFailureCount>
</configuration>  
```



