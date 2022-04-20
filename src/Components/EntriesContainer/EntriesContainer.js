import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Button } from '@mui/material'
import { GanttChart } from 'Components/Gantt'
import GanttAddNewItem from 'Components/Gantt/GanttAddNewItem/GanttAddNewItem'
import { GanttEvent } from 'Components/Gantt/GanttEvent'
import { GanttMilestone } from 'Components/Gantt/GanttMilestone'
import { GanttTarget } from 'Components/Gantt/GanttTarget'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchEvents } from 'Redux/Events/actions'
import { selectEventsByPortfolioId } from 'Redux/Events/selectors'
import { requestSearchMilestones } from 'Redux/Milestones/actions'
import { selectMilestonesByPortfolioId } from 'Redux/Milestones/selectors'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { requestSearchTargets } from 'Redux/Targets/actions'
import { selectTargetsByPortfolioId } from 'Redux/Targets/selectors'

export default function EntriesContainer({ portfolioId }) {

    const dispatch = useDispatch()
    const searchValue = 'portfolio.id:' + portfolioId
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))

    useEffect(() => {
        dispatch(requestSearchMilestones(searchValue))
        dispatch(requestSearchEvents(searchValue))
        dispatch(requestSearchTargets(searchValue))
    }, [])

    const milestones = useSelector(state => selectMilestonesByPortfolioId(state, portfolioId))
    const events = useSelector(state => selectEventsByPortfolioId(state, portfolioId))
    const targets = useSelector(state => selectTargetsByPortfolioId(state, portfolioId))

    const entries = [
        ...targets,
        ...milestones,
        ...events,
    ]

    let dateStart = new Date()
    dateStart.setMonth(dateStart.getMonth() - 3)
    dateStart.setDate(1)
    dateStart.setHours(0, 0, 0)

    const renderComponent = (entry) => {
        switch (entry.type) {
        case 'target':
            return <GanttTarget target = {entry}/>
        case 'milestone':
            return <GanttMilestone milestone = {entry}/>
        case 'event':
            return <GanttEvent event = {entry}/>
        }
    }

    return (
        <GanttChart
            startDate = {dateStart}
            maxHeight = 'calc(100% - 200px)'
            entries = {entries}
            renderComponent = {renderComponent}
            actionBar = {{
                navLeftIcon: <ChevronLeft size = 'small' />,
                navRightIcon: <ChevronRight size = 'small' />,
                buttonComponent: Button,
                buttonProps: {
                    style: { minWidth: '34px', borderRadius: 0, borderRight: '1px solid black' },
                    size: 'small'
                },
                additionalActions: permissions.edit ? <GanttAddNewItem portfolioId = {portfolioId} /> : null
            }}
        />
    )
}

EntriesContainer.propTypes = {
    portfolioId: PropTypes.number.isRequired,
}

const mockEvents = [{
    title: 'This is a test event',
    startDate: '2021-10-01',
    dueDate: '2023-10-15',
    type: 'event',
    portfolioId: 91,
    organizerIds: [],
    location: 'foo',
    row: 1
}]

const mockTargets = [
    {
        title: 'Create Midas App',
        startDate: '2020-12-15',
        dueDate: '2021-11-01',
        type: 'target',
        portfolioId: 91
    }, {
        title: 'Create User Profiles',
        startDate: '2021-03-01',
        dueDate: '2021-10-16',
        type: 'target',
        portfolioId: 91
    }, {
        title: 'Create Products Page',
        startDate: '2021-07-01',
        dueDate: '2021-12-01',
        type: 'target',
        portfolioId: 91
    }, {
        title: 'Create Portfolios',
        startDate: '2022-10-01',
        dueDate: '2022-10-15',
        type: 'target',
        portfolioId: 91
    }, {
        title: 'test entry4 dafdasfdas dfafas',
        startDate: '2022-12-01',
        dueDate: '2023-1-01',
        type: 'target',
        portfolioId: 91
    }
]

const mockMilestones = [
    {
        title: 'Old Milestone',
        description: 'Second Milestone Test',
        dueDate: '2021-09-01',
        type: 'milestone',
        enableFullHeight: true,
        row: 0,
        portfolioId: 91
    },
    {
        title: 'Milestone1',
        description: 'First Milestone Test',
        dueDate: '2022-05-15',
        type: 'milestone',
        enableFullHeight: true,
        row: 0,
        portfolioId: 91
    },
    {
        title: 'Milestone2',
        description: 'Second Milestone Test',
        dueDate: '2022-8-24',
        type: 'milestone',
        enableFullHeight: true,
        row: 0,
        portfolioId: 91
    },
    {
        title: 'Milestone3',
        description: 'Second Milestone Test',
        dueDate: '2023-02-04',
        type: 'milestone',
        enableFullHeight: true,
        row: 0,
        portfolioId: 91
    }
]