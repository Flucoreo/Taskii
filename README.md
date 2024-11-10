# Taskii: The Task Management Dashboard

A simple and efficient task management dashboard built with **Next.js** and **React**, utilizing **JSON Server** as a mock database. This application allows users to create, read, update, and delete tasks seamlessly.

## Features

- Create, read, update, and delete tasks
- Responsive design 
- Simple and intuitive user interface

## Technologies Used

- **Next.js**: A React framework for server-rendered applications
- **React**: A JavaScript library for building user interfaces
- **JSON Server**: A simple way to create a REST API using a JSON file

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd task-management-dashboard
   ```

2. Install the necessary dependencies:

    ```
    npm install
    ```

### Running the Application

3. Navigate to the back-end directory start the JSON server

    ```
    npx json-server --watch db.json --port 4000
    ```

4. In a new terminal window, start the React application

    ```
    npm run dev
    ```
