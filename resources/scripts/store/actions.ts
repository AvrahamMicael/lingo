import { ActionContext, ActionTree } from "vuex";
import { StoreWordPayload, TranslatePayload, UserData, Meaning, CreatedWord, MeaningWithId, UpdateMeaningPayload, SelectAddOtherMeaningToWordPayload, SelectAddOtherMeaningToWordResponse, LanguageAbbrev } from "../types";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
import { AxiosResponse } from 'axios';
import axiosClient from "../axios";
import useRoute from '../composables/useRoute';

export enum ActionType {
    DeleteMeaning = 'deleteMeaning',
    CheckWord = 'checkWord',
    SelectAddMeaningToNewWord = 'selectAddMeaningToNewWord',
    SelectAddOtherMeaningToWord = 'selectAddOtherMeaningToWord',
    SetUser = 'setUser',
    UpdateMeaning = 'updateMeaning',
};

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload?: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
};

export type Actions = {
    [ActionType.DeleteMeaning](context: ActionAugments, payload: { id_meaning: number, language: LanguageAbbrev }): Promise<AxiosResponse<''>>,
    [ActionType.CheckWord](context: ActionAugments, translatePayload: TranslatePayload): Promise<AxiosResponse<{ meanings: Meaning[] }>>,
    [ActionType.SelectAddMeaningToNewWord](context: ActionAugments, storeWordPayload: StoreWordPayload): Promise<AxiosResponse<CreatedWord>>,
    [ActionType.SetUser](context: ActionAugments): Promise<AxiosResponse<UserData>>,
    [ActionType.UpdateMeaning](context: ActionAugments, updateMeaningPayload: UpdateMeaningPayload): Promise<AxiosResponse<''>>,
    [ActionType.SelectAddOtherMeaningToWord](context: ActionAugments, selectAddOtherMeaningToWordPayload: SelectAddOtherMeaningToWordPayload): Promise<AxiosResponse<SelectAddOtherMeaningToWordResponse>>,
};

const route = useRoute();

export const actions: ActionTree<State, State> & Actions = {

    async [ActionType.DeleteMeaning]({ commit }, { id_meaning, language }) {
        return await axiosClient.delete<''>(route('meaning.delete', { id: id_meaning }))
            .then(res => {
                commit(MutationType.DeleteMeaning, { id_meaning, language });
                return res;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    },
    
    async [ActionType.CheckWord](_, translatePayload) {
        return await axiosClient.get<{ meanings: Meaning[] }>(route('word.meanings', translatePayload));
    },

    async [ActionType.SelectAddMeaningToNewWord]({ commit }, storeWordPayload) {
        return await axiosClient.post<CreatedWord>(route('word.store'), storeWordPayload)
            .then(res => {
                const createdWord = res.data;
                const { meaning } = storeWordPayload;
                const meaningWithId: MeaningWithId  = { ...meaning, id: res.data.id_meaning };
                commit(MutationType.CreateUserLangIfDoesntExist, createdWord.from_language);
                commit(MutationType.AddNewWordMeaning, { createdWord, meaning: meaningWithId });
                return res;
            });
    },


    async [ActionType.SelectAddOtherMeaningToWord]({ commit }, payload) {
        return axiosClient.post<SelectAddOtherMeaningToWordResponse>(route('meaning.add'), payload)
            .then(res => {
                commit(MutationType.AddWordOtherMeaning, res.data);
                return res;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    },


    async [ActionType.SetUser]({ commit }) {
        return await axiosClient.get<UserData>(route('user.data'))
            .then(res => {
                commit(MutationType.SetUser, res.data);
                commit(MutationType.SetUserLoaded);
                return res;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    },


    async [ActionType.UpdateMeaning]({ commit }, { newMeaning, idMeaning, userLanguage }) {
        return await axiosClient.patch<''>(route('meaning.update', { id: idMeaning }), { newMeaning })
            .then(res => {
                commit(MutationType.UpdateMeaning, { newMeaning, idMeaning, userLanguage });
                return res;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    },


};
