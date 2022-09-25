import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import { App } from './App'
import './global.scss'
import { Auth } from './routes/auth'

const loader = async () => {
  const isLogged = localStorage.getItem('isLogged')

  if(isLogged === 'true') {
    return redirect('/app');
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
    loader: loader
  },
  {
    path: '/app',
    element: <App />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
