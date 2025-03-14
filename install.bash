#! /bin/bash
languages=("bash" "c" "c++" "clojure" "csharp" "csharp.net" "dart" "elixir" "emojicode" "erlang" "fsharp.net" "go" "haskell" "java" "javascript" "julia" "kotlin" "lisp" "lua" "php" "powershell" "python" "ruby" "rust" "scala" "typescript" "zig")

for lang in "${languages[@]}"; do
    cli/index.js ppman install "$lang"
done