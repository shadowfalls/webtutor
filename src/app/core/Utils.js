import * as constants from './constants';

export default class Utils {

    getDate(date) {
        if (!date)
            return new Date();
        return new Date(date);
    }

    printDate(date) {
        if (!date)
            return '';
        date = this.getDate(date);
        const month = constants.months[date.getMonth()];
        return month + ' ' + date.getDate()+', '+date.getFullYear();
    }
}