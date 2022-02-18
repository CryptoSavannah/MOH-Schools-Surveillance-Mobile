export const formatTheDateLabel = (dateStr = defaultDate) => {
  return dateStr.toString().split(" ").splice(1, 2).join(' ') + ', ' + dateStr.toString().split(" ")[3]
}

export const formatTheDateText = (dateStr) => {
  return dateStr.getFullYear() + '-' + (dateStr.getMonth() + 1 )+ '-' + dateStr.getDate()
}

export const defaultDate = new Date();
