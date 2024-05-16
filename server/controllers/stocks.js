function findStock(req, res) {
  const q = req.query.q;
  const stock = req.stock;

  if (!stock) {
    return res
      .status(404)
      .json({ success: false, msg: `No results for '${q}'` });
  }

  console.log(`Searhed for ${q}`); //TODO: move this to proper logger
  res.status(200).json({ success: true, data: stock });
}

module.exports = {
  findStock,
};
