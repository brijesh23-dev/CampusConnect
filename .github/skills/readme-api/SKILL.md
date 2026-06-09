---
name: readme-api
user-invocable: true
description: "Generate or update a project README with backend API endpoint documentation, request/response examples, and authentication notes. Use when you want a polished README that explains how to access API endpoints and what response shape to expect."
---

# Readme API Skill

This skill helps generate or improve a README for the current MERN project by:

- identifying backend API endpoints and auth requirements
- documenting request body/query params and headers
- describing response shapes and success/error formats
- producing clean Markdown sections for README files

## Use when

- you need a proper project README for the backend APIs
- you want endpoint documentation that is easy to follow
- you want to know the type of response returned from each API call

## Output expectations

- Markdown formatted README content
- API endpoint list with HTTP methods and URLs
- request examples for JSON bodies and headers
- response examples for success and failure cases
- notes about authentication or authorization per endpoint

## Notes

When running this skill, analyze the backend folder structure and controllers to infer the API contract instead of guessing. Keep documentation concise, accurate, and user-friendly.
