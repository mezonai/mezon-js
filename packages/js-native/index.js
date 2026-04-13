let native = null;

if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    try {
        native = require('./build/Release/mezon_native.node');
    } catch (err) {
        console.error("Native module loading failed", err);
    }
} else {
    console.warn("js-native is not supported in this environment (Browser).");
}

module.exports = native;