import * as $ from 'manhattan-essentials'


/**
 * The submit-on-proxy behaviour allows a user to submit a form by clicking on
 * an element.
 */

export function onSubmit(targetAttr='data-mh-submit-by-proxy') {

    return (event) => {
        event.preventDefault()

        // Find the target element
        const element = event.currentTarget
        const targetSelector = element.getAttribute(targetAttr)
        const targetElement = $.one(targetSelector)

        targetElement.submit()
    }
}
