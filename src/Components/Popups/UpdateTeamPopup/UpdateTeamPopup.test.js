import userEvent from '@testing-library/user-event'
import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, within } from '../../../Utilities/test-utils'
import { UpdateTeamPopup } from './index'

const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
const submitTeamMock = useModuleMock('Redux/Teams/actions', 'requestUpdateTeam')
const getTeamByIdMock = useModuleMock('Redux/Teams/selectors', 'getTeamById')

const returnedTeam = {
    id: 4,
    isArchived: false,
    name: 'My New Team',
    gitlabGroupId: 1234567,
    description: 'Test Description'
}

test('<UpdateTeamPopup /> - test component renders properly', () => {
    getTeamByIdMock.mockReturnValue(returnedTeam)
    render(<UpdateTeamPopup id = {4}/>)

    expect(screen.getByText('Update Team')).toBeInTheDocument()
    expect(within(screen.getByTestId('UpdateTeamPopup__input-name'))
        .getByRole('textbox')).toHaveValue(returnedTeam.name)
    expect(within(screen.getByTestId('UpdateTeamPopup__input-description'))
        .getByRole('textbox')).toHaveValue(returnedTeam.description)
    expect(within(screen.getByTestId('UpdateTeamPopup__input-gitlabGroupId'))
        .getByRole('spinbutton')).toHaveValue(returnedTeam.gitlabGroupId)
})

test('<UpdateTeamPopup /> - test edit team', () => {
    useDispatchMock().mockReturnValue({})
    getTeamByIdMock.mockReturnValue(returnedTeam)

    render(<UpdateTeamPopup id = {4} />)

    const name = 'My Edited Team'
    const gitlabGroupId = '15550'
    const description = 'New Description'

    const nameInput = within(screen.getByTestId('UpdateTeamPopup__input-name'))
        .getByRole('textbox')
    const descriptionInput = within(screen.getByTestId('UpdateTeamPopup__input-description'))
        .getByRole('textbox')
    const gitlabGroupIdInput = within(screen.getByTestId('UpdateTeamPopup__input-gitlabGroupId'))
        .getByRole('spinbutton')

    userEvent.clear(descriptionInput)
    userEvent.clear(gitlabGroupIdInput)
    userEvent.clear(nameInput)
    userEvent.type(descriptionInput, description)
    userEvent.type(gitlabGroupIdInput, gitlabGroupId)
    userEvent.type(nameInput, name)
    fireEvent.click(screen.getByText('Submit'))

    expect(submitTeamMock).toHaveBeenCalledTimes(1)
    expect(submitTeamMock.mock.calls[0][0]).toEqual({ ...returnedTeam, name, description, gitlabGroupId })
})

test('<CreateTeam /> - test close popup', () => {
    useDispatchMock().mockReturnValue({})
    getTeamByIdMock.mockReturnValue(returnedTeam)
    render(<UpdateTeamPopup id = {4}/>)

    fireEvent.click(screen.getByTestId('Popup__button-close'))

    expect(closePopupMock).toHaveBeenCalled()
})