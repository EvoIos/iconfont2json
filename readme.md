# iconfont2json

## Preview

iconfont2json is a cli tool that can convert name and code of ttf to json. This json can be used in react-native-vector-icons for custom icons.

if you have two icon in ttf , one is github logo and another is twitter logo.

so json content :

```json

{"github":60143,"twitter":60144,}

```

## How to use

**install**

```
npm install iconfont2json
```

in shell

```
iconfont2json some.ttf
```

default save json content to output.file. Or you can specify a file name by using the -o parameter.


## License

MIT


