import { BaseSocketEvent } from "./base_event";

export class UserChannelAdded extends BaseSocketEvent{
    public handleFunctions: ((...args: any[]) => void)[] = [this.connectChatClan];
    public event: string = '';
    
    connectChatClan(input : any){
        console.log(input);
    }
}