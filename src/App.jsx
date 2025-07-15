import AppRouter from './AppRouter';
import QuestWidget from './components/QuestWidget/QuestWidget';
import StyleGuide from './pages/StyleGuide';

function App() {
  return (
    <>
      <AppRouter />
      <QuestWidget />
      <StyleGuide />
    </>
  );
}

export default App;
