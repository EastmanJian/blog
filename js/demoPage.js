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
    $.getJSON("../json/demo_list.json", renderDemoList);
});


/**
 * callback function after demo data is loaded, dynamically generate the content, render the UI.
 */
function renderDemoList(result) {
    console.log(result);
    console.log(result.prototypes.length);

    //add prototypes content
    for (var i = 0; i < result.prototypes.length; i++) {
        console.log(result.prototypes[i].tech);
        var html = "<div><h3>" + result.prototypes[i].tech + "</h3><div><table id='tech" + i
            + "PrototypeList' class='display compact' cellspacing='0' width='100%'></table></div></div>";
        $("#prototypes").append(html);
    }

    //render accordion
    $("#prototypes").accordion({
        header: "> div > h3",
        heightStyle: "content",
        collapsible: true
    }).sortable({
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

    //render datatables
    for (var i = 0; i < result.prototypes.length; i++) {
        $('#tech' + i + 'PrototypeList').DataTable({
            data: result.prototypes[i].list,
            columns: [
                {title: "Category"},
                {title: "Example"}
            ]
        });
    }
}
