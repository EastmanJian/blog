---
layout: post
title: "A* Algorithm - Search the Shortest Path Between Two Vertices in a Graph (Java Impl.)"
date: 2018-02-28 21:29:00 +08:00
categories: Algorithm IT
tags: Algorithm Java AI
---

* content
{:toc}

Help Mario find a shortest path to the mushroom!  
路是靠走出来的，还是靠搜出来的？关键是向着目标勇敢前进。

![A-start](https://ejres-1253687085.picgz.myqcloud.com/img/path/astar.gif)

A* algorithm is a popular choice of weighted graph search for a shortest path from one location to another.




### About A* Algorithm  
A* algorithm is a popular choice of weighted graph search for a shortest path from one location to another.  
Generally speaking, A* combines Dijkstra's and a Greedy Best-first Search algorithm (which represented by a heuristic function (启发函数)).  

A* vs Dijkstra vs Greedy Best-first Search  
- Dijkstra search the path by exploring all directions.  
- Greedy Best First Search explores in promising (有希望的) directions but it may not find the shortest path.  
- A* explores in promising direction and guaranteed to find the shortest path if the heuristic is never larger than the true distance.   
- In general, A* explores less than Dijkstra while searching the path to the destination.  

In the standard terminology used when talking about A* , g(n) represents the exact cost of the path from the starting point to any vertex n, and h(n) represents the heuristic estimated cost from vertex n to the goal.  A* balances the two as it moves from the starting point to the goal. Each time through the main loop, it examines the vertex n that has the lowest f(n) = g(n) + h(n).  

A tie breaker (决胜因子) p can be applied to the heuristic function, heuristic \*= (1.0 + p). 
- Scale h upwards will avoid A* exploring variant path of the same length in a grid maps, and let A* will prefer to expand vertices close to the goal.  
- A different way to break ties is to prefer paths that are along the straight line from the starting point to the goal:  

```java
  dx1 = current.x - goal.x
  dy1 = current.y - goal.y
  dx2 = start.x - goal.x
  dy2 = start.y - goal.y
  cross = abs(dx1*dy2 - dx2*dy1)
  heuristic += cross*0.001
```

This code computes the vector cross-product between the start to goal vector and the current point to goal vector. When these vectors don’t line up, the cross product will be larger. The result is that this code will give some slight preference to a path that lies along the straight line path from the start to the goal. 


### Frequently used Heuristics (启发值，启发函数) for grid maps
- Manhattan distance - for a square grid that allows 4 directions of movement

```javascript
  function heuristic(node) {
      dx = abs(node.x - goal.x)
      dy = abs(node.y - goal.y)
      return D * (dx + dy) //D is the minimum cost for moving from one space to an adjacent space. In the simple case, you can set D to be 1.
  }
```

- Diagonal distance - for grid map allows diagonal movement (8 directions)

```java
  function heuristic(node) {
      dx = abs(node.x - goal.x)
      dy = abs(node.y - goal.y)
      return D * (dx + dy) + (D2 - 2 * D) * min(dx, dy) //D2 is the cost of moving diagonally
  }
```

- Euclidean distance - If your units can move at any angle (instead of grid directions)

```java
  function heuristic(node) {
      dx = abs(node.x - goal.x)
      dy = abs(node.y - goal.y)
      return D * sqrt(dx * dx + dy * dy)
  }
```

### A* Java Implementation 

```java
public class PathFinderAStar {

    /**
     * A* algorithm finding path from grid s to d.
     *
     * @param g - the graph represented by grids.
     * @param s - the starting grid.
     * @param d - the destination grid.
     * @throws InterruptedException
     */
    public static void findPath(Graph g, Grid s, Grid d) throws InterruptedException {
        //define a priority queue to store the grids being searched, sorted by priority
        PriorityQueue<Grid> frontier = new PriorityQueue<>(new PriorityComparator());

        //the shortest path from s to s is zero.
        s.setPriority(0);
        s.setDist(0);
        frontier.offer(s);

        //handle each item in the frontier queue
        Grid current;
        while (!frontier.isEmpty()) { //main loop
            current = frontier.poll();
            current.setKnown(true);

            if (current.getFlag() == DESTINATION) break;

            //visit and set the distance, path, and priority of each unknown adjacent grid, and put it in the frontier priority queue
            for (Grid neighbour : current.getNeighbours()) {
                if (!neighbour.isKnown()) {
                    float newDist = current.getDist() + g.getDist(current, neighbour);
                    if (newDist < neighbour.getDist()) {
                        neighbour.setDist(newDist);
                        float heuristic, p = 0.2f; //tie breaker p
                        if (g.isAllowDiagonal()) {
                            heuristic = heuristicDiagonal(neighbour, d);
                        } else {
                            heuristic = heuristicManhattanWithTie(neighbour, d, s);
                        }
                        //set the grid's priority f(n) = g(n) + h(n), because of the priority queue, each main loop examine the lowest f(n)
                        float priority = newDist + (1 + p) * heuristic;
                        neighbour.setPriority(priority);
                        neighbour.setPath(current);
                        frontier.offer(neighbour);
                        neighbour.visitCnt++; //just for debug, counting the number of visits for each grid
                    }
                }
            }
        }
    }

    /**
     * Normal 4-direction grid map heuristic function - Manhattan distance
     */
    private static float heuristicManhattan(Grid a, Grid b) {
        // Manhattan distance from a to b
        float dx = Math.abs(a.getX() - b.getX());
        float dy = Math.abs(a.getY() - b.getY());
        return dx + dy;
    }

    /**
     * Manhattan distance with Tie Breaker for better straight line up
     */
    private static float heuristicManhattanWithTie(Grid current, Grid goal, Grid start) {
        // Manhattan distance from a to b
        float dx = Math.abs(current.getX() - goal.getX());
        float dy = Math.abs(current.getY() - goal.getY());

        //tie breaker to prefer paths that are along the straight line from the starting point to the goal
        float dx1 = current.getX() - goal.getX();
        float dy1 = current.getY() - goal.getY();
        float dx2 = start.getX() - goal.getX();
        float dy2 = start.getY() - goal.getY();
        //vector cross-product between the start to goal vector and the current point to goal vector
        float cross = Math.abs(dx1*dy2 - dx2*dy1);

        return dx + dy + cross*0.001f;
    }

    /**
     * heuristic function for 8-direction (with diagonal direction) grid map
     */
    private static float heuristicDiagonal(Grid a, Grid b) {
        // Euclid distance from a to b
        float dx = Math.abs(a.getX() - b.getX());
        float dy = Math.abs(a.getY() - b.getY());
        return (dx + dy) + (1.4142f - 2) * Math.min(dx, dy);
    }

    /**
     * If your units can move at any angle, use Euclidean heuristic function
     */
    private static float heuristicEuclid(Grid a, Grid b) {
        // Euclid distance from a to b
        float dx = Math.abs(a.getX() - b.getX());
        float dy = Math.abs(a.getY() - b.getY());
        return (float) Math.sqrt(dx * dx + dy * dy);
    }
}
```

[![full source](https://img.shields.io/badge/Source%20Code-Visit%20GitHub%20for%20the%20full%20source%20code-brightgreen.svg?style=social&logo=github&label=SourceCode)](https://github.com/EastmanJian/algorithm_demo/tree/master/src/main/java/algorithm/graph/pathfinding/grid/astar)

The figure below shows that a Gready Best-first search may not find the shortest path.

![greedy best-first search](https://ejres-1253687085.picgz.myqcloud.com/img/path/greedy.png)

### Let A* solve a maze

The maze map:  
![maze map](https://ejres-1253687085.picgz.myqcloud.com/img/path/maze1-original.png)

The shortest path found by A*.  
![path](https://ejres-1253687085.picgz.myqcloud.com/img/path/maze1-path.png)

The grids A* visisted, with a come from direction for each grid.  
![come from](https://ejres-1253687085.picgz.myqcloud.com/img/path/maze1-comefrom.png)

The actual cost from the beginning grid.  
![cost](https://ejres-1253687085.picgz.myqcloud.com/img/path/maze1-cost.png)

The grids search priority during A* run.  
![priority](https://ejres-1253687085.picgz.myqcloud.com/img/path/maze1-priority.png)

How many times each grid is visited. Some grids are visited more than once because A* found a shorter path for that grid comparing to previous visits.  
![visits](https://ejres-1253687085.picgz.myqcloud.com/img/path/maze1-visits.png)
