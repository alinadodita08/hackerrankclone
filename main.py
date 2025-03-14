import requests


'''
bash, c, c++, clojure, csharp, csharp.net, 
dart, elixir, emojicode, erlang, 
fsharp.net, go, haskell, java, javascript, julia, kotlin, lisp, 
lua, php, powershell, python, ruby, rust, scala, 
typescript, zig,
'''


code = '''
console.log('hello world');
'''

payload = {
    "language": "typescript",
    "version": "5.0.3",
    "files": [
        {
            "name": "hello.ts",
            "content": code
        }
    ],
    "stdin": "Alina",
    "compile_timeout": 10000,
    "run_timeout": 3000,
    "compile_cpu_time": 10000,
    "run_cpu_time": 3000,
    "compile_memory_limit": -1,
    "run_memory_limit": -1
}

# GET / POST
headers = {'Content-Type': 'application/json'}
response = requests.post('http://lk.ominds.ru:2000/api/v2/execute', json=payload, headers=headers)

# response = requests.get('http://lk.ominds.ru:2000/api/v2/runtimes')
print(response.json())
# output = 'what is your name?Hello, Alina\n'
# if response.json()['run']['stdout'] == output: 
#     print('correct')
# else:
#     print('fail')
