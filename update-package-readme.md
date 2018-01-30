# Updating the package and repo
The repo exists here: https://github.com/dev-exopen/mynumbers-app-spelling.
The npm package exists here: https://www.npmjs.com/package/mynumbers-app-spelling

Login as: exopendev

## Adding contributors
If you don't want to login as this account it's possible to add contributors. Both in npmjs and github. Check the documentation for each system on how to do that. You must be logged in as "utveckling" to do that.

If you log in as utveckling, you can push directly to to github. Otherwise, you have to fork the repo and to a pull request. See the github documentation.

## Updating the npm package
1. Check in all the changes.
2. Execute `npm version <command>`. Where `command` is "major", "minor" or "patch". Or edit the package.json version manually.
3. Push the changes to github (or do a pull request and approve).
4. Execute `npm publish` to publish a new version to npm. You can npm login as exopendev or npm add user to create your own user.
5. Update the package version in the app you're using and run `yarn install`

## Add custom words to dictionary
Just edit the "en-cust.json" or "sv-cust.json" and add words that are not translated correctly. Make sure they are spelled correctly, otherwise we'll approve misspellings.