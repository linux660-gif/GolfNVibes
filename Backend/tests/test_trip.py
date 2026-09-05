# from fastapi.testclient import TestClient
# from httpx import Response
# from app.main import app

# client = TestClient(app)

# def test_add_custom_trip():
#     trip_data: dict[str, str | int | float | bool | list[str]] = {
#         "first_name": "John",
#         "last_name": "Doe",
#         "email": "john.doe@example.com",
#         "phone_number": "1234567890",
#         "golfers": 2,
#         "non_golfers": 1,
#         "budget": 5000.0,
#         "rounds": 3,
#         "experiences": ["Golf", "Spa"],
#         "additional_specifications": "Looking for a luxury experience.",
#         "airport_transfers": True,
#         "flexible_dates": False,
#         "hotel": "Luxury Resort",
#         "flights": True,
#         "other_destination": "Hawaii"
#     } 

#     response: Response = client.post("/trip/", json=trip_data)
#     assert response.status_code == 201
#     assert response.json() == {"message": "Success"}

# def test_get_trips():
#     response: Response = client.get("/trip/")
#     assert response.status_code == 200
#     assert isinstance(response.json(), list)

# def test_get_trip_by_email():
#     email = "john.doe@example.com"
#     response: Response = client.get(f"/trip/{email}")
#     assert response.status_code == 200
#     assert isinstance(response.json(), dict)

# def test_get_trip_by_phone():
#     phone = "1234567890"
#     response: Response = client.get(f"/trip/{phone}")
#     assert response.status_code == 200
#     assert isinstance(response.json(), dict)

# def test_get_trip_by_id():
#     trip_id = 1  # Replace with a valid trip ID from your test database
#     response: Response = client.get(f"/trip/{trip_id}")
#     assert response.status_code == 200
#     assert isinstance(response.json(), dict)

# def test_get_trips_with_query_params():
#     params: dict[str, str | int] = {
#         "email": "john.doe@example.com",
#         "phone": "1234567890",
#         "trip_id": 1,  # Replace with a valid trip ID from your test database
#         "limit": 5,
#         "offset": 0
#     }
#     response: Response = client.get("/trip/", params=params)
#     assert response.status_code == 200
#     assert isinstance(response.json(), list)

# def test_get_trips_with_invalid_query_params():
#     params: dict[str, str | int] = {
#         "limit": 0,  # Invalid limit (should be >= 1)
#         "offset": -1  # Invalid offset (should be >= 0)
#     }
#     response: Response = client.get("/trip/", params=params)
#     assert response.status_code == 422  # Unprocessable Entity for validation errors   


# def test_update_trip():
#     trip_id = 1  # Replace with a valid trip ID from your test database
#     update_data: dict[str, str | int | float | bool | list[str]] = {
#         "first_name": "Jane",
#         "last_name": "Smith",
#         "email": "jane.smith@example.com"
#     }
#     response: Response = client.put(f"/trip/{trip_id}", json=update_data)
#     assert response.status_code == 200
#     assert response.json() == {"message": "Trip updated successfully"}

# def test_update_trip_not_found():
#     trip_id = 9999  # Replace with a non-existent trip ID
#     update_data: dict[str, str | int | float | bool | list[str]] = {
#         "first_name": "Jane",
#         "last_name": "Smith",
#         "email": "john.doe@example.com"
#     }
#     response: Response = client.put(f"/trip/{trip_id}", json=update_data)
#     assert response.status_code == 404
#     assert response.json() == {"message": "Trip not found"}


# def test_delete_trip():
#     trip_id = 1  # Replace with a valid trip ID from your test database
#     response: Response = client.delete(f"/trip/{trip_id}")
#     assert response.status_code == 200
#     assert response.json() == {"message": "Trip deleted successfully"}

# def test_delete_trip_not_found():
#     trip_id = 9999  # Replace with a non-existent trip ID
#     response: Response = client.delete(f"/trip/{trip_id}")
#     assert response.status_code == 404
#     assert response.json() == {"message": "Trip not found"}


# def test_get_trip_not_found():
#     trip_id = 9999  # Replace with a non-existent trip ID
#     response: Response = client.get(f"/trip/{trip_id}")
#     assert response.status_code == 404
#     assert response.json() == {"message": "Trip not found"}

# def test_get_trip_by_email_not_found():
#     email = "john.doe@example.com"
#     response: Response = client.get(f"/trip/{email}")
#     assert response.status_code == 404
#     assert response.json() == {"message": "Trip not found"}

# def test_get_trip_by_phone_not_found():
#     phone = "1234567890"
#     response: Response = client.get(f"/trip/{phone}")
#     assert response.status_code == 404
#     assert response.json() == {"message": "Trip not found"}

# def test_delete_trips():
#     response: Response = client.delete("/trip/")
#     assert response.status_code == 200
#     assert response.json() == {"message": "trips deleted"}

# def test_delete_trips_empty():
#     response: Response = client.delete("/trip/")
#     assert response.status_code == 200
#     assert response.json() == {"message": "trips deleted"}


# def test_get_trips_empty():
#     response: Response = client.get("/trip/")
#     assert response.status_code == 200
#     assert response.json() == []    

# def test_get_trips_with_query_params_empty():
#     params: dict[str, str | int | None] = {
#         "email": "",
#         "phone": "",
#         "trip_id": None,
#         "limit": 5,
#         "offset": 0
#     }
#     response: Response = client.get("/trip/", params=params)
#     assert response.status_code == 404
#     assert response.json() == {"message": "Trips not found"}    
