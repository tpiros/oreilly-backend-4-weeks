#include "emscripten.h"

EMSCRIPTEN_KEEPALIVE
int square(int x)
{
  return x * x;
}

EMSCRIPTEN_KEEPALIVE
int cube(int x)
{
  return x * x * x;
}
// emcc math.c -o math.js -s MODULARIZE -s EXPORTED_RUNTIME_METHODS=ccall