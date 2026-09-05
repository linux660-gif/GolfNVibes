# from fastapi.testclient import TestClient
# from httpx import Response
# from app.main import app

# client = TestClient(app)

# def test_add_partner():
#     partner_data: dict[str, str] = {
#         "organization": "Golf Inc.",
#         "email": "john@example.com",
#         "partner_type": "Gold",
#         "details": "A leading golf equipment company."
#     }
#     response: Response = client.post("/partner/", json=partner_data)
#     assert partner_data["organization"] == "Golf Inc."
#     assert partner_data["email"] == "john@example.com"
#     assert partner_data["partner_type"] == "Gold"
#     assert partner_data["details"] == "A leading golf equipment company."
#     assert response.status_code == 201
#     assert response.json() == {"message": "Success"}