import interact from '@interactjs/interactjs'

const onMove = (event) => {
  const target = event.target
  const x = parseFloat(target.getAttribute('data-x')) || 0
  const y = parseFloat(target.getAttribute('data-y')) || 0
  const deltaX = x + event.dx
  const deltaY = y + event.dy
  target.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  target.setAttribute('data-x', deltaX)
  target.setAttribute('data-y', deltaY)
}

interact('.drag-item')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move(event) {
        const target = event.target
        let x = parseFloat(target.getAttribute('data-x')) || 0
        let y = parseFloat(target.getAttribute('data-y')) || 0

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      },
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent',
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 },
      }),
    ],

    inertia: true,
  })
  .draggable({
    listeners: { move: onMove },
    inertia: true,
  })
