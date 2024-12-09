class EmailSearchError(Exception):
    def __init__(self, message: str = "Failed to search emails.", *args):
        super().__init__(message, *args)
