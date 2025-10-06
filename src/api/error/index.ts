import { AxiosError } from "axios";
import type { APIError } from "./types";

export class APIException extends Error {
    public readonly messageFromServer: string;
    public readonly time?: string;
    public readonly status?: number;

    constructor(data: APIError, status?: number) {
        super(`${data.message} (time: ${data.time})`);
        this.messageFromServer = data.message;
        this.time = data.time;
        this.status = status;
    }
}

export default function handleAPIError(err: unknown): never {
    if (err instanceof AxiosError && err.response?.data) {
        const data = err.response.data as Partial<APIError>;
        const message = data.message || "Unknown server error";
        const time = data.time;

        throw new APIException({ message, time }, err.response.status);
    }

    if (err instanceof Error) {
        throw err;
    }

    throw new Error("Unexpected error");
}
