import { makeStyles, SvgIcon } from '@material-ui/core'
import { Flag, LocalShipping } from '@material-ui/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { ReactComponent as CTFCertificate } from '../../Assets/ctf.svg'
import { ReactComponent as GitlabPipeline } from '../../Assets/gitlab.svg'
import { IconStepper } from '../IconStepper'

const useStyles = makeStyles(theme => ({
    root: {
        width: 34,
        height: 34,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundColor: theme.palette.error.main,
    },
    completed: {
        backgroundColor: theme.palette.success.main,
    }
}))

function StepIcons({ active, completed, icon }) {
    const classes = useStyles()

    const icons = {
        1: <Flag />,
        2: <SvgIcon><GitlabPipeline/></SvgIcon>,
        3: <SvgIcon style = {{ marginTop: '3px' }}><CTFCertificate /></SvgIcon>,
        4: <LocalShipping />
    }

    return (
        <div
            className = {clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed
            })}
        >
            {icons[icon]}
        </div>
    )
}

StepIcons.propTypes = {
    active: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
    icon: PropTypes.number.isRequired,
}

function PathToProdStepper() {
    // TODO: pass in from product once CTF data is attached to product entity
    const steps = ['COT', 'Pipelines', 'CTF', 'Prod']

    return (
        <div style = {{ margin: '0 -10%', width: '120%', padding: '0px' }} >
            <IconStepper
                steps = {steps}
                icons = {StepIcons}
                currentStep = {2}
                tooltip
            />
        </div>
    )
}

export default PathToProdStepper