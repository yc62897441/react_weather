import moment from 'moment'

export function formatMoment(rawDateTime, formatType) {
    return moment(rawDateTime).format(formatType)
}