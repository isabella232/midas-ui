import userEvent from '@testing-library/user-event'
import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, within } from '../../../Utilities/test-utils'
import { CreateTeamPopup } from './index'

const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
const submitTeamMock = useModuleMock('Redux/Teams/actions', 'requestCreateTeam')

test('<CreateTeamPopup /> - test component renders properly', () => {
    render(<CreateTeamPopup />)

    expect(screen.getByText('Create New Team')).toBeInTheDocument()
    expect(screen.getByTestId('CreateTeamPopup__input-name')).toBeInTheDocument()
    expect(screen.getByTestId('CreateTeamPopup__input-description')).toBeInTheDocument()
    expect(screen.getByTestId('CreateTeamPopup__input-gitlabGroupId')).toBeInTheDocument()
})

test('<CreateTeamPopup /> - test submit team', () => {
    useDispatchMock().mockReturnValue({})
    render(<CreateTeamPopup />)

    const name = 'My New Team'
    const gitlabGroupId = '1234567'
    const description = 'Test Description'

    const nameInput = within(screen.getByTestId('CreateTeamPopup__input-name'))
        .getByRole('textbox')
    const descriptionInput = within(screen.getByTestId('CreateTeamPopup__input-description'))
        .getByRole('textbox')
    const gitlabGroupIdInput = within(screen.getByTestId('CreateTeamPopup__input-gitlabGroupId'))
        .getByRole('spinbutton')

    userEvent.type(nameInput, name)
    userEvent.type(gitlabGroupIdInput, gitlabGroupId)
    userEvent.type(descriptionInput, description)
    fireEvent.click(screen.getByText('Submit'))

    expect(submitTeamMock).toHaveBeenCalledTimes(1)
    expect(submitTeamMock.mock.calls[0][0]).toEqual({ name, gitlabGroupId, description })
})

test('<CreateTeam /> - test close popup', () => {
    useDispatchMock().mockReturnValue({})
    render(<CreateTeamPopup />)

    fireEvent.click(screen.getByTestId('Popup__button-close'))

    expect(closePopupMock).toHaveBeenCalled()
})