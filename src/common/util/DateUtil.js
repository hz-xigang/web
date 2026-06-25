import dayjs from 'dayjs';

export const TimeUnit = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year',
};


const DateUtil = {

    /**
     * 今天
     */
    today(format = 'YYYY-MM-DD') {
        return dayjs().format(format);
    },

    /**
     * 昨天
     */
    yesterday(format = 'YYYY-MM-DD') {
        return dayjs().subtract(1, TimeUnit.DAY).format(format);
    },

    /**
     * 明天
     */
    tomorrow(format = 'YYYY-MM-DD') {
        return dayjs().add(1, TimeUnit.DAY).format(format);
    },

    /**
     * 今日时间范围
     */
    todayRange(format = 'YYYY-MM-DD HH:mm:ss') {
        return {
            st: dayjs().startOf(TimeUnit.DAY).format(format),
            ed: dayjs().endOf(TimeUnit.DAY).format(format),
        };
    },

    /**
     * 本周时间范围
     */
    weekRange(format = 'YYYY-MM-DD') {
        return {
            st: dayjs().startOf(TimeUnit.WEEK).format(format),
            ed: dayjs().endOf(TimeUnit.WEEK).format(format),
        };
    },

    /**
     * 本月时间范围
     */
    monthRange(date = new Date(), format = 'YYYY-MM-DD') {
        const d = dayjs(date);

        return {
            st: d.startOf(TimeUnit.MONTH),
            ed: d.endOf(TimeUnit.MONTH),
        };
    },

    /**
     * 本年时间范围
     */
    yearRange(date = new Date(), format = 'YYYY-MM-DD') {
        const d = dayjs(date);

        return {
            st: d.startOf('year').format(format),
            ed: d.endOf('year').format(format),
        };
    },

    /**
     * 增加时间
     */
    add(value, unit = 'day', date = new Date()) {
        return dayjs(date)
            .add(value, unit)
            .toDate();
    },

    /**
     * 减少时间
     */
    subtract(value, unit = 'day', date = new Date()) {
        return dayjs(date)
            .subtract(value, unit)
            .toDate();
    },

    /**
     * 日期格式化
     */
    format(date = new Date(), format = 'YYYY-MM-DD') {
        return dayjs(date).format(format);
    },

    /**
     * 是否同一天
     */
    isSameDay(a, b) {
        return dayjs(a).isSame(dayjs(b), 'day');
    },

    /**
     * 日期差（天）
     */
    diffDay(start, end) {
        return dayjs(end).diff(dayjs(start), 'day');
    },

    /**
     * 转 Date
     */
    toDate(date) {
        return dayjs(date).toDate();
    },

    /**
     * 转时间戳
     */
    timestamp(date = new Date()) {
        return dayjs(date).valueOf();
    },

    /**
     * 中文本地时间
     */
    toLocalString(date = new Date()) {
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    },

    lastDays(
        days = 7,
        date = new Date(),
        format = 'YYYY-MM-DD'
    ) {
        const d = dayjs(date);

        return {
            st: d.subtract(days, 'day').format(format),
            ed: d.format(format),
        };
    },

    nextDays(
        days = 7,
        date = new Date(),
        format = 'YYYY-MM-DD'
    ) {
        const d = dayjs(date);

        return {
            st: d.format(format),
            ed: d.add(days, 'day').format(format),
        };
    }

    /**
     * 公历节日
     */
   /* getHoliday(date = new Date()) {
        const holidays = {
            '0101': '元旦',
            '0214': '情人节',
            '0308': '妇女节',
            '0312': '植树节',
            '0401': '愚人节',
            '0501': '劳动节',
            '0504': '青年节',
            '0601': '儿童节',
            '0701': '建党节',
            '0801': '建军节',
            '0910': '教师节',
            '1001': '国庆节',
            '1031': '万圣节',
            '1224': '平安夜',
            '1225': '圣诞节'
        };

        const key = dayjs(date).format('MMDD');

        return holidays[key] || '';
    },*/

};

export default DateUtil;