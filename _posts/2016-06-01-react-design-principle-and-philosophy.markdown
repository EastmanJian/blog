---
layout: post
title: "React Design Principle and Philosophy"
date: 2016-06-01 19:03:00 +08:00
categories: Web IT
tags: ReactJS JavaScript design
---

* content
{:toc}

# A summary of React design process

### Step 1: Break The UI Into A Component Hierarchy  
* If you’re working with a designer, they may have already done this, so go talk to them! Their Photoshop layer names may end up being the names of your React components!
* deciding if you should create a new function or object: single responsibility principle, that is, a component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller subcomponents.
* UI and data models tend to adhere to the same information architecture.






### Step 2: Build a Static Version in React  
* build a version that takes your data model and renders the UI but has no interactivity. 
* building a static version requires a lot of typing and no thinking, and adding interactivity requires a lot of thinking and not a lot of typing.
* build components that reuse other components and pass data using props.
* Don’t use state at all to build this static version. State is reserved only for interactivity.
* You can build top-down or bottom-up. 
* The components will only have render() methods since this is a static version of your app. 
* React’s one-way data flow (also called one-way binding) keeps everything modular and fast.

### Step 3: Identify The Minimal (but complete) Representation Of UI State  
* The key is DRY: Don’t Repeat Yourself.
* To determine whether a piece of data is state, ask three questions:
    1. Is it passed in from a parent via props? If so, it probably isn’t state.
    2. Does it remain unchanged over time? If so, it probably isn’t state.
    3. Can you compute it based on any other state or props in your component? If so, it isn’t state.

### Step 4: Identify Where Your State Should Live (which component should own the state).  
* For each piece of state in your application:
    - Identify every component that renders something based on that state.
    - Find a common owner component (a single component above all the components that need the state in the hierarchy).
    - Either the common owner or another component higher up in the hierarchy should own the state.
    - If you can’t find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component.

### Step 5: Add Inverse Data Flow  
* The form components deep in the hierarchy need to update the state which the parent owns
* Parent component pass callbacks to the child element that will fire whenever the state should be updated.
* The callback will call setState(), and the app will be updated.


# Demo App
Click [here](https://eastmanjian.cn/react_demo/thinking_in_react).  
[![icon](https://img.shields.io/badge/-Source%20Code-lightgrey.svg)](https://github.com/EastmanJian/react_demo/blob/master/react-demo-app/src/thinkingInReact.js)