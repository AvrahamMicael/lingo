import { DataAndLoaded, LessonDisplay, UserData } from "../types";

export type State = {
    user: DataAndLoaded<UserData>,
    lessons: {
        userImported: DataAndLoaded<LessonDisplay[]>,
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
    lessons: {
        userImported: {
            data: [],
            loaded: false,
        },
    },
};
