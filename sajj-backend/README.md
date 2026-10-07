# Sajj Backend

FastAPI backend for the Sajj style and wardrobe application.

## Project Structure

```
sajj-backend/
├── app/
│   └── main.py          # Main FastAPI application
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## Setup Instructions

### 1. Install Python
Make sure you have Python 3.8+ installed. Check your version:
```bash
python --version
```

### 2. Create a Virtual Environment (Recommended)
```bash
# Navigate to the backend folder
cd Sajj/sajj-backend

# Create virtual environment
python -m venv venv

# Activate it:
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Server
```bash
uvicorn app.main:app --reload
```

The API will be available at: http://localhost:8000

## Testing the API

### In Browser
Open: http://localhost:8000

You should see:
```json
{"message": "Sajj API is running"}
```

### API Documentation
FastAPI automatically generates interactive API docs:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Available Endpoints

- `GET /` - Root endpoint, returns API status
- `GET /health` - Health check endpoint
