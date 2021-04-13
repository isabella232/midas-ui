import React from 'react'
import { render, screen } from '../../Utilities/test-utils'
import { Table } from './index'

describe('<Table />', () => {

    const columns = ['column 1', 'column 2', '']
    const rows = [
        {
            data: ['one', 'two', 'action1'],
            properties: { strikeThrough: true }
        },
        {
            data: ['three', 'four', 'action2'],
            properties: { strikeThrough: false }
        }
    ]

    test('data display', () => {
        render(<Table columns = {columns} rows = {rows} />)

        expect(screen.getByText('column 1')).toBeInTheDocument()
        expect(screen.getByText('column 2')).toBeInTheDocument()
        expect(screen.getByText('one')).toBeInTheDocument()
        expect(screen.getByText('two')).toBeInTheDocument()
        expect(screen.getByText('three')).toBeInTheDocument()
        expect(screen.getByText('four')).toBeInTheDocument()
        expect(screen.getByText('action1')).toBeInTheDocument()
        expect(screen.getByText('action2')).toBeInTheDocument()
    })

    test('should have transparent background', () => {
        render(<Table columns = {columns} rows = {rows} transparent align = 'right' />)

        expect(screen.getByTestId('Table__paper')).toHaveStyle('background-color: transparent')
    })

    test('should have strikeThrough style', () => {
        render(<Table columns = {columns} rows = {rows} />)

        expect(screen.getByText('one')).toHaveStyle('text-decoration-line: line-through')
    })
})