# if-exp

Conditional (if) expressions for JavaScript

# NPM

```bash
npm install if-exp
```

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

Some languages implement conditionals (and other well known statements) as expressions, so we can write:

```
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

While in JavaScript, conditional expressions can be achieve using ternary operators. Multiple conditions are sometimes hard to read using ternary:

```javascript
var res = condition ?  'result 1' :
    (secondCondition ? 'result 2' :
        (thirdCondition ? 'result 3' : 'result 4'));
```

Here is how to write the same thing with iff:

```javascript
const res = iff(condition)
            .then('result 1')
        .elseIff(secondCondition)
            .then('result 2')
        .elseIff(thirdCondition)
            .then('result 3')
        .otherwise('result 4');
```

# How to do lazy-statements evaluation in JavaScript

```js
const res = iff(condition1)
  .then(statement1())
elseIff(condition2)
  .then(statement2())
.otherwise(statement3());
```

The issue with the above code, is that `statement1`, `statement2` and `statement3` functions will be executed no matter the value of `condition` and `condition2`. To only execute one or the other we can use functions:

```js
const res = iff(condition1)
  .then(statement)
elseIff(condition2)
  .then(statement)
.otherwise(statement)
();
```

Now, if-exp will yield a function depending on the conditions and we directly execute it resulting in a lazy statement evaluation.

# How if-exp supports lazy condition evaluation

```js
const res = iff(conditionalFn1())
  .then(1)
elseIff(conditionalFn2())
  .then(2)
.otherwise(3);
```

The issue with the above code is that `conditionalFn1` and `conditionalFn2` will be both executed. Since if-exp v2+, you can specify a predicate function as a condition and it will be evaluated or not depending on the previous conditions:

```js
const res = iff(conditionalFn1)
  .then(1)
elseIff(conditionalFn2)
  .then(2)
.otherwise(3);
```


# [Changelog](/CHANGELOG.md)
