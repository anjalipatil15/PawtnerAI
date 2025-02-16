Pawtner AI is an AI-powered startup assistant that provides business insights, financial guidance, and pitch deck creation. This project includes both frontend and backend components to deliver a comprehensive strategic business analysis and idea validation.

## Project Structure

```
.gitignore
backend/
	.env
	chatbot.js
	package.json
	server.js
frontend/
	.gitignore
	build/
		asset-manifest.json
		favicon.ico
		index.html
		static/
			js/
	image.png
	package.json
	public/
		favicon.ico
		index.html
	README.md
	src/
		api.js
		App.js
		components/
			AnalysisResult.js
			Footer.js
			IdeaForm.js
			LoadingOverlay.js
			Navbar.js
			StrategyForm.js
			StrategyResult.js
		index.js
		pages/
			Chatbot.js
			Home.js
			IdeaValidation.js
			StrategicBusinessAdvisor.js
		styles.css
package.json
README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/pawtner-ai.git
cd pawtner-ai
```

2. Install dependencies for both frontend and backend:

```sh
cd frontend
npm install
cd ../backend
npm install
```

### Environment Variables

Create a `.env` file in the backend directory and add your environment variables:

```
GEMINI_API_KEY=your-google-gemini-api-key
PORT=5000
```

### Running the Application

1. Start the backend server:

```sh
cd backend
node server.js
```

2. Start the frontend development server:

```sh
cd frontend
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Available Scripts

### Frontend

In the frontend directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm test`: Launches the test runner.
- `npm run eject`: Ejects the configuration files.

### Backend

In the backend directory, you can run:

- `node server.js`: Starts the backend server.

## API Endpoints

### Frontend

- `/get-strategy`: Generates strategic business advice.
- `/validate-idea`: Validates a startup idea.
- `/chatbot`: Interacts with the chatbot.

### Backend

- `/get-strategy`: Generates strategic business advice.
- `/validate-idea`: Validates a startup idea.
- `/chatbot`: Interacts with the chatbot.
- `/upload-file`: Handles file uploads.

## Project Components

### Frontend

- api.js: Contains API functions for interacting with the backend.
- App.js: Main application component with routing.
- `src/components`: Contains reusable components like `Navbar`, `Footer`, `LoadingOverlay`, etc.
- `src/pages`: Contains page components like `Home`, `Chatbot`, `IdeaValidation`, etc.

### Backend

- server.js: Main server file that initializes the Express server and routes.
- chatbot.js: Handles chatbot interactions using Google Gemini AI.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Made with ❤️ by Meow