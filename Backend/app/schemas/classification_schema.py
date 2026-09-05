from pydantic import BaseModel

class Classification(BaseModel):
    name:str

class ClassificationResponse(Classification):
    pass

