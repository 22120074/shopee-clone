// Hàm định dạng số lượng đã bán
export const formatSold = (sold) => {
    if (sold >= 1_000_000) return `${(sold / 1_000_000).toFixed(sold % 1_000_000 === 0 ? 0 : 1)}tr`;
    if (sold >= 1_000) return `${(sold / 1_000).toFixed(sold % 1_000 === 0 ? 0 : 1)}k`;
    return sold.toString();
};

export const formatNumber = (number) => {
    if (!number) return '';
    const len = number.length;
    if (len <= 5) return number;
    const first2 = number.slice(0, 2);
    const last3 = number.slice(-3);
    const middle = '*'.repeat(len - 5);
    return first2 + middle + last3;
}

export const formatDate = (dateInput, format = 'dd/MM/yyyy') => {
    const date = new Date(dateInput);
    if (isNaN(date)) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return format
        .replace('dd', day)
        .replace('MM', month)
        .replace('yyyy', year)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
};

export const formatRating = (ratingNumber) => {
    return Math.floor(ratingNumber * 10) / 10;
}
