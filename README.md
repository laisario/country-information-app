# Country Information App

This repository contains both the **frontend** and **backend** for the **Country Information App**. The app provides detailed information about countries, including borders, historical population data, and flag images.

## Overview

### Backend
The backend serves data about countries via a set of RESTful API endpoints, developed using **NestJS**.

#### Endpoints:
- **GET / – Returns a list of available countries.
- **GET /countries/:codeCountry** – Returns detailed information about a specific country, including:
  - Border countries.
  - Historical population data (for charting).
  - Flag image URL.
  - Map preview of the country and borders.

### Frontend
The frontend is built with **Next.js** and **Material-UI**, offering an interactive and user-friendly interface to view country information, including charts and maps.

## Requirements

Before running the project, make sure you have the following tools installed:

- **Node.js** (recommended version 18 or higher)
- **Yarn** or **NPM** (Yarn is recommended)

## How to Run

For detailed instructions on how to set up and run each project, please refer to the respective **README** files in the **[backend repository](./country-app-backend/README.md)** and **[frontend repository](./country-app-frontend/README.md)**.

### Key Points:
1. Set up and run the **backend** (NestJS) first. The backend is required for the frontend to work properly.
2. After the backend is running, set up and run the **frontend** (Next.js) by following the instructions in the frontend's README.

## Technologies Used

- **Backend**:
  - **NestJS**: Framework for building efficient, reliable, and scalable server-side applications.
  - **Axios**: For making HTTP requests.

- **Frontend**:
  - **Next.js**: React framework for SSR (Server-Side Rendering) and static page generation.
  - **Material-UI**: React component library for a polished, consistent UI.
  - **React**: JavaScript library for building user interfaces.
  - **Axios**: For making HTTP requests to the backend.

## Project Structure

- **backend/**: Contains the backend code and API logic using NestJS.
- **frontend/**: Contains the frontend code and UI components using Next.js and Material-UI.
