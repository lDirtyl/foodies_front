import AppRouter from './AppRouter';
import QuestWidget from './components/QuestWidget/QuestWidget';
import StyleGuide from './pages/StyleGuide';
import AuthInitializer from './components/AuthInitializer/AuthInitializer';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <AuthInitializer />
      <AppRouter />
      <QuestWidget />
      <StyleGuide />
      <Toaster />
    </>
  );
}

export default App;
