# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




Ендпоїнти:

### Користувачі (`/api/users`)
- `POST /register` - Реєстрація нового користувача.
- `POST /login` - Вхід користувача.
- `POST /logout` - Вихід користувача (потрібна автентифікація).
- `GET /current` - Отримання даних поточного користувача (потрібна автентифікація).
- `PATCH /avatar` - Оновлення аватара користувача (потрібна автентифікація, очікує `multipart/form-data` з полем `avatar`).
- `GET /followers` - Отримання списку підписників (потрібна автентифікація).
- `GET /followings` - Отримання списку користувачів, на яких ви підписані (потрібна автентифікація).
- `POST /follow` - Підписатися на користувача (потрібна автентифікація).
- `DELETE /follow` - Відписатися від користувача (потрібна автентифікація).
- `GET /:userId/details` - Отримання детальної інформації про користувача (потрібна автентифікація).

### Рецепти (`/api/recipes`)
- `GET /` - Пошук рецептів з фільтрацією та пагінацією (параметри запиту: `keyword`, `category`, `area`, `ingredient`, `page`, `limit`).
- `POST /` - Створення нового рецепту (потрібна автентифікація, очікує `multipart/form-data`).
- `GET /popular` - Отримання списку популярних рецептів.
- `GET /own` - Отримання рецептів, створених поточним користувачем (потрібна автентифікація).
- `GET /favorites` - Отримання улюблених рецептів поточного користувача (потрібна автентифікація).
- `GET /:id` - Отримання детальної інформації про рецепт за ID.
- `PUT /:id` - Оновлення рецепту за ID (потрібна автентифікація, тільки власник).
- `DELETE /:id` - Видалення рецепту за ID (потрібна автентифікація, тільки власник).
- `POST /:id/favorite` - Додавання рецепту до улюблених (потрібна автентифікація).
- `DELETE /:id/favorite` - Видалення рецепту з улюблених (потрібна автентифікація).

### Інше
- `GET /api/categories` - Отримання списку всіх категорій.
- `GET /api/areas` - Отримання списку всіх регіонів.
- `GET /api/ingredients` - Отримання списку всіх інгредієнтів.
- `GET /api/testimonials` - Отримання списку відгуків з пагінацією.

### Адмін (`/api/admin`)
- `GET /tables` - Отримання списку таблиць у базі даних (потрібен пароль адміністратора).
- `GET /tables/:tableName` - Отримання вмісту таблиці за назвою (потрібен пароль адміністратора).
