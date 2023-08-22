import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import { DarkModeProvider } from './context/DarkModeContext';

import AppLayout from './ui/AppLayout';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import Settings from './pages/Settings';

import GlobalStyles from './styles/GlobalStyles';
import ProtectedRoutes from './ui/ProtectedRoutes';
import Property from './features/properties/Property';
import AddProperty from './features/properties/AddProperty';
import EditApartment from './features/properties/EditApartment';
import EditHouseTenant from './features/properties/editHouseTenant/EditHouseTenant';
import UpdateProperty from './features/properties/UpdateProperty';
import Finances from './pages/Finances';
import AddPropertyDetails from './features/properties/AddPropertyDetails';
import PropertyFinance from './features/finances/PropertyFinance';
import EditTransaction from './features/finances/EditTransaction';
import ViewTransaction from './features/finances/ViewTransaction';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="properties" element={<Properties />} />
              <Route path="properties/:propertyId" element={<Property />} />
              <Route
                path="properties/:propertyId/edit"
                element={<EditHouseTenant />}
              />
              <Route
                path="properties/:propertyId/update"
                element={<UpdateProperty />}
              />
              <Route
                path="properties/:propertyId/adddetails"
                element={<AddPropertyDetails />}
              />
              <Route
                path="properties/:propertyId/edit/:apartmentName"
                element={<EditApartment />}
              />
              <Route path="properties/add" element={<AddProperty />} />
              <Route path="tenants" element={<Tenants />} />
              <Route path="finances" element={<Finances />} />
              <Route
                path="finances/:propertyId"
                element={<PropertyFinance />}
              />
              <Route
                path="finances/:propertyId/entry/:entryId"
                element={<ViewTransaction />}
              />
              <Route
                path="finances/:propertyId/edit/:entryId"
                element={<EditTransaction />}
              />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: '14px',
              maxWidth: '500px',
              padding: '14px 22px',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
