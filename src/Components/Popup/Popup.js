import { Close } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, Divider, IconButton, Typography } from '@mui/material'
import { Header } from 'Components/Header'
import PropTypes from 'prop-types'
import { scrollbar, styled } from 'Styles/materialThemes'

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
    ...scrollbar(theme)
}))

const Popup = ({
    cancelText,
    children,
    disableDefaultPadding,
    disableDefaultDivider,
    hideRequiredText,
    onClose,
    onSubmit,
    open,
    submitText,
    subtitle,
    subtitleVariant,
    title,
    width,
    height
}) => {

    return (
        <Dialog
            data-testid = 'Popup__dialog'
            open = {open}
            scroll = 'paper'
            PaperProps = {{ style: { width, height } }}
        >
            <Header
                title = {title}
                titleVariant = 'h6'
                subtitle = {subtitle}
                subtitleVariant = {subtitleVariant}
                icon = {
                    <IconButton
                        data-testid = 'Popup__button-close'
                        color = 'secondary'
                        onClick = {onClose}
                        size = 'medium'
                    >
                        <Close />
                    </IconButton>
                }
                additionalNode = {!hideRequiredText &&
                    <Typography variant = 'caption' color = 'text.secondary'>
                        * are required
                    </Typography>
                }
            />
            {!disableDefaultDivider && <Divider />}
            <DialogContentStyled sx = {{ p: disableDefaultPadding ? '20px 24px' : '16px 16px 50px 16px' }}>
                {children}
            </DialogContentStyled>
            <DialogActions sx = {{ m: 0, p: 1 }}>
                <Button
                    data-testid = 'Popup__button-cancel'
                    onClick = {onClose}
                    color = 'secondary'
                    variant = 'text'
                >
                    {cancelText}
                </Button>
                { onSubmit &&
                    <Button
                        data-testid = 'Popup__button-submit'
                        onClick = {onSubmit}
                        color = 'primary'
                        variant = 'outlined'
                    >
                        {submitText}
                    </Button>
                }
            </DialogActions>
        </Dialog>
    )
}

Popup.propTypes = {
    cancelText: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.node
    ]).isRequired,
    disableDefaultDivider: PropTypes.bool,
    disableDefaultPadding: PropTypes.bool,
    height: PropTypes.string,
    hideRequiredText: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    open: PropTypes.bool,
    submitText: PropTypes.string,
    subtitle: PropTypes.string,
    subtitleVariant: PropTypes.string,
    title: PropTypes.string.isRequired,
    width: PropTypes.string,
}

Popup.defaultProps = {
    cancelText: 'cancel',
    disableDefaultDivider: false,
    disableDefaultPadding: false,
    height: 'max-content',
    hideRequiredText: false,
    onSubmit: undefined,
    open: true,
    submitText: 'submit',
    subtitle: null,
    subtitleVariant: 'h6',
    width: '395px',
}

export default Popup
