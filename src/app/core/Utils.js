export default class Utils {

    getDate(date) {
        if (!date)
            return new Date();
        return new Date(date);
    }
}