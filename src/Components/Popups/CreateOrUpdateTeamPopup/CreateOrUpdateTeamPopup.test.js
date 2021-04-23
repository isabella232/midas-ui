import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent
} from '../../../Utilities/test-utils'
import { CreateOrUpdateTeamPopup } from './index'

describe('<CreateOrUpdateTeamPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitCreateTeamMock = useModuleMock('Redux/Teams/actions', 'requestCreateTeam')
    const submitUpdateTeamMock = useModuleMock('Redux/Teams/actions', 'requestUpdateTeam')
    const selectTeamByIdMock = useModuleMock('Redux/Teams/selectors', 'selectTeamById')

    const returnedFoundTeam = {
        id: 4,
        name: 'My Team',
        description: 'Description',
        gitlabGroupId: 12345
    }

    const returnedNewTeam = {
        name: '',
        description: '',
        gitlabGroupId: ''
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectTeamByIdMock.mockReturnValue(returnedNewTeam)
    })

    test('should render properly for createTeam', () => {
        render(<CreateOrUpdateTeamPopup />)

        expect(screen.getByText('Create Team')).toBeInTheDocument()
    })

    test('should render properly for updateTeam', () => {
        selectTeamByIdMock.mockReturnValue(returnedFoundTeam)
        render(<CreateOrUpdateTeamPopup id = {4}/>)

        expect(screen.getByText('Update Team')).toBeInTheDocument()
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'teams/createOne': [
                    'name error'
                ]
            }
        }
        render(<CreateOrUpdateTeamPopup />, { initialState: state })

        expect(screen.getByText('name error')).toBeInTheDocument()
    })

    test('should call onSubmit for createTeam', () => {
        render(<CreateOrUpdateTeamPopup />)

        fireEvent.click(screen.getByText('Submit'))

        expect(submitCreateTeamMock).toHaveBeenCalledWith({
            name: '', description: '', gitlabGroupId: '', userIds: [] })
    })

    test('should call onSubmit to Update team', () => {
        selectTeamByIdMock.mockReturnValue(returnedFoundTeam)
        render(<CreateOrUpdateTeamPopup id = {4} />)

        const name = 'My Edited Team'
        const gitlabGroupId = '15550'
        const description = 'New Description'

        const nameInput = screen.getByTestId('CreateOrUpdateTeamPopup__input-name')
        const descriptionInput = screen.getByTestId('CreateOrUpdateTeamPopup__input-description')
        const gitlabGroupIdInput = screen.getByTestId('CreateOrUpdateTeamPopup__input-gitlabGroupId')

        userEvent.clear(descriptionInput)
        userEvent.clear(gitlabGroupIdInput)
        userEvent.clear(nameInput)

        userEvent.type(descriptionInput, description)
        userEvent.type(gitlabGroupIdInput, gitlabGroupId)
        userEvent.type(nameInput, name)

        fireEvent.click(screen.getByText('Submit'))

        expect(submitUpdateTeamMock).toHaveBeenCalledWith({
            ...returnedFoundTeam, name, description, gitlabGroupId, userIds: [] })
    })

    test('should close popup', () => {
        render(<CreateOrUpdateTeamPopup />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })
})