import { UserData } from "../types";

export type State = {
    user: {
        data: UserData
    },
};

export const state: State = {
    user: {
        data: {
            name: '',
            languages: {},
        },
    },
};
