function getDateTime(date = new Date()) {
  return date.toJSON().slice(0, 19).replace('T', ' ');
}

module.exports = {
  getDateTime,
};
