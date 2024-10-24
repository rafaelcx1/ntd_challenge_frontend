# NTD Software Test

This repository contains a frontend application developed as a test for NTD Software. The frontend exposes a UI for an arithmetic calculator with a user balance control.

# Prerequisites

- <b>Docker</b>: Ensure Docker is installed on your machine.

# Instructions

To set up and run the application, follow these steps:

1) Clone this repository to your local machine:
```
git clone https://github.com/rafaelcx1/ntd_challenge_frontend.git
```

2) Navigate to the project directory:
```
cd <project-directory>
```

3) Run the application using Docker Compose:
```
docker compose up --build -d
```

The application should now be up and running at this URL:
```
http://localhost:7000
```

<b>Important: The backend must be running for the frontend to function properly.</b>

# Solution Overview
Technology Stack:

- <b>React</b>: Main frontend language.
- <b>Nginx</b>: As the reverse proxy for the application.
- <b>Vitest</b>: As the test library for the application.
- <b>MUI</b>: As the main component library based on material design.
- <b>Formik</b>: As the forms management library.
- <b>Yup</b>: As a validation library.

All communication with the backend is handled through the API gateway at http://localhost:9000.

# Tests
The application has unit tests to validate the features.

# Pre-Configured Users
The application comes with three pre-configured users, each starting with a balance of $100.00:
```
User 1:
Email: user1@user1.com
Password: User1@123

User 2:
Email: user2@user2.com
Password: User2@123

User 3:
Email: user3@user3.com
Password: User3@123
```

# Operation Costs
The costs for each operation are pre-configured as follows:
```
Add: $1.00
Subtract: $1.00
Multiply: $3.00
Divide: $3.00
Square Root: $3.00
Random String: $5.00
```