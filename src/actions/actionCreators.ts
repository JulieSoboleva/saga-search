import { DataItem, SearchSkillsActionInterface } from '../models'
import {
    CHANGE_SEARCH_FIELD,
    SEARCH_SKILLS_SUCCESS,
    SEARCH_SKILLS_REQUEST,
    SEARCH_SKILLS_FAILURE,
} from './actionTypes'

export function searchSkillsRequest(search: string): SearchSkillsActionInterface {
    return { 
        type: SEARCH_SKILLS_REQUEST,
        payload: { search } }
}

export function searchSkillsSuccess(items: DataItem[]): SearchSkillsActionInterface {
    return { type: SEARCH_SKILLS_SUCCESS, payload: { items } }
}

export function searchSkillsFailure(error: string | null): SearchSkillsActionInterface {
    return { type: SEARCH_SKILLS_FAILURE, payload: { error } }
}

export function changeSearchField(search: string): SearchSkillsActionInterface {
    return { 
        type: CHANGE_SEARCH_FIELD,
        payload: { search },
    }
}