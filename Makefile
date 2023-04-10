install:
	npm install

lint:
	npx eslint .

publish:
	npm publish --dry-run

lintFix: 
	npx eslint . --fix
firstTest: 
	node index.js
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
test-coverage:
	npx jest --coverage	
