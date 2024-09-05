/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeLatest, debounce, retry, put, spawn } from 'redux-saga/effects'
import { searchSkillsRequest, searchSkillsSuccess, searchSkillsFailure } from '../actions/actionCreators'

import {
    CHANGE_SEARCH_FIELD,
    SEARCH_SKILLS_REQUEST,
} from '../actions/actionTypes'
import { searchSkills } from '../api'
import { Action } from 'redux';
import { DataItem, SearchSkillsActionInterface } from '../models';

function filterChangeSearchAction(action: SearchSkillsActionInterface): any {
    const { type, payload } = action;
    return type === CHANGE_SEARCH_FIELD && payload.search?.trim() !== '';
}
function* handleChangeSearchSaga(action: Action<typeof CHANGE_SEARCH_FIELD> & SearchSkillsActionInterface): Generator {
    if (action.payload.search !== undefined) {
        yield put(searchSkillsRequest(action.payload.search));
    }
}
function* handleSearchSkillsSaga(action: Action<typeof SEARCH_SKILLS_REQUEST> & SearchSkillsActionInterface): Generator {
    try {
        const search = action.payload.search ?? '';
        const data = yield retry(3, 1000, searchSkills, search);
        yield put(searchSkillsSuccess(data as DataItem[]));
    } catch (error: unknown) {
        if (error instanceof Error) {
            yield put(searchSkillsFailure(error.message));
        } else {
            yield put(searchSkillsFailure('An unknown error occurred'));
        }
    }
}

function* watchChangeSearchSaga() {    
    yield debounce(300, filterChangeSearchAction, handleChangeSearchSaga)
}

function* watchSearchSkillsSaga() {
    yield takeLatest(SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga);
}

export default function* saga() {
    yield spawn(watchChangeSearchSaga);
    yield spawn(watchSearchSkillsSaga);
}
