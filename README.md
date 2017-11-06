# simple-timing

> The simple-timing can tell you some important timing in your application。
>
> Reference: timing.js
>
> 简单地封装了[Navigation Timing API](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigation_timing_API)，计算一些比较常见或是重要的耗时比如TCP，DNS，TTFB。

## How to import

### Browser

Just download an use `<scrpit>` tag to import.

```html
<script type="text/scrpit" src="simple-timing.js"></script>
```

### npm

```sh
$ npm install simple-timing
```

## How to use

### print

```sh
sTiming.print()
sTiming.print(string)
sTiming.print(Array)
```
Print a table of timing.

![print1](http://oyz5c7ayg.bkt.clouddn.com/sTiming-1.png)

Params can be a string, or an array, or the combination。

![print2](http://oyz5c7ayg.bkt.clouddn.com/sTiming-2.png)

![print3](http://oyz5c7ayg.bkt.clouddn.com/sTiming-3.png)

![print4](http://oyz5c7ayg.bkt.clouddn.com/sTiming-4.png)

### addTiming

```sh
sTiming.addTiming(name, end, start)
```

User can add custom timing use `addTiming`, such as 
```javascript
sTiming.addTiming('newTiming', 'loadEventEnd', 'navigationStart')
```


