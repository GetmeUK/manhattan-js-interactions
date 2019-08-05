import * as chai from 'chai'
import * as sinon from 'sinon'

import * as setup from './setup.js'
import * as $ from 'manhattan-essentials'
import {submitByProxy} from '../module/index.js'

chai.should()
chai.use(require('sinon-chai'))


// -- Utils --

/**
 * Add submit to form.
 */
function addSubmit(element) {
    element.submit = sinon.spy()
}


// -- Tests --

describe('submitByProxy', () => {

    let {body} = document

    let formElement = null
    let submitElement = null

    beforeEach(() => {
        formElement = $.create('form', {'id': 'form'})
        formElement.appendChild($.create('input', {'name': 'name'}))
        formElement.appendChild($.create('submit', {'value': 'Submit'}))
        body.appendChild(formElement)

        addSubmit(formElement)

        submitElement = $.create('div', {'data-mh-submit-by-proxy': '#form'})
        body.appendChild(submitElement)

    })

    afterEach(() => {
        formElement.remove()
        submitElement.remove()
    })

    describe('onSubmit', () => {

        it('should submit the form when the submit element is clicked', () => {

            $.listen(submitElement, {'click': submitByProxy.onSubmit()})
            $.dispatch(submitElement, 'click')

            formElement.submit.should.have.been.called

        })

    })

})
