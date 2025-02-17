import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import store from './redux/store.js';
import {Provider} from 'react-redux'
import Register from './pages/Register.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/products",
        element:<Products />
      },
      
      {
        path:"/register",
        element:<Register />
      },

      
      

    
     


    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
   <RouterProvider router={router} />
   </Provider>
  </StrictMode>,
)
