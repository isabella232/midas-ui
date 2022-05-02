import { DeleteOutline, ExpandMore } from '@mui/icons-material'
import { Button, Collapse, Grow, IconButton } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { requestDeleteTarget, requestUpdateTarget } from 'Redux/Targets/actions'
import TargetConstants from 'Redux/Targets/constants'
import { styled } from 'Styles/materialThemes'

const StyledDiv = styled('div')(({ theme }) => ({
    borderRadius: '6px',
    color: theme.palette.gantt.subtarget.dark.text,
    background: theme.palette.gantt.subtarget.dark.background,
    padding: theme.spacing(1),
    minWidth: '106px',
}))

const StyledHeader = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    textAlign: 'left',
    width: '100%',
    cursor: 'pointer'
}))

export default function GanttSubTarget({ target, defaultOpen }) {
    const dispatch = useDispatch()

    const { id, portfolioId, title } = target
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))

    const deleteTarget = () => {
        dispatch(openPopup(TargetConstants.DELETE_TARGET, 'DeletePopup', {
            id: id,
            title: title,
            type: 'subtarget',
            request: requestDeleteTarget,
            constant: TargetConstants.DELETE_TARGET
        }))
    }

    const updateTitle = (newTitle) => {
        dispatch(requestUpdateTarget({
            ...target,
            title: newTitle,
        }))
    }

    const [open, setOpen] = useState(defaultOpen)
    const [hover, setHover] = useState(false)

    return (
        <StyledDiv>
            <StyledHeader>
                <AutoSaveTextField
                    canEdit = {permissions.edit}
                    initialValue = {title}
                    onSave = {(v) => updateTitle(v)}
                    title = {title}
                    fullWidth
                    onHoverChange = {setHover}
                    inputProps = {{
                        style: {
                            textOverflow: 'ellipsis'
                        }
                    }}
                    style = {{
                        paddingRight: '8px'
                    }}
                    InputProps = {{
                        endAdornment: (permissions.edit &&
                            <Grow in = {hover}>
                                <IconButton
                                    onClick = {deleteTarget}
                                    data-testid = 'GanttActionButtons__delete'
                                    size = 'small'
                                >
                                    <DeleteOutline fontSize = 'small' color = 'inherit' htmlColor = 'white' />
                                </IconButton>
                            </Grow>
                        )
                    }}
                />
                <IconButton
                    data-testid = {'GanttTarget__expandButton_' + (open ? 'open' : 'closed')}
                    onClick = {() => setOpen(prev => !prev)}
                    style = {{ maxHeight: '40px', display: 'none' }}
                >
                    <ExpandMore
                        style = {{
                            transform: `rotate(${open ? 180 : 0}deg)`,
                            transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                        }}
                    />
                </IconButton>
            </StyledHeader>
            <Collapse
                in = {open}
                collapsedSize = {0}
            >
                <div style = {{ display: 'none' }}>
                    <Button
                        onClick = {(e) => e}
                        color = 'secondary'
                        variant = 'contained'
                        style = {{ marginRight: '8px' }}
                    >
                        Associate Req
                    </Button>
                    <Button
                        onClick = {(e) => e}
                        color = 'secondary'
                        variant = 'contained'
                    >
                        Associate Epic
                    </Button>
                </div>
            </Collapse>
        </StyledDiv>
    )
}

GanttSubTarget.propTypes = {
    target: PropTypes.shape({
        id: PropTypes.number,
        portfolioId: PropTypes.number,
        title: PropTypes.string,
        type: PropTypes.string,
        startDate: PropTypes.string,
        dueDate: PropTypes.string
    }).isRequired,
    defaultOpen: PropTypes.bool,
}

GanttSubTarget.defaultProps = {
    defaultOpen: false
}