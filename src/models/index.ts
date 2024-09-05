import {
    CHANGE_SEARCH_FIELD,
    SEARCH_SKILLS_FAILURE,
    SEARCH_SKILLS_REQUEST,
    SEARCH_SKILLS_SUCCESS
} from '../actions/actionTypes';

export interface DataItem {
    id: string,
    name: string,
}

export interface SkillsState {
    items?: DataItem[],
    loading?: boolean,
    error?: string | null,
    search?: string,
}

export interface SearchSkillsActionInterface {
    type:
        typeof SEARCH_SKILLS_REQUEST | 
        typeof SEARCH_SKILLS_SUCCESS | 
        typeof SEARCH_SKILLS_FAILURE | 
        typeof CHANGE_SEARCH_FIELD,
    payload: SkillsState,
}