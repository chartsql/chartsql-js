// import ChartSQL from './ChartSQL';

// Export ChartSQL to be globally accessible
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.chartsql = new ChartSQLjs.ChartSQL();
}