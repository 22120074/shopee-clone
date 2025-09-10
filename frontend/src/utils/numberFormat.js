// Hàm định dạng số lượng đã bán
export const formatSold = (sold) => {
    if (sold >= 1_000_000) return `${(sold / 1_000_000).toFixed(sold % 1_000_000 === 0 ? 0 : 1)}tr`;
    if (sold >= 1_000) return `${(sold / 1_000).toFixed(sold % 1_000 === 0 ? 0 : 1)}k`;
    return sold.toString();
};


