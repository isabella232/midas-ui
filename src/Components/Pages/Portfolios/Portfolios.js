import { Box } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import PortfolioConstant from '../../../Redux/Portfolios/constants'
import { selectUnarchivedPortfolios } from '../../../Redux/Portfolios/selectors'
import { PortfolioCard } from '../../Cards'
import { FloatingActionButton } from '../../FloatingActionButton'
import { Page } from '../../Page'

function Portfolios() {
    const dispatch = useDispatch()

    const allPortfolios = useSelector(selectUnarchivedPortfolios)

    const create = () => dispatch(openPopup(PortfolioConstant.CREATE_PORTFOLIO, 'CreateOrUpdatePortfolioPopup'))

    return (
        <Page>
            <Box style = {{ padding: '20px 40px' }}>
                <Box
                    display = 'grid'
                    justifyContent = 'center'
                    gridTemplateColumns = 'repeat(auto-fit, 450px)'
                    gridAutoRows = '2px'
                    gridGap = '0 10px'
                    gridAutoFlow = 'row'
                    style = {{ marginBottom: '40px', padding: '0 30px' }}
                >
                    {allPortfolios.map((portfolio) => (
                        <PortfolioCard key = {portfolio.id} id = {portfolio.id}/>
                    ))}
                </Box>
            </Box>
            <FloatingActionButton onClick = {create} />
        </Page>
    )
}

export default Portfolios