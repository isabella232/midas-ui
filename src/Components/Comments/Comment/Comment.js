import { Box, makeStyles, TextField, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAssertionStatuses from '../../../Hooks/useAssertionStatuses'
import { selectUserLoggedIn } from '../../../Redux/Auth/selectors'
import { requestDeleteComment, requestUpdateComment } from '../../../Redux/Comments/actions'
import { selectCommentById } from '../../../Redux/Comments/selectors'
import { Tag } from '../../Tag'
import { EditCommentOptions } from '../EditCommentOptions'

const useStyles = makeStyles(() => ({
    clickable: {
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline'
        }
    }
}))

const parseStatus = (statusReceived) => {
    const allStatuses = useAssertionStatuses()
    const status = Object.values(allStatuses).filter(s => s.name === statusReceived)[0] ?? null

    return (
        <>
            {status &&
                <div style = {{ marginRight: 'auto' }}>
                    <Tag label = {`status::${status.label}`} color = {status.color} />
                </div>
            }
        </>
    )
}

function Comment({ id, handleStatusUpdates }) {
    const dispatch = useDispatch()
    const classes = useStyles()

    const comment = useSelector(state => selectCommentById(state, id))
    const userLoggedIn = useSelector(selectUserLoggedIn)

    const [body, status] = comment?.text?.split('###')
    const canEdit = comment.author?.id === userLoggedIn.id || userLoggedIn.isAdmin
    const modified = comment.lastEdit ? true : false
    const lastEdit = comment.lastEdit ?? comment.creationDate

    const [editable, setEditable] = useState(false)
    const [content, setContent] = useState(body)

    const onContentChange = (event) => {
        setContent(event.target.value)
    }

    const onEditClick = () => {
        setEditable(prev => !prev)
    }

    const onDeleteClick = () => {
        setEditable(false)
        dispatch(requestDeleteComment(id))
    }

    const onSave = () => {
        setEditable(false)
        dispatch(requestUpdateComment({ id, text: `${content}###${status}` }))
    }

    const onExit = () => {
        setEditable(false)
        setContent(body)
    }

    const handleHotKeyPresses = (event) => {
        if (!event.shiftKey && event.key === 'Enter') onSave()
        else if (event.key === 'Escape') onExit()
    }

    useEffect(() => {
        setContent(body)
    }, [body])

    const typoProps = {
        variant: 'caption',
        style: {
            padding: '0 2px'
        }
    }

    return (
        <Box display = 'flex' flexDirection = 'column' id = {id} margin = '4px' style = {{ marginBottom: '16px' }}>
            <div style = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography color = 'textSecondary' style = {{ fontWeight: 'bold' }}>
                    {comment.author?.displayName || comment.author?.email || comment.author?.username}
                </Typography>
                <div style = {{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant = 'caption' color = 'textSecondary'>
                        {lastEdit?.split(':', 2).toString().replace(',', ':')} {modified && '(edited)'}
                    </Typography>
                    {canEdit &&
                        <EditCommentOptions
                            onEditClick = {onEditClick}
                            onDeleteClick = {onDeleteClick}
                        />
                    }
                </div>
            </div>
            {editable ?
                <div style = {{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        value = {content}
                        variant = 'filled'
                        onChange = {onContentChange}
                        onKeyDown = {handleHotKeyPresses}
                        InputProps = {{ disableUnderline: true }}
                        inputProps = {{
                            style: {
                                padding: '6px'
                            }
                        }}
                    />
                    <div style = {{ display: 'inline-flex' }}>
                        <Typography {...typoProps} color = 'textSecondary'>escape to</Typography>
                        <Typography
                            {...typoProps}
                            className = {classes.clickable}
                            color = 'primary'
                            onClick = {onExit}
                        >cancel</Typography>
                        <Typography {...typoProps} color = 'textSecondary'>• enter to</Typography>
                        <Typography
                            {...typoProps}
                            className = {classes.clickable}
                            color = 'primary'
                            onClick = {onSave}
                        >save</Typography>
                    </div>
                </div>
                :
                <Typography color = 'textSecondary' >
                    {content}
                </Typography>
            }
            {handleStatusUpdates && parseStatus(status)}
        </Box>
    )
}

Comment.propTypes = {
    id: PropTypes.number.isRequired,
    handleStatusUpdates: PropTypes.bool,
}

Comment.defaultProps = {
    handleStatusUpdates: false,
}

export default Comment