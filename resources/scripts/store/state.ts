import { UserData } from "../types";

export type State = {
    user: {
        data: UserData,
        loaded: boolean,
    },
};

export const state: State = {
    user: {
        data: {
            name: '',
            languages: {},
        },
        loaded: false,
    },
};
