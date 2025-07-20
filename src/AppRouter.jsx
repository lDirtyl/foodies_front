import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './components/SharedLayout/SharedLayout';
import HomePage from './pages/HomePage/HomePage';
import RecipePage from './pages/RecipePage/RecipePage';
import AddRecipePage from './pages/AddRecipePage/AddRecipePage';
import UserPage from './pages/UserPage/UserPage';
import UserPageLayout from './pages/UserPage/UserPageLayout';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="recipe/:id" element={<RecipePage />} />
          <Route path="users/:id/add-recipe" element={<AddRecipePage />} />
          <Route path="user/:id" element={<UserPage />}>
            <Route index element={<UserPageLayout />} />
            <Route path="recipes" element={<UserPageLayout />} />
            <Route path="favorites" element={<UserPageLayout />} />
            <Route path="followers" element={<UserPageLayout />} />
            <Route path="following" element={<UserPageLayout />} />
          </Route>
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/:id" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
