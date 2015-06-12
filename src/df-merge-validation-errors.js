/**
The MIT License (MIT)

Copyright (c) 2014 digitalfondue

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**

This directive merge an object with the following form 

{ <fieldKey> : {type: string, message: string} | [{type: string, message}]}

With the validation state of the form. It will watch the object recursively and
update the $setValidity status accordingly each field.

*/
angular.module('dfMergeValidationErrors',[]).directive('dfMergeValidationErrors', ['$parse', function($parse) {
  return {
    restrict: 'A',
    require: 'form',
    link: function($scope, $elem, $attrs, $form) {
    
      var invalidStateKeys = {};
    
      $scope.$watch($attrs.dfMergeValidationErrors, function(newVal, oldVal) {
      
      
        if(newVal === undefined || newVal === null) {
          return;
        }
        
        angular.forEach($form, function(value,key) {
          if ($form.hasOwnProperty(key) && key.charAt(0) != '$') {
            //key is present -> we have an error -> show error in field
            if(newVal[key]) {              
              invalidStateKeys[key] = true;
              if(angular.isArray(newVal[key])) {
                for(var i = 0; i < newVal[key].length; i++) {
                  $form[key].$setValidity(newVal[key][i].type, false);
                }
              } else {
                $form[key].$setValidity(newVal[key].type, false);
              }
            } else if(!$form[key].$valid && invalidStateKeys[key]) {
              //cleanup now valid fields that were affected by the invalid state
              $form[key].$valid = true;
              angular.forEach($form[key].$error, function(_, typeName) {
                $form[key].$setValidity(typeName, true);
              });
              
              delete invalidStateKeys[key]
            }
          }
        });
      }, true);
    }
  };
}]);
