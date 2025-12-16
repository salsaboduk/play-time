import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="move-task"
export default class extends Controller {

  connect() {
    console.log ('Hello from task mover')
  }

  startDrag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  // drop
  dragDrop(ev) {
    ev.preventDefault()
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  // dragover
  allowDrop(ev) {
    ev.preventDefault()
  }
}
