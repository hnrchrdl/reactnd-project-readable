
export const timestampToDateString = timestamp => {
    const date = new Date(timestamp)
    const displayDate = date.toLocaleString()
    return displayDate;
}

export const sortBy = (field, reverse, primer = x => (x)) => {

    var key = primer ? 
        function(x) {return primer(x[field])} : 
        function(x) {return x[field]};
 
    reverse = !reverse ? 1 : -1;
 
    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
      } 
 }