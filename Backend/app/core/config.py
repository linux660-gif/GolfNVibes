from pydantic_settings import BaseSettings, SettingsConfigDict
class Settings(BaseSettings):
    database_url:str = "postgresql+asyncpg://golftest:660wakahiu6@localhost:5430/version1"
    mail_username: str
    mail_password: str
    mail_from: str
    mail_server: str = "mail.golfnvibes.com"
    mail_port: int = 465
    mail_starttls: bool = False
    mail_ssl_tls: bool = True
    use_credentials: bool = True
    validate_certs: bool = True
    mpesa_base_url: str = "https://sandbox.safaricom.co.ke"
    mpesa_consumer_key: str
    mpesa_consumer_secret: str
    paypal_base_url: str = "https://api-m.sandbox.paypal.com"
    paypal_client_id: str
    paypal_client_secret: str
    stripe_endpoint_secret: str
    stripe_secret_key: str
    model_config = SettingsConfigDict(env_file="/home/nusytech/Documents/Software Engineering/Projects/GolfNVibesBackend/.env")


    



settings = Settings()  # type: ignore




