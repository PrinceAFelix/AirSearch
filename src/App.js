import './App.css';
import Home from './components/pages/home/Home';
import Layout from './components/layout/Layout';
import DateRangePicker from './components/ui/daterangepicker/DateRangePicker';
import { IconContextProvider } from './context/icon-context';
function App() {
  return (
    <Layout>
      <div className="App">
        {/* <IconContextProvider>
          <DateRangePicker />
        </IconContextProvider> */}
        <Home />
      </div>
    </Layout>
  );
}

export default App;
