import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from '../../Utilities/requests'
import Constants from './constants'

export const requestFetchAllProducts = createAsyncThunk(
    Constants.FETCH_ALL_PRODUCTS,
    async(_, { rejectWithValue }) => {
        const request = { endpoint: '/api/products', method: 'GET', body: {} }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestCreateProduct = createAsyncThunk(
    Constants.CREATE_PRODUCT,
    async(product, { rejectWithValue }) => {
        const request = { endpoint: '/api/products', method: 'POST', body: product }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateProduct = createAsyncThunk(
    Constants.UPDATE_PRODUCT,
    async(product, { rejectWithValue }) => {
        const { id, ...body } = product
        const request = { endpoint: `/api/products/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestUpdateJourneyMapById = createAsyncThunk(
    Constants.UPDATE_JOURNEYMAP,
    async({ id, productJourneyMap }, { rejectWithValue }) => {
        const request = { endpoint: `/api/products/${id}/journeymap`, method: 'PUT', body: { productJourneyMap } }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestArchiveProduct = createAsyncThunk(
    Constants.ARCHIVE_PRODUCT,
    async({ id, isArchived }, { rejectWithValue }) => {
        const request = { endpoint: `/api/products/${id}/admin/archive`, method: 'PUT', body: { isArchived } }
        return handleThunkRequest(request, rejectWithValue)
    }
)