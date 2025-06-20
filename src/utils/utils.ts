import { IMessage } from "../components/models/messages";

export const messages: IMessage[] = [
    {
        id: 1,
        userId: 1,
        date: new Date(),
        text: "First Text",
        type: "Me"
    },
    {
        id: 2,
        userId: 2,
        date: new Date(),
        text: "Second Text",
        type: "Other"
    },
    {
        id: 3,
        userId: 3,
        date: new Date(),
        text: "Third Text",
        type: "Other"
    }
];