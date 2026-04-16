{
  "variables": {
    "msvs_version": "2019"
  },
  "targets": [
    {
      "target_name": "mezon_native",
      "sources": [ "mezon_wrapper.cpp" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",        
      ],
      "conditions": [
        ['OS=="linux" or OS=="mac"', {
          "include_dirs": [
            "<(module_root_dir)/../libmezon",
            "<!(node -e \"require('nan')\")"
          ],
          "libraries": [
            "<(module_root_dir)/../libmezon/build/out/libmezon_client.a",
          ],
          "cflags": [
            "-fPIC",
            "-std=c++17",
          ],
          "cflags_cc": [
            "-fno-rtti",
            "-fno-exceptions",
            "-std=c++17"
          ]
        }],
        ['OS=="win"', {
          "include_dirs": [
            "E:/mezon/mezon-js/packages/libmezon"
          ],
          "defines": [
            "WIN32_LEAN_AND_MEAN",
            "_CRT_SECURE_NO_WARNINGS"
          ],
          "libraries": [
            "<(module_root_dir)/../libmezon/build_win/out/Release/mezon_client.lib",
            "-lbcrypt.lib",
            "-lws2_32.lib",
            "-ladvapi32.lib"
          ],
          "msvs_settings": {
            "VCCLCompilerTool": { "ExceptionHandling": 1 },
            "VCCLCompilerTool": {
              "RuntimeLibrary": 2,
              "BufferSecurityCheck": "true",
              "AdditionalOptions": [
                "/std:c++20",
              ],
            },
            "VCLinkerTool": {
              "AdditionalOptions": [
                "msvcrt.lib",
                "ucrt.lib",
                "vcruntime.lib",
                "kernel32.lib"
              ]
            }
          },
          "configurations": {
            "Release": {
              "msvs_settings": {
                "VCCLCompilerTool": {
                  "PlatformToolset": "v142"
                }
              }
            }
          }
        }]
      ]
    }
  ]
}