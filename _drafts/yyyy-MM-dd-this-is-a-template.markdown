---
layout: post
title: "Essay subject"
date: 2017-01-01 00:00:00 +08:00
categories: cat1 cat2
tags: tag1 tag2 tag3
---

* content
{:toc}

## **Headers**

# This is an H1
## This is an H2
### This is an H3
###### This is an H6


## **List**
* Violet
* Endora
* Seven seven
* Yum yum

## **Ordered List**
1. Multimedia room
2. Junior fiction
3. journals & Magazines 
4. Café

## **Block Quotes**
> I’ve had enough of your cheek.
>  > I was pouring with sweat, and my head was spinning.  

>  Then there are those situations where one charismatic leader has stirred others to action, but for ends that were ultimately calamitous for all involved.  
>  This phenomenon, termed Werther-Fieber (Werther Fever), sparked the observation, backed up by subsequent studies, that human behaviour can be 'contagious' in a similar way to bodily-transmitted diseases.


## **Links**
Here is the [official website of markdown syntax](http://daringfireball.net/projects/markdown/syntax)

## **Images**
![Daring Fireball](http://daringfireball.net/graphics/logos/)
![Jekyll](https://jekyllrb.com/img/logo-2x.png)


## **Italic and Emphasis**
*Goethe's* dramatic and overwrought style, embracing the psychological extremes and restless introspection of his lead character, strongly influenced the **Sturm und Drang** movement in Germany, which emerged as a rebellion against prior artistic dictates of serenity, order and reason.

## **Code Block**
Use `system.out.println()` to print msg to stdout in java, for example `system.out.println("Fucking awesome!")` will display 'Fucking awesome!' in stdout.


## **Code Snippets** (supported by Jekyll)
### Java
{% highlight java %}
public static DateTime getTomorrowDate(){ 
    Thread.Sleep(24*60*60*1000*1);
    return DateTime.Now;
}
{% endhighlight %}


### JavaScript
```js
/**
 * strip down XML doc
 * @param  {String} block  the current xmlsrc element's block name
 * @param  {String} xmlsrc  the link of the xml doc
 */
XmlHelper.prototype._strip = function (block, xmlsrc)
{
	if (block == null) return null;
	if (xmlsrc == null) return null;

	xmlsrc = String (xmlsrc);

	this._reParse1.test (xmlsrc);

	if (block.tagName == RegExp.$1.toUpperCase ())
	{
		xmlsrc = xmlsrc.replace (this._reParse1, "");
		xmlsrc = xmlsrc.replace (this._reParse2, "");
	}

	return xmlsrc;
}
```

## **Horizontal Rule**
* * *
***
*****
- - -
---
---------------------------------------
