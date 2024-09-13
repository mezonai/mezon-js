import { Socket } from "../interfaces";

export abstract class BaseSocketEvent{
    abstract handleFunctions : ((...args: any[]) => void)[];

    abstract event : string;

    constructor(protected socket: Socket){}

    excute(){
        this.handleFunctions.forEach((func) => {
            this.socket.socketEvents.on(this.event, func.bind(this));
        });
    }
}