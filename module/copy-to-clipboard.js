import * as $ from 'manhattan-essentials'


/**
 * The copy-to-clipboard behaviour allows a user to click an element to copy
 * the contents of another element into the clipboard.
 */

export function onCopy(
    targetAttr='data-mh-copy-to-clipboard',
    css={'copied': 'mh-copied'},
    duration=3000
) {

    return (event) => {
        event.preventDefault()

        // Find the target element
        const element = event.currentTarget
        const targetSelector = element.getAttribute(targetAttr)
        const targetElement = $.one(targetSelector)

        // Clear existing selections and set new selection to the
        // target element.
        window.getSelection().removeAllRanges()
        const range = document.createRange()
        range.selectNode(targetElement)
        window.getSelection().addRange(range)

        // Copy the content to the clipboard
        document.execCommand('copy')

        // Clear the selection
        window.getSelection().removeAllRanges()

        // Add a CSS class to the element that triggered the copy
        // interaction to indicate a copy has been made.
        clearTimeout(element._copiedTimeout)

        element.classList.add(css.copied)
        element._copiedTimeout = setTimeout(
            () => {
                element.classList.remove(css.copied)
            },
            duration
        )
    }
}
