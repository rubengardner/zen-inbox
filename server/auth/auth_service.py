import imaplib
from typing import Optional

from server.auth.auth_information import AuthInformation


class AuthService:

    def __init__(self, auth_info: AuthInformation, mail_service=imaplib.IMAP4_SSL):
        self.auth_info = auth_info
        self.mail_service = mail_service("imap.gmail.com")

    def login(self) -> bool:
        try:
            self.mail_service.login(self.auth_info.username, self.auth_info.password)
            return True
        except Exception as e:
            return False

    def get_mail_session(self) -> Optional[imaplib.IMAP4_SSL]:
        if self.mail_service:
            return self.mail_service
        raise ValueError("No active session found. Please login first.")


def get_auth_service(auth_info: AuthInformation) -> AuthService:
    return AuthService(auth_info)
