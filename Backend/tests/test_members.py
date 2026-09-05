from fastapi.testclient import TestClient
from httpx import Response
from fastapi import status
from app.main import app, limiter

client = TestClient(app)
limiter.enabled = False


member_payload = {
    "full_name": "John Doe",
    "email": "joh@example.com",
    "handicap": "2",
    "club": "Gold",
    "vision":"test vision"
}


def test_create_member():
    response: Response = client.post("/members/", json=member_payload)
    assert response.status_code == status.HTTP_201_CREATED
    assert response.json() == {"message": "Member successfully created"}


def test_get_members():
    response: Response = client.post('/members/')
    assert response.status_code == 200
    assert response.json() == {"message": "Members Succesfully Retrieved"}

def test_delete_member_by_id():
     response = client.delete('/members/1')
     assert response.status_code == 200
     assert response.json() == {"message": "Member Deleted Succefully"}

