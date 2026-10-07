"""
Sajj FastAPI Backend
Main application entry point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create the FastAPI application instance
app = FastAPI(
    title="Sajj API",
    description="Backend API for the Sajj style and wardrobe application",
    version="1.0.0"
)

# Configure CORS (Cross-Origin Resource Sharing)
# This allows your Angular frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Angular dev server default port
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Root endpoint - basic health check
@app.get("/")
def read_root():
    """
    Root endpoint that confirms the API is running.
    
    Returns:
        dict: A simple message indicating the API status
    """
    return {"message": "Sajj API is running"}


# Optional: Health check endpoint (useful for monitoring)
@app.get("/health")
def health_check():
    """
    Health check endpoint for monitoring and debugging.
    
    Returns:
        dict: API status and version information
    """
    return {
        "status": "healthy",
        "version": "1.0.0"
    }
