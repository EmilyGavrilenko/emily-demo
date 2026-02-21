import { useAuth } from './hooks/useAuth';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import './App.css';

function App() {
  const { user } = useAuth();

  if (!user) return <LoginPage />;

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <TodoList />
      </main>
    </div>
  );
}

export default App;
