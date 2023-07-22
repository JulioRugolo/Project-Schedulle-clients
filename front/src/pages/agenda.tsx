import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Header from '@/Components/Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Agendar: React.FC = () => {
  const [calendario, setCalendario] = useState<any[]>([]);
  const [user, setUser] = useState<string>('');
  const [selectedHorario, setSelectedHorario] = useState<string>('');
  const [selectedServico, setSelectedServico] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const url = 'http://localhost:4000';

  // Função para fazer a chamada à API e obter os dias e horários vagos
  const obterCalendario = async () => {
    try {
      const response = await axios.get(`${url}/auth/datas`);
      setCalendario(response.data);
    } catch (error) {
      console.error('Erro ao obter calendário:', error);
    }
  };

  // Função para capitalizar a primeira letra de uma string
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${url}/auth/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data.email);
        console.log(response.data);
        obterCalendario();
      } catch (error: any) {
        console.log(error.response?.data?.error);
        window.location.href = '/login';
      }
    };

    fetchUser();
  }, []);

  const handleHorarioChange = (horario: string) => {
    setSelectedHorario(horario);
  };

  const handleServicoChange = (servico: string) => {
    setSelectedServico(servico);
  };

  const getDatasDoDiaSelecionado = () => {
    return calendario.filter((dia) => {
      const data = parseISO(dia.data);
      return (
        data.getDate() === selectedDate.getDate() &&
        data.getMonth() === selectedDate.getMonth() &&
        data.getFullYear() === selectedDate.getFullYear()
      );
    });
  };

  return (
    <div className="min-h-screen bg-pink-300 flex flex-col text-gray-700">
      <Header />
      <div className="flex justify-center items-center h-full">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">Agendar Horário</h1>
          <div className="flex justify-center gap-4">
            <DatePicker
              selected={selectedDate}
              onChange={(date:any) => setSelectedDate(date as Date)}
              locale={ptBR}
              inline
              dateFormat="dd/MM/yyyy"
              className="w-full h-full"
            />
          </div>

          {user ? (
            getDatasDoDiaSelecionado().length > 0 ? (
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {getDatasDoDiaSelecionado().map((dia) => (
                  <div key={dia.data} className="w-auto p-4 border-4 rounded-lg bg-pink-100 md:text-center lg:text-center">
                    <span className="block text-xl font-semibold mb-2">
                    <h2 className="text-2xl font-bold">
                      {capitalize(format(selectedDate, 'EEEE, dd/MM/yyyy', { locale: ptBR }))}
                    </h2>
                    </span>
                    <ul>
                      {dia.horarios.map((horario: string) => (
                        <li key={horario}>
                          <label className="block">
                            <input
                              type="radio"
                              name="horario"
                              value={horario}
                              checked={selectedHorario === horario}
                              onChange={() => handleHorarioChange(horario)}
                            />
                            <span>{horario}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p>Não há horários disponíveis para o dia selecionado.</p>
            )
          ) : (
            <p>Acesso negado. Por favor, faça login.</p>
          )}
          {selectedHorario && (
            <div className="flex justify-center mt-4">
              <select
                value={selectedServico}
                onChange={(e) => handleServicoChange(e.target.value)}
                className="px-4 py-2 text-gray-700 bg-white border rounded-md shadow-md"
              >
                <option value="">Escolha um serviço</option>
                <option value="Alongamento de cílios">Alongamento de cílios</option>
                <option value="Micropigmentação">Micropigmentação</option>
                <option value="Design de sobrancelha">Design de sobrancelha</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agendar;
