#!/bin/sh -vx
#
# 主动推送：最为快速的提交方式，建议您将站点当天新产出链接立即通过此方式推送给百度，以保证新链接可以及时被百度收录。
# 使用主动推送功能会达到怎样效果
#     及时发现：可以缩短百度爬虫发现您站点新链接的时间，使新发布的页面可以在第一时间被百度收录
#　   保护原创：对于网站的最新原创内容，使用主动推送功能可以快速通知到百度，使内容可以在转发之前被百度发现
# 重复提交已经发布的链接会有什么问题？
#     答：会有两个影响。
#       第一，将浪费您提交的配额，每个站点每天可提交的数量是有限制的，如果您都提交了旧链接，当有新链接时可能因为配额耗尽无法提交。
#       第二，如果您经常重复提交旧链接，我们会下调您的配额，您可能会失去主动推送功能的权限
# ref: http://zhanzhang.baidu.com/college/courseinfo?id=267&page=2#04
# ref: http://zhanzhang.baidu.com/linksubmit/index?site=http://www.eastmanjian.cn/

curl -H 'Content-Type:text/plain' --data-binary @sitemap.txt "http://data.zz.baidu.com/urls?site=www.eastmanjian.cn&token=IzOfDAt7CZZuLJmm&type=original"

