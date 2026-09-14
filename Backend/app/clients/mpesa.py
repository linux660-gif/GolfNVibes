from fastapi import HTTPException, status
import httpx
from app.core.config import settings


class MpesaClient:

    def __init__(self):
        self.base_url: str = settings.mpesa_base_url
        self.timeout = 30.0

    @staticmethod
    def _auth_headers(token: str) -> dict[str, str]:
        return {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }

    async def get_access_token(self, client: httpx.AsyncClient) -> str:

        url = f"{self.base_url}" "/oauth/v1/generate" "?grant_type=client_credentials"

        try:

            response = await client.get(
                url, auth=(settings.mpesa_consumer_key, settings.mpesa_consumer_secret)
            )

            response.raise_for_status()

            return response.json()["access_token"]

        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"Mpesa auth failed: {e.response.text}",
            )

        except httpx.RequestError:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Unable to connect to Mpesa.",
            )

    async def initiate_stk_push(self, phone_number: str, amount: float|int):
        payload = {
            "BusinessShortCode": settings.mpesa_business_shortcode,
            "Password": settings.mpesa_password_hash,
            "CallBackURL":settings.mpesa_callback_url,
            "PhoneNumber": phone_number,
            "Amount": amount,
            "TransactionType": settings.mpesa_transaction_type,
            "Timestamp": settings.mpesa_transaction_date,
            "PartyA":settings.mpesa_party_a,
            "PartyB":settings.mpesa_party_b,
            "AccountReference":settings.mpesa_account_reference,
            "TransactionDesc": settings.mpesa_transaction_desc,

        }

        async with httpx.AsyncClient(timeout=self.timeout) as client:

            token = await self.get_access_token(client)

            url = f"{self.base_url}" "/mpesa/stkpush/v1/processrequest"

            try:

                response = await client.post(
                    url, json=payload, headers=self._auth_headers(token)
                )

                response.raise_for_status()

                result = response.json()
                if result["ResponseCode"] != 0:
                    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail="Error Initiating STK Push")

                return result["CheckoutRequestId"]

            except httpx.HTTPStatusError as e:
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail=f"STK Push failed",
                )

            except httpx.RequestError:
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail="Unable to connect to Mpesa.",
                )
