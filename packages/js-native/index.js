let native = null;

const isNode = typeof process !== 'undefined' && process.versions && !!process.versions.node;

if (isNode) {
    try {
        const BINARY_PATH = './build/Release/mezon_native.node';
        native = require(BINARY_PATH);
    } catch (err) {
        console.error("Native module loading failed", err);
    }
} else {
    console.warn("js-native is not supported in this environment (Browser).");
}

module.exports = native;