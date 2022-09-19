# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/)

## [4.8.0] - 2022-09-19
Change stripe payment Id schema

## [4.7.0] - 2022-09-19
Fix transformer deserialization missing return

## [4.6.1] - 2022-09-19
Fix transformer deserialization missing return

## [4.6.0] - 2022-09-19
Transformer stops JSON stringifying / parsing and rely on consumer's implementation

## [4.5.1] - 2022-09-19
Add debugging info in transformer

## [4.5.0] - 2022-09-19
Change transformer from superjson to own implementation of tRPC data transformer

## [4.4.0] - 2022-09-19
Change transformer to accept arbitrary object and only transform its `datetime` property

## [4.3.0] - 2022-09-19
Revert back to [4.1.0](##4.1.0)

## [4.2.0] - 2022-09-19
Change `datetime` schema to validate a datetime string instead (rely on serialisation of transformer)

## [4.1.0] - 2022-09-19
Fix: add transformer to the exposed API

## [4.0.0] - 2022-09-19
- Add transformer & deprecate `datetimeStr` in `WorkshopSchema`
- Remove firebase admin SDK as dependency (rely solely on firebase client SDK)

## [3.2.0] - 2022-09-18
Remove falsey `"type": "module"` declaration in `package.json`

## [3.0.1] - 2022-09-18
No change

## [3.0.0] - 2022-09-18
Add support for firebase admin SDK

## [2.1.0] - 2022-09-17
- Fix: remove peer dependencies from bundle

## [2.0.0] - 2022-09-17
- Use `zod` instead of yup to provide type inference
- Change `*Schema` to `*SchemaLibrary` for providing schemas for individual fields
- Remove `*WithId` typescript interfaces
- Move dependencies to peer dependencies

## [1.1.0] - 2022-09-16
Limit `idSchema` to only firestore native id

## [1.0.5] - 2022-09-16
Fix missing type declaration files
 
## [1.0.4] - 2022-09-16
Add `datetimeStr` schema to `WorkshopSchema` for validating date string in ISO format