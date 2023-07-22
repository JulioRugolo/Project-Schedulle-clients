const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Calendario = require('./models/Calendario');

dotenv.config();

// Função para verificar se um dia é um dia útil (segunda a sexta-feira)
const isWeekday = (date) => {
  const day = date.getDay();
  return day >= 1 && day <= 5; // 1 é segunda-feira e 5 é sexta-feira
};

// Função para gerar os horários das 09h às 18h em intervalos de 2 horas
const generateHorarios = () => {
  const horarios = [];
  const startTime = new Date('2023-07-20T09:00:00');
  const endTime = new Date('2023-07-20T18:00:00');

  const currentTime = new Date(startTime);
  while (currentTime <= endTime) {
    horarios.push(currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    currentTime.setHours(currentTime.getHours() + 2);
  }

  return horarios;
};

// Popula todos os dias do ano com exceção de sábado e domingo
const populateCalendario = async () => {
  const datasHorarios = [];
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2023-12-31');

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    if (isWeekday(currentDate)) {
      datasHorarios.push({
        data: new Date(currentDate),
        horarios: generateHorarios(),
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Limpa a coleção antes de inserir os novos dados
    const collection = mongoose.connection.collection('calendarios');
    await collection.deleteMany();

    // Insere os dados no banco de dados
    await Calendario.insertMany(datasHorarios);
    console.log('Dados do calendário inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir dados do calendário:', error);
  } finally {
    mongoose.disconnect();
  }
};

populateCalendario();
