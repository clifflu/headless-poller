#!/bin/bash

cd `dirname "$0"`/..
s3put -b demo-o.clifflu.net -p `pwd`/src -k headless-poller src

