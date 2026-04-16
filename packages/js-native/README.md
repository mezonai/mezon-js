# build js native module
```
npm install -g node-gyp

cd js-native
rm -rf build
node-gyp configure
node-gyp build -- -j$(nproc) VERBOSE=1
```


In JS
```
node index.js
```