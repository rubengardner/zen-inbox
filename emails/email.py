from datetime import datetime
from typing import Optional, Self

from pydantic import BaseModel, ConfigDict


class Email(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    sender: str
    subject: str
    date: str
    body: str

    @classmethod
    def build_new_email(cls, properties: Optional[dict] = None) -> Self:
        return Email(
            sender=properties.get("sender"),
            subject=properties.get("subject"),
            date=properties.get("date"),
            body=properties.get("body"),
        )


class EmailQuery(BaseModel):
    sender: str | None
    date: datetime | None
    body: str | None


class EmailRequest(BaseModel):
    inbox: str
    query: EmailQuery
