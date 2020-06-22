install:
	npm install

start:
	node src/bin/gendiff.js

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish --dry-run