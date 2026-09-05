# from fastapi.testclient import TestClient
# from httpx import Response
# from app.main import app

# client = TestClient(app)

# def test_host_tournament():
#     tournament_data: dict[str, str | int] = {
#         "full_name": "John Doe",
#         "email": "john.doe@example.com",
#         "company": "Golf Inc.",
#         "category": "Professional",
#         "expected_guest": 100,
#         "vision": "To host a successful golf tournament."
#     }
#     response: Response = client.post("/tournament/", json=tournament_data)
#     assert tournament_data["full_name"] == "John Doe"
#     assert tournament_data["email"] == "john.doe@example.com"
#     assert tournament_data["company"] == "Golf Inc."
#     assert tournament_data["category"] == "Professional"
#     assert tournament_data["expected_guest"] == 100
#     assert tournament_data["vision"] == "To host a successful golf tournament."
#     assert response.status_code == 201
#     assert response.json() == {"message": "Success"}
    

    