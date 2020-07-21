const extractMonthAndYear = (period) => {
  const date = period.split("-")
  return { year: date[0], month: date[1] }
}
const validateYear = (year) => {
  try {
    const parsedYear = parseInt(year)

    if (parsedYear >= 2019 && parsedYear <= 2021)
      return true
    return false;
  }
  catch (err) {
    return false;
  }
}

const validateMonth = (month) => {
  try {
    const parsedMonth = parseInt(month)
    if (parsedMonth >= 1 && parsedMonth <= 12)
      return true
    return false;
  }
  catch (err) {
    return false;
  }
}

module.exports = {
  validateMonth,
  validateYear,
  extractMonthAndYear
}