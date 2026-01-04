import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/animate.css';
import './App.css'
import Router from './routes/Router';
import './plugins/fontawesome';

function App() {

  return (
    <div className="m-5">
      <Router /> 
    </div>
  )
}

export default App
