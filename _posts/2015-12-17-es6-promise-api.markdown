---
layout: post
title: "ES6 Promise API, Promise Pattern, Asynchronous Codes"
date: 2015-12-17 15:59:00 +08:00
categories: Web IT
tags: JavaScript ES6 AJAX
---

* content
{:toc}

### Notes about ES6 Promise API
* JavaScript execution model
    - single thread, each website
    - main thread maintains a queue, which has asynchronous tasks
    - HTML5 introduced web workers, which are the actual threads
* Asynchronous code
    - Event pattern. e.g. AJAX codes using ECMA script
    - Callback pattern. e.g. jQuery AJAX 
    - Promise pattern - new in ES6
* Promise pattern pattern removes the common code issues that the event and callback pattern had below.
    - It is difficult to catch the exceptions, as we have to use multiple try and catch statements.
    - The code is harder to read, as it's difficult to follow the code flow due to the nested function calls.
    - It's difficult to maintain the state of the asynchronous operation.

### Examples
* [Promise API, resolve(), then()](https://eastmanjian.cn/js_demo/tiy.jsp?sample=es6%2Fpromise_resolve_then.html)
* [Combine one or more promises into new promises, Promise.all()](https://eastmanjian.cn/js_demo/tiy.jsp?sample=es6%2Fpromise_all.html)
* [Promise.race() - race between Promises and see which one finishes first](https://eastmanjian.cn/js_demo/tiy.jsp?sample=es6%2Fpromise_race.html)






* Project sample, using Promise API to wrap an AJAX REST request.  

```javascript
/**
 * wrapper function for AJAX REST request.
 * @param params - The parameter object contains REST request parameters.
 *                  Including: type (method), url, contentType, accept, data.
 * @returns {Promise} - The promise object produced by an AJAX call.
 */
function ajaxRestReq(params) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status == 200) {
                resolve(xhr.responseText);
            } else {
                reject("Server Error: " + xhr.status);
            }
        }
        xhr.onerror = () => {
            reject("XMLHttpRequest Error:"  + xhr.status);
        }
        xhr.open(params.type, params.url, true);
        xhr.setRequestHeader("Content-type", params.contentType);
        xhr.setRequestHeader("Accept", params.accept);
        xhr.send(params.data);
    });
}

/**
 * Add a comment and store the data to the REST service.
 */
function addDelightalkComment() {
    let user = document.querySelector("#delightalkUserName").value;
    let userName = (user == "") ? "Anonymous" : user;
    let commentContent = document.querySelector("#delightalkCommentInput").value;
    if (commentContent == "") {
        document.querySelector("#delightalkCommentInput").focus();
        return;
    }
    let btnAddComment = document.querySelector("#addDelightalkCommentBtn")
    btnAddComment.innerText = "Publishing";
    btnAddComment.disabled = true;
    let commentItem = {
        pageURL: delightParams.pageUrlId,
        user: userName,
        comment: commentContent
    };
    ajaxRestReq({
        url: delightParams.restServiceUrl + delightParams.siteName + '/addComment/',    //remote server test
        type: 'POST',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(commentItem),
        accept: 'application/json',
    }).then(doneAddDelightalkComment, logErr);
}

/**
 * Get recent comments from REST service
 */
function getDelightalkRecentComments() {
    let requestData = {
        pageURL: delightParams.pageUrlId,
        lastN: delightParams.previousComments
    };
    ajaxRestReq({
        url: delightParams.restServiceUrl + delightParams.siteName + '/getRecentComments',  //remote server test
        type: 'PUT',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(requestData),
        accept: 'application/json',
    }).then(renderRecentComments, logErr);
} 

/**
 * Callback function after a new comment is added successfully.
 */
function doneAddDelightalkComment() {
    let btnAddComment = document.querySelector("#addDelightalkCommentBtn")
    btnAddComment.innerText = "Published";
    document.querySelector("#delightalkCommentInput").value = "";
    setTimeout(function () {
        btnAddComment.innerText = " Publish ";
        btnAddComment.disabled = false;
    }, 1500);
    getDelightalkRecentComments();
}

/**
 * Render the REST returned json string into the recent comment section of the page.
 * @param jsonString the json format string contains the recent comment data.
 */
function renderRecentComments(jsonString) {
    let data = JSON.parse(jsonString);
    let htmlTxt = '';
    for (i = data.recentComments.length - 1; i >= 0; i--) {
        htmlTxt += '<div class="a-delightalk-comment">'
                +    '<header id="recentCmtHeader">'
                +      '<span id="delightalkCommentUser">'
                +        '<i class="fa fa-user comment-icon" aria-hidden="true"></i>'
                +        escapeHtml(data.recentComments[i].user + ' ')
                +      '</span>'
                +      '<span id="delightalkCommentDate">'
                +        '<i class="fa fa-clock-o comment-icon" aria-hidden="true"></i>'
                +        (new Date(data.recentComments[i].timestamp)).Format("yyyy-MM-dd hh:mm:ss")
                +      '</span>'
                +    '</header>'
                +    '<article  id="delightalkCommentContent">'
                +      escapeHtml(data.recentComments[i].comment)
                +    '</article>'
                +  '</div>';
    }
    document.querySelector("#recentDelightalkComments").innerHTML = htmlTxt;
}

/**
 * Callback function in case ajax request error.
 * @param reason - the error reason
 */
function logErr(reason) {
    console.log(reason);
}
```

