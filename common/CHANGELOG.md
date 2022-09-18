# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

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