from fastapi import APIRouter, Depends

from auth.auth_service import AuthService, get_auth_service
from emails.email import Email, EmailRequest
from emails.email_data_source import EmailDataSource
from emails.email_sorter import EmailSorter, EmailStats

email_router = APIRouter(prefix="/emails")


@email_router.post("/emails", tags=["Emails"])
async def get_emails(
    email_request: EmailRequest, auth_service: AuthService = Depends(get_auth_service)
) -> list[Email]:
    auth_service.login()
    session = auth_service.get_mail_session()
    emails = EmailDataSource(session).get(email_request)
    return emails


@email_router.post("/emails/stats", tags=["Emails"])
async def get_top_senders(
    email_request: EmailRequest, auth_service: AuthService = Depends(get_auth_service)
) -> list[EmailStats]:
    auth_service.login()
    session = auth_service.get_mail_session()
    emails = EmailDataSource(session).get(email_request)
    stats = EmailSorter().get_top_sender(emails, 10)
    return stats
