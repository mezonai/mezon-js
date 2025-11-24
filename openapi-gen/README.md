# openapi-gen

OpenAPI generator for mezon-js — generate client and server code, types and helpers from OpenAPI (v2 / v3) specifications. Supports CLI and programmatic usage, configurable templates and output formats (TypeScript / JavaScript).

## Features
- Generate typed clients and server stubs
- CLI and Node API
- Configurable templates and output layout
- Supports JSON/YAML OpenAPI specs
- Watch mode for iterative development

## Installation
Install as a dev dependency:
```bash
npm install --save-dev @mezon/openapi-gen
# or
yarn add -D @mezon/openapi-gen
```

Run without installing:
```bash
npx @mezon/openapi-gen generate -i ./openapi.yaml -o ./src/api
```

## CLI Usage
Basic generation:
```bash
npx @mezon/openapi-gen generate \
    -i ./openapi.yaml \
    -o ./src/api \
    --target typescript
```

Common flags:
- -i, --input     Path to OpenAPI file (yaml|json)
- -o, --output    Output directory
- --target        typescript | javascript
- --template      Path to custom template directory
- --watch         Re-generate on spec changes

Show help:
```bash
npx @mezon/openapi-gen --help
```

## Node API
Example usage from code:
```js
import { generate } from '@mezon/openapi-gen';

await generate({
    input: 'openapi.yaml',
    output: 'src/api',
    target: 'typescript',
    template: './templates/default'
});
```

API options:
- input: string — path to spec
- output: string — output directory
- target?: 'typescript' | 'javascript'
- template?: string — custom template directory
- config?: object — additional generation options

## Configuration
You can place a config file at openapi-gen.config.js (or .json/.yaml):

openapi-gen.config.js
```js
module.exports = {
    input: 'openapi.yaml',
    output: 'src/api',
    target: 'typescript',
    template: './templates/default',
    prettier: true,
    cleanOutput: true
};
```

## Templates & Customization
- Templates control code layout and style.
- Provide your own templates with the `--template` flag or `template` option.
- Hooks for post-processing (formatting, linting) are supported via config.

## Example
1. Create spec: `specs/openapi.yaml`
2. Generate:
     ```bash
     npx @mezon/openapi-gen generate -i specs/openapi.yaml -o packages/client/src -t typescript
     ```
3. Import generated client:
     ```ts
     import { ApiClient } from './packages/client/src';
     const api = new ApiClient({ baseUrl: 'https://api.example.com' });
     ```

## Development
Clone and run locally:
```bash
git clone <repo-url>
cd openapi-gen
npm install
npm run build
npm link
# then use npx or the linked CLI
```

Useful scripts (package.json):
- build — compile templates / TypeScript
- test — run unit tests
- lint — run linters
- watch — develop with live-reload

## Contributing
Contributions welcome. Open issues for feature requests or bugs. Follow the repository code style and tests for pull requests.

## License
MIT — see LICENSE file.

<!-- Contact / maintainers -->
Maintained by the mezon-js team.