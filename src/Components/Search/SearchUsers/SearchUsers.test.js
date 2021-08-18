import React from 'react'
import { fireEvent, render, screen, useDispatchMock, userEvent } from '../../../Utilities/test-utils'
import { SearchUsers } from './index'

describe('<SearchUsers />', () => {
    jest.setTimeout(15000)

    const allUsers = [
        {
            id: 10,
            username: 'jsmith',
            displayName: 'Jon Jacob Jingle Hiemer Smith'
        }, {
            id: 11,
            username: 'foobar',
            dislayName: ''
        }
    ]

    test('should render default', () => {
        render(<SearchUsers />)

        expect(screen.getByText(/Search users/i)).toBeInTheDocument()
        expect(screen.getByDisplayValue('')).toBeInTheDocument()
    })

    test('should render props', () => {
        useDispatchMock().mockResolvedValue({ payload: allUsers })
        render(<SearchUsers value = {allUsers[1]} title = 'test title'/>)

        expect(screen.getByText('test title')).toBeInTheDocument()
        expect(screen.getByDisplayValue('foobar')).toBeInTheDocument()
    })

    test('shoulld call onChange prop', async() => {
        useDispatchMock().mockResolvedValue({ payload: allUsers })
        const onChangePropMock = jest.fn()

        render(<SearchUsers onChange = {onChangePropMock} freeSolo/>)

        userEvent.type(screen.getByDisplayValue(''), 'test')
        fireEvent.click(await screen.findByText('foobar'))

        expect(onChangePropMock).toHaveBeenCalledTimes(1)
    })

})
