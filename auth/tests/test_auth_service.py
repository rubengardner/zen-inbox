import imaplib
import unittest
from unittest.mock import Mock

from auth.auth_information import AuthInformation
from auth.auth_service import AuthService


class AuthServiceTestCase(unittest.TestCase):

    def test_given_a_valid_login_credential(self):
        mock = self._setup_mock()
        mock.mail_service.login.return_value = True

        mock.login()

        self.assertTrue(mock.login())

    def test_given_an_invalid_login_credential_when_login_executed_then_exception_false_is_returned(
        self,
    ):
        mock = self._setup_mock()
        mock.mail_service.login.side_effect = Exception

        mock.login()

        self.assertFalse(mock.login())

    def _setup_mock(self):
        auth_information = AuthInformation(
            username="test",
            password="test",
        )
        return AuthService(
            auth_information, mail_service=Mock(spec_set=imaplib.IMAP4_SSL)
        )
