# df-merge-validation-errors
A small angular directive for merging validation errors (e.g.: server side validations) to a form.

`df-merge-validation-errors` update the validation state of each field in a form accordingly to the watched object.

## Download

 - Download directly the master at https://raw.githubusercontent.com/digitalfondue/df-merge-validation-errors/master/src/df-merge-validation-errors.js
 - Bower coming soon...

## Requirements

AngularJS (tested with 1.4.0) and the ngMessages module.

## Use/examples

Load the `dfMergeValidationErrors` module and apply the directive `df-merge-validation-errors="your_object_to_watch"` to a form.

The "your_object_to_watch" should have the following form:

```
{ <fieldKey> : {type: string, message: string} | [{type: string, message}]}
```

For example:

```javascript
{
  'email' : {type: 'already_used', message : 'Email already used'}, /* single object*/
  'name' : [{type: 'too_long', message : 'Name is too long'}, {type: 'invalid_chars', message : 'Contain invalid characters'}] /* multiple errors */
}
```

See the examples in example/index.html or directly http://digitalfondue.github.io/df-merge-validation-errors/
