---
layout: post
title: "Java Security MessageDigest API: MD5, SHA-1, SHA-256"
date: 2012-05-20 16:54:00 +08:00
categories: Web IT
tags: Java MD5 SHA1 SHA256
---

* content
{:toc}

> This MessageDigest class provides applications the functionality of a message digest algorithm, such as SHA-1 or SHA-256. Message digests are secure one-way hash functions that take arbitrary-sized data and output a fixed-length hash value.  ----- JavaDoc 

When using this API to generate Hash string for an algorithm, the output is in byte array format. This is a little different from the openssl tool which generates output in a string format. If you expect Java MessageDigest API to output the same format as openssl, a bit more work needs to do.  
Take MD5 as example, the codes show below.

```java
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SSLUtil {
    private static String toHex(byte[] bytes) {
        final char[] HEX_DIGITS = "0123456789abcdef".toCharArray();
        StringBuilder ret = new StringBuilder(bytes.length * 2);
        for (int i = 0; i < bytes.length; i++) {
            ret.append(HEX_DIGITS[(bytes[i] >> 4) & 0x0f]);
            ret.append(HEX_DIGITS[bytes[i] & 0x0f]);
        }
        return ret.toString();
    }

    public static String MD5(String data)  {
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        byte[] md5bytes = md.digest(data.getBytes());
        return toHex(md5bytes);
    }
}
```

Test it.

```java
@Test
public void testMD5() throws Exception {
    String data = "eastmanjian.cn/blog/2017/05/07/using-markdown-for-web-writing";
    String md5 = SSLUtil.MD5(data);
    assertEquals(md5, "f6a79b682067ac33ed2b45f2ace68e56");
} 
```

The result is as the same as the openssl output.

```bash
$ echo -n "eastmanjian.cn/blog/2017/05/07/using-markdown-for-web-writing" | openssl md5
(stdin)= f6a79b682067ac33ed2b45f2ace68e56 
```

