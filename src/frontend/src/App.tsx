import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';

const rootRoute = createRootRoute({
  component: () => <RouterProvider router={router} />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment',
  component: PaymentPage,
});

const routeTree = rootRoute.addChildren([indexRoute, paymentRoute]);

const router = createRouter({ routeTree });

function App() {
  return <RouterProvider router={router} />;
}

export default App;

