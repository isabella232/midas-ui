import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('AppMetrics action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestGetUniqueLogonMetrics : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestGetUniqueLogonMetrics('id:1'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/appUserMetrics?search=id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestGetUniqueLogonMetrics.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetUniqueLogonMetrics.fulfilled.toString())
    })

    test('requestGetUniqueLogonMetrics : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestGetUniqueLogonMetrics(1))

        expect(store.getActions()[0].type).toEqual(actions.requestGetUniqueLogonMetrics.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetUniqueLogonMetrics.rejected.toString())
    })
})