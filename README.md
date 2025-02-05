# Country AI

## Project Overview
Country AI is an application designed to provide detailed information about countries. It allows users to list countries, view detailed information, and access various data points about each country. It also has an AI Chat Bot to help users inquire about countries.

## Setup Instructions
1. Clone the repository:
  ```bash
  git clone https://github.com/yourusername/country-ai.git
  ```
2. Navigate to the project directory:
  ```bash
  cd country-ai
  ```
3. Install the required dependencies:
  ```bash
  npm install
  ```
4. Start the application:
  ```bash
  npm run dev
  ```

## Available Features
- **List Countries**: View a list of all available countries.
- **Country Details**: Access detailed information about a specific country.
- **AI Chat**: Ask anything to AI about selected country

## Technical Decisions and Architecture
- **Frontend**: Built with React for a dynamic and responsive user interface.
- **AI Integration**: Utilizes Nvidia NIM AI API with Llama-3 70B Instruct model to provide enhanced data insights and recommendations.
- **API**: GraphQL is used for efficient and flexible data querying and manipulation.

## Future Improvements
- **Create, Delete, Update Features**: Implement features to allow users to create, delete, and update country information.
- **Enhanced AI Features**: Implement more advanced AI models for better data analysis.
- **Performance Optimization**: Improve the performance and scalability of the application.
