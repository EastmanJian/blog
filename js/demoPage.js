/**
 * Prevent jQuery Mobile auto initialize other page elements
 */
$(document).on( "mobileinit", function() {
	//apply overrides here
	console.log("apply mobileinit overrides");
	$.mobile.autoInitializePage = false;
});

/**
 * load demo and prototypes list data when page is loaded.
 */
$(document).ready(function() {
    $.getJSON("../json/demo_list.json"+"?ver=201802101406", renderDemoList).fail(function(jqxhr, textStatus, error){
      var err = textStatus + ", " + error;
      console.log("Get demo_list.json error. " + err);
    });
});

/**
 * Escape HTML special characters, returns the escaped HTML string.
 * @param string
 * @returns {string}
 */
function escapeHTML( string )
{
    var pre = document.createElement('pre');
    var text = document.createTextNode( string );
    pre.appendChild(text);
    return pre.innerHTML;
}

/**
 * callback function after demo data is loaded, dynamically generate the content, render the UI.
 */
function renderDemoList(result) {
    //add each prototype section
    for (var i = 0; i < result.prototypes.length; i++) {
        var html = "<div><h3>" + result.prototypes[i].tech + "</h3><div><table id='tech" + i
            + "PrototypeList' class='display compact' cellspacing='0' width='100%'></table></div></div>";
        $("#prototypes").append(html);
    }

    //add an overall section with all prototypes data
    var html = "<div><h3>All Prototypes</h3><div><table id='allPrototypes' "
        + "class='display compact' cellspacing='0' width='100%'></table></div></div>";
    $("#prototypes").append(html);

    //render accordion
    $("#prototypes").accordion({
        header: "> div > h3",
        heightStyle: "content",
        collapsible: true,
        //save the activated panel to local storage
        activate: function (event, ui) {
            console.log("Panel moves to " + $(this).accordion("option", "active") + ". Saved to localStorage.");
            localStorage.activatedPanel = $(this).accordion("option", "active");
        },
        //load the activated panel last time when it's saved
        create:  function (event, ui) {
            if (localStorage.activatedPanel) {
                console.log("The active panel last time is " + localStorage.activatedPanel + ".");
                $(this).accordion("option", "active", Number(localStorage.activatedPanel));
            }
        }
    }).sortable({ //make accordion sortable with drag and drop
        axis: "y",
        handle: "h3",
        stop: function (event, ui) {
            // IE doesn't register the blur when sorting
            // so trigger focusout handlers to remove .ui-state-focus
            ui.item.children("h3").triggerHandler("focusout");

            // Refresh accordion to handle new order
            $(this).accordion("refresh");
        }
    });

    //construct table data arrays from the source json
    var tableData = [];
    var link;
    for (var i = 0; i < result.prototypes.length; i++) {
        tableData[i] = [];
        for (var j = 0; j < result.prototypes[i].list.length; j++) {
            tableData[i][j] = [];
            tableData[i][j][0] = result.prototypes[i].list[j][0];
            link = result.prototypes[i].list[j][2];
            if (result.prototypes[i].list[j][3] == "TIY") {
                //using TIY function to show the prototype
                link = "https://eastmanjian.cn/js_demo/tiy.jsp?sample=" + encodeURIComponent(link);
                link = link.replace("sample=https%3A%2F%2Feastmanjian.cn%2Fjs_demo%2F", "sample=");
            }
            //construct the 'a' tag
            tableData[i][j][1] = '<A HREF="' + link + '">' + escapeHTML(result.prototypes[i].list[j][1]) + '</A>';
        }
    }

    //render datatables for each prototype section
    for (var i = 0; i < result.prototypes.length; i++) {
        $('#tech' + i + 'PrototypeList').DataTable({
            data: tableData[i],
            columns: [
                {title: "Categories",  "orderable": false},
                {title: "Example"}
            ],
            initComplete: function () { //generate column filter
                var column = this.api().column(0);

                var select = $('<select class="columnSelect"><option value="All Categories">All Categories</option></select>')
                    .appendTo($(column.header()).empty())
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex($(this).val());
                        column
                            .search(val == "All Categories" ? '' : '^' + val + '$', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            }
        });
    }

    //construct the all prototype data array
    var allPrototypeList = [];
    var tempList;
    for (var i = 0; i < result.prototypes.length; i++) {
        tempList = [];
        for (var j = 0; j < tableData[i].length; j++) {
            tempList[j] = tableData[i][j].slice(); //clone the array
        }
        for (var j = 0; j < tempList.length; j++) { //add technology column as the 1st column
            tempList[j].unshift(result.prototypes[i].tech);
        }
        allPrototypeList = allPrototypeList.concat(tempList);
    }

    //render datatables for all-prototype section
    $('#allPrototypes').DataTable({
        data: allPrototypeList,
        columns: [
            {title: "Technology", "orderable": false},
            {title: "Category", "orderable": false},
            {title: "Example"}
        ],
        initComplete: function () { //generate column filters
            //Technology column filter
            var column0 = this.api().column(0);
            var select = $('<select class="columnSelect"><option value="All Technologies">All Technologies</option></select>')
                .appendTo($(column0.header()).empty())
                .on('change', function () {
                    var val = $.fn.dataTable.util.escapeRegex($(this).val());
                    column0
                        .search(val == "All Technologies" ? '' : '^' + val + '$', true, false)
                        .draw();
                });
            column0.data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });

            //Category column filter
            var column1 = this.api().column(1);
            var select = $('<select class="columnSelect"><option value="All Categories">All Categories</option></select>')
                .appendTo($(column1.header()).empty())
                .on('change', function () {
                    var val = $.fn.dataTable.util.escapeRegex($(this).val());
                    column1
                        .search(val == "All Categories" ? '' : '^' + val + '$', true, false)
                        .draw();
                });
            column1.data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });
        }
    });
}
    
