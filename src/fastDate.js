//Stripped down version of a Date/moment object,
//built for performance in highly specific scenarios (because moment.js comparisons are very slow)
export default class FastDate {
    constructor(input) {
        if (!input) {
            this.value = new Date();
        } else if (typeof (input) == 'string') {
            try {
                const date = input.substr(0, input.indexOf('T')),
                    time = input.substr(input.indexOf('T') + 1),
                    [year, month, day] = date.split('-'),
                    [hour, minute] = time.split(':');
                this.value = new Date(year, month - 1, day, hour, minute);
            } catch (e) {
                throw new Error('FastDate bad string format: "' + input + '"');
                throw e;
            }
        } else if (input instanceof FastDate) {
            this.value = new Date(input.value);
        } else if (input instanceof Date) {
            this.value = new Date(input);
        } else {
            this.value = new Date();
            throw new Error('FastDate bad input type (' + (typeof (input)) + ') for: ' + input);
        }
        this.toObject();
    }

    static today = new FastDate();

    toObject = () => this.obj = {
        years: this.value.getFullYear(),
        months: this.value.getMonth(),
        date: this.value.getDate(),
        hours: this.value.getHours(),
        minutes: this.value.getMinutes(),
    };

    toString = () => this.value.toString();

    add = (amount, unit = 'minute') => {
        switch (unit) {
            case 'year':
            case 'years':
                this.value.setFullYear(this.obj.years + amount);
                break;
            case 'month':
            case 'months':
                this.value.setMonth(this.obj.months + amount);
                break;
            case 'date':
                this.value.setDate(this.obj.date + amount);
                break;
            case 'hour':
            case 'hours':
                this.value.setHours(this.obj.hours + amount);
                break;
            case 'minute':
            case 'minutes':
                this.value.setMinutes(this.obj.minutes + amount);
                break;
            default:
                throw new Error('FastDate::add() invalid unit: ' + unit);
                break;
        }
        this.toObject();
        return this;
    }

    setYear = year => {
        this.value.setFullYear(year);
        this.toObject();
        return this;
    }

    setMonth = month => {
        this.value.setMonth(month);
        this.toObject();
        return this;
    }

    setDate = date => {
        this.value.setDate(date);
        this.toObject();
        return this;
    }

    setHours = hours => {
        this.value.setHours(hours);
        this.toObject();
        return this;
    }

    setMinutes = minutes => {
        this.value.setMinutes(minutes);
        this.toObject();
        return this;
    }

    isBefore = other => {
        !(other instanceof FastDate) && (other = new FastDate(other));
        const t = this.obj,
            o = other.obj;
        if (t.years < o.years) {
            return true;
        }
        if (t.years > o.years) {
            return false;
        }
        if (t.months < o.months) {
            return true;
        }
        if (t.months > o.months) {
            return false;
        }
        if (t.date < o.date) {
            return true;
        }
        if (t.date > o.date) {
            return false;
        }
        if (t.hours < o.hours) {
            return true;
        }
        if (t.hours > o.hours) {
            return false;
        }
        if (t.minutes < o.minutes) {
            return true;
        }
        if (t.minutes > o.minutes) {
            return false;
        }
        return false;
    }

    isBeforeMonth = other => {
        !(other instanceof FastDate) && (other = new FastDate(other));
        const t = this.obj,
            o = other.obj;
        if (t.years < o.years) {
            return true;
        }
        if (t.years > o.years) {
            return false;
        }
        if (t.months < o.months) {
            return true;
        }
        if (t.months > o.months) {
            return false;
        }
        return false;
    }

    isAfter = other => {
        !(other instanceof FastDate) && (other = new FastDate(other));
        const t = this.obj,
            o = other.obj;
        if (t.years > o.years) {
            return true;
        }
        if (t.years < o.years) {
            return false;
        }
        if (t.months > o.months) {
            return true;
        }
        if (t.months < o.months) {
            return false;
        }
        if (t.date > o.date) {
            return true;
        }
        if (t.date < o.date) {
            return false;
        }
        if (t.hours > o.hours) {
            return true;
        }
        if (t.hours < o.hours) {
            return false;
        }
        if (t.minutes > o.minutes) {
            return true;
        }
        if (t.minutes < o.minutes) {
            return false;
        }
        return false;
    }

    isAfterMonth = other => {
        !(other instanceof FastDate) && (other = new FastDate(other));
        const t = this.obj,
            o = other.obj;
        if (t.years > o.years) {
            return true;
        }
        if (t.years < o.years) {
            return false;
        }
        if (t.months > o.months) {
            return true;
        }
        if (t.months < o.months) {
            return false;
        }
        return false;
    }

    isSame = other => {
        !(other instanceof FastDate) && (other = new FastDate(other));
        const t = this.obj,
            o = other.obj;
        return t.years == o.years && t.months == o.months && t.date == o.date && t.hours == o.hours && t.minutes == o.minutes;
    }

    isSameDate = other => {
        !(other instanceof FastDate) && (other = new FastDate(other));
        const t = this.obj,
            o = other.obj;
        return t.years == o.years && t.months == o.months && t.date == o.date;
    }

    isSameMonth = other => {
        !(other instanceof FastDate) && (other = new FastDate(other));
        const t = this.obj,
            o = other.obj;
        return t.years == o.years && t.months == o.months;
    }
}