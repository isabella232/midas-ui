import { AppBar as AppBarMUI, fade, IconButton, makeStyles, Toolbar, Typography, useTheme } from '@material-ui/core'
import { AccountCircle, Fingerprint, Gavel, LocalOffer } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectUserLoggedIn } from '../../Redux/Auth/selectors'
import { setAppBarFilterString } from '../../Redux/Filters/reducer'
import { selectAppBarFilter } from '../../Redux/Filters/selectors'
import { getRoot } from '../../Utilities/queryParams'
import { SearchBar } from '../Search'

const useStyles = makeStyles(theme => ({
    logo: {
        maxBlockSize: '36px',
        paddingRight: '5px',
        cursor: 'pointer'
    },
    title: {
        display: 'none',
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    account: {
        padding: '0 8px',
        '&:hover': {
            borderRadius: theme.spacing(1)
        }
    },
    page: {
        fontWeight: 'bold',
        cursor: 'pointer',
        margin: `0 ${theme.spacing(2)}px`
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}))

function AppBar({ height, appName }) {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const theme = useTheme()

    const currentPage = getRoot()
    const user = useSelector(selectUserLoggedIn)
    const filterString = useSelector(selectAppBarFilter)

    const goHome = () => history.push('/home')
    const search = (searchString) => dispatch(setAppBarFilterString(searchString))

    const pages = [
        {
            label: 'Dashboard (TBA)',
            path: 'home'
        }, {
            label: 'Projects',
            path: 'projects'
        }, {
            label: 'Products',
            path: 'products'
        }, {
            label: 'Portfolios (TBA)',
            path: 'portfolios'
        }
    ]

    return (
        <AppBarMUI
            style = {{
                marginTop: '20px',
                height: height,
                justifyContent: 'center',
                boxShadow: 'none',
                borderBottom: `solid 1px ${theme.palette.appColor}`,
                backgroundColor: theme.palette.background.default
            }}
        >
            <Toolbar style = {{ paddingLeft: '10px' }}>
                <Fingerprint
                    style = {{
                        color: 'gold',
                        cursor: 'pointer',
                        height: '28px',
                    }}
                    title = 'logo'
                    onClick = {goHome}
                />
                {appName &&
                    <Typography
                        variant = 'h4'
                        style = {{
                            backgroundImage: '-webkit-linear-gradient(#b08910 25%, #dee33f)',
                            color: 'transparent',
                            fontFamily: '-webkit-pictograph',
                            fontSize: 'x-large',
                            fontWeight: 'bold',
                            WebkitBackgroundClip: 'text',
                        }}
                        className = {classes.title}
                        color = 'textPrimary'
                        onClick = {goHome}
                    >
                        {appName}
                    </Typography>
                }
                <div style = {{ margin: '10px' }}/>
                { pages.map(page => (
                    <div key = {page.label}>
                        <Typography
                            onClick = {() => history.push(`/${page.path}`)}
                            className = {classes.page}
                            variant = 'body1'
                            style = {{
                                color: currentPage === page.path ?
                                    theme.palette.text.secondary : theme.palette.grey[600],
                            }}
                        >{page.label}</Typography>
                    </div>
                ))}
                <div style = {{ flexGrow: 1 }} />
                <div style = {{ marginRight: theme.spacing(3) }}>
                    <SearchBar
                        height = {24}
                        borderRadius = {12}
                        growFrom = '150px'
                        growTo = '225px'
                        placeholder = 'Search'
                        searchIconHeight = '18px'
                        fontSize = 'small'
                        disableClearable
                        search = {search}
                        defaultValue = {filterString}
                    />
                </div>
                <div>
                    <IconButton
                        color = 'secondary'
                        onClick = {() => history.push('/tags')}
                        size = 'small'
                        title = 'tags'
                    ><LocalOffer /></IconButton>
                </div>
                {user.isAdmin &&
                    <div style = {{ margin: `0 ${theme.spacing(1)}px` }}>
                        <IconButton
                            color = 'secondary'
                            onClick = {() => history.push('/admin')}
                            size = 'small'
                            title = 'admin'
                        ><Gavel /></IconButton>
                    </div>
                }
                {user.id &&
                        <IconButton
                            edge = 'end'
                            color = 'secondary'
                            onClick = {() => history.push('/account')}
                            className = {classes.account}
                            style = {{ marginLeft: theme.spacing(2) }}
                            title = 'account'
                        >
                            {user.displayName}
                            <AccountCircle style = {{ marginLeft: '4px' }}/>
                        </IconButton>
                }
            </Toolbar>
        </AppBarMUI>
    )
}

AppBar.propTypes = {
    appName: PropTypes.string,
    height: PropTypes.string,
}

AppBar.defaultProps = {
    appName: null,
    height: '48px',
}

export default AppBar