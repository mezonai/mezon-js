/**
 * Log Service
 * Handles logging with support for production mode suppression.
 * Uses a "debug" level default, controllable via environment or config.
 */

export class LogService {
   private static isDebug = true;

   static setDebugMode(debug: boolean) {
      this.isDebug = debug;
   }

   static log(message: string, ...args: any[]) {
      if (this.consoleAvailable()) {
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
      return this.isDebug && typeof console !== 'undefined';
   }
}
