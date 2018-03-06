
export const prettyDate = time => {
    // https://stackoverflow.com/questions/7641791/javascript-library-for-human-friendly-relative-date-formatting
    var date = new Date(time),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);
    var year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31)
        return (
            year.toString() + '-'
            + ((month < 10) ? '0' + month.toString() : month.toString()) + '-'
            + ((day < 10) ? '0' + day.toString() : day.toString())
        );

    var r =
        (
            (
                day_diff == 0 &&
                (
                    (diff < 60 && "just now")
                    || (diff < 120 && "1 minute ago")
                    || (diff < 3600 && Math.floor(diff / 60) + " minutes ago")
                    || (diff < 7200 && "1 hour ago")
                    || (diff < 86400 && Math.floor(diff / 3600) + " hours ago")
                )
            )
            || (day_diff == 1 && "Yesterday")
            || (day_diff < 7 && day_diff + " days ago")
            || (day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago")
        );
    return r;
}

export const sortBy = (field, reverse, primer = x => (x)) => {
    // https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
    var key = primer ?
        function (x) { return primer(x[field]) } :
        function (x) { return x[field] };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}

export const generateUUID = () => {
    // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}