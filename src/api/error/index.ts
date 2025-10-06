import { AxiosError } from "axios";
import type { APIError } from "./types";

export default function handleAPIError(err: unknown): never {
    if (err instanceof AxiosError && err.response?.data) {
        const data = err.response.data as APIError;
        throw new Error(`${data.error} (time: ${data.time})`);
    }
    throw err;
}
