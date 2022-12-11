import moment from 'moment'

export function formatDate(rawDateTime) {
    return moment(rawDateTime).format('YYYY-MM-DD')
}

export function formatDateTime(rawDateTime) {
    return moment(rawDateTime).format('YYYY-MM-DD HH:mm')
}