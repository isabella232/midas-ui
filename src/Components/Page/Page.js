import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import appLogo from '../../Assets/appLogo.png'
import { getUserLoggedIn } from '../../Redux/Auth/selectors'
import { AppBar } from '../AppBar'

function Page({ children }) {
    const user = useSelector(state => getUserLoggedIn(state))

    return (
        <>
            <AppBar
                user = {user}
                appColor = '#D4AF37'
                appLogo = {appLogo}
                appName = 'MIDAS'
            />
            <div
                data-testid = 'Page__content'
                style = {{ padding: '68px 0 20px 0' }}
            >
                {children}
            </div>
        </>
    )
}

Page.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]).isRequired
}

export default Page