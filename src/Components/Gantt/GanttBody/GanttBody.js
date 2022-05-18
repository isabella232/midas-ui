import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { dateRangeFilter } from 'Utilities/dateHelpers'
import { cellStyles, createIndexedRowsFromData, rowStyles } from 'Utilities/ganttHelpers'
import { GanttDividerBar } from '../GanttDividerBar'
import { GanttEntry } from '../GanttEntry'

export default function GanttBody({
    borderColor,
    chartBackgroundColor,
    columns,
    dateRange,
    defaultRowHeight,
    defaultRowSpacing,
    entries,
    onEntriesFilter,
    renderComponent,
    todayColor,
}) {

    const entryWrapperProps = {
        style: {
            top: `-${defaultRowSpacing}px`,
            marginTop: `${defaultRowSpacing}px`,
            width: '100%',
        }
    }

    const inRangeEntries = useMemo(() => {
        const indexedRows = createIndexedRowsFromData(entries?.filter(entry => dateRangeFilter(entry, dateRange)))
        return onEntriesFilter(indexedRows, dateRange)
    }, [JSON.stringify(entries), JSON.stringify(dateRange)])

    const containerStyles = {
        ...rowStyles(chartBackgroundColor, borderColor),
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0
    }

    const rowStyling = {
        display: 'flex',
        marginBottom: defaultRowSpacing + 'px',
        minHeight: defaultRowHeight
    }

    return (
        <div style = {{ position: 'relative', overflow: 'hidden' }}>
            <div style = {containerStyles}>
                {columns.map((column, index) => (
                    <div
                        style = {{ ...cellStyles(borderColor, column.flexGrow) }}
                        key = {index}
                    />
                ))}
            </div>
            <GanttDividerBar dateRange = {dateRange} color = {todayColor}/>
            <div {...entryWrapperProps}>
                {Object.entries(inRangeEntries).map(row => (
                    <div style = {rowStyling} key = {row}>
                        {row[1].map((entry, index) => (
                            <GanttEntry
                                key = {index}
                                dateRange = {dateRange}
                                startDate = {entry.startDate}
                                dueDate = {entry.dueDate}
                                enableFullHeight = {entry.enableFullHeight}
                                style = {entry.style}
                            >
                                {renderComponent(entry)}
                            </GanttEntry>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

GanttBody.propTypes = {
    borderColor: PropTypes.string,
    chartBackgroundColor: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        flexGrow: PropTypes.number
    })).isRequired,
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    defaultRowHeight: PropTypes.number,
    defaultRowSpacing: PropTypes.number,
    entries: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        startDate: PropTypes.string,
        dueDate: PropTypes.string.isRequired,
    })),
    onEntriesFilter: PropTypes.func,
    renderComponent: PropTypes.func.isRequired,
    todayColor: PropTypes.string.isRequired
}

GanttBody.defaultProps = {
    borderColor: '#d8d8d8',
    chartBackgroundColor: '#fff',
    defaultRowHeight: 48,
    defaultRowSpacing: 8,
    entries: [{
        title: null,
        dueDate: null,
        startDate: null,
    }],
    onEntriesFilter: (entries) => entries,
}