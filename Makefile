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
	 npx jest
test-coverage:
	npx jest --coverage	
