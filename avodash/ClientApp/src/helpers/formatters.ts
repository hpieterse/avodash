const formatAvocadoCount = (number: number) => {
  const billion = 1000000000;
  if (number > billion) {
    return `${(number / billion).toFixed(2)} billion`;
  }
  const million = 1000000;
  if (number > million) {
    return `${(number / million).toFixed(2)} million`;
  }

  // add thousands separator
  return `${(number).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export default formatAvocadoCount;
