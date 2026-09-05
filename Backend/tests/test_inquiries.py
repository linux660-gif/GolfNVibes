# from fastapi.testclient import TestClient
# from fastapi import status
# from httpx import Response
# import pytest
# from app.main import app, limiter

# client = TestClient(app)
# limiter.enabled = False

# @pytest.fixture
# def inquiry_payload():
#     return {
#         "name":"john",
#         "email": "john@example.com",
#         "topic":"General",
#         "message":"test message"

#     }


# def test_add_inquiry(inquiry_payload):
#     response: Response = client.post('/inquiries/', json=inquiry_payload)
#     assert response.status_code == status.HTTP_201_CREATED
#     assert response.json() == {"message": "Inquiry received successfully"}




