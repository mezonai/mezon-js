openapi-gen
===========

> A util command to generate Mezon server's API client from the Swagger specification.

## Usage

### Mezon

```shell
go run main.go "$GOPATH/src/github.com/nccasia/mezon-server/apigrpc/apigrpc.swagger.json" "Mezon" > ../packages/mezon-js/api.gen.ts
```

### Satori

```shell
go run main.go "$GOPATH/src/github.com/heroiclabs/satori/api/satori.swagger.json" "Satori" > ../packages/mezon-sdk/api.gen.ts
```

### Rationale

The TypeScript generator available with swagger-codegen depends on Node's `"url"` package. The usage in the generated code does not warrant the need for it's inclusion. We wanted to generate lean and simple code output with minimal dependencies so we built our own. This gives us complete control over the dependencies required by the Mezon JS client.

The only dependencies with the generated code is implicit usage of `"fetch"` which can be resolved with a polyfill and `"base64-js"`.

### Limitations

The code generator has __only__ been checked against the Swagger specification generated for Mezon server. YMMV.
