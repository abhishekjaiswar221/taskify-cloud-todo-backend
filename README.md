# Taskify Cloud Todo Backend - RESTful API

The project uses Node.js, Express.js, Mongoose.js, JSON Web Token (JWT), and BCrypt.js to create RESTful APIs.

## Tech Stacks

**Language:** [JavaScript](https://javascript.info/)

**Framework:** [Express Js](https://expressjs.com/)

**Authentication:** [Json Web Token (JWT)](https://jwt.io/)

**Object Data Modeling (ODM):** [Mongoose Js](https://mongoosejs.com/)

**Database:** [MongoDB](https://www.mongodb.com/)

**Build Tool:** [Rollup Js](https://rollupjs.org/)

**Linting/Formatting:** [Eslint](https://eslint.org/) & [Prettier](https://prettier.io/)

## Table of Contents

- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Commands](#commands)

### Project Structure:

```
├── src/
│   ├── database/       # Database
│   ├── middleware/     # Custom express middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # Routes
│   ├── app.js          # Express server
│   └── index.js        # App entry point
├── .env                # Environment variables
├── .gitignore          # Git ignore
├── .prettierignore     # Prettier ignore
├── .prettierrc         # Prettier config
├── eslint.config.js    # Eslint config
├── package.json        # Packages
└── rollup.config.js    # Rollup config
```

### API Endpoints:

**Auth routes**:\
`POST /api/auth/sign-up` - Sign Up\
`POST /api/auth/sign-in` - Sign In

**User routes**:\
`POST /api/auth/get-user` - Get user

**Note routes**:\
`GET /api/notes/fetch-all-notes` - Fetch all notes\
`POST /api/notes/add-note` - Add a note\
`PUT /api/notes/update-note/:noteId` - Update a note\
`DELETE /api/notes/delete-note/:noteId` - Delete a note

### Environment Variables:

The environment variables can be found and modified in the `.env` file.

```bash
1. Port:
PORT = 5000 # Default port 5000

2. JWT:
JWT_SECRET = Your JWT Secret

3. URI of MongoDB:
MONGODB_URI = mongodb://127.0.0.1:27017/database_name # Local MongoDB URI
```

### Commands:

Running in development:

```bash
> pnpm dev # Start the development server
# or
> pnpm start # Run with Node.js
```

Running in production:

```bash
> pnpm build # Build the application for production
> pnpm preview # Preview the application built for production
```

## Run locally

Steps to run the `taskify-cloud-todo-backend` project on your localhost.

1. **Clone the Repository:**

```bash
> git clone https://github.com/abhishekjaiswar221/taskify-cloud-todo-backend.git
```

2. **Navigate to the project directory:**

```bash
> cd taskify-cloud-todo-backend
```

3. **Install the dependencies:**

```bash
> pnpm install
```

4. **Set the environment variables:**

```bash
> cp .env.example .env
# open .env and modify the environment variables
```

5. **Access the Application:**
   Open your web browser and navigate to the local URL where the development server is running (`http://localhost:5000`). You should be able to see and interact with the web application.

Keep in mind that the available scripts and their functionality are defined in the project's `package.json` file. The above instructions assume that you have Node.js and pnpm installed on your system.

## Author

Crafted with ❤️ by [@abhishekjaiswar221](https://github.com/abhishekjaiswar221)

## License

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
