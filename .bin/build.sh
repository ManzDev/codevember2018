if [ "$1" == "" ]; then
  echo Syntax: npm run build [day number]
else
  rm -rf day-$1/*
  parcel build src/day-$1/index.html -d day-$1 --global global --public-url /codevember2018/day-$1/
fi