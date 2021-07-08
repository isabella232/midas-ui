import { Box, Button, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'

function AddComment({ additionalNode, onSubmit, handleEnterKey }) {

    const ref = useRef()

    const handleEnter = (event) => {
        if (handleEnterKey && !event.shiftKey && event.key === 'Enter') handleSubmit()
    }

    const handleSubmit = () => {
        onSubmit(ref.current.value)
        ref.current.value = ''
    }

    return (
        <Box margin = {1} display = 'flex' flexDirection = 'column'>
            <TextField
                multiline
                fullWidth
                variant = 'filled'
                placeholder = 'Enter comment here...'
                InputProps = {{
                    style: {
                        padding: '6px'
                    },
                    disableUnderline: true
                }}
                inputRef = {ref}
                onKeyDown = {handleEnter}
            />
            <Box display = 'flex' justifyContent = 'space-between' style = {{ direction: 'rtl' }}>
                <Button
                    variant = 'outlined'
                    size = 'small'
                    onClick = {handleSubmit}
                    style = {{ margin: '4px 0' }}
                >submit</Button>
                {additionalNode}
            </Box>
        </Box>
    )
}

AddComment.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    additionalNode: PropTypes.node,
    handleEnterKey: PropTypes.bool
}

AddComment.defaultProps = {
    additionalNode: undefined,
    handleEnterKey: false
}

export default AddComment