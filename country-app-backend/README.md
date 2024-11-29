# Country Info App

A simple application that provides information about countries, including borders, historical population data, and flag images.

## Endpoints

- **GET** `/countries/` – Returns a list of available countries.
- **GET** `/countries/:codeCountry` – Returns detailed information about a specific country, including:
  - Border countries.
  - Historical population data (suitable for charting).
  - Flag image URL.

## Requirements

Before running the project, make sure you have the following tools installed:

- **Node.js** (recommended version 18 or higher)
- **Yarn** or **NPM** (prefer Yarn)

## Installation

1. **Clone the repository** to your local machine:

   `git@github.com:laisario/country-information-app.git`

2. **Navigate to the project directory**:

   `country-information-app/country-app-backend/`

3. **Install the dependencies**:

   - If you're using **Yarn**:

     `yarn install`

   - Or, if you prefer **NPM**:

     `npm install`

4. **Set up the environment**:

   The project requires environment variables to run correctly. To set them up:

   - Rename the `.env.example` file to `.env`:

     `mv .env.example .env`

   - Open the `.env` file and fill in the required values (such as API URLs, etc.).

## Running the Project

Once the dependencies are installed and the environment variables are set, you can run the project.

- To start the development server, use the following command:

  - With **Yarn**:

    `yarn start`

  - Or with **NPM**:

    `npm run start`

- The application will be available at [http://localhost:3000](http://localhost:30000/coutries).

## License

This project is licensed under the [XYZ License](LICENSE). See the LICENSE file for more details.
