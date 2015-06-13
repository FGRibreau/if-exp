# if-exp

Conditional (if) expressions for JavaScript

# NPM

npm install if-exp

# Usage

```javascript
var iff = require('if-exp');

var a = iff(condition)
            .then('result 1')
        .elseIff(secondCondition)
            .then('result 2')
        .elseIff(thirdCondition)
            .then('result 3')
        .otherwise('result 4');

```

# Motivations

In Scala, conditional (and other well known statements) are expressions, so we can write:

```scala
val res = if(condition){
    'result 1'
} else if(secondCondition) {
    'result 2'
} else if(thirdCondition) {
    'result 3'
} else {
    'result 4'
}
```

While in JavaScript, conditional expressions can be achieve using ternary operators. Multiple conditions are sometimes hard to read:

```javascript
var res = condition ?  'result 1' : (secondCondition ? 'result 2' : (thirdCondition ? 'result 3' : 'result 4'));
```

Here is how to write the same thing with iff:

```javascript
var res = iff(condition)
            .then('result 1')
        .elseIff(secondCondition)
            .then('result 2')
        .elseIff(thirdCondition)
            .then('result 3')
        .otherwise('result 4');
```

# [Changelog](/CHANGELOG.md)
