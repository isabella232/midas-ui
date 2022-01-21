import { AddLinkOutlined } from '@mui/icons-material'
import { Button, Collapse, Divider, Stack, Typography } from '@mui/material'
import { DeliverableWorkList } from 'Components/DeliverableWorkList'
import { SearchEpics } from 'Components/Search'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateDeliverable } from 'Redux/Deliverables/actions'
import { selectDeliverableById } from 'Redux/Deliverables/selectors'
import { selectCapabilitiesPagePermission } from 'Redux/PageAccess/selectors'
import { styled } from 'Styles/materialThemes'

const StyledButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
    }
}))

export default function CapabilitiesView() {
    const dispatch = useDispatch()
    const selectedDeliverableId = 123456 // to be replaced with selector once selected deliverable logic put in

    const hasEdit = useSelector(state => selectCapabilitiesPagePermission(state, 'edit'))
    const deliverable = useSelector(state => selectDeliverableById(state, selectedDeliverableId))

    const [open, setOpen] = useState(false)

    const onSelectEpic = (_e, values, reason) => {
        reason === 'selectOption' && dispatch(requestCreateDeliverable({
            title: values[0].title,
            index: deliverable.children.length,
            productId: values[0].productId,
            epicId: values[0].id,
            parentId: selectedDeliverableId,
            referenceId: 0,
            releaseIds: [],
            children: []
        }))
    }

    return (
        <Stack marginX = '16%' spacing = {1}>
            <Stack direction = 'row' justifyContent = 'space-between'>
                <Typography variant = 'subtitle1'>{deliverable?.title?.toUpperCase()}</Typography>
                {hasEdit &&
                    <StyledButton
                        size = 'small'
                        color = {open ? 'primary' : 'secondary'}
                        style = {{
                            whiteSpace: 'nowrap',
                            borderRadius: '8px',
                            padding: '0 16px'
                        }}
                        endIcon = {<AddLinkOutlined />}
                        onClick = {() => setOpen(prev => !prev)}
                        variant = 'outlined'
                    >
                        link epic
                    </StyledButton>
                }
            </Stack>
            <Divider style = {{ marginBottom: '8px' }}/>
            <Collapse in = {open} collapsedSize = {0}>
                <div>
                    {hasEdit && <SearchEpics onChange = {onSelectEpic}/>}
                </div>
            </Collapse>
            <div style = {{ width: 1, height: 8 }} />
            <DeliverableWorkList parentId = {selectedDeliverableId}/>
        </Stack>
    )
}