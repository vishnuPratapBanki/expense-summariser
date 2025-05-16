## Money Tracker App 💰

A full-stack application to track your total balance, family money, and hidden savings with transaction history. Built with Spring Boot (backend), React (frontend), and MongoDB.

## Features

- Track and update **Family Money** and **Hidden Savings** balances
- Add or deduct amounts with validations
- View transaction history with timestamps, category, action, and amount
- Responsive and clean UI with React and Tailwind CSS
- Dockerized backend and frontend for easy deployment

## Tech Stack

- **Backend:** Java, Spring Boot, MongoDB
- **Frontend:** React, Axios, Tailwind CSS
- **Containerization:** Docker, Docker Compose

## Prerequisites

- Java 17+
- Maven or Gradle
- Node.js and npm
- Docker & Docker Compose (optional, for containerization)
- MongoDB (local or remote)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/money-tracker-app.git
cd money-tracker-app
```


## Running Locally

This section explains how to run the Money Tracker App locally on your machine.

### Backend

1.  Navigate to the backend directory:

    ```bash
    cd backend
    ```

2.  Configure the MongoDB connection:
    If your MongoDB instance is not running on the default `mongodb://localhost:27017/moneytracker`, update the connection settings in `src/main/resources/application.properties`.

3.  Start the backend:

    ```bash
    ./mvnw spring-boot:run
    ```

### Frontend

1.  Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the frontend:

    ```bash
    npm start
    ```

4.  Open your browser and navigate to:
    http://localhost:3000

## Using Docker (Recommended)

For a streamlined setup, use Docker and Docker Compose to run the application.

### Prerequisites

Ensure **Docker** and **Docker Compose** are installed on your system.

### Build and Run Containers

From the root project directory (where `docker-compose.yml` is located):

```bash
docker-compose up --build
```

- The backend will be accessible on port 8080.
- The frontend will be accessible on port 3000.

### Stop Containers

To stop the Docker containers:

```bash
docker-compose down
```

## Project Structure

The project is organized as follows:

```bash
money-tracker-app/
├── backend/         # Spring Boot backend code
├── frontend/        # React frontend code
├── docker-compose.yml # Docker Compose configuration
└── README.md
```

## Future Improvements

- **User Authentication**: Implement user authentication and multi-user support.
- **Enhanced Filtering**: Add advanced filtering and sorting options for transaction history.
- **Data Visualization**: Integrate charts to provide insights into spending patterns.
- **Cloud Deployment**: Explore deployment options on cloud providers such as AWS, GCP, or DigitalOcean.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Author

**Vishnu Pratap Banki**
- **GitHub: https://github.com/vishnuPratapBanki**

## Contributing

Feel free to open issues for bug reports or feature requests. Contributions via pull requests are welcome! 🚀