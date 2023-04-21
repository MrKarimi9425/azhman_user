import moment from 'jalali-moment'

function JDate(date) {
    return moment.unix(parseInt(date)).locale("fa").format("YYYY/MM/DD");
}

function JTime(date) {
    return moment.unix(parseInt(date)).locale("fa").format("HH:mm");
}

function JDateTime(date) {
    return moment.unix(parseInt(date)).locale("fa").format("YYYY/MM/DD HH:mm");
}

export { JDate, JTime, JDateTime }