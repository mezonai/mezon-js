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

```
npx protoc --plugin="./node_modules/.bin/protoc-gen-ts_proto.cmd" --proto_path=../../../mezon-server/common --ts_proto_out=. --ts_proto_opt=snakeToCamel=false --ts_proto_opt=esModuleInterop=true ../../../mezon-server/common/rtapi/realtime.proto ../../../mezon-server/common/api/api.proto
```


* genarate js

```
cd openapi-gen
go run main.go "$GOPATH/src/github.com/nccasia/mezon-server/apigrpc/apigrpc.swagger.json" "Mezon" > ../packages/mezon-js/api.gen.ts

go run main.go "../../mezon-server/apigrpc/apigrpc.swagger.json" "Mezon" > ../packages/mezon-js/api.gen1.ts
```

```
go run main.go "../../mezon-server/apigrpc/apigrpc.swagger.json" "Mezon" > ../packages/mezon-js/api.gen.ts
```
