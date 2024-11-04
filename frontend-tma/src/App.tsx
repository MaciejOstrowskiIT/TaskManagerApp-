import { AlertProvider } from './providers/AlertProvider';
import { Pages } from './pages/Pages';
export const App = () => {
  return (
    <AlertProvider>
      <Pages />
    </AlertProvider>
  );
};
