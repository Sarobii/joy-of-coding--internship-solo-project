# Task Management Application

## Overview

This is a full-stack task management application built with Next.js, React, and Prisma. It allows users to create, read, update, and delete tasks, as well as filter and sort them based on various criteria.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete tasks
- Filter tasks by status
- Sort tasks by due date, name, or status
- Responsive design for various screen sizes

## Tech Stack

- Frontend: React, Next.js
- Backend: Next.js API routes
- Database: MySQL (with Prisma as ORM)
- Authentication: NextAuth.js
- Styling: Tailwind CSS, Daisy UI

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- MySQL database

## Installation

1. Clone the repository:
   ```
   git clone [https://github.com/yourusername/task-management-app.git](https://github.com/Sarobii/joy-of-coding--internship-solo-project.git)
   ```

2. Navigate to the project directory:
   ```
   cd joy-of-coding--internship-solo-project
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up your environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   DATABASE_URL="your-mysql-connection-string"
   NEXTAUTH_SECRET="your-nextauth-secret"
   ```

5. Set up the database:
   ```
   npx prisma migrate dev
   ```

## Running the Application

To run the application in development mode:

```
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

1. Register a new account or log in with existing credentials.
2. On the main dashboard, you can:
   - Add new tasks
   - View existing tasks
   - Edit task details
   - Update task status
   - Delete tasks
   - Filter tasks by status
   - Sort tasks by due date, name, or status

## API Endpoints

- `POST /api/auth/register`: Register a new user
- `GET /api/tasks`: Fetch all tasks
- `POST /api/tasks/create`: Create a new task
- `PUT /api/tasks/[id]`: Update a task
- `PATCH /api/tasks/[id]`: Update task status
- `DELETE /api/tasks/[id]`: Delete a task

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or feedback, please contact me at trcow1985@gmail.com.
