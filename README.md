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
{ <fieldKey> : {type: string, message: string} | [{type: string, message}] | [string] | string}
```

For example:

```javascript
{
  'email' : {type: 'already_used', message : 'Email already used'}, /* single object*/
  'name' : [{type: 'too_long', message : 'Name is too long'}, {type: 'invalid_chars', message : 'Contain invalid characters'}] /* multiple errors */,
  'repeat-email' : ['error.key1', 'error.key2'],
  'repeat-name': 'error.key1'
}
```

Note: 

 - the error type will have all the white space replaced with a '-'. For example if you provide {'email': 'my error message'}, the error type will be my-error-message.
 - when you provide an error message _not_ in a list (e.g.: `{'email': 'my-error'}`), you should not use a ng-repeat for iterating on the error message of the specific field.

See the examples in example/index.html or directly http://digitalfondue.github.io/df-merge-validation-errors/
