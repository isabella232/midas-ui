import { AddCircle } from '@mui/icons-material'
import { Button } from '@mui/material'
import { MoreOptionsPopperMenu } from 'Components/MoreOptionsPopperMenu'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import MilestoneConstants from 'Redux/Milestones/constants'
import { openPopup } from 'Redux/Popups/actions'
import TargetConstants from 'Redux/Targets/constants'

export default function GanttAddNewItem({ portfolioId }) {

    const dispatch = useDispatch()

    const createMilestone = () =>
        dispatch(openPopup(MilestoneConstants.CREATE_MILESTONE, 'MilestonePopup', { portfolioId: portfolioId }))
    const createEvent = () => console.log('event dispatch goes here')
    const createTarget = () =>
        dispatch(openPopup(TargetConstants.CREATE_TARGET, 'TargetPopup', { portfolioId: portfolioId }))

    const addCompButtons = [
        {
            text: 'Add Milestone',
            onClick: createMilestone
        }, {
            text: 'Add Event',
            onClick: createEvent
        }, {
            text: 'Add Target',
            onClick: createTarget
        }
    ]

    return (
        <div style = {{ marginLeft: 'auto', marginRight: '8px' }}>
            <MoreOptionsPopperMenu
                options = {addCompButtons}
                icon = {
                    <Button
                        data-testid = 'GanttAddNewItem__button'
                        color = 'primary'
                        size = 'small'
                        title = 'Add Content to Chart'
                        endIcon = {<AddCircle />}
                    >
                        Add a new...
                    </Button>
                }
            />
        </div>
    )
}

GanttAddNewItem.propTypes = {
    portfolioId: PropTypes.number.isRequired
}