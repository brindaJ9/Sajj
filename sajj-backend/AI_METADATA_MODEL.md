# AI Metadata Model Documentation

## Overview

The `ClothingMetadata` model represents AI-generated metadata extracted from clothing images. This is a **pure AI output model** that contains only semantic information about the clothing item.

## File Created

**`app/models/ai_metadata.py`** - Contains the `ClothingMetadata` Pydantic model

## Model Structure

```python
class ClothingMetadata(BaseModel):
    name: str                    # "Navy Blue Blazer"
    category: ClothingCategory   # "outerwear" | "tops" | "bottoms" | etc.
    color: str                   # "navy blue"
    season: List[str]           # ["spring", "fall", "winter"]
    occasions: List[str]        # ["work", "formal", "business"]
    styleTags: List[str]        # ["classic", "professional", "tailored"]
```

## Why Separate AI Metadata from ClothingItem?

### 1. **Single Responsibility Principle**
- `ClothingMetadata` → AI-extracted information (what the AI "sees")
- `ClothingItem` (future) → Application data (what the app manages)

### 2. **Clear Data Boundaries**

**AI Metadata (AI's job):**
- Analyze image → Extract semantic meaning
- Name the item based on visual features
- Classify category from appearance
- Detect colors from pixels
- Infer suitable seasons from fabric/style
- Suggest appropriate occasions
- Generate style tags

**Application Data (App's job):**
- Assign unique ID
- Store image URL
- Track wear count
- Record last worn date
- Timestamp creation
- Manage user ownership
- Handle favorites/collections

### 3. **Reusability**
- Same AI model can be used across different features
- Can generate metadata without persisting to database
- Easy to test AI output independently
- Can re-analyze existing images without affecting app data

### 4. **API Design**
```
POST /api/wardrobe/analyze-image
  Input: Image file
  Output: ClothingMetadata
  
POST /api/wardrobe/items
  Input: ClothingMetadata + Image
  Output: ClothingItem (with id, timestamps, etc.)
```

### 5. **Future Flexibility**
- Can swap AI models without changing app logic
- Can batch-process metadata generation
- Can preview AI results before saving
- Can implement confidence scores per field
- Can add AI model versioning

## Validation Rules

### String Fields (name, color)
- Not empty or whitespace
- Trimmed automatically
- Color normalized to lowercase

### List Fields (season, occasions, styleTags)
- At least one item required
- Empty/whitespace items removed
- Normalized to lowercase
- Duplicates removed
- Order preserved

### Category Field
- Type-safe Literal type
- Only allows: tops, bottoms, dresses, outerwear, shoes, accessories

## Example Usage

### Valid Instance
```python
metadata = ClothingMetadata(
    name="White Cotton T-Shirt",
    category="tops",
    color="white",
    season=["spring", "summer", "fall"],
    occasions=["casual", "everyday", "weekend"],
    styleTags=["minimalist", "basic", "versatile"]
)
```

### Validation Errors
```python
# Empty name - raises ValidationError
ClothingMetadata(name="", category="tops", ...)

# Invalid category - type error
ClothingMetadata(category="invalid", ...)

# Empty lists - raises ValidationError
ClothingMetadata(season=[], ...)
```

## Integration Flow (Future)

```
1. User uploads image
   ↓
2. Send to vision AI model
   ↓
3. AI returns ClothingMetadata
   ↓
4. App combines with application data
   ↓
5. Save as ClothingItem to database
```

## No Database Yet

This model is **in-memory only** for now:
- No persistence layer
- No database schema
- No ORM models
- Pure data validation

Database integration will come later with:
- SQLAlchemy models
- Database migrations
- Repository pattern
- CRUD operations

## Next Steps (Not Implemented)

1. ❌ AI vision endpoint (`POST /analyze-image`)
2. ❌ Actual AI model integration
3. ❌ ClothingItem application model
4. ❌ Database models
5. ❌ CRUD endpoints
6. ❌ Image upload/storage

## Benefits of This Approach

✅ **Clean separation of concerns**
✅ **Easy to test AI independently**
✅ **No coupling to database**
✅ **Type-safe category validation**
✅ **Comprehensive field validation**
✅ **Self-documenting with examples**
✅ **Ready for API documentation (OpenAPI)**
✅ **No frontend changes needed**

## Model Location

```
sajj-backend/
├── app/
│   ├── models/
│   │   ├── __init__.py          # Exports ClothingMetadata
│   │   └── ai_metadata.py       # Model definition
│   └── main.py
```

Import usage:
```python
from app.models import ClothingMetadata
```
