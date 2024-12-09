import imaplib
from concurrent.futures import as_completed, ThreadPoolExecutor
from email import message_from_bytes
from email.header import decode_header
from typing import List, Tuple

from emails.email import Email


class EmailParser:
    def parse(self, session: imaplib.IMAP4_SSL, raw_ids: List[bytes]) -> List[Email]:
        emails = []
        email_ids = self._get_email_ids(raw_ids)
        result, message_data = session.fetch(email_ids, "(RFC822)")
        with ThreadPoolExecutor() as executor:
            futures = [
                executor.submit(self._process_email, part) for part in message_data
            ]

            for future in as_completed(futures):
                email_obj = future.result()
                if email_obj:
                    emails.append(email_obj)

        return emails

    def _get_email_ids(self, raw_ids: List[bytes]) -> str:
        email_ids = raw_ids[0].decode().split()
        email_ids = ",".join(email_ids)
        return email_ids

    def _process_email(self, response_part: Tuple) -> Email | None:
        try:
            msg = message_from_bytes(response_part[1])
            email_data = {
                "sender": msg.get("From"),
                "subject": self._get_subject(msg),
                "date": msg.get("Date"),
                "body": self._get_body(msg),
            }

            return Email.build_new_email(email_data)
        except:
            pass

    @staticmethod
    def _get_body(message) -> str:
        body = ""
        if message.is_multipart():
            for part in message.walk():
                content_type = part.get_content_type()
                content_disposition = str(part.get("Content-Disposition"))
                if (
                    "attachment" not in content_disposition
                    and content_type == "text/plain"
                ):
                    try:
                        body = part.get_payload(decode=True).decode()
                        break
                    except:
                        pass
        else:
            try:
                body = message.get_payload(decode=True).decode()
            except:
                pass
        return body

    @staticmethod
    def _get_subject(message) -> str:
        subject, encoding = decode_header(message["Subject"])[0]
        if isinstance(subject, bytes):
            subject = subject.decode(encoding or "utf-8")
        return subject
