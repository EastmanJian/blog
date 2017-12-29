---
layout: post
title: "Trouble Shooting: Who killed my process? - Linux OOM Killer"
date: 2015-10-20 21:06:00 +08:00
categories: Linux IT
tags: Linux
---

* content
{:toc}

# Symptom 
In the Linux Cloud VPS (CentOS or Ubuntu), one of the server important java process crashes from time to time, usually twice a day. No logs was found on the java process when it was crashed suddenly.

# Diagnostic

Check the system message log: /var/log/messages (CentOS), /var/log/kern.log (Ubuntu). Found the following logs about oom-killer:  

```
Oct 20 00:35:01 localhost systemd: Starting Session 1934 of user root.
Oct 20 00:35:01 localhost systemd: Started Session 1935 of user root.
...
Oct 20 00:38:01 localhost systemd: Started Session 1941 of user root.
Oct 20 00:38:01 localhost systemd: Starting Session 1941 of user root.
Oct 20 00:38:32 localhost kernel: java invoked oom-killer: gfp_mask=0x201da, order=0, oom_score_adj=0
Oct 20 00:38:32 localhost kernel: java cpuset=/ mems_allowed=0
Oct 20 00:38:32 localhost kernel: CPU: 0 PID: 22113 Comm: java Not tainted 3.10.0-514.21.1.el7.x86_64 #1
Oct 20 00:38:32 localhost kernel: Hardware name: Bochs Bochs, BIOS Bochs 01/01/2011
Oct 20 00:38:32 localhost kernel: ffff88003b704e70 0000000026e95aa3 ffff88003cedb938 ffffffff81686f13
Oct 20 00:38:32 localhost kernel: ffff88003cedb9c8 ffffffff81681ebe ffffffff810eb0dc ffff88003d2e91a0
Oct 20 00:38:32 localhost kernel: ffff88003d2e91b8 0000000000000206 ffff88003b704e70 ffff88003cedb9b8
Oct 20 00:38:32 localhost kernel: Call Trace:
Oct 20 00:38:32 localhost kernel: [<ffffffff81686f13>] dump_stack+0x19/0x1b
Oct 20 00:38:32 localhost kernel: [<ffffffff81681ebe>] dump_header+0x8e/0x225
Oct 20 00:38:32 localhost kernel: [<ffffffff810eb0dc>] ? ktime_get_ts64+0x4c/0xf0
Oct 20 00:38:32 localhost kernel: [<ffffffff8113d21f>] ? delayacct_end+0x8f/0xb0
Oct 20 00:38:32 localhost kernel: [<ffffffff81184cfe>] oom_kill_process+0x24e/0x3c0
Oct 20 00:38:32 localhost kernel: [<ffffffff8118479d>] ? oom_unkillable_task+0xcd/0x120
Oct 20 00:38:32 localhost kernel: [<ffffffff81184846>] ? find_lock_task_mm+0x56/0xc0
Oct 20 00:38:32 localhost kernel: [<ffffffff81185536>] out_of_memory+0x4b6/0x4f0
Oct 20 00:38:32 localhost kernel: [<ffffffff816829c7>] __alloc_pages_slowpath+0x5d7/0x725
Oct 20 00:38:32 localhost kernel: [<ffffffff8118b645>] __alloc_pages_nodemask+0x405/0x420
Oct 20 00:38:32 localhost kernel: [<ffffffff811cf7fa>] alloc_pages_current+0xaa/0x170
Oct 20 00:38:32 localhost kernel: [<ffffffff81180bd7>] __page_cache_alloc+0x97/0xb0
Oct 20 00:38:32 localhost kernel: [<ffffffff81183750>] filemap_fault+0x170/0x410
Oct 20 00:38:32 localhost kernel: [<ffffffffa01a0016>] ext4_filemap_fault+0x36/0x50 [ext4]
Oct 20 00:38:32 localhost kernel: [<ffffffff811ac88c>] __do_fault+0x4c/0xc0
Oct 20 00:38:32 localhost kernel: [<ffffffff811acd23>] do_read_fault.isra.42+0x43/0x130
Oct 20 00:38:32 localhost kernel: [<ffffffff811b14b1>] handle_mm_fault+0x6b1/0xfe0
Oct 20 00:38:32 localhost kernel: [<ffffffff81327408>] ? call_rwsem_down_read_failed+0x18/0x30
Oct 20 00:38:32 localhost kernel: [<ffffffff81692a84>] __do_page_fault+0x154/0x450
Oct 20 00:38:32 localhost kernel: [<ffffffff8132746b>] ? call_rwsem_wake+0x1b/0x30
Oct 20 00:38:32 localhost kernel: [<ffffffff81692db5>] do_page_fault+0x35/0x90
Oct 20 00:38:32 localhost kernel: [<ffffffff8168efc8>] page_fault+0x28/0x30
Oct 20 00:38:32 localhost kernel: Mem-Info:
Oct 20 00:38:32 localhost kernel: active_anon:223191 inactive_anon:36 isolated_anon:0#012 active_file:51 inactive_file:1081 isolated_file:0#012 unevictable:0 dirty:0 writeback:0 unstable:0#012 slab_reclaimable:3501 slab_unreclaimable:2500#012 mapped:22 shmem:86 pagetables:1497 bounce:0#012 free:12237 free_pcp:0 free_cma:0
Oct 20 00:38:32 localhost kernel: Node 0 DMA free:4600kB min:704kB low:880kB high:1056kB active_anon:10308kB inactive_anon:0kB active_file:0kB inactive_file:0kB unevictable:0kB isolated(anon):0kB isolated(file):0kB present:15992kB managed:15908kB mlocked:0kB dirty:0kB writeback:0kB mapped:0kB shmem:0kB slab_reclaimable:80kB slab_unreclaimable:76kB kernel_stack:32kB pagetables:96kB unstable:0kB bounce:0kB free_pcp:0kB local_pcp:0kB free_cma:0kB writeback_tmp:0kB pages_scanned:10 all_unreclaimable? yes
Oct 20 00:38:32 localhost kernel: lowmem_reserve[]: 0 975 975 975
Oct 20 00:38:32 localhost kernel: Node 0 DMA32 free:44348kB min:44348kB low:55432kB high:66520kB active_anon:882456kB inactive_anon:144kB active_file:204kB inactive_file:4324kB unevictable:0kB isolated(anon):0kB isolated(file):0kB present:1032184kB managed:1000608kB mlocked:0kB dirty:0kB writeback:0kB mapped:88kB shmem:344kB slab_reclaimable:13924kB slab_unreclaimable:9924kB kernel_stack:2752kB pagetables:5892kB unstable:0kB bounce:0kB free_pcp:0kB local_pcp:0kB free_cma:0kB writeback_tmp:0kB pages_scanned:7017 all_unreclaimable? yes
Oct 20 00:38:32 localhost kernel: lowmem_reserve[]: 0 0 0 0
Oct 20 00:38:32 localhost kernel: Node 0 DMA: 7*4kB (UEM) 6*8kB (UEM) 5*16kB (UE) 5*32kB (UEM) 3*64kB (UEM) 2*128kB (UM) 3*256kB (UEM) 2*512kB (UE) 2*1024kB (EM) 0*2048kB 0*4096kB = 4604kB
Oct 20 00:38:32 localhost kernel: Node 0 DMA32: 304*4kB (UEM) 241*8kB (UEM) 148*16kB (UEM) 82*32kB (UEM) 40*64kB (UEM) 29*128kB (UE) 17*256kB (UE) 16*512kB (UE) 13*1024kB (UEM) 0*2048kB 1*4096kB (M) = 44360kB
Oct 20 00:38:32 localhost kernel: Node 0 hugepages_total=0 hugepages_free=0 hugepages_surp=0 hugepages_size=2048kB
Oct 20 00:38:32 localhost kernel: 1232 total pagecache pages
Oct 20 00:38:32 localhost kernel: 0 pages in swap cache
Oct 20 00:38:32 localhost kernel: Swap cache stats: add 0, delete 0, find 0/0
Oct 20 00:38:32 localhost kernel: Free swap  = 0kB
Oct 20 00:38:32 localhost kernel: Total swap = 0kB
Oct 20 00:38:32 localhost kernel: 262044 pages RAM
Oct 20 00:38:32 localhost kernel: 0 pages HighMem/MovableOnly
Oct 20 00:38:32 localhost kernel: 7915 pages reserved
Oct 20 00:38:32 localhost kernel: [ pid ]   uid  tgid total_vm      rss nr_ptes swapents oom_score_adj name
Oct 20 00:38:32 localhost kernel: [  327]     0   327    13335       83      30        0             0 systemd-journal
Oct 20 00:38:32 localhost kernel: [  355]     0   355    29724       83      26        0             0 lvmetad
Oct 20 00:38:32 localhost kernel: [  428]     0   428    13855      112      28        0         -1000 auditd
Oct 20 00:38:32 localhost kernel: [  447]   998   447   132401     1880      56        0             0 polkitd
Oct 20 00:38:32 localhost kernel: [  448]    81   448     6656      145      17        0          -900 dbus-daemon
Oct 20 00:38:32 localhost kernel: [  453]     0   453    83142      198      54        0             0 rsyslogd
Oct 20 00:38:32 localhost kernel: [  455]     0   455   138416     2665      87        0             0 tuned
Oct 20 00:38:32 localhost kernel: [  457]   997   457     2131       37       9        0             0 lsmd
Oct 20 00:38:32 localhost kernel: [  458]     0   458     6115      145      14        0             0 systemd-logind
Oct 20 00:38:32 localhost kernel: [  465]     0   465    26490      248      55        0         -1000 sshd
Oct 20 00:38:32 localhost kernel: [  466]     0   466     1083       34       7        0             0 acpid
Oct 20 00:38:32 localhost kernel: [  472]     0   472    31565      167      18        0             0 crond
Oct 20 00:38:32 localhost kernel: [  473]     0   473     6462       50      17        0             0 atd
Oct 20 00:38:32 localhost kernel: [  583]     0   583     9461     4630      14        0             0 secu-tcs-agent
Oct 20 00:38:32 localhost kernel: [  597]     0   597    27509       32      10        0             0 agetty
Oct 20 00:38:32 localhost kernel: [  598]     0   598    27509       33      10        0             0 agetty
Oct 20 00:38:32 localhost kernel: [ 1926]     0  1926    24323       87      19        0             0 sgagent
Oct 20 00:38:32 localhost kernel: [ 1938]     0  1938    37868     1466      28        0             0 barad_agent
Oct 20 00:38:32 localhost kernel: [ 1944]     0  1944    41643     1882      34        0             0 barad_agent
Oct 20 00:38:32 localhost kernel: [ 1945]     0  1945   132591     2071      42        0             0 barad_agent
Oct 20 00:38:32 localhost kernel: [ 2042]     0  2042     1770     1367       6        0             0 sap1002
Oct 20 00:38:32 localhost kernel: [ 2049]     0  2049     2820      501       6        0             0 sap1004
Oct 20 00:38:32 localhost kernel: [ 2051]     0  2051     8369     3712      14        0             0 sap1005
Oct 20 00:38:32 localhost kernel: [ 2053]     0  2053     8647     2896      13        0             0 sap1009
Oct 20 00:38:32 localhost kernel: [ 4670]     0  4670    10893      117      21        0         -1000 systemd-udevd
Oct 20 00:38:32 localhost kernel: [13490]     0 13490    37094      347      75        0             0 sshd
Oct 20 00:38:32 localhost kernel: [13493]     0 13493    29012      275      12        0             0 bash
Oct 20 00:38:32 localhost kernel: [21623]    32 21623    16258      152      34        0             0 rpcbind
Oct 20 00:38:32 localhost kernel: [22037]     0 22037   820858   196225     587        0             0 java
Oct 20 00:38:32 localhost kernel: [22303]     0 22303    38873      159      31        0             0 top
Oct 20 00:38:32 localhost kernel: [22304]     0 22304    28164       32      11        0             0 grep
Oct 20 00:38:32 localhost kernel: [22620]     0 22620    37094      348      73        0             0 sshd
Oct 20 00:38:32 localhost kernel: [22624]     0 22624    29012      274      14        0             0 bash
Oct 20 00:38:32 localhost kernel: Out of memory: Kill process 22037 (java) score 751 or sacrifice child
Oct 20 00:38:32 localhost kernel: Killed process 22037 (java) total-vm:3283432kB, anon-rss:784900kB, file-rss:0kB, shmem-rss:0kB
Oct 20 00:39:02 localhost systemd: Started Session 1943 of user root.
Oct 20 00:39:02 localhost systemd: Starting Session 1943 of user root.
...
```

The process 22037 is exactly the target process which has problem.  
But usually, the process occupy only 50% of the total memory. Why it was being killed?  

# Analysis

This is related to the Linux Overcommit Memory Mechanism.  
Setting: /proc/sys/vm/overcommit_memory

> This file details the following 3 modes available for overcommit memory in the Linux kernel:  
> * 0  -  Heuristic overcommit handling.  
> * 1  -  Always overcommit.  
> * 2  -  Don't overcommit.  
> 
> **Mode 0** is the default mode. This allows for processes to overcommit "reasonable" amounts of memory. If a process attempts to allocate an "unreasonable" amount of memory (as determined by internal heuristics), the memory allocation attempt is denied. In this mode, if many applications perform small overcommit allocations, it is possible for the server to run out of memory. In this situation, the Out of Memory killer (oom-kill) will be used to kill processes until enough memory is available for the server to continue operating.  
> 启发式策略，比较严重的Overcommit将不能得逞，比如你突然申请了128TB的内存。而轻微的overcommit将被允许。另外，root能Overcommit的值比普通用户要稍微多些。  
> 
> **Mode 1** allows processes to commit as much memory as requested. These allocations will never result in an "out of memory" error. This mode is usually appropriate only in specific scientific applications.  
> 永远允许overcommit，这种策略适合那些不能承受内存分配失败的应用，比如某些科学计算应用。
> 
> **Mode 2** prevents memory overcommit and limits the amount of memory that is available for a process to allocate. This model ensures that processes will not be randomly killed by the oom-killer, and that there will always be enough memory for the kernel to operate properly. The total amount of memory available for use by the system is determined through the following calculation:  
> * Total Commit Memory = (swap size + (RAM size x overcommit_ratio))    
> 
> By default, overcommit_ratio is set to 50. With this setting, the total commit memory size will be equal to the total amount of swap space in the server, plus 50% of the RAM. In other words, if a server has 1 GB of RAM, and 1GB of swap space, the system would have a total commit limit of 1.5GB.  
> 永远禁止overcommit，在这个情况下，系统所能分配的内存不会超过swap+RAM*系数（/proc/sys/vm/overcommit_ratio，默认50%，你可以调整），如果这么多资源已经用光，那么后面任何尝试申请内存的行为都会返回错误，这通常意味着此时没法运行任何新程序。

> 因为某时刻应用程序大量请求内存导致系统内存不足造成的，这通常会触发 Linux 内核里的 Out of Memory (OOM) killer，OOM killer 会杀掉某个进程以腾出内存留给系统用，不致于让系统立刻崩溃。  

> By default, Linux follows an optimistic memory allocation strategy. This means that when malloc() returns non-NULL there is no guarantee that the memory really is available. This is a really bad bug. In case it turns out that the system is out of memory, one or more processes will be killed by the infamous OOM killer. In case Linux is employed under circumstances where it would be less desirable to suddenly lose some randomly picked processes, and moreover the kernel version is sufficiently recent, one can switch off this overcommitting behavior using a command like:  
> `$ echo 2 > /proc/sys/vm/overcommit_memory`


# Possible resolution options

1) Tune /proc/sys/vm/overcommit_ratio & vm.overcommit_memory (@/etc/sysctl.conf)  
通过调整overcommit_ratio & vm.overcommit_memory完全关闭 OOM killer（不推荐用在生产环境）：
先调整/proc/sys/vm/overcommit_ratio，默认50%
再设置
`$ sysctl -w vm.overcommit_memory=2`
//or
`$ echo "vm.overcommit_memory=2" >> /etc/sysctl.conf`


2) Tune min_free_kbytes  
> 绝大部分内存都是被Page Cache所占用。Linux内核的策略是最大程度的利用内存cache 文件系统的数据，提高IO速度，虽然在机制上是有进程需要更大的内存时，会自动释放Page Cache,但不排除释放不及时或者释放的内存由于存在碎片不满足进程的内存需求。  
>    所以我们需要一个方法，能够限定PageCache的上限。  
> Linux 提供了这样一个参数min_free_kbytes，用来确定系统开始回收内存的阀值，控制系统的空闲内存。值越高，内核越早开始回收内存，空闲内存越高。  

```
[root@zyite-app01 root]# cat /proc/sys/vm/min_free_kbytes
163840
echo 963840 > /proc/sys/vm/min_free_kbytes
```

3) Tune oom_score_adj  
> 我们可以在用户空间通过操作每个进程的 oom_adj 内核参数来决定哪些进程不这么容易被 OOM killer 选中杀掉。  
> 比如，如果不想 MySQL 进程被轻易杀掉的话可以找到 MySQL 运行的进程号后，调整 oom_score_adj 为 -15（注意 points 越小越不容易被杀）：

```
# ps aux | grep mysqld
mysql    2196  1.6  2.1 623800 44876 ?        Ssl  09:42   0:00 /usr/sbin/mysqld
# cat /proc/2196/oom_score_adj
0
//change oom_score_adj to -15
# echo -15 > /proc/2196/oom_score_adj
```

4) Shotdown oom-killer by /proc/sys/vm/oom-kill & vm.oom-kill (@/etc/sysctl.conf)

```
cat /proc/sys/vm/oom-kill
echo "0" > /proc/sys/vm/oom-kill
vi /etc/sysctl.conf
  vm.oom-kill = 0
```

# Final Solution

Option 3 is working fine. But it need to adjust the value each time the process is restarted.

```
root@VM_95_53_centos:/proc/sys/vm
$ echo -1000 > /proc/5859/oom_score_adj
```

Option 4 is working fine.

```
root@VM_95_53_centos:/proc/sys/vm
$ echo 0 > oom-kill
-bash: oom-kill: No such file or directory
# no oom-kill file under the dir, but it just cannot be created.

root@VM_95_53_centos:/proc/sys/vm
$ vi /etc/sysctl.conf
#added below line
vm.oom-kill = 0
```




