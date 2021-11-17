const wasmCode = await Deno.readFile('math.wasm');
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule);
const square = wasmInstance.exports.square as CallableFunction;
const cube = wasmInstance.exports.cube as CallableFunction;
console.log(square(5), cube(4));
