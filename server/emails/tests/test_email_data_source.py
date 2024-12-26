import imaplib
import unittest
from datetime import datetime
from unittest.mock import Mock

from emails.email import EmailQuery, EmailRequest
from emails.email_data_source import EmailDataSource
from emails.email_parser import EmailParser
from emails.exceptions import EmailSearchError


class EmailDataSourceTestCase(unittest.TestCase):

    def test_given_an_email_request_when_get_executed_then_return_emails(self):
        mock = self._setup_mock()
        mock.session.search.return_value = ("OK", [b"1 2 3"])
        mock.email_parser.parse.return_value = ["email1", "email2"]
        email_request = EmailRequest(
            inbox="inbox", query=EmailQuery(sender="sender", date=None, body=None)
        )
        emails = mock.get(email_request)

        self.assertEqual(emails, ["email1", "email2"])
        mock.session.select.assert_called_once_with("inbox")

    def test_given_an_empty_email_request_when_get_executed_then_return_empty_list(
        self,
    ):
        mock = self._setup_mock()
        mock.session.search.return_value = ("OK", [])
        email_request = EmailRequest(
            inbox="inbox", query=EmailQuery(sender=None, date=None, body=None)
        )
        emails = mock.get(email_request)

        self.assertEqual(emails, [])

    def test_given_a_failed_search_when_get_executed_then_raise_exception(self):
        mock = self._setup_mock()
        mock.session.search.return_value = ("NO", [])
        email_request = EmailRequest(
            inbox="inbox", query=EmailQuery(sender=None, date=None, body=None)
        )

        with self.assertRaises(EmailSearchError):
            mock.get(email_request)

    def test_given_a_search_exception_when_get_executed_then_raise_exception(self):
        mock = self._setup_mock()
        mock.session.search.side_effect = Exception
        email_request = EmailRequest(
            inbox="inbox", query=EmailQuery(sender=None, date=None, body=None)
        )

        with self.assertRaises(EmailSearchError):
            mock.get(email_request)

    def test_given_a_query_with_sender_when_method_build_query_is_called_then_return_query_string(
        self,
    ):
        mock = self._setup_mock()
        email_request = EmailRequest(
            inbox="inbox",
            query=EmailQuery(sender="test@email.com", date=None, body=None),
        )
        mock.session.search.return_value = ("OK", [b"1 2 3"])
        expected_query = '(FROM "test@email.com")'

        mock.get(email_request)

        mock.session.search.assert_called_once_with(None, expected_query)

    def test_given_a_query_with_date_when_method_build_query_is_called_then_return_query_string(
        self,
    ):
        mock = self._setup_mock()
        date = datetime(2022, 1, 1)
        email_request = EmailRequest(
            inbox="inbox",
            query=EmailQuery(sender=None, date=date, body=None),
        )
        mock.session.search.return_value = ("OK", [b"1 2 3"])
        expected_query = '(SINCE "01-Jan-2022")'

        mock.get(email_request)

        mock.session.search.assert_called_once_with(None, expected_query)

    def test_given_a_query_with_body_when_method_build_query_is_called_then_return_query_string(
        self,
    ):
        mock = self._setup_mock()
        email_request = EmailRequest(
            inbox="inbox",
            query=EmailQuery(sender=None, date=None, body="test"),
        )
        mock.session.search.return_value = ("OK", [b"1 2 3"])
        expected_query = '(BODY "test")'

        mock.get(email_request)

        mock.session.search.assert_called_once_with(None, expected_query)

    def test_given_a_query_with_sender_date_and_body_when_method_build_query_is_called_then_return_query_string(
        self,
    ):
        mock = self._setup_mock()
        date = datetime(2022, 1, 1)
        email_request = EmailRequest(
            inbox="inbox",
            query=EmailQuery(sender="test@email.com", date=date, body=None),
        )
        mock.session.search.return_value = ("OK", [b"1 2 3"])
        expected_query = '(FROM "test@email.com" SINCE "01-Jan-2022")'

        mock.get(email_request)

        mock.session.search.assert_called_once_with(None, expected_query)

    def _setup_mock(self):
        return EmailDataSource(
            email_parser=Mock(spec_set=EmailParser),
            session=Mock(spec_set=imaplib.IMAP4_SSL),
        )
