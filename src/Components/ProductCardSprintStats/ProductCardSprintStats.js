import { Card, Stack, Typography } from '@mui/material'
import { ProjectCardSprintStats } from 'Components/ProjectCardSprintStats'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { selectProductById } from 'Redux/Products/selectors'

export default function ProductCardSprintStats({ productId, dateRange }) {

    const product = useSelector(state => selectProductById(state, productId))
    const pagePermissions = useSelector(state => selectPortfolioPagePermission(state, product.portfolioId))

    return (
        <Card style = {{ padding: '8px' }}>
            <Stack>
                <Typography margin = {1} variant = 'h6'>{product.name}</Typography>
                <Stack paddingX = {1} spacing = {1}>
                    {product.projectIds?.map((projectId, index) =>
                        <ProjectCardSprintStats
                            key = {index}
                            projectId = {projectId}
                            dateRange = {dateRange}
                            hasEdit = {Boolean(pagePermissions.edit)}
                        />
                    )}
                </Stack>
            </Stack>
        </Card>
    )
}

ProductCardSprintStats.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])).isRequired,
    productId: PropTypes.number.isRequired,
}