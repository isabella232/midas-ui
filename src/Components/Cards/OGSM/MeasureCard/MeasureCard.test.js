import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { MeasureCard } from './index'
import { determineStatusColor } from './MeasureCard'

describe('<MeasureCard />', () => {
    const measure = {
        id: 1,
        text: 'Text',
        startDate: null,
        dueDate: null,
        completedAt: null,
        completionType: 'BINARY',
        value: '0',
        target: '1',
        assertionId: 2,
        comments: []
    }

    const completedMeasure = {
        id: 2,
        text: 'Text',
        startDate: '2020-01-01',
        dueDate: '2020-03-03',
        completedAt: '2020-02-02T15:22:00',
        completionType: 'BINARY',
        value: '1',
        target: '1',
        assertionId: 2,
        comments: []
    }

    const selectMeasureByIdMock = useModuleMock('Redux/Measures/selectors', 'selectMeasureById')
    const requestUpdateMeasureMock = useModuleMock('Redux/Measures/actions', 'requestUpdateMeasure')
    const requestDeleteMeasureMock = useModuleMock('Redux/Measures/actions', 'requestDeleteMeasure')
    const requestSearchCommentsMock = useModuleMock('Redux/Comments/actions', 'requestSearchComments')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectMeasureByIdMock.mockReturnValue(measure)
    })

    test('should render', () => {
        selectMeasureByIdMock.mockReturnValue(completedMeasure)
        render(<MeasureCard id = {completedMeasure.id} hasEdit = {false} />)

        expect(screen.getByDisplayValue('Text')).toBeInTheDocument()
        expect(screen.getByDisplayValue('01/01/2020')).toBeInTheDocument()
        expect(screen.getByDisplayValue('03/03/2020')).toBeInTheDocument()
        expect(screen.getByDisplayValue('02/02/2020 03:22 pm')).toBeInTheDocument()
    })

    test('should update measure', () => {
        render(<MeasureCard id = {measure.id} hasEdit = {true} />)

        userEvent.type(screen.getByDisplayValue('Text'), 'Text Edit{Enter}')
        expect(requestUpdateMeasureMock).toHaveBeenCalledWith({
            ...measure,
            text: 'Text Edit',
            children: []
        })

        userEvent.type(screen.getByDisplayValue('1'), '10{Enter}')
        expect(requestUpdateMeasureMock).toHaveBeenCalledWith({
            ...measure,
            target: '10',
            children: []
        })

        userEvent.type(screen.getByDisplayValue('0'), '5{Enter}')
        expect(requestUpdateMeasureMock).toHaveBeenCalledWith({
            ...measure,
            value: '5',
            children: []
        })
    })

    test('should not call dispatch to request update measure text if no change', () => {
        render(<MeasureCard id = {measure.id} hasEdit = {true} />)

        userEvent.type(screen.getByDisplayValue('Text'), 'Text{Enter}')
        expect(requestUpdateMeasureMock).not.toHaveBeenCalled()
    })

    test('should call dispatch to request delete measure', () => {
        render(<MeasureCard id = {measure.id} hasEdit = {true} />)

        fireEvent.click(screen.getByTitle('delete'))
        fireEvent.click(screen.getByText('confirm'))
        expect(requestDeleteMeasureMock).toHaveBeenCalledWith(1)
    })

    test('should cancel delete measure popup', () => {
        render(<MeasureCard id = {measure.id} hasEdit = {true} />)

        fireEvent.click(screen.getByTitle('delete'))
        fireEvent.click(screen.getByText('cancel'))
        expect(requestDeleteMeasureMock).not.toHaveBeenCalled()
    })

    test('should open comments', () => {
        render(<MeasureCard id = {measure.id} hasEdit = {true} />)

        fireEvent.click(screen.getByTitle('comment'))
        expect(requestSearchCommentsMock).toHaveBeenCalledTimes(1)
    })

    test('should return proper color', () => {
        expect(determineStatusColor({ completedAt: 'foo' })).toEqual('#0fcf50')
        expect(determineStatusColor({ startDate: 'foo' })).toEqual('#5dade2')
        expect(determineStatusColor({})).toEqual('#c3c3c3')
    })

})