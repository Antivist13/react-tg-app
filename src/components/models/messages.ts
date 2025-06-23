export interface IMessage {
    id: string;
    userId: string;
    date: any;
    text: string;
    createdAt?: ITimestamp;
}

export interface ITimestamp {
    seconds: string,
    nanoseconds: string
}