# The Fresher

## Project Overview

We focused on creating a user-friendly and visually appealing app design that stays true to our initial concept.

### App Features:

1. **Home Page**: A welcoming entry point featuring the app's logo to establish a strong identity.
2. **Pairing Page**: Provides a clear button for scanning nearby devices and displays a list of detected devices, ensuring users can easily select the correct one.
3. **Search Page**: Offers a visually structured grid of fruits, including images and names, with the option to return to the Pairing Page if needed.
4. **Waiting Page**: Designed with simplicity and clarity, instructing users to inject the device into the fruit.
5. **Loading Page**: Engages users during data processing with an appealing animation.
6. **Main Page**: Displays critical metrics like pH, methane levels, and humidity, alongside:
   - A percentage bar for the fruit's status.
   - Options to view the History Page or retake the test.
7. **History Page**: Organizes past scans into an easy-to-read list, including fruit details, dates, and images, maintaining a clean and functional design.

## Getting Started

### Prerequisites

- Node.js & npm installed ([Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/alaeddine03/The-Fresher.git
   ```

2. Navigate to the project directory:

   ```sh
   cd <YOUR_PROJECT_NAME>
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Start the development server with auto-reloading:

   ```sh
   npm run dev
   ```

### API Integration

To enable ML predictions in the app:

1. Navigate to the `api` folder in the repository.
2. Run the Python file `apifinal`:

   ```sh
   python apifinal.py
   ```

   Ensure the API is running to fetch predictions displayed on the Main Page.

## Deployment

To deploy the project:

1. Follow the instructions in your preferred deployment platform.
2. Ensure the API is hosted and accessible for live prediction results.

---

This project is powered by:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
