import {
    SEARCH_SKILLS_FAILURE,
    SEARCH_SKILLS_REQUEST,
    SEARCH_SKILLS_SUCCESS,
    CHANGE_SEARCH_FIELD,
} from '../actions/actionTypes'
import { SearchSkillsActionInterface, SkillsState } from '../models';

const initialState: SkillsState = {
    items: [],
    loading: false,
    error: null,
    search: ''
};

export default function skillsReducer(
    state = initialState,
    action: SearchSkillsActionInterface) {
    
    switch (action.type) {
        case SEARCH_SKILLS_REQUEST:
            return { ...state, loading: true, error: null };
        case SEARCH_SKILLS_FAILURE: {
            const error = action.payload.error;
            return { ...state, loading: false, error };
        }
        case SEARCH_SKILLS_SUCCESS: {
            const items = action.payload.items;
            return { ...state, items, loading: false, error: null };
        }
        case CHANGE_SEARCH_FIELD: {
            const search = action.payload.search;
            return { ...state, search };
        }
        default:
            return state;
    }
}