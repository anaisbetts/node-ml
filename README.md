# node-ml

node-ml is a version of node.js that runs your code in an node.js-based environment with WebGL enabled. This allows you to use web-based Machine Learning libraries such as Tensorflow.js, but access files directly via `fs`.

### Using top-level async/await 

Some libraries such as Tensorflow.js export their computation methods as Promise-based methods - if you want your script to wait on a Promise before exiting, export a function `main()` in your script.

```js
export async function main() {
  await trainDataset();

  console.log("Finished training");
}
```

### What if I want to use (Babel / TypeScript)?

node-ml has Babel and TypeScript built-in, via [electron-compile](https://github.com/electron-userland/electron-compile) - most ES2018 and TypeScript code will Just Work out of the box. If you want to create a custom configuration for either, add a `.compilerc` file to the root of your project (see the README for electron-compile on how to set up a `.compilerc`).

### How does this work?

node-ml runs your script in an Electron environment with node.js's standard library enabled - this allows you to do node.js'y things, but with hardware accelerated DOM / WebGL. This allows us to run GPU shaders without having to install CUDA et al.