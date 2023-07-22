const Calendario = require('../models/Calendario'); // Corrigir o nome do modelo aqui

const buscarDatasLivres = async () => {
  try {
    const datasLivres = await Calendario.find(); // Usar o nome correto do modelo aqui
    return datasLivres;
  } catch (error) {
    throw new Error('Erro ao buscar datas livres: ' + error.message);
  }
};

module.exports = {
  buscarDatasLivres,
};
