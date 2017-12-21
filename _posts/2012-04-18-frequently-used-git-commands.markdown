---
layout: post
title: "Frequently used Git commands, important Git concepts"
date: 2012-04-18 00:00:00 +08:00
categories: SCM IT
tags: scm git
---

* content
{:toc}

Like a cheatsheet, a summary of some frequently used Git commands and important Git concepts.  
![Git](https://git-scm.com/images/logo@2x.png)

## Frequently Used Git Commands 🈯





|Usage|Command|
|-----|-------|
|设置全局用户名|$ git config --global user.name "Your Name"|
|设置全局邮箱|$ git config --global user.email "email@example.com"|
|Initial当前目录为一个git的repository|$ git init|
|加一个文件到stage|$ git add &lt;filename&gt;|
|加全部改变到stage|$ git add -A|
|提交一次更改(stage --&gt;repo)|$ git commit -m "comment message"|
|对比&lt;file&gt;在stage和working tree之间的差异|$ git diff &lt;file&gt;|
|对比Working Tree与Repo当前commit之间的差异|$ git diff HEAD -- &lt;file&gt;|
|对比Working Directory与上两个commit之间的差异|$ git diff HEAD^^ -- &lt;file&gt;|
|比较两个branch的差异|$ git diff &lt;branch_a&gt;  &lt;branch_b&gt;|
|比较连个commit之间的差异|$ git diff &lt;commitID_a&gt; &lt;commitID_b&gt;|
|工作区，stage, repo之间的状态|$ git status|
|Commit历史，版本历史|$ git log|
|Commit历史，版本历史，每行一个记录|$ git log --pretty=oneline|
|&lt;command&gt;的帮助|$ git help &lt;command&gt;|
|配置表|$ git config --list|
|回退到上一个commit的版本（working tree和stage同时回退)|$ git reset --hard HEAD^|
|回退到commit_ID的版本（working tree和stage同时回退)|$ git reset --hard &lt;commit_ID&gt;|
|回退stage的&lt;file&gt;到commit的版本，相当于unstage|$ git reset HEAD &lt;file&gt;|
|显示git指令历史|$ git reflog|
|让工作区&lt;file&gt;回到回到Stage的状态|$ git checkout -- &lt;file&gt;|
|删除stage中的&lt;file&gt;, 之后git commit则可以删除repo中的&lt;file&gt;|$ git rm &lt;file&gt;|
|删除stage中的&lt;file&gt;,不动working tree中的文件|$ git rm --cached &lt;file&gt;|
|连接远程仓库（SSH形式，需先在github设置public key)。|$ git remote add &lt;remote_repo_name&gt; git@github.com:&lt;github_username&gt;/&lt;repo_name&gt;.git|
|连接远程仓库（HTTPS形式，每次输入password)。|$ git remote add origin https://github.com/&lt;github_user&gt;/&lt;repo&gt;.git|
|删除与远程仓库的连接|$ git remote remove &lt;remote_repo_name&gt;|
|查看远程仓库信息|$ git remote|
|查看详细的远程仓库信息|$ git remote -v|
|查看远程库和local的连接(refs)信息|$ git remote show origin|
|从远程仓库克隆到本地|$ git clone git@github.com:&lt;github_username&gt;/&lt;repo&gt;.git|
|创建新的分支&lt;branch&gt;并切换到该分支|$ git checkout -b &lt;branch&gt;|
|创建新的分支&lt;branch&gt;|$ git branch &lt;branch&gt;|
|查看分支信息|$ git branch|
|合并&lt;branch&gt;到当前branch|$ git merge &lt;branch&gt;|
|删除&lt;branch&gt; (&lt;branch&gt;需已经被merged)|$ git branch -d &lt;branch&gt;|
|图形方式显示版本历史|$ git log --graph|
|不用fast-forward的形式merge|$ git merge --no-ff -m "any comment" &lt;branch&gt;|
|储藏工作现场|$ git stash|
|显示已经储藏的工作现场列表|$ git stash list|
|回复储藏的工作现场，并删除stash|$ git stash pop [&lt;stash_name&gt;]|
|回复储藏的工作现场，并不删除stash|$ git stash apply [&lt;stash_name&gt;]|
|删除stash|$ git stash drop &lt;stash_name&gt;|
|强制删除branch，即使有未merge的修改|$ git branch -D &lt;branch&gt;|
|设置命令别名|$ git config [--global] alias.&lt;alias_name&gt; "&lt;command&gt;"|
|把本地master branch推送到远成仓库, 并建立tracking连接|$ git push -u &lt;remote_repo_name&gt; master|
|向远程库推送branch|$ git push [&lt;remote_name&gt; &lt;branch&gt;]|
|从远程库拉回branch|$ git pull|
|连接远程branch和local branch|$ git branch --set-upstream-to=origin/&lt;branch&gt; &lt;branch_local&gt;|
|从远程库捉回新的改动，但不整合到HEAD|$ git fetch &lt;remote_name&gt;|
|为当前commit打标签|$ git tag &lt;tag&gt;|
|显示所有标签|$ git tag|
|显示&lt;tag&gt;标签的信息|$ git show &lt;tag&gt;|
|删除&lt;tag&gt;|$ git tag -d &lt;tag&gt;|
|把&lt;tag&gt;推送到远程库|$ git push origin &lt;tag&gt;|
|把所有tag推送到远程库|$ git push origin --tags|
|本地&lt;tag&gt;删除后，用此cmd把删除推送到远程库|$ git push origin :refs/tags/&lt;tag&gt;|
|定义git push的默认行为，2.0之后趋向simple option|$ git config --global push.default matching/simple|


## Important Git Concepts 💡

|Concept|Description|
|-------|-----------|
|Working Directory (or Working Tree)|工作区|
|Repository|版本库|
|Stage (or Index)|缓存区|
|HEAD|指向当前工作branch的当前commit|
|Remote Repository|远程仓库|
|commit|提交更改，形成一次改动记录|
|push|推送到远程库|
|pull|从远程库取回更改到本地|
|fetch|取回远程库更改但本地不前进到最新的commit|
|checkout|切换branch或把文件回退到stage状态|
|branch|分支|
|tag|标签|
|merge|合并分支|
|fast-forward|合并分支时，如果原分支在产生该分支时的commit没有改动过，则用ff方式快捷地合并分支，不生成新的commit。|
|Distributed SCM|分布式版本管理系统。相对于集中式的版本管理系统，在无联网下用户仍然可以继续本地版本管理。|
|git config files (global/repo/system)|git的三种配置文件|
|.gitignore configuration file|git可忽略的文件，不参与版本管理|

