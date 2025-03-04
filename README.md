# Esperanza Kalea

A Vue.js application for providing information and analysis about the traffic direction change of Calle La Esperanza in Vitoria-Gasteiz.

## Project Overview

This application provides a platform for residents and stakeholders to access information, documentation, and data analysis related to the traffic direction change of Calle La Esperanza. The project focuses on presenting traffic data, documenting the process, and facilitating community engagement.

### Features

- **Traffic Data Analysis**: Visualizations of traffic patterns with comparative analysis
- **Document Repository**: Access to official documents, correspondence, and reports
- **Legal Framework**: Information about relevant urban planning and mobility regulations
- **Community Engagement**: Details about community meetings and public participation
- **Content Management System**: Admin interface for maintaining site content

## Technology Stack

- **Frontend Framework**: Vue.js 3.x with Composition API
- **State Management**: Pinia
- **Routing**: Vue Router
- **UI Framework**: TailwindCSS
- **Charts and Visualizations**: ApexCharts
- **Mapping**: Leaflet
- **PDF Handling**: vue-pdf-embed
- **Data Manipulation**: Lodash
- **API Communication**: Axios
- **Build Tool**: Vite
- **Icons**: Lucide Vue Next

## Installation and Setup

### Prerequisites

- Node.js (v14.x or higher)
- npm (v7.x or higher) or yarn

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/esperanza.git
   cd esperanza
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_URL=https://your-domain/esperanzakalea
   VITE_ASSETS_URL=https://your-domain/esperanzakalea/assets
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. The application will be available at `http://localhost:5173/esperanzakalea/`.

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be located in the `dist` directory.

## Project Structure

```
esperanza/
├── public/             # Static public assets
├── src/                # Source code
│   ├── assets/         # Application assets (images, fonts, etc.)
│   ├── components/     # Vue components
│   │   ├── CityComparison/     # Traffic comparison components
│   │   ├── SingleStreetAnalysis/  # Single street analysis components
│   │   ├── TrafficAnalysis/   # Traffic analysis components
│   │   └── ...
│   ├── plugins/        # Vue plugins
│   ├── router/         # Vue Router configuration
│   ├── services/       # API services
│   ├── stores/         # Pinia stores
│   ├── views/          # Page components
│   ├── App.vue         # Main application component
│   └── main.js         # Application entry point
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── index.html          # HTML template
├── package.json        # Project dependencies
├── tailwind.config.js  # TailwindCSS configuration
└── vite.config.js      # Vite configuration
```

## Key Components

### Traffic Analysis

The application provides detailed traffic data analysis with:

- Single street traffic patterns over time
- City-wide traffic comparison across multiple streets
- Daily, monthly, and yearly traffic trends
- Real-time traffic map with current vehicle counts

### Document Management

The platform hosts various documents related to the process:

- Official correspondence
- Technical reports
- Press releases
- Meeting minutes

### Content Management System

The CMS allows administrators to:

- Add, edit, and remove news articles
- Manage document repository
- Update legal framework content
- Configure meeting information

## API Integration

The application connects to backend services for:

- Traffic data retrieval from Euskadi API
- Content management (documents, news)
- Authentication for admin access

## Routing Structure

- `/` - Home page with project overview
- `/trafico` - Traffic data analysis
- `/documents` - Document repository
- `/legal` - Legal framework information
- `/contact` - Contact information
- `/admin/login` - Admin login
- `/admin/content` - Content management system

## Authentication

The application uses a simple JWT-based authentication system for admin access to the content management features.

## Deployment

The application is configured for deployment to a web server with the base path `/esperanzakalea/`. The Vite configuration is set up to handle this path correctly.

## Development Notes

- Components use the Composition API pattern with `<script setup>` where possible
- TailwindCSS utility classes are used for styling
- The application is responsive and works on mobile devices
- ApexCharts is used for all data visualizations
- Leaflet is used for the interactive traffic map

## Live Demo

Visit the working website at: https://idg.eus/esperanzakalea

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For more information or technical support, please contact:
igor.kubicki@protonmail.com