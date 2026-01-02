// auth middleware stub — backend removed.
module.exports = (req, res, next) => {
  res.status(410).json({ message: 'Local backend removed. Use external API.' });

module.exports = { verifyToken };
