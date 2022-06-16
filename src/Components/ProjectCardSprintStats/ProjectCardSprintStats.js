
import { Card, Grid, Stack, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { IssueSyncRequest } from 'Components/IssueSyncRequest'
import { SprintIssues } from 'Components/SprintIssues'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchIssues, requestSyncIssuesByProjectId } from 'Redux/Issues/actions'
import { selectProjectById } from 'Redux/Projects/selectors'
import { requestSyncReleasesByProjectId } from 'Redux/Releases/actions'
import { selectReleaseClosestTo, selectReleaseInRangeAndProjectId } from 'Redux/Releases/selectors'
import { getDateInDatabaseOrder } from 'Utilities/dateHelpers'

export default function ProjectCardSprintStats({ projectId, dateRange, hasEdit }) {
    const dispatch = useDispatch()

    const project = useSelector(state => selectProjectById(state, projectId))

    const [closedIssuesThisSprint, setClosedIssuesThisSprint] = useState([])
    const [releasedIssuesThisSprint, setReleasedIssuesThisSprint] = useState([])
    const releasesThisSprint = useSelector(state => selectReleaseInRangeAndProjectId(state, dateRange, projectId))
    const previousRelease = useSelector(state => selectReleaseClosestTo(state, dateRange[0], projectId))

    const syncIssues = async() => {
        return Promise.all(
            [
                dispatch(requestSyncIssuesByProjectId(projectId)),
                dispatch(requestSyncReleasesByProjectId(projectId))
            ]
        )
    }

    const projectSearchString = (field, rangeStart, rangeEnd) => {
        let searchString = ['project.id:' + projectId]
        searchString.push(' AND ')
        searchString.push(`${field}>=` + getDateInDatabaseOrder((new Date(rangeStart)).toISOString()))
        searchString.push(' AND ')
        searchString.push(`${field}<=` + getDateInDatabaseOrder((new Date(rangeEnd)).toISOString()))
        return searchString.join('')
    }

    const fetchSprintStagingIssues = () => {
        dispatch(requestSearchIssues(projectSearchString('completedAt', dateRange[0], dateRange[1])))
            .then(unwrapResult).then(setClosedIssuesThisSprint)
    }

    useEffect(() => {
        fetchSprintStagingIssues()
    }, [dateRange])

    useEffect(() => {
        if (releasesThisSprint.length > 0) {
            const max = Math.max(...releasesThisSprint.map(release => { return new Date(release.releasedAt) }))

            dispatch(requestSearchIssues(projectSearchString(
                'completedAt',
                previousRelease.releasedAt ?? 0,
                max
            ))).then(unwrapResult).then(setReleasedIssuesThisSprint)
        } else { setReleasedIssuesThisSprint([]) }
    }, [JSON.stringify(releasesThisSprint)])

    return (
        <Card style = {{ padding: '8px' }}>
            <Stack>
                <Stack
                    height = '36px'
                    marginLeft = {1}
                    justifyContent = 'space-between'
                    direction = 'row'
                    spacing = {1}
                >
                    <Typography variant = 'h6'>{project.name}</Typography>
                    <div style = {{ visibility: hasEdit ? 'visible' : 'hidden' }} >
                        <IssueSyncRequest request = {syncIssues} tooltip = ''/>
                    </div>
                </Stack>
                <Grid container margin = {1}>
                    <Grid item xs = {12} lg = {2}>
                        <div>
                            <Typography variant = 'subtitle1' color = 'secondary'>
                                Production Deployments:
                            </Typography>
                            <Stack paddingX = {1}>
                                {releasesThisSprint.map((release, index) =>
                                    <Stack
                                        display = 'list-item'
                                        direction = 'row'
                                        spacing = {1}
                                        key = {index}
                                        marginLeft = {2}
                                    >
                                        <Typography display = 'inline' variant = 'body2'>
                                            {release.name}
                                        </Typography>
                                        <Typography display = 'inline' color = 'secondary'>
                                            -
                                        </Typography>
                                        <Typography display = 'inline' variant = 'body2'>
                                            {format(new Date(release.releasedAt), 'dd MMM yy')}
                                        </Typography>
                                    </Stack>
                                )}
                                {releasesThisSprint?.length === 0 &&
                                    <Typography>
                                        <i>No deployments this sprint.</i>
                                    </Typography>
                                }
                            </Stack>
                        </div>
                    </Grid>
                    <Grid item xs = {12} lg = {5}>
                        <div>
                            <Typography variant = 'subtitle1' color = 'secondary'>
                                Issues Deployed to Production (CUI):
                            </Typography>
                            <Stack paddingX = {1}>
                                <SprintIssues
                                    issues = {releasedIssuesThisSprint}
                                    noOptionsText = 'No issues released this sprint.'
                                />
                            </Stack>
                        </div>
                    </Grid>
                    <Grid item xs = {12} lg = {5}>
                        <div>
                            <Typography variant = 'subtitle1' color = 'secondary'>
                                Issues Deployed to Staging:
                            </Typography>
                            <Stack paddingX = {1}>
                                <SprintIssues
                                    issues = {closedIssuesThisSprint}
                                    noOptionsText = 'No issues closed this sprint.'
                                />
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
            </Stack>
        </Card>
    )
}

ProjectCardSprintStats.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])).isRequired,
    projectId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool
}

ProjectCardSprintStats.defaultProps = {
    hasEdit: false
}