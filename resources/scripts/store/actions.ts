import { ActionContext, ActionTree } from "vuex";
import { StoreWordPayload, TranslatePayload } from "../types";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
import { AxiosResponse } from 'axios';
import { Meaning, CreatedWord } from '../types/index';
import axiosClient from "../axios";
import useRoute from '../composables/useRoute';

export enum ActionType {
    CheckWord = 'checkWord',
    SelectAddMeaning = 'SelectAddMeaning',
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
};

const route = useRoute();

export const actions: ActionTree<State, State> & Actions = {
    
    async [ActionType.CheckWord](_, translatePayload) {
        return await axiosClient.get<{ meanings: Meaning[] }>(route('word.meanings', translatePayload));
    },

    async [ActionType.SelectAddMeaning]({ commit }, storeWordPayload) {
        const promise = axiosClient.post<CreatedWord>(route('word.store'), storeWordPayload)
            .then(res => {
                const createdWord = res.data;
                const { meaning } = storeWordPayload;
                commit(MutationType.AddWordMeaning, { createdWord, meaning });
                return res;
            });
            
        return await promise;
    },

};
