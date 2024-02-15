packages/mezon-js/README.md

* generate protobuf
```
cd packages/mezon-js-protobuf
```

```
npx protoc \
--plugin="./node_modules/.bin/protoc-gen-ts_proto" \
--proto_path=$GOPATH/src/github.com/nccasia/mezon-server/common \
--ts_proto_out=. \
--ts_proto_opt=snakeToCamel=false \
--ts_proto_opt=esModuleInterop=true \
$GOPATH/src/github.com/nccasia/mezon-server/common/rtapi/realtime.proto \
$GOPATH/src/github.com/nccasia/mezon-server/common/api/api.proto
```


* genarate js

```
go run main.go "$GOPATH/src/github.com/nccasia/mezon-server/apigrpc/apigrpc.swagger.json" "Mezon" > ../packages/mezon-js/api.gen.ts
```
