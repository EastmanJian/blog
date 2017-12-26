---
layout: post
title: "jQuery 3.0 coming, the changes and new features(mind map)"
date: 2016-07-09 19:15:00 +08:00
categories: Web IT
tags: jQuery JavaScript
---

* content
{:toc}


> jQuery is a cross-platform JavaScript library designed to simplify the client-side scripting of HTML. It is free, open-source software using the permissive MIT license. Web analysis indicates that it is the most widely deployed JavaScript library by a large margin.  
> With the major version of 3.0, the jQuery Core team has taken the opportunity to make changes to clean up the API and fix bugs that may prove to be breaking changes for some code. This includes the removal of previously deprecated public APIs, changes to or removal of undocumented APIs, and changes to the documented or undocumented behavior of existing APIs for specific inputs.  

![jQuery](https://ejres-1253687085.picgz.myqcloud.com/img/jquery/mm-jquery.svg)





> # Summary of Important Changes  
> (Breaking changes and new features)   
>  
> ### Ajax  
> * Breaking change: Special-case Deferred methods removed from jQuery.ajax
> * Breaking change: Cross-domain script requests must be declared
> * Breaking change: Hash in a URL is preserved in a jQuery.ajax() call
> * Feature: New signature for jQuery.get() AND jQuery.post()
> ### Attributes  
> * Breaking change: .removeAttr() no longer sets properties to false
> * Breaking change: select-multiple with nothing selected returns an empty array
> * Feature: SVG documents support class operations
> * Deprecated: .toggleClass() with no arguments and .toggleClass( Boolean )
> ### Callbacks
> * Feature: Locking a Callback prevents only future list execution
> ### Core
> * Breaking change: jQuery 3.0 runs in Strict Mode
> * Breaking change: document-ready handlers are now asynchronous
> * Breaking change: jQuery.isNumeric() and custom .toString()
> * Breaking change: Deprecated .context and .selector properties removed
> * Breaking change: Deprecated .size() removed
> * Breaking change: Undocumented internal methods no longer exposed
> * Breaking change: Return values on empty sets are undefined
> * Feature: for...of loops can be used on jQuery collections
> * Feature: jQuery.ready promise is formally supported
> * Deprecated: jQuery.unique(), renamed to jQuery.uniqueSort()
> * Deprecated: jQuery.parseJSON()
> * Deprecated: document-ready handlers other than jQuery(function)
> ### Data
> * Breaking change: .data() names containing dashes
> ### Deferred
> * Breaking change and Feature: jQuery.Deferred is now Promises/A+ compatible
> * Breaking change and Feature: jQuery.when() arguments
> * Breaking change: jQuery.when() progress notifications
> ### Dimensions
> * Breaking change: .width(), .height(), .css("width"), and .css("height") can return non-integer values
> * Breaking change: .outerWidth() or .outerHeight() on window includes scrollbar width/height
> ### Effects
> * Breaking change: .show(), .hide(), and .toggle() methods now respect more stylesheet changes
> * Feature: Animations now use requestAnimationFrame
> * Deprecated: jQuery.fx.interval
> * Deprecated: Additional easing function parameters
> ### Event
> * Breaking change: .load(), .unload(), and .error() removed
> * Breaking change: .on("ready", fn) removed
> * Breaking change: event.pageX and event.pageY normalization removed
> * Breaking change: jQuery.event.props and jQuery.event.fixHooks removed
> * Breaking change: Delegated events with bad selectors throw immediately
> * Deprecated: .bind() and .delegate()
> ### Manipulation
> * Breaking change: .wrapAll(function) only calls the function once
> ### Offset
> * Breaking change: Invalid input to the .offset() method
> ### Selector
> * Breaking change: Behavior of :hidden and :visible
> * Breaking change: jQuery("#") and .find("#") are invalid syntax
> * Feature: New method jQuery.escapeSelector()
> * Deprecated: jQuery.expr[":"] and jQuery.expr.filters
> ### Serialize
> * Breaking change: jQuery.param() no longer converts %20 to a plus sign
> ### Traversing
> * Breaking change: .andSelf() removed, use .addBack()

