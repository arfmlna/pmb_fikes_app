const getYearOptions = (startYear = 2000) => {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
        years.push({ value: year, label: year.toString() });
    }

    return years;
};

export default getYearOptions