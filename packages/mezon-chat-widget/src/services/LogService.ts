/**
 * Log Service
 * Handles logging with support for production mode suppression.
 * Uses a "debug" level default, controllable via environment or config.
 */

export class LogService {
  private static isDebug = true; // Default to true for dev, build process should set this false or replace calls

  static setDebugMode(debug: boolean) {
    this.isDebug = debug;
  }

  static log(message: string, ...args: any[]) {
    if (this.consoleAvailable()) {
       // In production builds, this entire block can be stripped or disabled
       // We rely on the build system (esbuild 'drop: console') for pure cleanup,
       // but this logical check is good for runtime config.
       console.log(message, ...args);
    }
  }

  static warn(message: string, ...args: any[]) {
     if (this.consoleAvailable()) {
      console.warn(message, ...args);
     }
  }

  static error(message: string, ...args: any[]) {
     if (this.consoleAvailable()) {
      console.error(message, ...args);
     }
  }

  static info(message: string, ...args: any[]) {
      if (this.consoleAvailable()) {
          console.info(message, ...args);
      }
  }

  private static consoleAvailable() {
      // In a real production build, esbuild with 'pure: ["console.log"]' might just remove the call site.
      // This runtime check allows opting out of logs even if the code remains.
      return this.isDebug && typeof console !== 'undefined';
  }
}
