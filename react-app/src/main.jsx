import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root');

// ReactDOM에게 루트 요소가 어디인지 전달
const root = createRoot(rootElement);

// render()에는 최상위 컴포넌트를 전달(App.jsx)
root.render( <App /> )