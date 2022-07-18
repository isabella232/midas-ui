import { Popup } from 'Components/Popup'
import { SearchEpicsDropdown } from 'Components/Search/SearchEpicsDropdown'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from 'Redux/Popups/actions'
import { selectTargetById } from 'Redux/Targets/selectors'

export default function AssociateEpicsPopup({ targetId, title, subtitle, onSelectEpic }) {
    const dispatch = useDispatch()

    const target = useSelector(state => selectTargetById(state, targetId))

    const onClose = () => dispatch(closePopup('AssociateEpics'))

    const handleOnSelect = (e, value, setEpicLoading) => {
        e.stopPropagation()
        onSelectEpic([...target.epicIds, value.id], setEpicLoading)
    }

    const handleOnDeselect = (e, value, setEpicLoading) => {
        e.stopPropagation()
        const filteredEpicIds = target.epicIds.filter(id => id !== value.id)
        onSelectEpic(filteredEpicIds, setEpicLoading)
    }

    return (
        <Popup
            title = {title}
            subtitle = {subtitle}
            onClose = {onClose}
            cancelText = 'close'
            hideRequiredText
            disableDefaultPadding
            width = '500px'
        >
            <SearchEpicsDropdown
                portfolioId = {target.portfolioId}
                linkedEpicIds = {target.epicIds}
                handleOnSelect = {handleOnSelect}
                handleOnDeselect = {handleOnDeselect}
            />
        </Popup>
    )
}

AssociateEpicsPopup.propTypes = {
    onSelectEpic: PropTypes.func.isRequired,
    subtitle: PropTypes.string,
    targetId: PropTypes.number.isRequired,
    title: PropTypes.string,
}

AssociateEpicsPopup.defaultProps = {
    subtitle: undefined,
    title: 'Associate Epics',
}