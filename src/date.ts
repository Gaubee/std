/**
 * 克隆时间
 */
export const date_clone = (date: Date) => {
    return new Date(date);
};
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
export const date_add = (date: Date, duration: Partial<Duration>) => {
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
