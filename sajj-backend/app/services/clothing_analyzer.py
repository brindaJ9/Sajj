
"""
AI-powered clothing image analysis for Sajj.
"""

import base64
import os

from dotenv import load_dotenv
from openai import AsyncOpenAI

from app.models import ClothingMetadata


# Load environment variables from .env
load_dotenv()


ANALYSIS_PROMPT = """
You are Sajj, an AI clothing analysis assistant.

Your task is to identify and describe the main clothing item
visible in the uploaded image.

Return the following information:

1. name:
   A concise descriptive name for the item.

2. category:
   Select exactly one:
   tops, bottoms, dresses, outerwear, shoes, accessories.

3. color:
   Identify the dominant visible color.
   Use a simple, descriptive lowercase color name.

4. season:
   Select suitable seasons from:
   spring, summer, autumn, winter.

5. occasions:
   Select suitable occasions such as:
   casual, everyday, work, formal, party, festive.

6. styleTags:
   Select relevant style descriptors such as:
   minimalist, classic, bohemian, sporty,
   streetwear, vintage, elegant.

Important instructions:

- Analyze the actual image, not assumptions about the user.
- Identify only the main clothing item.
- Do not invent material or fabric composition.
- Distinguish visible attributes from subjective styling suggestions.
- Do not confuse a garment's category with its style.
- Use lowercase for color, seasons, occasions and style tags.
- Use "autumn", never "fall".
- Make conservative estimates when information is uncertain.
"""


async def analyze_clothing_image(
    image_bytes: bytes,
    content_type: str,
) -> ClothingMetadata:
    """
    Analyze a clothing image using OpenAI's vision model.

    Args:
        image_bytes: Raw bytes of the uploaded image.
        content_type: MIME type, such as image/jpeg or image/png.

    Returns:
        ClothingMetadata: Validated clothing information.
    """

    # Step 1: Read configuration
    api_key = os.getenv("OPENAI_API_KEY")
    model = os.getenv("OPENAI_MODEL", "gpt-5.4-nano")

    if not api_key or not api_key.strip():
        raise RuntimeError(
            "OpenAI API key is missing. Configure it in .env."
        )

    if not image_bytes:
        raise ValueError("Image data cannot be empty.")

    # Step 2: Encode the image
    encoded_image = base64.b64encode(image_bytes).decode("utf-8")

    image_data_url = (
        f"data:{content_type};base64,{encoded_image}"
    )

    # Step 3: Create the API client
    async with AsyncOpenAI(api_key=api_key) as client:

        # Step 4: Send image and request structured output
        response = await client.responses.parse(
            model=model,
            instructions=ANALYSIS_PROMPT,
            input=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "input_text",
                            "text": "Analyze this clothing item."
                        },
                        {
                            "type": "input_image",
                            "image_url": image_data_url,
                            "detail": "low"
                        }
                    ]
                }
            ],
            text_format=ClothingMetadata,
            max_output_tokens=500
        )

    # Step 5: Extract the parsed Pydantic object
    metadata = response.output_parsed

    if metadata is None:
        raise ValueError(
            "The AI did not return valid clothing metadata."
        )

    # Step 6: Return validated metadata
    return metadata
