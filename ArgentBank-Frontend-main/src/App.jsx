import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRouter from './Routeur/PublicRouteur';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<PublicRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
