# -*- coding: utf-8 -*-

from time import sleep
from datetime import datetime

import boto
from boto.dynamodb import condition

conn = boto.connect_dynamodb()
tbl = conn.get_table('test')
item = tbl.get_item(1,1)

def t():
    item['variable'] = 34
    ret = item.save(
        expected_value = {"body": "1-1"}
    )

    print("%s: %s" % (
        datetime.now().isoformat(),
        ret)
    )


while True:
    t()
#    sleep(0.5)

