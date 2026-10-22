# Wardrobe Analyze Endpoint Documentation

## Overview

The `/wardrobe/analyze` endpoint accepts a clothing image upload and returns AI-extracted metadata. Currently returns **MOCK data** for testing the upload flow.

## Endpoint Details

### `POST /wardrobe/analyze`

**Purpose**: Upload a clothing item image to extract structured metadata

**Status**: ⚠️ **MOCK ENDPOINT** - Returns test data until AI model is integrated

## Request

### Method
`POST`

### URL
```
http://localhost:8000/wardrobe/analyze
```

### Headers
```
Content-Type: multipart/form-data
```

### Body (Form Data)
- **file** (required): Image file
  - **Formats**: JPEG, PNG, WebP
  - **Max Size**: 10MB
  - **Field Name**: `file`

## Response

### Success (200 OK)

```json
{
  "name": "Black Midi Skirt",
  "category": "bottoms",
  "color": "black",
  "season": ["spring", "autumn"],
  "occasions": ["casual", "work"],
  "styleTags": ["minimalist", "classic"]
}
```

**Response Model**: `ClothingMetadata`

### Error Responses

#### 400 Bad Request - No File
```json
{
  "detail": "No file provided"
}
```

#### 400 Bad Request - Invalid File Type
```json
{
  "detail": "Unsupported file type. Allowed: image/jpeg, image/png, image/webp"
}
```

#### 400 Bad Request - File Too Large
```json
{
  "detail": "File size exceeds 10MB limit"
}
```

#### 400 Bad Request - Empty File
```json
{
  "detail": "Uploaded file is empty"
}
```

#### 500 Internal Server Error
```json
{
  "detail": "Error processing uploaded file"
}
```

## How to Test

### Method 1: FastAPI Interactive Docs (Recommended)

1. **Start the FastAPI server**:
   ```bash
   cd sajj-backend
   uvicorn app.main:app --reload
   ```

2. **Open the docs in your browser**:
   ```
   http://localhost:8000/docs
   ```

3. **Test the endpoint**:
   - Find the **POST /wardrobe/analyze** endpoint
   - Click "Try it out"
   - Click "Choose File" and select any image (jpg, png, webp)
   - Click "Execute"
   - See the mock response in the "Response body" section

4. **Expected Response**:
   ```json
   {
     "name": "Black Midi Skirt",
     "category": "bottoms",
     "color": "black",
     "season": ["spring", "autumn"],
     "occasions": ["casual", "work"],
     "styleTags": ["minimalist", "classic"]
   }
   ```

### Method 2: cURL Command

```bash
curl -X POST "http://localhost:8000/wardrobe/analyze" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/your/image.jpg"
```

### Method 3: Python Requests

```python
import requests

url = "http://localhost:8000/wardrobe/analyze"
files = {"file": open("image.jpg", "rb")}

response = requests.post(url, files=files)
print(response.json())
```

### Method 4: Postman

1. Create new POST request to `http://localhost:8000/wardrobe/analyze`
2. Go to "Body" tab
3. Select "form-data"
4. Add key `file` with type `File`
5. Choose an image file
6. Click "Send"

## Validation Rules

### File Type Validation
- ✅ Accepts: `image/jpeg`, `image/jpg`, `image/png`, `image/webp`
- ❌ Rejects: All other types (PDF, GIF, SVG, etc.)

### File Size Validation
- ✅ Max Size: 10MB (10,485,760 bytes)
- ❌ Rejects files larger than 10MB

### File Content Validation
- ❌ Rejects empty files (0 bytes)
- ❌ Rejects missing/null files

## Additional Endpoint

### `GET /wardrobe/supported-formats`

Returns information about supported formats (useful for frontend validation).

**Response**:
```json
{
  "supported_types": ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  "max_file_size_mb": 10,
  "max_file_size_bytes": 10485760
}
```

## Files Changed

### Created:
1. **`app/routers/__init__.py`** - Router package initialization
2. **`app/routers/wardrobe.py`** - Wardrobe router with analyze endpoint
3. **`WARDROBE_ANALYZE_ENDPOINT.md`** - This documentation

### Modified:
1. **`app/main.py`** - Added wardrobe router import and registration
2. **`requirements.txt`** - Added `python-multipart` dependency

## Architecture

```
Angular Frontend
    ↓ (uploads image)
FastAPI Backend
    ↓ (validates file)
Wardrobe Router
    ↓ (processes upload)
[Future: AI Vision Model]
    ↓ (analyzes image)
ClothingMetadata Model
    ↓ (structures response)
Angular Frontend
```

## Current Flow (Mock)

1. User uploads image via POST request
2. FastAPI receives file as `UploadFile`
3. Validation checks:
   - File exists
   - File type is supported
   - File size is within limits
   - File is not empty
4. **Mock response** returned (not actual AI analysis yet)
5. Frontend receives structured `ClothingMetadata`

## Next Steps (Not Implemented)

- ❌ Actual AI vision model integration
- ❌ Image preprocessing
- ❌ Real metadata extraction
- ❌ Image storage
- ❌ Database persistence
- ❌ Frontend upload component

## Why Mock Data?

The mock response allows us to:
1. ✅ Test the entire upload flow end-to-end
2. ✅ Verify file validation works correctly
3. ✅ Ensure Angular can receive structured metadata
4. ✅ Develop frontend UI without waiting for AI
5. ✅ Test error handling
6. ✅ Validate API contract

Once AI integration is ready, we simply replace the mock response with real AI analysis - **no API changes needed**.

## Testing Checklist

- [ ] Upload valid JPEG → Gets mock response
- [ ] Upload valid PNG → Gets mock response
- [ ] Upload valid WebP → Gets mock response
- [ ] Upload unsupported type (GIF) → Gets 400 error
- [ ] Upload file > 10MB → Gets 400 error
- [ ] Upload without file → Gets 400 error
- [ ] Check response matches `ClothingMetadata` schema
- [ ] Verify CORS allows Angular requests
- [ ] Test through FastAPI /docs interface
