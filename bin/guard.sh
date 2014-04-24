#!/bin/bash

cd `dirname "$0"`/.. && nice guard -i -p -l2 -G "conf/guard.rb" -w .
cd -
