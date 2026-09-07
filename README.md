# Dissertation

This is the dissertation project to predict game popularity.

Download and Install Libraries
1. Create a Virtual Environment

Open a terminal in the project directory and create a virtual environment:

py -m venv venv

2. Activate the Virtual Environment

venv\Scripts\activate

3. Install Python Libraries

After activating the virtual environment, install the required Python libraries:

pip install -r requirements.txt

4. Run the Frontend and Backend

The frontend and backend need to be run in separate terminals.

Terminal 1 — Backend

Navigate to the backend directory:

cd backend

Start the Django development server:

python manage.py runserver

Terminal 2 — Frontend

Open a second terminal and navigate to the frontend directory:

cd frontend

Start the React development server:

npm install
npm run dev

The application can then be accessed using the URL displayed in the frontend terminal.