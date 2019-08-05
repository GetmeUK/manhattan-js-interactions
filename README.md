<div align="center">
    <img width="196" height="96" vspace="20" src="http://assets.getme.co.uk/manhattan-logo--variation-b.svg">
    <h1>Manhattan interactions</h1>
    <p>A set of functions to implement common UI interactions.</p>
    <a href="https://badge.fury.io/js/manhattan-interactions"><img src="https://badge.fury.io/js/manhattan-interactions.svg" alt="npm version" height="18"></a>
    <a href="https://travis-ci.org/GetmeUK/manhattan-js-interactions"><img src="https://travis-ci.org/GetmeUK/manhattan-js-interactions.svg?branch=master" alt="Build Status" height="18"></a>
    <a href='https://coveralls.io/github/GetmeUK/manhattan-js-interactions?branch=master'><img src='https://coveralls.io/repos/github/GetmeUK/manhattan-js-interactions/badge.svg?branch=master' alt='Coverage Status' height="18"/></a>
    <a href="https://david-dm.org/GetmeUK/manhattan-js-interactions/"><img src='https://david-dm.org/GetmeUK/manhattan-js-interactions/status.svg' alt='dependencies status' height="18"/></a>
</div>

## Installation

`npm install manhattan-interactions --save-dev`


## Usage

```Markup
<div id="content-to-copy">
    I want to copy this content into the clipboard.
</div>

<a href="#copy" data-mh-copy-to-clipboard="#content-to-copy">Click to copy</a>


<form id="proxied-form">
    <label>Field <input type="text" name="field"></label>
    <button type="submit">Button</button>
</form>

<a href="#submit" data-mh-sumbit-by-proxy="#proxied-form">Click to submit</a>
```

```JavaScript
import * as $ from 'manhattan-essentials'
import * as interactions from 'manhattan-interactions'

for (const copyElement of $.many('[data-mh-copy-to-clipboard]')) {
    $.listen(copyElement, {'click': interactions.copyToClipboard.onCopy()})
}

for (const submitElement of $.many('[data-mh-submit-by-proxy]')) {
    $.listen(submitElement, {'click': interactions.submitByProxy.onSubmit()})
}
```
