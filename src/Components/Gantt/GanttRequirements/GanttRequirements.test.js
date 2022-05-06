import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttRequirements } from './index'

describe('<GanttRequirements />', () => {

    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')

    const selectCapabilitiesByIdsMock =
        useModuleMock('Redux/Capabilities/selectors', 'selectCapabilitiesByIds')

    const foundDeliverables = [
        {
            id: 2,
            title: 'Deliverable 1.1',
            capabilityId: 1
        },
        {
            id: 3,
            title: 'Deliverable 1.2',
            capabilityId: 1
        },
        {
            id: 4,
            title: 'Deliverable 2.1',
            capabilityId: 2
        }
    ]

    const foundCapabilities = [
        {
            id: 1,
            title: 'capability',
            deliverableIds: [2, 3]
        }
    ]

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })
        selectCapabilitiesByIdsMock.mockReturnValue(foundCapabilities)
    })

    test('should render', () => {
        render(<GanttRequirements id = {1} deliverables = {foundDeliverables} portfolioId = {2} target = {{}}/>)
        expect(screen.getByTestId('GanttRequirements__title')).toBeInTheDocument()
    })

    test('should show deliverables on hover', async() => {
        render(<GanttRequirements id = {1} deliverables = {foundDeliverables} portfolioId = {2} target = {{}}/>)
        userEvent.hover(await screen.findByTestId('GanttRequirements__title'))
        expect(await screen.findByTestId('GanttRequirements__deliverable-0')).toBeInTheDocument()
    })
})