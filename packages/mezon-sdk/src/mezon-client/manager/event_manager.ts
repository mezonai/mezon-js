import { Events } from "../../constants/enum";

export class EventManager {
  private events: { [key: string]: Function[] } = {};

  on(event: Events, func: Function, context: any = null) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    if (typeof func !== "function") {
      throw new Error("Please add a function to the event");
    }

    this.events[event].push(context ? func.bind(context) : func);
  }

  remove(event: string, func: Function) {
    if (!this.events[event]) {
      throw new Error("Event not supported");
    }

    this.events[event] = this.events[event].filter((f) => f !== func);
  }

  emit(event: string, ...args: any[]) {
    if (this.events[event]) {
      this.events[event].forEach((func) => {
        try {
          func(...args);
        } catch (err) {
          console.error(`Error executing event handler for ${event}:`, err);
        }
      });
    }
  }
}