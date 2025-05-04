import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App.tsx';
import { store } from './store.ts';
import Profile from './pages/settings/Profile.tsx';
import PrivateRoute from './components/auth/PrivateRoute.tsx';
import NotFound from './pages/not-found/index.tsx';
import About from './pages/about/index.tsx';
import Home from './pages/home/index.tsx';
import Login from './pages/auth/Login.tsx';
import Register from './pages/auth/Register.tsx';
import LinkCode from './components/link/LinkCode.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes with App layout */}
      <Route element={<App />}>
        <Route index path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Routes without App layout */}
      <Route path="/:code" element={<LinkCode />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
