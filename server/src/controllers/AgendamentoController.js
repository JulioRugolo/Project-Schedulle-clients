const AgendamentoService = require('../services/AgendamentoService');

const buscarDatasLivres = async (req, res) => {
  try {
    const datasLivres = await AgendamentoService.buscarDatasLivres();
    res.status(200).json(datasLivres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  buscarDatasLivres,
};
