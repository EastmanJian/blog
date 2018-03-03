---
layout: post
title: "Tower of Hanoi - Recursive Algorithm to Solve It"
date: 2013-02-13 14:50:00 +08:00
categories: Algorithm IT
tags: Algorithm Java Recursion
---

* content
{:toc}

汉诺塔真喺一个经典的递归算法例子。作为复习，用Java implement一下。

![Hanoi GIF](https://ejres-1253687085.picgz.myqcloud.com/img/recursion/hanoi-6.gif)





### Hanoi recursive algorithm Java implementation

```java
public class Hanoi {

    /**
     * Solve Hanoi Towers problem using a recursive algorithm.
     * The total number of steps is 2^n - 1.
     *
     * @param n           the number of disks
     * @param origin      the label of the original rod
     * @param assist      the label of the assistant rod
     * @param destination the label of the destination rod
     */
    public void hanoi(int n, char origin, char assist, char destination) {
        if (n == 1) {
            move(origin, destination);
        } else {
            hanoi(n - 1, origin, destination, assist);
            move(origin, destination);
            hanoi(n - 1, assist, origin, destination);
        }
    }

    public void move(char origin, char destination) {
        System.out.println("Move a disk from rod " + origin + " to rod " + destination + ".");
    }
}
```

[![](https://img.shields.io/badge/Source%20Code-Visit%20GitHub%20for%20the%20full%20source%20code-brightgreen.svg?style=social&logo=github&label=SourceCode)](https://github.com/EastmanJian/algorithm_demo/tree/master/src/main/java/algorithm/recursive/hanoi)

![Hanoi Toy](https://ejres-1253687085.picgz.myqcloud.com/img/recursion/hanoi-toy.jpg)

### The number of steps  
The numbers of steps of solving Hanoi Tower is f(n)=2^n-1. Thinking in the resursion algorithm, the formula can be proved as below.  
![Hanoi steps proof](https://ejres-1253687085.picgz.myqcloud.com/img/recursion/hanoi-steps-proof.png)

### A non-recursive solution
In alternate moves:  
- Move the smallest disk to the peg it has not recently come from.  
- Move another disk legally (there will be only one possibility)  

一位美国学者发现一种出人意料的简单方法，只要轮流进行两步操作就可以了。  
首先把三根柱子按顺序排成品字型，把所有的圆盘按从大到小的顺序放在柱子A上，根据圆盘的数量确定柱子的排放顺序：  
- 若n为偶数，按顺时针方向依次摆放 A B C；
- 若n为奇数，按顺时针方向依次摆放 A C B。

1. 按顺时针方向把圆盘1从现在的柱子移动到下一根柱子，即当n为偶数时，若圆盘1在柱子A，则把它移动到B；若圆盘1在柱子B，则把它移动到C；若圆盘1在柱子C，则把它移动到A。
2. 接着，把另外两根柱子上可以移动的圆盘移动到新的柱子上。即把非空柱子上的圆盘移动到空柱子上，当两根柱子都非空时，移动较小的圆盘。这一步没有明确规定移动哪个圆盘，你可能以为会有多种可能性，其实不然，可实施的行动是唯一的。
3. 反复进行⑴⑵操作，最后就能按规定完成汉诺塔从A塔到C塔的移动。

所以结果非常简单，就是按照移动规则向一个方向移动金片。

### Story
![Hanoi Story](https://ejres-1253687085.picgz.myqcloud.com/img/recursion/hanio-story.png)

> The puzzle was invented by the French mathematician Édouard Lucas in 1883. There is a story about an Indian temple in Kashi Vishwanath which contains a large room with three time-worn posts in it, surrounded by 64 golden disks. Brahmin priests, acting out the command of an ancient prophecy, have been moving these disks in accordance with the immutable rules of Brahma since that time. The puzzle is therefore also known as the Tower of Brahma puzzle. According to the legend, when the last move of the puzzle is completed, the world will end.  
> If the legend were true, and if the priests were able to move disks at a rate of one per second, using the smallest number of moves it would take them 2^64 − 1 seconds or roughly 584.9 billion years to finish, which is about 42 times the current age of the Universe.  
>	
> 　　法国数学家爱德华·卢卡斯曾编写过一个印度的古老传说：在世界中心贝拿勒斯（在印度北部）的圣庙里，一块黄铜板上插着三根宝石针。印度教的主神梵天在创造世界的时候，在其中一根针上从下到上地穿好了由大到小的64片金片，这就是所谓的汉诺塔。不论白天黑夜，总有一个僧侣在按照下面的法则移动这些金片：一次只移动一片，不管在哪根针上，小片必须在大片上面。僧侣们预言，当所有的金片都从梵天穿好的那根针上移到另外一根针上时，世界就将在一声霹雳中消灭，而梵塔、庙宇和众生也都将同归于尽。  
> 　　不管这个传说的可信度有多大，把64片金片，由一根针上移到另一根针上，并且始终保持上小下大的顺序。这需要2^64-1次移动。假如每秒钟一次，共需多长时间呢？一个平年365天有31536000 秒，闰年366天有31622400秒，平均每年31556952秒，计算一下：18446744073709551615秒。  
> 　　这表明移完这些金片需要5845.54亿年以上，而地球存在至今不过45亿年，太阳系的预期寿命据说也就是数百亿年。真的过了5845.54亿年，不说太阳系和银河系，至少地球上的一切生命，连同梵塔、庙宇等，都早已经灰飞烟灭。  
> -- Wiki


