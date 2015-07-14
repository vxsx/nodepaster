# dpaster

Cli tool for pasting to dpaste.de

Accepts from stdin, you can provide type of the snippet.

## Installation

```
npm install -g nodepaster
```

## Usage

```
dpaster -h
```

```
echo "Something" | dpaster
```

```
cat cli.js | dpaster -t js | pbcopy
```

```
# if you don't mind command repeating
!! | dpaster | pbcopy
```
