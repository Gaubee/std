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

export type FormatifyDate =
    & {
        year: string;
        month: string;
        day: string;
        hour: string;
        minute: string;
        second: string;

        hour12: string;
    }
    & ({
        dayPart: "PM";
        am: false;
        pm: true;
    } | {
        dayPart: "AM";
        am: true;
        pm: false;
    });

/**将日期转化成易于格式化的信息 */
export const date_formatify = (date: string | number | Date): FormatifyDate => {
    date = date instanceof Date ? date : new Date(date);
    const formatter = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // 24 小时制
    });

    const [year, month, day, hour, minute, second, dayPart] = formatter.format(date).split(/[-\s,:]+/); // .replace(/[-]/g, ".").replace(/,/, "");
    const pm = dayPart === "p.m.";
    const am = !pm;
    return {
        year,
        month,
        day,
        hour: pm ? `${+hour + 12}` : hour,
        minute,
        second,

        hour12: hour,
        dayPart: pm ? "PM" : "AM",
        am,
        pm,
    } as FormatifyDate;
};

/**将日期根据指定模板进行格式化 */
export const date_format = (format: string, date: string | number | Date): string => {
    const formatify = date_formatify(date);
    const trim0 = (str: string, t: string) => t.length === 1 ? str.replace(/^0/, "") : str;
    return format
        /// year = yyyy
        .replace(/y{2,4}/, (t) => {
            return formatify.year.slice(t.length - formatify.year.length);
        })
        /// month = mm
        .replace(/m{1,2}/, (t) => {
            return trim0(formatify.month, t);
        })
        /// day = dd
        .replace(/d{1,2}/, (t) => {
            return trim0(formatify.day, t);
        })
        /// hour = HH
        .replace(/H{1,2}/, (t) => {
            return trim0(formatify.hour, t);
        })
        /// minute = MM
        .replace(/M{1,2}/, (t) => {
            return trim0(formatify.minute, t);
        })
        /// second = SS
        .replace(/S{1,2}/, (t) => {
            return trim0(formatify.second, t);
        });
};
