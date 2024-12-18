/**
 * 克隆时间
 */
export const date_clone = (date: Date): Date => {
    return new Date(date);
};
/**
 * 人类可读的时间对象
 */
export type Duration = {
    year: number;
    month: number;
    day: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
};
/**
 * 向一个 date 中添加时间
 * 可以是负数
 */
export const date_add_duration = (
    date: Date,
    duration: Partial<Duration>,
): Date => {
    const {
        year = NaN,
        month = NaN,
        day = NaN,
        minutes = NaN,
        seconds = NaN,
        milliseconds = NaN,
    } = duration;
    if (Number.isFinite(year)) {
        date.setFullYear(date.getFullYear() + year);
    }
    if (Number.isFinite(month)) {
        date.setMonth(date.getMonth() + month);
    }
    if (Number.isFinite(day)) {
        date.setDate(date.getDate() + day);
    }
    if (Number.isFinite(minutes)) {
        date.setMinutes(date.getMinutes() + minutes);
    }
    if (Number.isFinite(seconds)) {
        date.setSeconds(date.getSeconds() + seconds);
    }
    if (Number.isFinite(milliseconds)) {
        date.setMilliseconds(date.getMilliseconds() + milliseconds);
    }
    return date;
};

/**
 * 将一个 date 解码成 duration 对象
 */
export const date_to_duration = (date: Date): Duration => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    return {
        year,
        month,
        day,
        minutes,
        seconds,
        milliseconds,
    };
};
/**
 * 对一个 date 对象进行写入
 */
export const date_set_duration = (
    date: Date,
    duration: Partial<Duration>,
): Date => {
    const {
        year = NaN,
        month = NaN,
        day = NaN,
        minutes = NaN,
        seconds = NaN,
        milliseconds = NaN,
    } = duration;

    if (Number.isFinite(year)) {
        date.setFullYear(year);
    }
    if (Number.isFinite(month)) {
        date.setMonth(month - 1);
    }
    if (Number.isFinite(day)) {
        date.setDate(day);
    }
    if (Number.isFinite(minutes)) {
        date.setMinutes(minutes);
    }
    if (Number.isFinite(seconds)) {
        date.setSeconds(seconds);
    }
    if (Number.isFinite(milliseconds)) {
        date.setMilliseconds(milliseconds);
    }
    return date;
};
