import unittest

from emails.email import Email
from emails.email_sorter import EmailSorter, EmailStats


class EmailSorterTestCase(unittest.TestCase):

    def test_given_emails_when_get_top_sender_executed_then_return_top_senders(self):
        email_sorter = self._setup_instance()
        emails = self._create_emails()
        top_senders = email_sorter.get_top_sender(emails, 1)
        expected = [EmailStats(sender="email1", number_of_emails=2)]

        email_sorter.get_top_sender(emails, 1)

        self.assertEqual(top_senders, expected)

    def test_given_emails_when_get_top_2_sender_executed_then_return_top_senders(self):
        email_sorter = self._setup_instance()
        emails = self._create_emails()
        top_senders = email_sorter.get_top_sender(emails, 1)
        expected = [EmailStats(sender="email1", number_of_emails=2)]

        email_sorter.get_top_sender(emails, 2)

        self.assertEqual(top_senders, expected)

    def _create_emails(self):
        return [
            Email(sender="email1", subject="subject1", body="body1", date="date1"),
            Email(sender="email2", subject="subject2", body="body2", date="date2"),
            Email(sender="email1", subject="subject3", body="body3", date="date3"),
        ]

    def _setup_instance(self):
        return EmailSorter()
