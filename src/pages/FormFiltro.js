import { useState } from 'react';

export default function FormFiltro({ onSearch }) {
  const [startDate, setStartDate] = useState('20240101');
  const [endDate, setEndDate] = useState('20241231');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSearch === 'function') {
      onSearch(startDate, endDate);
    } else {
      console.error("Erro: onSearch não está definido!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Data Inicial:
        <input
          type="text"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="YYYYMMDD"
        />
      </label>
      <label>
        Data Final:
        <input
          type="text"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="YYYYMMDD"
        />
      </label>
      <button type="submit">Buscar</button>
    </form>
  );
}
