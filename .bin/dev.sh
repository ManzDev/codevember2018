if [ "$1" == "" ]; then
  echo Syntax: npm run dev [day number]
else
  rm -rf dist/*
  parcel serve src/day-$1/index.html --open
fi