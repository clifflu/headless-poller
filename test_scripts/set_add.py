# -*- coding: utf-8 -*-

from time import sleep
from datetime import datetime

import boto
import boto.dynamodb2
from boto.dynamodb2.table import Table

conn = boto.dynamodb2.layer1.DynamoDBConnection()

def t():
    return conn.update_item(
        "test",
        {"pk": 1},
        {
            "b": {
                "Value": {"NS": "{1}"},
                "Action": "ADD"
            }
        }
    )

while True:
    try:
        print("%s: %s" % (datetime.now().isoformat(), t()))
    except KeyboardInterrupt:
        break
