#!/bin/bash

cd `dirname "$0"`/..

r.js -o conf/build.js

s3put -b demo-o.clifflu.net -p `pwd`/src -k headless-poller src

