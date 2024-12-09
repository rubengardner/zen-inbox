from fastapi import FastAPI

from auth.api.auth_api import auth_router
from emails.api.email_api import email_router

app = FastAPI()


app.include_router(auth_router)

app.include_router(email_router)
