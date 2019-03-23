from datetime import datetime


def extract_timestamp(string):
    return datetime.strptime(string[:-37], '%a %b %d %Y %H:%M:%S')
