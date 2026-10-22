import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {DemoProvider} from './context/DemoDataContext'
import App from './app/App'
import './styles/index.css'

createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><DemoProvider><App/></DemoProvider></BrowserRouter></React.StrictMode>)
