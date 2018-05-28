# node-gpu

node-gpu is a version of node.js that runs your code in an node.js-based environment with WebGL enabled. This allows you to use web-based Machine Learning libraries such as [Tensorflow.js](https://js.tensorflow.org/), but access files directly via node's `fs` module.

While WebGL-based libraries are certainly not as performant as Python or C++ Tensorflow in GPU mode, it is *much much* easier to set up (especially on macOS), and still is reasonably performant for prototyping 

### Trying it out

Copy the `examples/mnist` folder to an empty folder, then run:

```sh
npm install

# The node-gpu command works just like the node command
npx node-gpu ./index.js

# Here, we've trained a CNN to recognize MNIST digits, to 96% accuracy.
# Running this in a pure CPU environment would take quite awhile, but node-gpu
# can complete it in ~15sec depending on your machine.
96/100 => 96% correct
```

### Using top-level async/await 

Some libraries such as Tensorflow.js export their computation methods as Promise-based methods - if you want your script to wait on a Promise before exiting, export a function `main()` in your script.

```js
export async function main() {
  await trainDataset();

  console.log("Finished training");
}
```

### What if I want to use (Babel / TypeScript)?

node-gpu has Babel and TypeScript built-in, via [electron-compile](https://github.com/electron-userland/electron-compile) - most ES2018 and TypeScript code will Just Work out of the box. If you want to create a custom configuration for either, add a `.compilerc` file to the root of your project (see the README for electron-compile on how to set up a `.compilerc`).

### Debugging scripts

Passing the `--inspect` option will cause a blank Electron window to open with DevTools attached, which you can use to debug your script. The debugger will automatically break-in on unhandled errors, but you can also break in at the beginning of your script by adding `debugger;` at the top.

### How does this work?

node-gpu runs your script in an Electron environment with node.js's standard library enabled - this allows you to do node.js'y things, but with hardware accelerated DOM / WebGL. This allows us to run GPU shaders without having to install CUDA et al.