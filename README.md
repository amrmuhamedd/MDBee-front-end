# MDBee Patient Management System

A modern, efficient patient management system built with React, TypeScript, and Ant Design.

## Features

### Patient List Management
- **Virtualized Table**: Efficiently displays large datasets with optimized rendering
- **Pagination**: Support for cursor-based pagination with "Load More" functionality
- **Filtering**: Filter patients by status (Active, Inactive, etc.)
- **Responsive Design**: Adapts to different screen sizes for optimal viewing

### Collaborator Management
- **Visual Representation**: Displays collaborators using pill-style tags with initials or titles
- **Quick Identification**: Easy identification of doctors (e.g., "DR KHAN") and team members (e.g., "HG")
- **Tooltips**: Shows full names on hover for better context

### Patient Operations
- **Delete Functionality**: Remove patients with a confirmation modal
- **Status Management**: View and filter patients by their current status

## Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: For type safety and improved developer experience
- **Ant Design**: UI component library for consistent design
- **Axios**: HTTP client for API communication
- **react-window**: For efficient rendering of large lists and tables
- **Vite**: Build tool and development server

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd mdbee-frontend
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Create a `.env` file in the root directory and add your API URL
```
VITE_API_BASE_URL=http://your-api-url.com/api
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:5173](http://localhost:5173) to view the application in your browser

## API Endpoints

The application interacts with the following API endpoints:

- `GET /patients`: Fetch a list of patients with pagination and filtering
  - Query parameters:
    - `limit`: Number of records to fetch
    - `cursor`: Pagination cursor
    - `status`: Filter by patient status

- `DELETE /patients/{id}`: Delete a specific patient by ID

## Project Structure

```
src/
├── components/
│   ├── common/            # Reusable UI components
│   └── patients/          # Patient-specific components
├── hooks/                 # Custom React hooks
├── services/              # API service functions
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── App.tsx                # Main application component
└── main.tsx              # Application entry point
```

## Development

### Code Style

This project uses ESLint and TypeScript for code quality and consistency. Run linting with:

```bash
npm run lint
# or
yarn lint
```

### Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.
