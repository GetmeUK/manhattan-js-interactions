import * as chai from 'chai'
import * as sinon from 'sinon'

import * as setup from './setup.js'
import * as $ from 'manhattan-essentials'
import {copyToClipboard} from '../module/index.js'

chai.should()
chai.use(require('sinon-chai'))


// -- Utils --

/**
 * Add exec command to document.
 */
function addExecCommand(document) {

    document.execCommand = (command) => {
        switch (command) {

            case 'copy':
                document._clipboard = document._selectedNode.textContent

            // No default

        }
    }
}

/**
 * Add range methods to window and document.
 */
function addRange(window, document) {

    window.getSelection = () => {
        return {
            'addRange': (range) => {
                return null
            },
            'removeAllRanges': () => {
                return null
            }
        }
    }

    document.createRange = () => {
        return {
            'selectNode': (element) => {
                document._selectedNode = element
            }
        }
    }

    document.getClipboardContent = () => {
        return document._clipboard
    }
}


// -- Tests --

describe('copyToClipboard', () => {

    addExecCommand(document)
    addRange(window, document)

    let clock = null

    let {body} = document
    let contentElement = null
    let copyElement = null
    let pasteElement = null

    beforeEach(() => {
        contentElement = $.create('div', {'id': 'content'})
        contentElement.textContent = 'Copied text'
        body.appendChild(contentElement)

        copyElement = $.create(
            'div',
            {'data-mh-copy-to-clipboard': '#content'}
        )
        body.appendChild(copyElement)

        clock = sinon.useFakeTimers()
    })

    afterEach(() => {
        contentElement.remove()
        copyElement.remove()
        clock.reset()
    })

    describe('onCopy', () => {

        it('should copy the contents of the target element to the '
            + 'clipboard', () => {

            $.listen(copyElement, {'click': copyToClipboard.onCopy()})
            $.dispatch(copyElement, 'click')

            document.getClipboardContent().should.equal('Copied text')
        })

        it('should add a copied CSS class to the element that triggered '
            + 'the copy', () => {

            $.listen(copyElement, {'click': copyToClipboard.onCopy()})
            $.dispatch(copyElement, 'click')

            copyElement.classList.contains('mh-copied').should.be.true
        })

        it('should remove the copied CSS class to the element after 3 seconds',
            () => {

            $.listen(copyElement, {'click': copyToClipboard.onCopy()})
            $.dispatch(copyElement, 'click')

            clock.tick(3100)

            copyElement.classList.contains('mh-copied').should.be.false
        })

    })

})
