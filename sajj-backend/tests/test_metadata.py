from pydantic import ValidationError

from app.models import ClothingMetadata


def test_valid_metadata():
    metadata = ClothingMetadata(
        name="  Red Oversized T-Shirt  ",
        category="tops",
        color=" RED ",
        season=["Summer", "summer", "Spring"],
        occasions=["Casual", "Everyday"],
        styleTags=["Streetwear", "Relaxed"]
    )

    assert metadata.name == "Red Oversized T-Shirt"
    assert metadata.color == "red"
    assert metadata.season == ["summer", "spring"]
    assert metadata.occasions == ["casual", "everyday"]
    assert metadata.styleTags == ["streetwear", "relaxed"]


def test_invalid_category():
    try:
        ClothingMetadata(
            name="Red Shirt",
            category="shirts",
            color="red",
            season=["summer"],
            occasions=["casual"],
            styleTags=["basic"]
        )
    except ValidationError:
        print("PASS: Invalid category rejected")
    else:
        raise AssertionError("Invalid category was accepted")


if __name__ == "__main__":
    test_valid_metadata()
    test_invalid_category()

    print("All metadata tests passed!")