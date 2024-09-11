#!/bin/sh

# Chạy lệnh yarn build
echo "Chạy lệnh yarn build..."
yarn build

# Định nghĩa các đường dẫn
SOURCE_DIR="C:/Users/son.nguyenhoai/Desktop/projects/ncc/mezon-js/packages/mezon-sdk"
DEST_DIR="C:/Users/son.nguyenhoai/Desktop/projects/ncc/komucrawl-m/node_modules/mezon-sdk"

# Sao chép toàn bộ file từ SOURCE_DIR sang DEST_DIR
echo "Sao chép từ $SOURCE_DIR đến $DEST_DIR..."
cp -r "$SOURCE_DIR"/* "$DEST_DIR"

echo "Hoàn tất!"
