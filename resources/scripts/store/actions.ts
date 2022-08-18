import { ActionContext, ActionTree } from "vuex";
import { StoreWordPayload, TranslatePayload, UserData, Meaning, CreatedWord } from "../types";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
import { AxiosResponse } from 'axios';
import axiosClient from "../axios";
import useRoute from '../composables/useRoute';

export enum ActionType {
    CheckWord = 'checkWord',
    SelectAddMeaning = 'selectAddMeaning',
    SetUser = 'setUser',
};

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
};

export type Actions = {
    [ActionType.CheckWord](context: ActionAugments, translatePayload: TranslatePayload): Promise<AxiosResponse<{ meanings: Meaning[] }>>,
    [ActionType.SelectAddMeaning](context: ActionAugments, storeWordPayload: StoreWordPayload): Promise<AxiosResponse<CreatedWord>>,
    [ActionType.SetUser](context: ActionAugments): Promise<AxiosResponse<UserData>>,
};

const route = useRoute();

export const actions: ActionTree<State, State> & Actions = {
    
    async [ActionType.CheckWord](_, translatePayload) {
        return await axiosClient.get<{ meanings: Meaning[] }>(route('word.meanings', translatePayload));
    },

    async [ActionType.SelectAddMeaning]({ commit }, storeWordPayload) {
        return await axiosClient.post<CreatedWord>(route('word.store'), storeWordPayload)
            .then(res => {
                const createdWord = res.data;
                const { meaning } = storeWordPayload;
                commit(MutationType.CreateUserLangIfDoesntExist, createdWord.from_language);
                commit(MutationType.AddWordMeaning, { createdWord, meaning });
                return res;
            });
    },

    async [ActionType.SetUser]({ commit }) {
        return await axiosClient.get<UserData>(route('user'))
            .then(res => {
                commit(MutationType.SetUser, res.data);
                return res;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    },

};
