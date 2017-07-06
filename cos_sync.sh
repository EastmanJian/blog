#!/bin/sh -vx
#
# Wrapper shellscript for Tencent COS synchronization.
# Make sure the sync tool is located in ./cos_sync 
# ref: ./resources/readme.markdown

cd cos_sync
./start_cos_sync.sh
cd -


