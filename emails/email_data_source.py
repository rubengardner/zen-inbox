import imaplib

from emails.email import Email, EmailQuery, EmailRequest
from emails.email_parser import EmailParser
from emails.exceptions import EmailSearchError


class EmailDataSource:

    def __init__(
        self, session: imaplib.IMAP4_SSL, email_parser: EmailParser = EmailParser()
    ):
        self.session = session
        self.email_parser = email_parser

    def get(self, email_request: EmailRequest) -> list[Email]:
        try:
            self.session.select(email_request.inbox)
            query = self._build_query(email_request.query)
            result, data = self.session.search(None, query)

            if result != "OK":
                raise EmailSearchError("Response from provider was not OK.")
            if not data or not data[0]:
                return []
            emails = self.email_parser.parse(self.session, data)
            return emails
        except Exception as e:
            raise EmailSearchError("Failed to search emails: " + str(e))

    @staticmethod
    def _build_query(email_query: EmailQuery) -> str:
        query_parts = []
        if email_query.sender:
            query_parts.append(f'FROM "{email_query.sender}"')
        if email_query.since:
            query_parts.append(f'SINCE "{email_query.date.strftime("%d-%b-%Y")}"')
        if email_query.before:
            query_parts.append(f'BEFORE "{email_query.date.strftime("%d-%b-%Y")}"')
        if email_query.body:
            query_parts.append(f'BODY "{email_query.body}"')

        query = " ".join(query_parts)
        return f"({query})" if query else ""
