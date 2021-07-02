## 如何引入`svg.draw.js`

`svg.draw.js`是一个 svg.js 插件，它的引用方式是通过全局的`window.SVG`，将插件的功能注入到其中。由于其并不支持`module`方式的引入，所以要找方式引入到本项目，并支持 typescript。

```ts
declare interface Window {
  SVG: any;
}
```
