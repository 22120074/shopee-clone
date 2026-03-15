const getStockTTL = () => {
  const baseTTL = 2 * 60 * 60;
  const jitter = Math.floor(Math.random() * 600);
  return baseTTL + jitter;
};
