import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FaRegCalendarAlt } from 'react-icons/fa';

import 'react-datepicker/dist/react-datepicker.css';


import ptBR from 'date-fns/locale/pt-BR';
registerLocale('pt-BR', ptBR);

export default function FormFiltro({ onSearch }) {
  const [startDate, setStartDate] = useState(new Date('2024-01-01'));
  const [endDate, setEndDate] = useState(new Date('2024-12-31'));

  const formatToApiDate = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}${month}${day}`; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSearch === 'function') {
      onSearch(formatToApiDate(startDate), formatToApiDate(endDate));
    } else {
      console.error("Erro: onSearch não está definido!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <FaRegCalendarAlt />
        <span>Data Inicial:</span>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          locale="pt-BR"
        />
      </label>

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <FaRegCalendarAlt />
        <span>Data Final:</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="dd/MM/yyyy"
          locale="pt-BR"
        />
      </label>

      <button type="submit">Buscar</button>
    </form>
  );
}
