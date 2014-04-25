#!/bin/sh
cd `dirname "$0"`/.. 
echo `pwd`
nice guard -ip -l2 -G "conf/guard.rb"
