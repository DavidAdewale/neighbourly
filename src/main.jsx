import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { StyleSheetManager } from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'variation'}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace('/')}
      >
        <App />
      </ErrorBoundary>
    </StyleSheetManager>
  </React.StrictMode>
);
