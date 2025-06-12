import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';
import FormFiltro from './components/FormFiltro';
import styles from '../styles/cotacao.module.css'

export default function Cotacao() {
  const [startDate, setStartDate] = useState('20240101');
  const [endDate, setEndDate] = useState('20241231');
  const [url, setUrl] = useState(null); 
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState('');

  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 5000,
  });

  const handleSearch = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setUrl(
      `https://economia.awesomeapi.com.br/json/daily/USD-BRL/365?start_date=${start}&end_date=${end}`
    );
  };

  useEffect(() => {
    if (data && data.length > 0 && data[0].timestamp) {
      const dataHora = new Date(Number(data[0].timestamp) * 1000);
      setUltimaAtualizacao(dataHora.toLocaleString('pt-BR'));
    }
  }, [data]);

  return (
  <main className={styles.container}>
    <h1 className={styles.title}>Cotação Dólar (USD/BRL)</h1>

    <FormFiltro onSearch={handleSearch} />

    {error && <p className={styles.error}>Erro ao carregar dados.</p>}
    {isLoading && <p className={styles.loading}>Carregando...</p>}
    {data && data.length === 0 && (
      <p className={styles.noData}>Nenhum dado encontrado para o período informado.</p>
    )}

    {data && data.length > 0 && (
      <>
        <p className={styles.update}>
          <strong>Última atualização:</strong> {ultimaAtualizacao}
        </p>
        <hr className={styles.hr} />
        {data.map((item) => (
          <div key={item.timestamp} className={styles.card}>
            <p>
              <span className={styles.label}>Data:</span>
              <span className={styles.value}>
                {new Date(item.timestamp * 1000).toLocaleDateString('pt-BR')}
              </span>
            </p>
            <p>
              <span className={styles.label}>Compra:</span>
              <span className={styles.value}>R$ {parseFloat(item.bid).toFixed(2)}</span>
            </p>
            <p>
              <span className={styles.label}>Venda:</span>
              <span className={styles.value}>R$ {parseFloat(item.ask).toFixed(2)}</span>
            </p>
            <p>
              <span className={styles.label}>Alta:</span>
              <span className={styles.value}>R$ {parseFloat(item.high).toFixed(2)}</span>
            </p>
            <p>
              <span className={styles.label}>Baixa:</span>
              <span className={styles.value}>R$ {parseFloat(item.low).toFixed(2)}</span>
            </p>
            <p>
              <span className={styles.label}>Variação:</span>
              <span className={styles.value}>
                {parseFloat(item.varBid).toFixed(2)} ({parseFloat(item.pctChange).toFixed(2)}%)
              </span>
            </p>
            <hr className={styles.hr} />
          </div>
        ))}
      </>
    )}
  </main>
);
}
