from pydantic_settings import BaseSettings, SettingsConfigDict
class Settings(BaseSettings):
    postgres_password:str
    postgres_db:str
    postgres_user:str
    database_url:str
    mail_username: str
    mail_password: str
    mail_from: str
    mail_server: str
    mail_port: int = 465
    mail_starttls: bool = False
    mail_ssl_tls: bool = True
    use_credentials: bool = True
    validate_certs: bool = True
    mpesa_short_code:str
    mpesa_base_url: str
    mpesa_consumer_key: str
    mpesa_consumer_secret: str
    paypal_base_url: str
    paypal_client_id: str
    paypal_client_secret: str
    stripe_endpoint_secret: str
    stripe_secret_key: str
    algorithm:str = "HS256"
    access_token_secret_key :str 
    access_token_expire_time_minutes:int = 10
    model_config = SettingsConfigDict(env_file=".env")


    



settings = Settings()  # type: ignore




