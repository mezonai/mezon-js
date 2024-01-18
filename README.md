packages/nakama-js/README.md

* generate protobuf
```
cd packages/nakama-js-protobuf
```

```
npx protoc \
--plugin="./node_modules/.bin/protoc-gen-ts_proto" \
--proto_path=$GOPATH/src/github.com/heroiclabs/nakama-common \
--ts_proto_out=. \
--ts_proto_opt=snakeToCamel=false \
--ts_proto_opt=esModuleInterop=true \
$GOPATH/src/github.com/heroiclabs/nakama-common/rtapi/realtime.proto \
$GOPATH/src/github.com/heroiclabs/nakama-common/api/api.proto
```


* genarate js

```
go run main.go "$GOPATH/src/github.com/heroiclabs/mezon-server/apigrpc/apigrpc.swagger.json" "Nakama" > ../packages/nakama-js/api.gen.ts
```
