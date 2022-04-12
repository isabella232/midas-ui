import { Typography } from '@mui/material'
import { DeliverableEntry } from 'Components/DeliverableEntry'
import PropTypes from 'prop-types'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { selectDeliverablesByCapabilityId } from 'Redux/Deliverables/selectors'

const DraggableDeliverableList = React.memo(function DraggableDeliverableList({
    capabilityId,
    hasEdit,
    onUpdate,
    onDelete,
    onClick
}) {

    const deliverables = useSelector(state => selectDeliverablesByCapabilityId(state, capabilityId))

    return (
        <>
            {deliverables.map((deliverable, index) => (
                <Draggable
                    key = {deliverable.id}
                    draggableId = {deliverable.title}
                    index = {index}
                    isDragDisabled = {!hasEdit}
                >
                    {provider => (
                        <div
                            data-testid = 'DraggableDeliverableList__draggable'
                            ref = {provider.innerRef}
                            {...provider.draggableProps}
                            {...provider.dragHandleProps}
                            style = {{ paddingBottom: '10px' }}
                        >
                            <DeliverableEntry
                                id = {deliverable.id}
                                title = {deliverable.title}
                                onUpdate = {newValue => onUpdate(newValue, deliverable)}
                                onDelete = {() => onDelete(deliverable.id)}
                                onClick = {() => onClick(deliverable.id)}
                                hasEdit = {hasEdit}
                            />
                        </div>
                    )}
                </Draggable>
            ))}
            {deliverables.length === 0 && !hasEdit &&
                <Typography
                    color = 'text.secondary'
                    variant = 'body2'
                    style = {{ fontStyle: 'italic', height: '32px', padding: '5px 8px', marginLeft: '24px' }}
                >
                    No Deliverables added yet.
                </Typography>
            }
        </>
    )
})

DraggableDeliverableList.propTypes = {
    capabilityId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

DraggableDeliverableList.defaultProps = {
    hasEdit: false
}

export default DraggableDeliverableList
