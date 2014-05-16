# -*- coding: utf-8 -*-

from time import sleep
from datetime import datetime

import boto
import boto.dynamodb2
from boto.dynamodb2.table import Table

conn = boto.dynamodb2.layer1.DynamoDBConnection()
# tbl = Table("test")

def t():
    return conn.query(
        "cl-hp-votes",
        {
            "q_id": {
                "ComparisonOperator": "EQ",
                "AttributeValueList": [{"N":"1"}]
            },
            "o_id": {
                "ComparisonOperator": "EQ",
                "AttributeValueList": [{"N":"1"}]
            }
        },
        index_name="q_id-o_id-index",
        select="COUNT"
    )

while True:
    try:
        print("%s: %s" % (datetime.now().isoformat(), t()))
    except KeyboardInterrupt:
        break
