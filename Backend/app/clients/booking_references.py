import string
import secrets




class BookingReference:

    def generate_booking_references(self) -> str:
        allowed_chars = string.ascii_letters + string.digits
        return ''.join(secrets.choice(allowed_chars) for i in range(10))

    def trip_booking_references(self) -> str:
        return f"trip-{self.generate_booking_references()}"

    def tournament_booking_references(self) -> str:
        return f"tournament-{self.generate_booking_references()}"

    def custom_trip_references(self) -> str:
        return f"CTB-{self.generate_booking_references()}"
