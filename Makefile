REPORTER = min

test: unit

unit:
	@NODE_ENV=test NODE_PATH=lib:test \
		./node_modules/.bin/mocha \
		-r ./test/helper/test_runner \
		-R $(REPORTER) \
		test/unit/**/*.js

.PHONY: test