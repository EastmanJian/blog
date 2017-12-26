---
layout: post
title: "Datatables jQuery plugin - code editor in browser, with syntax highlight"
date: 2016-06-08 10:56:00 +08:00
categories: Web IT
tags: jQuery JavaScript HTML
---

* content
{:toc}


* Features
    - Sortable
    - Search
    - Filter 
    - Pagination
    - Events
    - API
    - Styling
    - Various data source
* The [official website](https://datatables.net/) provides examples, documents, Manual, References. Organized well.

### Example - Zero Config

```html
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/jq-3.2.1/jq-3.2.1/dt-1.10.16/datatables.min.css"/>
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/jq-3.2.1/jq-3.2.1/dt-1.10.16/datatables.min.js"></script>
<script>
    $(document).ready(function() {
        $('#example').DataTable();
    } );
</script>
...
<body>
<table id="example" class="display">
...
</table>
</body>
```

![Zero Config](https://ejres-1253687085.picgz.myqcloud.com/img/javascript/datatables-eg1.png)

Demo link [here](https://eastmanjian.cn/js_demo/tiy.jsp?sample=jq%2Fplugin%2Fdatatable%2Fzero_config.html).






### More examples  
* [jQuery UI Accordion, datatable plugin, jQuery AJAX read json data](https://eastmanjian.cn/js_demo/tiy.jsp?sample=jq%2Fdemo%2Faccordion_datatable.html)
* [DataTables plugin, with ajax data source, hyper link in table cell](https://eastmanjian.cn/js_demo/tiy.jsp?sample=jq%2Fplugin%2Fdatatable%2Fajax_data_source.html)
* [DataTables plugin, row grouping](https://eastmanjian.cn/js_demo/tiy.jsp?sample=jq%2Fplugin%2Fdatatable%2Frow_grouping.html)
* [DataTables plugin, with js data source](https://eastmanjian.cn/js_demo/tiy.jsp?sample=jq%2Fplugin%2Fdatatable%2Fjs_data_source.html)
* [DataTables plugin, customize features - paging, scroll, ordering](https://eastmanjian.cn/js_demo/tiy.jsp?sample=jq%2Fplugin%2Fdatatable%2Ffeature_enable_disable.html)
* [DataTables plugin, column filter](https://eastmanjian.cn/js_demo/tiy.jsp?sample=jq%2Fplugin%2Fdatatable%2Fcolumn_filter.html)
* [DataTables plugin, filter specific column]()