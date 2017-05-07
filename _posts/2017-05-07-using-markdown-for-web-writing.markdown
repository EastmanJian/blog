---
layout: post
title: "Using MARKDOWN format for WEB writing"
date: 2017-05-07 09:46:00 +08:00
categories: Network IT
tags: markdown
---

* content
{:toc}

## **It's cool for web writing**
Keep it simple and stupid. Markdown is invented for web writing as a markup format. Comparing HTML, Markdown is super simple to use so that the article writers can concentrate at the content rather than the formatting.   
As the founder *John Grube* says about the philosophy of markdown,

> **PHILOSOPHY**  
> Markdown is intended to be as easy-to-read and easy-to-write in plain text as is feasible.  
> It is a text-to-HTML conversion tool for web writers. Markdown allows you to write using a plain text format, then convert it to structurally valid XHTML (or HTML).

Jekyll supports markdown format. Here are some frequently used formatting syntax✒.  




---------------------------------------
## **Headers**
<table>
    <tr>
        <td> ✒ <B>Syntax</B>
<br># This is an H1 
<br>## This is an H2
<br>### This is an H3
<br>###### This is an H6
        </td>
    </tr>
</table>
  
👀**Result**    
# This is an H1
## This is an H2
### This is an H3
###### This is an H6


## **List**
<table>
    <tr>
        <td> ✒<B>Syntax</B>
<br>* Violet
<br>* Endora
<br>* Seven seven
<br>* Yum yum
        </td>
    </tr>
</table>
  
👀**Result**    
* Violet
* Endora
* Seven seven
* Yum yum

## **Ordered List**
<table>
    <tr>
        <td> ✒<B>Syntax</B>
<br>1. Multimedia room
<br>2. Junior fiction
<br>3. journals & Magazines
<br>4. Café
        </td>
    </tr>
</table>
  
👀**Result**  
1. Multimedia room
2. Junior fiction
3. journals & Magazines 
4. Café

## **Block Quotes**
<table>
    <tr>
        <td> ✒<B>Syntax</B>
<br>> I’ve had enough of your cheek.
<br>>  > I was pouring with sweat, and my head was spinning.  
<br>
<br>>  Then there are those situations where one charismatic leader has stirred others to action, but for ends that were ultimately calamitous for all involved.  
<br>>  This phenomenon, termed Werther-Fieber (Werther Fever), sparked the observation, backed up by subsequent studies, that human behaviour can be 'contagious' in a similar way to bodily-transmitted diseases.
        </td>
    </tr>
</table>
  
👀**Result**  
> I’ve had enough of your cheek.
>  > I was pouring with sweat, and my head was spinning.  

>  Then there are those situations where one charismatic leader has stirred others to action, but for ends that were ultimately calamitous for all involved.  
>  This phenomenon, termed Werther-Fieber (Werther Fever), sparked the observation, backed up by subsequent studies, that human behaviour can be 'contagious' in a similar way to bodily-transmitted diseases.


## **Links**
<table>
    <tr>
        <td> ✒<B>Syntax</B>
<br>Here is the [official website of markdown syntax](http://daringfireball.net/projects/markdown/syntax)
        </td>
    </tr>
</table>
  
👀**Result**  
Here is the [official website of markdown syntax](http://daringfireball.net/projects/markdown/syntax)

## **Images**
<table>
    <tr>
        <td> ✒<B>Syntax</B>
<br>![Daring Fireball](http://daringfireball.net/graphics/logos/)
<br>![Jekyll](https://jekyllrb.com/img/logo-2x.png)
        </td>
    </tr>
</table>
  
👀**Result**    

![Daring Fireball](http://daringfireball.net/graphics/logos/)
![Jekyll](https://jekyllrb.com/img/logo-2x.png)


## **Italic and Emphasis**
<table>
    <tr>
        <td> ✒<B>Syntax</B>
<br>*Goethe's* dramatic and overwrought style, embracing the psychological extremes and restless introspection of his lead character, strongly influenced the **Sturm und Drang** movement in Germany, which emerged as a rebellion against prior artistic dictates of serenity, order and reason.
        </td>
    </tr>
</table>
  
👀**Result**  
*Goethe's* dramatic and overwrought style, embracing the psychological extremes and restless introspection of his lead character, strongly influenced the **Sturm und Drang** movement in Germany, which emerged as a rebellion against prior artistic dictates of serenity, order and reason.

## **Code Block**
<table>
    <tr>
        <td> ✒<B>Syntax</B>
<br>Use `system.out.println()` to print msg to stdout in java, for example `system.out.println("Fucking awesome!")` will display 'Fucking awesome!' in stdout.
        </td>
    </tr>
</table>
  
👀**Result**  
Use `system.out.println()` to print msg to stdout in java, for example `system.out.println("Fucking awesome!")` will display 'Fucking awesome!' in stdout.


## **Code Snippets** (supported by Jekyll)
### Java
<table>
    <tr>
        <td> ✒<B>Syntax</B>
<br>｛% highlight java %｝
<br>public static DateTime getTomorrowDate(){
<br>    Thread.Sleep(24*60*60*1000*1);
<br>    return DateTime.Now;
<br>}
<br>｛% endhighlight %｝
        </td>
    </tr>
</table>
  
👀**Result**  
{% highlight java %}
public static DateTime getTomorrowDate(){ 
    Thread.Sleep(24*60*60*1000*1);
    return DateTime.Now;
}
{% endhighlight %}


### JavaScript
<table>
    <tr>
        <td> ✒<B>Syntax</B>
<br>```js
<br>/**
<br> * strip down XML doc
<br> * @param  {String} block  the current xmlsrc element's block name
<br> * @param  {String} xmlsrc  the link of the xml doc
<br> */
<br>XmlHelper.prototype._strip = function (block, xmlsrc)
<br>{
<br>	if (block == null) return null;
<br>	if (xmlsrc == null) return null;
<br>
<br>	xmlsrc = String (xmlsrc);
<br>
<br>	this._reParse1.test (xmlsrc);
<br>
<br>	if (block.tagName == RegExp.$1.toUpperCase ())
<br>	{
<br>		xmlsrc = xmlsrc.replace (this._reParse1, "");
<br>		xmlsrc = xmlsrc.replace (this._reParse2, "");
<br>	}
<br>
<br>	return xmlsrc;
<br>}
<br>```
        </td>
    </tr>
</table>
  
👀**Result**  
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
<table>
    <tr>
        <td> ✒<B>Syntax</B>
<br>* * *
<br>***
<br>*****
<br>- - -
<br>---
<br>---------------------------------------
        </td>
    </tr>
</table>
  
👀**Result**  
* * *
***
*****
- - -
---
---------------------------------------
