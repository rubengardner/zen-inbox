from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from auth.api.auth_api import auth_router
from emails.api.email_api import email_router

allowed_origins = ["http://localhost:3000"]
app = FastAPI()


app.include_router(auth_router)

app.include_router(email_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
