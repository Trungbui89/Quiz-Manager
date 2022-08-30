import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import React  from 'react';
import Main from './components/Main';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    limit={1}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                /> 
                <Main />
            </BrowserRouter>
        </div>
    );
}

export default App;
