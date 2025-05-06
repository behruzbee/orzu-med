import ReactDOM from 'react-dom/client'
import { Providers } from './providers';

import { registerAllModules } from 'handsontable/registry';
registerAllModules();

import "./styles/app.scss"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers />
)
