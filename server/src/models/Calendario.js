const mongoose = require('mongoose');

const calendarioSchema = new mongoose.Schema({
  data: { type: Date, required: true },
  horarios: [{ type: String, required: true }],
});

const Calendario = mongoose.model('Calendario', calendarioSchema);

module.exports = Calendario;
