from collections import Counter

from pydantic import BaseModel

from emails.email import Email


class EmailStats(BaseModel):
    sender: str
    number_of_emails: int


class EmailSorter:
    def get_top_sender(
        self, emails: list[Email], number_of_top_senders: int
    ) -> list[EmailStats]:
        sender_counts = Counter(email.sender for email in emails)
        top_senders = sender_counts.most_common(number_of_top_senders)
        return [
            EmailStats(sender=sender, number_of_emails=count)
            for sender, count in top_senders
        ]
