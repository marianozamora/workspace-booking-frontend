import './App.css';
import { QueryProvider } from './providers/QueryProvider';
import { AppRouter } from './components';
import { NotificationContainer } from './components/ui';
import { useNotifications } from './store/useAppStore';

function App() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <QueryProvider>
      <div className='App'>
        <AppRouter />
        <NotificationContainer
          notifications={notifications}
          onClose={removeNotification}
        />
      </div>
    </QueryProvider>
  );
}

export default App;
