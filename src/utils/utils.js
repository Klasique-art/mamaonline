export const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
} 

export const formatDate = date => {
    return new Intl.DateTimeFormat('en-US').format(new Date(date));
}