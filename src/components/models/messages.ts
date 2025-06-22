export interface IMessage {
    id: string;
    userId: string;
    date: Date;
    text: string;
    createdAt?: unknown;
}