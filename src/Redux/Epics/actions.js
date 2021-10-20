import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from 'Utilities/requests'
import Constants from './constants'

export const requestFetchEpicsByProductId = createAsyncThunk(
    Constants.FETCH_BY_PRODUCT,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/epics?search=product.id:${id}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestSyncEpicsByProductId = createAsyncThunk(
    Constants.SYNC_EPICS,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/epics/all/${id}`, method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestHideEpic = createAsyncThunk(
    Constants.HIDE_EPIC,
    async({ id, isHidden }, { rejectWithValue }) => {
        const request = { endpoint: `/api/epics/${id}/hide`, method: 'PUT', body: { isHidden } }
        return handleThunkRequest(request, rejectWithValue)
    }
)