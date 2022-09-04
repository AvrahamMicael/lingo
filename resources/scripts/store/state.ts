import { DataAndLoaded, UserData } from "../types";

export type State = {
    user: DataAndLoaded<UserData>,
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
