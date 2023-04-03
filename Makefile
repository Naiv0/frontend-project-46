install:
	npm install

lint:
	npx eslint .

publish:
	npm publish --dry-run

lintFix: 
	npx eslint . --fix
