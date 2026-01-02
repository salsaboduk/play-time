import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="move-task"
export default class extends Controller {

  connect() {
    console.log ('Hello from task mover')
  }

  startDrag(ev) {
    ev.dataTransfer.setData("dragee", ev.target.id);
  }

  // drop
  dragDrop(ev) {
    ev.preventDefault()
    console.log(ev.target.id);
    var dragee = ev.dataTransfer.getData("dragee");
    console.log(data);
    if (ev.target.id.includes('list')){
      ev.target.appendChild(document.getElementById(dragee));
    } else if(ev.target.id.includes('task')){
      ev.target.parentNode.appendChild(document.getElementById(dragee));
    }
  }

  // dragover
  allowDrop(ev) {
    ev.preventDefault();
  }
}
