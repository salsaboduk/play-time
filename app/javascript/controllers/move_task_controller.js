import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="move-task"
export default class extends Controller {

  connect() {
    console.log ('Hello from task mover')
  }

  startDrag(ev) {
    console.log(' clicked ' + ev.currentTarget.id)
    ev.dataTransfer.setData("dragee", ev.currentTarget.id);
  }

  // drop
  dragDrop(ev) {
    ev.preventDefault()
    console.log('drop target ' + ev.currentTarget.id);
    var dragee = ev.dataTransfer.getData("dragee");
    console.log('dragee ' + dragee);
    if (ev.currentTarget.id.includes('list')){
      ev.currentTarget.appendChild(document.getElementById(dragee));
    } else if(ev.currentTarget.id.includes('task')){
      ev.currentTarget.parentNode.appendChild(document.getElementById(dragee));
    }
  }

  // dragover
  allowDrop(ev) {
    ev.preventDefault();
  }
}
