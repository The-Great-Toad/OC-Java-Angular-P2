# Olympic Games Starter

This project is a modern Angular application to visualize Olympic Games results by country, with interactive charts.

## Prerequisites

- Node.js (recommended: 18.x or higher)
- npm (recommended: 9.x or higher)
- Angular CLI (recommended: 19.x or higher)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/The-Great-Toad/OC-Java-Angular-P2.git
   ```
2. Install dependencies:
   ```sh
   cd OC-Java-Angular-P2 # or your newly named directory
   npm install
   ```

## Development server

Start the development server:

```sh
ng serve
```

Navigate to [http://localhost:4200/](http://localhost:4200/). The application will automatically reload if you change any of the source files.

## Build

To build the project for production:

```sh
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Project structure

- `src/app/core/`: contains the business logic (reusable components, models and services folders)
- `src/app/pages/`: page components (Dashboard, Country Detail, Not Found)
- `src/assets/mock/olympic.json`: mock data used by the application

## Main features

- Medal visualization by country with interactive pie chart
- Country detail page with medal evolution chart by years
- Error handling and 404 navigation
