Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop(){}

function _createModalFooter(buttons = []){
    if (buttons.length === 0) {
        return document.createElement('div')
    }
    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)
    })

    return wrap
}


function _createModal(options){
    const modal = document.createElement('div')
    const DEFAULT_WIDTH = '600px'
    modal.classList.add('dmodal')
    modal.insertAdjacentHTML('afterbegin', ` 
        <div class="modal-owerlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-titel">${options.titel || 'Dialog'}</span>
                    ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
            </div>
        </div>
    `)
    const footer = _createModalFooter(options.footerBtn)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}

$.modal = function(options) {
    const animation_speed = 500
    const $modal = _createModal(options)

    let closing = false
    let opened = false
    let destroyed = false

    const modal = {
        open() {
            opened = true
            if (destroyed) {
                return console.log('Modal Dialod is destroyed')
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            opened = false
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(()=>{
                $modal.classList.remove('hide')
                closing = false
                if (typeof options.onClose === 'function') {
                    options.onClose()
                }
            }, animation_speed)
        }
    }

    const listener = event => {
        if (opened && event.target.dataset.close) {
            modal.close()
        }
    }

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}