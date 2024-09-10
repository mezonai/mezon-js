import { InternalEventsSocket } from "../constants";

export function convertInternalEventToEvents(input :InternalEventsSocket) : string{
    return input.replace(/_event/g, '').replace(/_/g, '');
}