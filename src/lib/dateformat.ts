function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, '0'); // Get day with leading zero
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();
    
    return `${day}-${month}-${year}`;
}

export default formatDate;