from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse

from auth.auth_service import AuthService, get_auth_service

auth_router = APIRouter(prefix="/auth")


@auth_router.post("/login", tags=["Auth"])
async def login(
    auth_service: AuthService = Depends(get_auth_service),
) -> JSONResponse:
    response = auth_service.login()
    if not response:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return JSONResponse(status_code=200, content={"message": "Login successful"})


