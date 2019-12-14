import moment from 'moment';
import 'moment/min/locales.min';

const dateUtils = {
    serverFormat: 'YYYY-MM-DDTHH:mm:ss',
    timeFormat: 'h:mm:ss A',
    shortTimeFormat: 'h:mm A',
    monthFormat: 'MMMM YYYY',
    locale: 'en',

    today: () => { return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) },

    toServerString: momentDate => {
        return dateUtils.toLocalMomentFromString(momentDate || moment()).format(dateUtils.serverFormat);
    },

    fromServerString: stringDate => {
        return moment(stringDate, dateUtils.serverFormat);
    },

    addDays: (date, daysNr) => {
        return date.clone().add(daysNr, 'days');
    },

    addMonths: (date, monthsNr) => {
        return date.clone().add(monthsNr, 'months');
    },

    addWeeks: (date, weeksNr) => {
        return date.clone().add(weeksNr, 'weeks');
    },

    startOfDay: date => dateUtils.toServerString(moment(date).startOf('day')),

    endOfDay: date => dateUtils.toServerString(moment(date).endOf('day')),

    toMoment: date => moment(date),

    toTimeString: stringDate => {
        if (!stringDate) { return stringDate; }
        return dateUtils.toLocalMomentFromString(stringDate)
            .format(dateUtils.timeFormat);
    },
    toDateString: stringDate => {
        if (!stringDate) { return stringDate; }
        return dateUtils.toLocalMomentFromString(stringDate)
            .format('dddd, MMMM D, YYYY');
    },
    toShortDateString: stringDate => {
        if (!stringDate) { return stringDate; }
        return dateUtils.toLocalMomentFromString(stringDate)
            .format('MMMM D, YYYY');
    },
    toShortMonthDateString: stringDate => {
        if (!stringDate) { return stringDate; }
        return dateUtils.toLocalMomentFromString(stringDate)
            .format('MMM D, YYYY');
    },
    toDateTimeString: stringDate => {
        if (!stringDate) { return stringDate; }
        return dateUtils.toLocalMomentFromString(stringDate)
            .format(`MMMM D, YYYY, ${dateUtils.timeFormat}`);
    },
    toShortDateTimeString: stringDate => {
        if (!stringDate) { return stringDate; }
        return dateUtils.toLocalMomentFromString(stringDate)
            .format(`MMM D, YYYY, ${dateUtils.shortTimeFormat}`);
    },
    toShortTimeString: stringDate => !!stringDate && moment(stringDate).format(`${dateUtils.shortTimeFormat}`) || stringDate,

    addYears: (date, yearsNr) => {
        return date.clone().add(yearsNr, 'years');
    },

    getYearsFromServerString: stringDate => moment().diff(moment(stringDate, dateUtils.serverFormat), 'years'),

    enumerateDaysBetweenDates: (startDate, endDate) => {
        let dates = [],
            currDate = moment(startDate).startOf('day'),
            lastDate = moment(endDate).startOf('day');
        do {
            dates.push(currDate.clone());
        } while (currDate.add(1, 'days').diff(lastDate) <= 0);
        return dates;
    },

    toFormEditString: momentDate => {
        return momentDate.format('MM/DD/YYYY');
    },

    minDate: () => moment.utc('0001-01-01'),

    toApiStringOld: momentDate => {
        return momentDate.format('YYYYMMDD') || '';
    },

    toApiString: stringDate => moment(stringDate).format('YYYYMMDD'),

    toDateInterval: (startDate, endDate, isShortFormat = true, compareToNow = false, hideTimeInDate = false) => {
        const now = moment().toObject(),
            start = moment(startDate).toObject(),
            end = moment(endDate).toObject();
        let isStartNow = compareToNow && (start.date == now.date && start.months == now.months && start.years == now.years);
        let isEndNow = compareToNow && (end.date == now.date && end.months == now.months && end.years == now.years);
        let isSameDate = start.date == end.date && start.months == end.months && start.years == end.years;
        if (hideTimeInDate) {
            if (isSameDate) {
                return {
                    start: dateUtils.toDateString(startDate),
                }
            }
            else {
                return {
                    start: dateUtils.toDateString(startDate),
                    end: dateUtils.toDateString(endDate),
                }
            }
        }
        else {
            return {
                start: dateUtils[(isSameDate && isStartNow) ? 'toShortTimeString' : (isShortFormat ? 'toShortDateTimeString' : 'toDateTimeString')](startDate),
                end: dateUtils[(isSameDate && isEndNow) ? 'toShortTimeString' : (isSameDate ? 'toShortTimeString' : (isShortFormat ? 'toShortDateTimeString' : 'toDateTimeString'))](endDate),
            }
        }
    },

    toMonthFormat: momentDate => dateUtils.toLocalMoment(momentDate).format(`${dateUtils.monthFormat}`),
    firstDayOfWeek: momentDate => momentDate.locale(dateUtils.locale).localeData().firstDayOfWeek(),

    toLocalMomentFromString: stringDate => {
        var localLocale = moment(stringDate);
        localLocale.locale(dateUtils.locale);
        return localLocale;
    },
    toLocalMoment: momentDate => {
        var localLocale = momentDate.clone();
        localLocale.locale(dateUtils.locale);
        return localLocale;
    },
}

export default dateUtils;
