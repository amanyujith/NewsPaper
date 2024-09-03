import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../Components/App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Auth0Provider
    domain="dev-wes3i2flhsagc072.us.auth0.com"
    clientId="XxXbNrQ54by4y2rMBGPC5iJOggp6g9dV"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
  </StrictMode>
)
