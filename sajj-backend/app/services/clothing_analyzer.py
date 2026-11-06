"""
AI-powered clothing image analysis for Sajj.
"""

import base64
import json
import os

from dotenv import load_dotenv
from openai import AsyncOpenAI

from app.models import ClothingMetadata


load_dotenv()


ANALYSIS_PROMPT = """
You are a clothing analysis assistant for Sajj, a personal styling app.

Analyze the provided image and identify the main clothing item.

Return a JSON object with exactly these fields:
- name: A short, descriptive clothing item name.
- category: One of tops, bottoms, dresses, outerwear, shoes, accessories.
- color: The main visible color, written in lowercase.
- season: A list of suitable seasons, using spring, summer, autumn, winter.
- occasions: A list of suitable occasions, such as casual, work, party,
  formal, or festive.
- styleTags: A list of relevant style descriptors, such as minimalist,
  classic, bohemian, sporty, or streetwear.

Rules:
1. Describe only what is reasonably supported by the image.
2. Choose the category that best matches the main clothing item.
3. Use lowercase for color, seasons, occasions, and style tags.
4. Return valid JSON only, with no Markdown or extra commentary.
5. If a detail is uncertain, make a reasonable conservative estimate.
"""


async def analyze_clothing_image(
    image_bytes: bytes,
    content_type: str,
) -> ClothingMetadata:
    """
    Analyze a clothing image and return validated metadata.

    Args:
        image_bytes: Raw bytes of the uploaded image.
        content_type: MIME type, such as image/jpeg or image/png.

    Returns:
        ClothingMetadata: Validated clothing information.
    """

    api_key = os.getenv("OPENAI_API_KEY")
    model = os.getenv("OPENAI_MODEL", "gpt-5.4-mini")

    if not api_key or api_key == "your_actual_api_key_here":
        raise RuntimeError(
            "OpenAI API key is missing. Configure OPENAI_API_KEY in .env."
        )

    # Convert the image bytes into a Base64 data URL.
    encoded_image = base64.b64encode(image_bytes).decode("utf-8")
    image_data_url = f"data:{content_type};base64,{encoded_image}"

    # Create an asynchronous API client.
    async with AsyncOpenAI(api_key=api_key) as client:

        response = await client.responses.create(
            model=model,
            instructions=ANALYSIS_PROMPT,
            input=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "input_text",
                            "text": "Analyze this clothing item.",
                        },
                        {
                            "type": "input_image",
                            "image_url": image_data_url,
                            "detail": "low",
                        },
                    ],
                }
            ],
            text={"format": {"type": "json_object"}},
        )

    # Extract the JSON text returned by the model.
    result_text = response.output_text

    # Convert JSON text into a Python dictionary.
    result_data = json.loads(result_text)

    # Validate the result against Sajj's existing Pydantic model.
    return ClothingMetadata.model_validate(result_data)