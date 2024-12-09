from pydantic import BaseModel


class AuthInformation(BaseModel):
    username: str
    password: str
