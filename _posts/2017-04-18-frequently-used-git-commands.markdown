---
layout: post
title: "Frequently used Git commands, important Git concepts"
date: 2017-04-18 00:00:00 +08:00
categories: IT SCM
tags: scm git
---

* content
{:toc}

Like a cheatsheet, a summary of some frequently used Git commands and important Git concepts.

## Frequently Used Git Commands 🈯





|Usage|Command|
|-----|-------|
|设置全局用户名|$ git config --global user.name "Your Name"|
|设置全局邮箱|$ git config --global user.email "email@example.com"|
|Initial当前目录为一个git的repository|$ git init|
|加一个文件到stage|$ git add <filename>|
|加当前目录全部文件到stage|$ git add .|
|提交一次更改(stage -->repo)|$ git commit -m "comment message"|
|对比<file>在stage和working tree之间的差异|$ git diff <file>|
|对比Working Tree与Repo当前commit之间的差异|$ git diff HEAD -- <file>|
|对比Working Directory与上两个commit之间的差异|$ git diff HEAD^^ -- <file>|
|比较两个branch的差异|$ git diff <branch_a>  <branch_b>|
|比较连个commit之间的差异|$ git diff <commitID_a> <commitID_b>|
|工作区，stage, repo之间的状态|$ git status|
|Commit历史，版本历史|$ git log|
|Commit历史，版本历史，每行一个记录|$ git log --pretty=oneline|
|<command>的帮助|$ git help <command>|
|配置表|$ git config --list|
|回退到上一个commit的版本（working tree和stage同时回退)|$ git reset --hard HEAD^|
|回退到commit_ID的版本（working tree和stage同时回退)|$ git reset --hard <commit_ID>|
|回退stage的<file>到commit的版本，相当于unstage|$ git reset HEAD <file>|
|显示git指令历史|$ git reflog|
|让工作区<file>回到回到Stage的状态|$ git checkout -- <file>|
|删除stage中的<file>, 之后git commit则可以删除repo中的<file>|$ git rm <file>|
|删除stage中的<file>,不动working tree中的文件|$ git rm --cached <file>|
|连接远程仓库（SSH形式，需先在github设置public key)。|$ git remote add <remote_repo_name> git@github.com:<github_username>/<repo_name>.git|
|连接远程仓库（HTTPS形式，每次输入password)。|$ git remote add origin https://github.com/<github_user>/<repo>.git|
|删除与远程仓库的连接|$ git remote remove <remote_repo_name>|
|查看远程仓库信息|$ git remote|
|查看详细的远程仓库信息|$ git remote -v|
|查看远程库和local的连接(refs)信息|$ git remote show origin|
|从远程仓库克隆到本地|$ git clone git@github.com:<github_username>/<repo>.git|
|创建新的分支<branch>并切换到该分支|$ git checkout -b <branch>|
|创建新的分支<branch>|$ git branch <branch>|
|查看分支信息|$ git branch|
|合并<branch>到当前branch|$ git merge <branch>|
|删除<branch> (<branch>需已经被merged)|$ git branch -d <branch>|
|图形方式显示版本历史|$ git log --graph|
|不用fast-forward的形式merge|$ git merge --no-ff -m "any comment" <branch>|
|储藏工作现场|$ git stash|
|显示已经储藏的工作现场列表|$ git stash list|
|回复储藏的工作现场，并删除stash|$ git stash pop [<stash_name>]|
|回复储藏的工作现场，并不删除stash|$ git stash apply [<stash_name>]|
|删除stash|$ git stash drop <stash_name>|
|强制删除branch，即使有未merge的修改|$ git branch -D <branch>|
|设置命令别名|$ git config [--global] alias.<alias_name> "<command>"|
|把本地master branch推送到远成仓库, 并建立tracking连接|$ git push -u <remote_repo_name> master|
|向远程库推送branch|$ git push [<remote_name> <branch>]|
|从远程库拉回branch|$ git pull|
|连接远程branch和local branch|$ git branch --set-upstream-to=origin/<branch> <branch_local>|
|从远程库捉回新的改动，但不整合到HEAD|$ git fetch <remote_name>|
|为当前commit打标签|$ git tag <tag>|
|显示所有标签|$ git tag|
|显示<tag>标签的信息|$ git show <tag>|
|删除<tag>|$ git tag -d <tag>|
|把<tag>推送到远程库|$ git push origin <tag>|
|把所有tag推送到远程库|$ git push origin --tags|
|本地<tag>删除后，用此cmd把删除推送到远程库|$ git push origin :refs/tags/<tag>|
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
|fetch|取回远程库更改但本地不前进到最新|
|checkout|切换branch或把文件回退到stage状态|
|branch|分支|
|tag|标签|
|merge|合并分支|
|fast-forward|合并分支时，如果原分支在产生该分支时的commit没有改动过，则用ff方式快捷地合并分支，不生成新的commit。|
|Distributed SCM|分布式版本管理系统，相对于集中式的版本管理系统。在无联网下用户仍然可以继续本地版本管理。|
|git config files (global/repo/system)|git的三种配置文件|
|.gitignore configuration file|git可忽略的文件，不参与版本管理|

