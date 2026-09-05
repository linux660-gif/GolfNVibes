# from fastapi.testclient import TestClient
# from httpx import Response
# from app.main import app

# client = TestClient(app)

# def test_add_subscriber():
#     response: Response = client.post("/newsletter/", json={"email": "jane@example.com"})
#     assert response.status_code == 201
#     assert response.json() == {"message": "Success"}

# def test_add_existing_subscriber():
#     # First, add a subscriber
#     client.post("/newsletter/", json={"email": "jane@example.com"})
#     # Then, try to add the same subscriber again
#     response: Response = client.post("/newsletter/", json={"email": "jane@example.com"})
#     assert response.status_code == 409
#     assert response.json() == {"detail": "Subscriber Already Exists"}

# def test_delete_subscriber():
#     # First, add a subscriber to delete
#     client.post("/newsletter/", json={"email": "jane@example.com"})
#     # Now, delete the subscriber
#     response: Response = client.delete("/newsletter/1")
#     assert response.status_code == 200
#     assert response.json() == {"message": "Subscriber Deleted Successfully"}

# def test_delete_nonexistent_subscriber():
#     response: Response = client.delete("/newsletter/999")
#     assert response.status_code == 404
#     assert response.json() == {"detail": "Subscriber not found"}

# def test_update_subscriber():
#     # First, add a subscriber to update
#     client.post("/newsletter/", json={"email": "jane@example.com"})
#     # Now, update the subscriber
#     response: Response = client.put("/newsletter/1", json={"email": "jane.doe@example.com"})
#     assert response.status_code == 200
#     assert response.json() == {"message": "Subscriber Updated Successfully"}

# def test_update_nonexistent_subscriber():
#     response: Response = client.put("/newsletter/999", json={"email":"jane.doe@example.com"})
#     assert response.status_code == 404
#     assert response.json() == {"detail": "Subscriber not found"}

# def test_add_subscriber_invalid_email():
#     response: Response = client.post("/newsletter/", json={"email": "invalid-email"})
#     assert response.status_code == 422
#     assert response.json() == {"detail": "Invalid email format"}
# def test_add_subscriber_missing_email():
#     response: Response = client.post("/newsletter/", json={})
#     assert response.status_code == 422
#     assert response.json() == {"detail": "Email is required"}
# def test_add_subscriber_empty_email():
#     response: Response = client.post("/newsletter/", json={"email": ""})
#     assert response.status_code == 422
#     assert response.json() == {"detail": "Email cannot be empty"}

# def test_delete_subscriber_invalid_id():
#     response: Response = client.delete("/newsletter/invalid-id")
#     assert response.status_code == 422
#     assert response.json() == {"detail": "Invalid subscriber ID"}
# def test_update_subscriber_invalid_id():
#     response: Response = client.put("/newsletter/invalid-id", json={"email": "jane@example.com"})
#     assert response.status_code == 422
#     assert response.json() == {"detail": "Invalid subscriber ID"}