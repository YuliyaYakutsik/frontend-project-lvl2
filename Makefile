install:
	npm install

start:
	node src/bin/gendiff.js

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest

publish:
	npm publish --dry-run