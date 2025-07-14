import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './components/SharedLayout/SharedLayout';
import HomePage from './pages/HomePage/HomePage';
import RecipePage from './pages/RecipePage/RecipePage';
import AddRecipePage from './pages/AddRecipePage/AddRecipePage';
import UserPage from './pages/UserPage/UserPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="recipe/:id" element={<RecipePage />} />
          <Route path="recipe/add" element={<AddRecipePage />} />
          <Route path="user/:id" element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
