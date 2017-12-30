---
layout: post
title: "Create REST project via Maven jersey grizzly Archetype"
date: 2016-04-03 19:03:00 +08:00
categories: Web IT
tags: Jersey JAX-RS RESTful Maven Java
---

* content
{:toc}

# About  
This is a getting start demo of Jersey from official site. It contains basic function of Jersey.  
* Provide endpoint of RESTful resource with plain text output
* Use Client API to connect to the RESTful resrouce    

It starts a local Grizzly HTTP server to provide REST service.






# References
* Official Getting Start Guide: https://jersey.github.io/documentation/latest/getting-started.html


# Example
Create a jersey demo project using mvn jersey-quickstart-grizzly2 archetype, build, run and test it.

* Create project structure and initial files using the archetype

```shell
C:\workspaces>mvn archetype:generate -DarchetypeArtifactId=jersey-quickstart-grizzly2 -DarchetypeGroupId=org.glassfish.jersey.archetypes -DinteractiveMode=false -DgroupId=com.ej -DartifactId=jersey_grizzly_demo -Dpackage=jersey.demo -DarchetypeVersion=2.26
[INFO] Scanning for projects...
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-antrun-plugin/1.3/maven-antrun-plugin-1.3.pom
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-antrun-plugin/1.3/maven-antrun-plugin-1.3.pom (4.7 kB at 2.6 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-plugins/12/maven-plugins-12.pom
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-plugins/12/maven-plugins-12.pom (12 kB at 19 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/maven-parent/9/maven-parent-9.pom
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/maven-parent/9/maven-parent-9.pom (33 kB at 35 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-antrun-plugin/1.3/maven-antrun-plugin-1.3.jar
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-antrun-plugin/1.3/maven-antrun-plugin-1.3.jar (24 kB at 29 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-assembly-plugin/2.2-beta-5/maven-assembly-plugin-2.2-beta-5.pom
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-assembly-plugin/2.2-beta-5/maven-assembly-plugin-2.2-beta-5.pom (15 kB at 12 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-plugins/16/maven-plugins-16.pom
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-plugins/16/maven-plugins-16.pom (13 kB at 18 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-assembly-plugin/2.2-beta-5/maven-assembly-plugin-2.2-beta-5.jar
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-assembly-plugin/2.2-beta-5/maven-assembly-plugin-2.2-beta-5.jar (209 kB at 70 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-dependency-plugin/2.8/maven-dependency-plugin-2.8.pom
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-dependency-plugin/2.8/maven-dependency-plugin-2.8.pom (11 kB at 19 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-dependency-plugin/2.8/maven-dependency-plugin-2.8.jar
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-dependency-plugin/2.8/maven-dependency-plugin-2.8.jar (153 kB at 59 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-release-plugin/2.3.2/maven-release-plugin-2.3.2.pom
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-release-plugin/2.3.2/maven-release-plugin-2.3.2.pom (9.3 kB at 6.5 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/release/maven-release/2.3.2/maven-release-2.3.2.pom
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/release/maven-release/2.3.2/maven-release-2.3.2.pom (8.6 kB at 12 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-release-plugin/2.3.2/maven-release-plugin-2.3.2.jar
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-release-plugin/2.3.2/maven-release-plugin-2.3.2.jar (44 kB at 26 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/codehaus/mojo/maven-metadata.xml
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-metadata.xml
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-metadata.xml (14 kB at 10 kB/s)
Downloaded from central: https://repo.maven.apache.org/maven2/org/codehaus/mojo/maven-metadata.xml (20 kB at 12 kB/s)
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building Maven Stub Project (No POM) 1
[INFO] ------------------------------------------------------------------------
[INFO]
[INFO] >>> maven-archetype-plugin:3.0.1:generate (default-cli) > generate-sources @ standalone-pom >>>
[INFO]
[INFO] <<< maven-archetype-plugin:3.0.1:generate (default-cli) < generate-sources @ standalone-pom <<<
[INFO]
[INFO]
[INFO] --- maven-archetype-plugin:3.0.1:generate (default-cli) @ standalone-pom ---
[INFO] Generating project in Batch mode
[INFO] Archetype repository not defined. Using the one from [org.glassfish.jersey.archetypes:jersey-quickstart-grizzly2:2.26] found in catalog remote
Downloading from central: https://repo.maven.apache.org/maven2/org/glassfish/jersey/archetypes/jersey-quickstart-grizzly2/2.26/jersey-quickstart-grizzly2-2.26.pom
Downloaded from central: https://repo.maven.apache.org/maven2/org/glassfish/jersey/archetypes/jersey-quickstart-grizzly2/2.26/jersey-quickstart-grizzly2-2.26.pom (3.3 kB at 5.3 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/glassfish/jersey/archetypes/project/2.26/project-2.26.pom
Downloaded from central: https://repo.maven.apache.org/maven2/org/glassfish/jersey/archetypes/project/2.26/project-2.26.pom (4.3 kB at 6.7 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/glassfish/jersey/project/2.26/project-2.26.pom
Downloaded from central: https://repo.maven.apache.org/maven2/org/glassfish/jersey/project/2.26/project-2.26.pom (86 kB at 43 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/net/java/jvnet-parent/4/jvnet-parent-4.pom
Downloaded from central: https://repo.maven.apache.org/maven2/net/java/jvnet-parent/4/jvnet-parent-4.pom (7.8 kB at 12 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/glassfish/hk2/hk2-bom/2.5.0-b42/hk2-bom-2.5.0-b42.pom
Downloaded from central: https://repo.maven.apache.org/maven2/org/glassfish/hk2/hk2-bom/2.5.0-b42/hk2-bom-2.5.0-b42.pom (16 kB at 22 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/net/java/jvnet-parent/5/jvnet-parent-5.pom
Downloaded from central: https://repo.maven.apache.org/maven2/net/java/jvnet-parent/5/jvnet-parent-5.pom (8.9 kB at 15 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/glassfish/jersey/archetypes/jersey-quickstart-grizzly2/2.26/jersey-quickstart-grizzly2-2.26.jar
Downloaded from central: https://repo.maven.apache.org/maven2/org/glassfish/jersey/archetypes/jersey-quickstart-grizzly2/2.26/jersey-quickstart-grizzly2-2.26.jar (4.2 kB at 8.7 kB/s)
[INFO] ----------------------------------------------------------------------------
[INFO] Using following parameters for creating project from Old (1.x) Archetype: jersey-quickstart-grizzly2:2.26
[INFO] ----------------------------------------------------------------------------
[INFO] Parameter: basedir, Value: C:\workspaces\
[INFO] Parameter: package, Value: jersey.demo
[INFO] Parameter: groupId, Value: com.ej
[INFO] Parameter: artifactId, Value: jersey_grizzly_demo
[INFO] Parameter: packageName, Value: jersey.demo
[INFO] Parameter: version, Value: 1.0-SNAPSHOT
[INFO] project created from Old (1.x) Archetype in dir: C:\workspaces\jersey_grizzly_demo
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 02:33 min
[INFO] Finished at: 2017-12-06T12:15:24+08:00
[INFO] Final Memory: 15M/135M
[INFO] ------------------------------------------------------------------------
```

Check the files generated.

```shell
C:\workspaces>cd jersey_demo
C:\workspaces\jersey_demo>tree /f
Folder PATH listing for volume Buffalo 1T
Volume serial number is FC76-63B7
H:.
│  pom.xml
│
└─src
    ├─main
    │  └─java
    │      └─jersey
    │          └─demo
    │                  Main.java
    │                  MyResource.java
    │
    └─test
        └─java
            └─jersey
                └─demo
                        MyResourceTest.java
```
	
You can import to project to your favorite IDE (e.g. IntelliJ). 
	
* Explore the demo source files  
C:\workspaces\jersey_grizzly_demo\pom.xml

```xml
	<dependencies>
	    <dependency>
	        <groupId>org.glassfish.jersey.containers</groupId>
	        <artifactId>jersey-container-grizzly2-http</artifactId>
	    </dependency>
	    <dependency>
	        <groupId>org.glassfish.jersey.inject</groupId>
	        <artifactId>jersey-hk2</artifactId>
	    </dependency>
	
	    <!-- uncomment this to get JSON support:
	     <dependency>
	        <groupId>org.glassfish.jersey.media</groupId>
	        <artifactId>jersey-media-json-binding</artifactId>
	    </dependency>
	    -->
	    <dependency>
	        <groupId>junit</groupId>
	        <artifactId>junit</artifactId>
	        <version>4.9</version>
	        <scope>test</scope>
	    </dependency>
	</dependencies>
```

C:\workspaces\jersey_grizzly_demo\src\main\java\jersey\demo\Main.java

```java
package jersey.demo;

import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.io.IOException;
import java.net.URI;

/**
 * Main class.
 * Responsible for bootstrapping the Grizzly container as well as configuring and deploying the project's JAX-RS
 * application to the container.
 */
public class Main {
    // Base URI the Grizzly HTTP server will listen on
    // using IP 127.0.0.1 allows connections only from localhost
    // using 0.0.0.0 allows connections from any machine that can connect to the current host
    public static final String BASE_URI = "http://0.0.0.0:8080/myapp/";

    /**
     * Starts Grizzly HTTP server exposing JAX-RS resources defined in this application.
     * @return Grizzly HTTP server.
     */
    public static HttpServer startServer() {
        // create a resource config that scans for JAX-RS resources and providers in jersey.demo package
        final ResourceConfig rc = new ResourceConfig().packages("jersey.demo");

        // create and start a new instance of grizzly http server exposing the Jersey application at BASE_URI
        return GrizzlyHttpServerFactory.createHttpServer(URI.create(BASE_URI), rc);
    }

    /**
     * Main method.
     * @param args
     * @throws IOException
     */
    public static void main(String[] args) throws IOException {
        final HttpServer server = startServer();
        System.out.println(String.format("Jersey app started with WADL available at "
                + "%sapplication.wadl\nHit enter to stop it...", BASE_URI));
        System.in.read();
        server.shutdownNow();
    }
} 
```

C:\workspaces\jersey_grizzly_demo\src\main\java\jersey\demo\MyResource.java

```java
package jersey.demo;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Root resource (exposed at "myresource" path)
 */
@Path("myresource")
public class MyResource {

    /**
     * Method handling HTTP GET requests. The returned object will be sent to the client as "text/plain" media type.
     *
     * @return String that will be returned as a text/plain response.
     */
    @GET
    @Produces(MediaType.TEXT_PLAIN)  //produce responses in plain text
    public String getIt() {
        return "Got it!";
    }
}
```

C:\workspaces\jersey_grizzly_demo\src\test\java\jersey\demo\MyResourceTest.java

```java
package jersey.demo;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;

import org.glassfish.grizzly.http.server.HttpServer;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class MyResourceTest {

    private HttpServer server;
    private WebTarget target;

    @Before
    public void setUp() throws Exception {
        // start the server
        server = Main.startServer();
        // create the client
        Client c = ClientBuilder.newClient();

        // uncomment the following line if you want to enable
        // support for JSON in the client (you also have to uncomment
        // dependency on jersey-media-json module in pom.xml and Main.startServer())
        // --
        // c.configuration().enable(new org.glassfish.jersey.media.json.JsonJaxbFeature());

        target = c.target(Main.BASE_URI);
    }

    @After
    public void tearDown() throws Exception {
        server.shutdownNow();
    }

    /**
     * Test to see that the message "Got it!" is sent in the response.
     */
    @Test
    public void testGetIt() {
        String responseMsg = target.path("myresource").request().get(String.class);
        assertEquals("Got it!", responseMsg);
    }
} 
```
	
* Maven Build and Unit Test

```shell
C:\workspaces\jersey_grizzly_demo>mvn clean test
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building jersey_demo 1.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO]
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ jersey_demo ---
[INFO] Deleting C:\workspaces\jersey_grizzly_demo\target
[INFO]
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ jersey_demo ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory C:\workspaces\jersey_grizzly_demo\src\main\resources
[INFO]
[INFO] --- maven-compiler-plugin:2.5.1:compile (default-compile) @ jersey_demo ---
[INFO] Compiling 2 source files to C:\workspaces\jersey_grizzly_demo\target\classes
[INFO]
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ jersey_demo ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory C:\workspaces\jersey_grizzly_demo\src\test\resources
[INFO]
[INFO] --- maven-compiler-plugin:2.5.1:testCompile (default-testCompile) @ jersey_demo ---
[INFO] Compiling 1 source file to C:\workspaces\jersey_grizzly_demo\target\test-classes
[INFO]
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ jersey_demo ---
[INFO] Surefire report directory: C:\workspaces\jersey_grizzly_demo\target\surefire-reports
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/surefire/surefire-junit4/2.12.4/surefire-junit4-2.12.4.pom
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/surefire/surefire-junit4/2.12.4/surefire-junit4-2.12.4.pom (2.4 kB at 1.6 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/surefire/surefire-junit4/2.12.4/surefire-junit4-2.12.4.jar
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/surefire/surefire-junit4/2.12.4/surefire-junit4-2.12.4.jar (37 kB at 19 kB/s)

-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running jersey.demo.MyResourceTest
Dec 06, 2017 5:53:09 PM org.glassfish.grizzly.http.server.NetworkListener start
INFO: Started listener bound to [0.0.0.0:8080]
Dec 06, 2017 5:53:09 PM org.glassfish.grizzly.http.server.HttpServer start
INFO: [HttpServer] Started.
Dec 06, 2017 5:53:09 PM org.glassfish.grizzly.http.server.NetworkListener shutdownNow
INFO: Stopped listener bound to [0.0.0.0:8080]
Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.862 sec

Results :

Tests run: 1, Failures: 0, Errors: 0, Skipped: 0

[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 2.667 s
[INFO] Finished at: 2017-12-06T17:53:09+08:00
[INFO] Final Memory: 18M/214M
[INFO] ------------------------------------------------------------------------
```

```shell
//check the project tree after build, target tree is generated
C:\workspaces\jersey_grizzly_demo>tree /F
Folder PATH listing for volume Buffalo 1T
Volume serial number is FC76-63B7
H:.
│  jersey.demo.iml
│  pom.xml
│
├─src
│  ├─main
│  │  └─java
│  │      └─jersey_demo
│  │              Main.java
│  │              MyResource.java
│  │
│  └─test
│      └─java
│          └─jersey_demo
│                  MyResourceTest.java
│
└─target
    ├─classes
    │  └─jersey_demo
    │          Main.class
    │          MyResource.class
    │
    ├─generated-sources
    │  └─annotations
    ├─generated-test-sources
    │  └─test-annotations
    ├─surefire-reports
    │      jersey_demo.MyResourceTest.txt
    │      TEST-jersey_demo.MyResourceTest.xml
    │
    └─test-classes
        └─jersey_demo
                MyResourceTest.class
```	
	
* Run

```shell
C:\workspaces\jersey_grizzly_demo>mvn exec:java
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building jersey_demo 1.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO]
[INFO] >>> exec-maven-plugin:1.2.1:java (default-cli) > validate @ jersey_demo >>>
[INFO]
[INFO] <<< exec-maven-plugin:1.2.1:java (default-cli) < validate @ jersey_demo <<<
[INFO]
[INFO]
[INFO] --- exec-maven-plugin:1.2.1:java (default-cli) @ jersey_demo ---
Dec 06, 2017 4:46:52 PM org.glassfish.grizzly.http.server.NetworkListener start
INFO: Started listener bound to [0.0.0.0:8080]
Dec 06, 2017 4:46:52 PM org.glassfish.grizzly.http.server.HttpServer start
INFO: [HttpServer] Started.
Jersey app started with WADL available at http://0.0.0.0:8080/myapp/application.wadl
Hit enter to stop it...
```
	
* Locate the resource in browser or via curl command.

```shell
eastman@local-ubuntu-vm:~$ curl -vi -X GET "http://local.win10:8080/myapp/myresource"
Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying 192.168.2.9...
* Connected to local.win10 (192.168.2.9) port 8080 (#0)
> GET /myapp/myresource HTTP/1.1
> Host: local.win10:8080
> User-Agent: curl/7.47.0
> Accept: */*
>
< HTTP/1.1 200 OK
HTTP/1.1 200 OK
< Content-Type: text/plain
Content-Type: text/plain
< Content-Length: 7
Content-Length: 7
<
* Connection #0 to host local.win10 left intact
Got it!
```
	
* Check the WADL in browser or via curl command.

```xml
eastman@local-ubuntu-vm:~$ curl "http://local.win10:8080/myapp/application.wadl"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<application xmlns="http://wadl.dev.java.net/2009/02">
    <doc xmlns:jersey="http://jersey.java.net/" jersey:generatedBy="Jersey: 2.26 2017-09-05 11:50:34"/>
    <doc xmlns:jersey="http://jersey.java.net/" jersey:hint="This is simplified WADL with user and core resources only. To get full WADL with extended resources use the query parameter detail. Link: http://local.win10:8080/myapp/application.wadl?detail=true"/>
    <grammars/>
    <resources base="http://local.win10:8080/myapp/">
        <resource path="myresource">
            <method id="getIt" name="GET">
                <response>
                    <representation mediaType="text/plain"/>
                </response>
            </method>
        </resource>
    </resources>
</application>
```
