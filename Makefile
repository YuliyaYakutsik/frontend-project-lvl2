install:
	npm install

start:
	node src/bin/gendiff.js

lint:
	npx eslint .

publish:
	npm publish --dry-run