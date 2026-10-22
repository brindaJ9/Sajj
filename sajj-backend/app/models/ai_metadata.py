"""
AI-Generated Clothing Metadata Model

This module defines the Pydantic model for metadata that will be generated
by the AI vision model when analyzing clothing images.

This model represents ONLY the AI-extracted information and does NOT include
application-level fields like id, imageUrl, wearCount, etc.
"""

from typing import List, Literal
from pydantic import BaseModel, Field, field_validator


# Define valid categories as a type for better type safety
ClothingCategory = Literal[
    "tops",
    "bottoms", 
    "dresses",
    "outerwear",
    "shoes",
    "accessories"
]


class ClothingMetadata(BaseModel):
    """
    Represents AI-generated metadata for a clothing item from image analysis.
    
    This model captures the semantic information about a clothing item that
    can be extracted from its image using computer vision and AI analysis.
    
    Attributes:
        name: Descriptive name of the clothing item (e.g., "White Cotton T-Shirt")
        category: The type of clothing item from predefined categories
        color: Primary color of the item (e.g., "navy blue", "forest green")
        season: List of seasons the item is suitable for (e.g., ["spring", "fall"])
        occasions: List of occasions the item is appropriate for 
                  (e.g., ["casual", "work", "formal"])
        styleTags: List of style descriptors (e.g., ["minimalist", "classic", "vintage"])
    
    Example:
        ```python
        metadata = ClothingMetadata(
            name="Navy Blue Blazer",
            category="outerwear",
            color="navy blue",
            season=["spring", "fall", "winter"],
            occasions=["work", "formal", "business"],
            styleTags=["classic", "professional", "tailored"]
        )
        ```
    """
    
    name: str = Field(
        ...,
        min_length=1,
        max_length=200,
        description="Descriptive name of the clothing item",
        examples=["White Cotton T-Shirt", "Black Leather Jacket", "Blue Denim Jeans"]
    )
    
    category: ClothingCategory = Field(
        ...,
        description="Category of the clothing item",
        examples=["tops", "bottoms", "outerwear"]
    )
    
    color: str = Field(
        ...,
        min_length=1,
        max_length=50,
        description="Primary color of the item",
        examples=["navy blue", "white", "forest green", "burgundy"]
    )
    
    season: List[str] = Field(
        ...,
        min_length=1,
        description="List of seasons the item is suitable for",
        examples=[["spring", "summer"], ["fall", "winter"], ["all-season"]]
    )
    
    occasions: List[str] = Field(
        ...,
        min_length=1,
        description="List of occasions the item is appropriate for",
        examples=[["casual", "weekend"], ["work", "business"], ["formal", "evening"]]
    )
    
    styleTags: List[str] = Field(
        ...,
        min_length=1,
        description="List of style descriptors for the item",
        examples=[["minimalist", "modern"], ["vintage", "retro"], ["bohemian", "relaxed"]]
    )
    
    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        """Ensure name is not just whitespace"""
        if not v or not v.strip():
            raise ValueError('Name cannot be empty or whitespace')
        return v.strip()
    
    @field_validator('color')
    @classmethod
    def validate_color(cls, v: str) -> str:
        """Ensure color is not just whitespace"""
        if not v or not v.strip():
            raise ValueError('Color cannot be empty or whitespace')
        return v.strip().lower()
    
    @field_validator('season', 'occasions', 'styleTags')
    @classmethod
    def validate_string_lists(cls, v: List[str]) -> List[str]:
        """
        Ensure lists contain valid non-empty strings and remove duplicates.
        Convert to lowercase for consistency.
        """
        if not v:
            raise ValueError('List cannot be empty')
        
        # Remove empty strings and whitespace-only strings
        cleaned = [item.strip().lower() for item in v if item and item.strip()]
        
        if not cleaned:
            raise ValueError('List must contain at least one valid item')
        
        # Remove duplicates while preserving order
        seen = set()
        unique = []
        for item in cleaned:
            if item not in seen:
                seen.add(item)
                unique.append(item)
        
        return unique
    
    class Config:
        """Pydantic model configuration"""
        # Generate JSON schema with examples
        json_schema_extra = {
            "examples": [
                {
                    "name": "Navy Blue Blazer",
                    "category": "outerwear",
                    "color": "navy blue",
                    "season": ["spring", "fall", "winter"],
                    "occasions": ["work", "formal", "business"],
                    "styleTags": ["classic", "professional", "tailored"]
                },
                {
                    "name": "White Cotton T-Shirt",
                    "category": "tops",
                    "color": "white",
                    "season": ["spring", "summer", "fall"],
                    "occasions": ["casual", "everyday", "weekend"],
                    "styleTags": ["minimalist", "basic", "versatile"]
                },
                {
                    "name": "Black Ankle Boots",
                    "category": "shoes",
                    "color": "black",
                    "season": ["fall", "winter", "spring"],
                    "occasions": ["casual", "work", "night out"],
                    "styleTags": ["edgy", "modern", "versatile"]
                }
            ]
        }
