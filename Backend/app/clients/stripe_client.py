import stripe

client = stripe.StripeClient("sk_test_51TzYCTDzkpFg5G9qhpIWtBBdeRY56HH9LpKtxVD8bOW7xmA5srXm4iEpablJhFQWuHYx50EM9ozzvPgUh1MJ5xX900IVcSDVjo")


class  StripePayment:
    def __init__(self) -> None:
        pass

    def make_payment(self, price_id:str):
        try:
            checkout_session = client.v1.checkout.sessions.create(params={
                'line_items' : [
                    {
                    'price':f'{price_id}',
                    'quantity':2,
                    },
                ],
                'mode':'payment',
                'success_url':'https://nusytech.co.ke'
            
            })

        except Exception as e:
            return str(e)
        return checkout_session.url

obj = StripePayment()
obj.make_payment("price_1U8hkBDzkpFg5G9qupqPWoGU")


