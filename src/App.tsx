import { AuthGate } from '@/components/auth/auth-gate';
import Layout from '@/components/routes/app/layout';
import ForgotPassword from '@/components/routes/auth/forgot-password';
import SignInEmailPassword from '@/components/routes/auth/sign-in/sign-in-email-password';
import SignUpEmailPassword from '@/components/routes/auth/sign-up/sign-up-email-password';
import { Route, Routes } from 'react-router-dom';
import Home from './components/routes/app/home';
import Profile from './components/routes/app/profile';
import Preferences from '@/components/routes/app/preferences';

function App() {
  return (
     
      <Routes>
        {/* Authenticated routes */}
        <Route
          path="/"
          element={
            <AuthGate>
              <Layout />
            </AuthGate>
          }
        >
          
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/preferences" element={<Preferences />} />
        </Route>

        {/* Authentication routes */}
        <Route path="/sign-in">
          <Route path="/sign-in/" element={<SignInEmailPassword />} />
          <Route path="/sign-in/email-password" element={<SignInEmailPassword />} />
          <Route path="/sign-in/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="/sign-up" element={<SignUpEmailPassword />} />
      </Routes>
  );
}

export default App;