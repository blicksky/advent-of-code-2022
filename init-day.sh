#!/bin/bash

cp -R ./day_template src/day$1
sed -i "s/__DAY__/$1/g" src/day$1/*