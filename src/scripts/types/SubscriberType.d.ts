export interface SubscriberType {
    [eventName: string]: (e: Event) => void
}