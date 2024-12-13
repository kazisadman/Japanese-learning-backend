# Warining
**This backend is deployed for free on Render.com. Note that the backend becomes inactive if not used. The first request after inactivity may take more than 50 seconds to respond.**

# Japanese Learning App Backend


## Project Description
The backend for the Japanese Learning App powers the application by managing lessons, vocabulary data, and user-related functionalities. It serves as the core API for the frontend, handling data storage, retrieval, and audio pronunciation features.

---

## Features
- **API Endpoints**: Provides endpoints for managing categories, lessons, and vocabulary.
- **Data Management**: Supports CRUD operations for categories, lessons, users and words.

---

## Tech Stack
- **Framework**: Node.js with Express.js
- **Database**: MongoDB (NoSQL database)
- **Authentication**: JSON Web Token (JWT) for secure API access
- **Storage**: ImageBB for image files 
- **Environment Management**: dotenv for environment variables

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kazisadman/Japanese-learning-backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Japanese-learning-backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   DB_USERNAME=your-mongodb-connection-username
   DB_PASSWORD=your-mongodb-connection-password
   ACCESS_TOKEN_SECRET=your-jwt-secret
   ACCESS_TOKEN_EXPIRY=jwt-token-expiry-time
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. The API will be available at `http://localhost:5000`.
