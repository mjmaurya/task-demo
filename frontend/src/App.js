import './App.css';
import Dashboard from './pages/dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dish from './components/dish';
import NewDish from './components/newDish';
import { createContext, useState } from 'react';
import Loader from './components/loader/loader';
export const LoadingContext = createContext({})
function App() {
  const [loading, setIsLoading] = useState(false)
  const showLoading = () => {
    setIsLoading(true)
  }
  const hideLoading = () => {
    setIsLoading(false)
  }
  return (
    <div className="App">
      <LoadingContext.Provider value={{ loading, showLoading: showLoading, hideLoading: hideLoading }}>
        <BrowserRouter>
        <Loader/>
          <Routes>
            <Route path='/' element={<Dashboard />}>
              <Route path="new" element={<NewDish />} />
              <Route path="dish/:id" element={<Dish />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LoadingContext.Provider>


    </div>
  );
}

export default App;
