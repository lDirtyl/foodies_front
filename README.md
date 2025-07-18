# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




Ендпоїнти:

### Users (`/api/users`)
- `POST /register` - Регистрация нового пользователя.
- `POST /login` - Вход пользователя.
- `POST /logout` - Выход пользователя (требуется аутентификация).
- `GET /current` - Получение данных текущего пользователя (требуется аутентификация).
- `PATCH /avatar` - Обновление аватара пользователя (требуется аутентификация, ожидает `multipart/form-data` с полем `avatar`).
- `GET /followers` - Получение списка подписчиков (требуется аутентификация).
- `GET /followings` - Получение списка подписок (требуется аутентификация).
- `POST /follow` - Подписаться на пользователя (требуется аутентификация).
- `DELETE /follow` - Отписаться от пользователя (требуется аутентификация).
- `GET /:userId/details` - Получение детальной информации о пользователе (требуется аутентификация).

### Recipes (`/api/recipes`)
- `GET /` - Поиск рецептов с фильтрацией и пагинацией (query params: `keyword`, `category`, `area`, `ingredient`, `page`, `limit`).
- `POST /` - Создание нового рецепта (требуется аутентификация, ожидает `multipart/form-data`).
- `GET /popular` - Получение списка популярных рецептов.
- `GET /own` - Получение рецептов, созданных текущим пользователем (требуется аутентификация).
- `GET /favorites` - Получение избранных рецептов текущего пользователя (требуется аутентификация).
- `GET /:id` - Получение детальной информации о рецепте по ID.
- `PUT /:id` - Обновление рецепта по ID (требуется аутентификация, только владелец).
- `DELETE /:id` - Удаление рецепта по ID (требуется аутентификация, только владелец).
- `POST /:id/favorite` - Добавление рецепта в избранное (требуется аутентификация).
- `DELETE /:id/favorite` - Удаление рецепта из избранного (требуется аутентификация).

### Other
- `GET /api/categories` - Получение списка всех категорий.
- `GET /api/areas` - Получение списка всех регионов.
- `GET /api/ingredients` - Получение списка всех ингредиентов.
- `GET /api/testimonials` - Получение списка отзывов с пагинацией.

### Admin (`/api/admin`)
- `GET /tables` - Получение списка таблиц в базе данных (требуется пароль администратора).
- `GET /tables/:tableName` - Получение содержимого таблицы по имени (требуется пароль администратора).
