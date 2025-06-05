import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';
import FormFiltro from '../pages/FormFiltro';

export default function Home() {
  const [startDate, setStartDate] = useState('20240101');
  const [endDate, setEndDate] = useState('20241231');
  const [url, setUrl] = useState(`https://economia.awesomeapi.com.br/json/daily/USD-BRL/365?start_date=${startDate}&end_date=${endDate}`);

  const { data, error, isLoading } = useSWR(url, fetcher, { refreshInterval: 5000 });

  const handleSearch = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setUrl(`https://economia.awesomeapi.com.br/json/daily/USD-BRL/365?start_date=${start}&end_date=${end}`);
  };

  if (error) return <div>Erro ao carregar dados.</div>;
  if (isLoading || !data || !data.USDBRL) return <div>Carregando...</div>;

  const usdbrl = data.USDBRL;

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Cotação Dólar (USD/BRL)</h1>

      <FormFiltro onSearch={handleSearch} />

      <p><strong>Compra:</strong> R$ {usdbrl.bid}</p>
      <p><strong>Venda:</strong> R$ {usdbrl.ask}</p>
      <p><strong>Alta:</strong> R$ {usdbrl.high}</p>
      <p><strong>Baixa:</strong> R$ {usdbrl.low}</p>
      <p><strong>Variação:</strong> {usdbrl.varBid} ({usdbrl.pctChange}%)</p>
      <small>Atualizado: {new Date(Number(usdbrl.timestamp) * 1000).toLocaleString()}</small>
    </main>
  );
}
