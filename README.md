# To-Do Checklist Dashboard

## Overview
This project is a To-Do Checklist Dashboard built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to efficiently manage their tasks with features such as adding, displaying, and reordering to-do items.

## Features
- **Add Todos**: Users can add new to-do items with a title and link.
- **Display Todos**: Added to-dos are displayed in a list with checkboxes to mark them as complete. Completed items have a strike-through effect.
- **Drag and Drop Functionality**: Users can reorder the to-do list using drag and drop. The new order is saved in the backend.
- **Real-time State Management**: The application reflects changes in real-time using React state management.

## Technologies Used
- **Frontend**: React, CSS
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB

## Project Structure
```
todo-dashboard
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── app.js
│   └── package.json
├── frontend
│   ├── public
│   ├── src
│   └── package.json
├── README.md
└── .gitignore
```

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   node app.js
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Hosting and Deployment
Once completed, the application can be hosted on platforms like Vercel or Heroku for online access.

## License
This project is open-source and available for modification and distribution.