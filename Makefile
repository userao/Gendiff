install-packages:
	npm ci

lint:
	npx eslint .

publish:
	npm publish
	
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest