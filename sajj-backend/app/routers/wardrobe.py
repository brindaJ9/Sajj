"""
Wardrobe API Router

Handles clothing item management and AI-powered image analysis.
"""

from fastapi import APIRouter, File, UploadFile, HTTPException, status
from app.models import ClothingMetadata
import logging

# Configure logging
logger = logging.getLogger(__name__)

# Create router with prefix and tags
router = APIRouter(
    prefix="/wardrobe",
    tags=["wardrobe"]
)

# Supported image MIME types
SUPPORTED_IMAGE_TYPES = {
    "image/jpeg",
    "image/jpg", 
    "image/png",
    "image/webp"
}

# Maximum file size (10MB)
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB in bytes


@router.post(
    "/analyze",
    response_model=ClothingMetadata,
    status_code=status.HTTP_200_OK,
    summary="Analyze clothing image with AI",
    description="""
    Upload a clothing item image to extract metadata using AI vision analysis.
    
    **⚠️ MOCK ENDPOINT**: Currently returns mock data for testing.
    Real AI integration will be added in a future update.
    
    **Supported formats**: JPEG, PNG, WebP
    **Maximum size**: 10MB
    
    The endpoint validates the uploaded file and returns structured metadata including:
    - Item name
    - Category (tops, bottoms, dresses, etc.)
    - Primary color
    - Suitable seasons
    - Appropriate occasions
    - Style tags
    """,
    responses={
        200: {
            "description": "Successfully analyzed image",
            "content": {
                "application/json": {
                    "example": {
                        "name": "Black Midi Skirt",
                        "category": "bottoms",
                        "color": "black",
                        "season": ["spring", "autumn"],
                        "occasions": ["casual", "work"],
                        "styleTags": ["minimalist", "classic"]
                    }
                }
            }
        },
        400: {
            "description": "Bad request - invalid file or format",
            "content": {
                "application/json": {
                    "examples": {
                        "no_file": {
                            "summary": "No file provided",
                            "value": {"detail": "No file provided"}
                        },
                        "invalid_type": {
                            "summary": "Unsupported file type",
                            "value": {"detail": "Unsupported file type. Allowed: image/jpeg, image/png, image/webp"}
                        },
                        "file_too_large": {
                            "summary": "File too large",
                            "value": {"detail": "File size exceeds 10MB limit"}
                        }
                    }
                }
            }
        },
        422: {
            "description": "Validation error",
        },
        500: {
            "description": "Internal server error"
        }
    }
)
async def analyze_clothing_image(
    file: UploadFile = File(..., description="Clothing item image to analyze")
) -> ClothingMetadata:
    """
    Analyze a clothing item image and extract metadata using AI vision.
    
    **Current Implementation**: Returns mock data for testing the upload flow.
    
    Args:
        file: Uploaded image file (JPEG, PNG, or WebP)
        
    Returns:
        ClothingMetadata: Structured metadata extracted from the image
        
    Raises:
        HTTPException: If file is invalid, unsupported, or too large
    """
    
    # Validation 1: Check if file was provided
    if not file:
        logger.warning("Analyze endpoint called with no file")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No file provided"
        )
    
    # Validation 2: Check file content type
    if file.content_type not in SUPPORTED_IMAGE_TYPES:
        logger.warning(f"Unsupported file type: {file.content_type}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type. Allowed: {', '.join(SUPPORTED_IMAGE_TYPES)}"
        )
    
    # Validation 3: Check file size
    # Read file content to check size
    try:
        contents = await file.read()
        file_size = len(contents)
        
        if file_size == 0:
            logger.warning("Empty file uploaded")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is empty"
            )
        
        if file_size > MAX_FILE_SIZE:
            logger.warning(f"File too large: {file_size} bytes")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File size exceeds {MAX_FILE_SIZE // (1024 * 1024)}MB limit"
            )
        
        logger.info(f"Valid image uploaded: {file.filename} ({file_size} bytes, {file.content_type})")
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"Error reading uploaded file: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error processing uploaded file"
        )
    
    # TODO: Here we will integrate the actual AI vision model
    # For now, return mock data to test the upload flow
    
    logger.info("Returning MOCK metadata (AI integration pending)")
    
    # Mock response - clearly marked for testing
    mock_metadata = ClothingMetadata(
        name="Black Midi Skirt",
        category="bottoms",
        color="black",
        season=["spring", "autumn"],
        occasions=["casual", "work"],
        styleTags=["minimalist", "classic"]
    )
    
    return mock_metadata


# Additional endpoint to get supported file types (useful for frontend)
@router.get(
    "/supported-formats",
    summary="Get supported image formats",
    description="Returns a list of supported image formats and maximum file size",
    response_model=dict
)
async def get_supported_formats():
    """
    Get information about supported image formats and size limits.
    
    Useful for frontend validation before upload.
    
    Returns:
        dict: Supported formats and size limits
    """
    return {
        "supported_types": list(SUPPORTED_IMAGE_TYPES),
        "max_file_size_mb": MAX_FILE_SIZE // (1024 * 1024),
        "max_file_size_bytes": MAX_FILE_SIZE
    }
