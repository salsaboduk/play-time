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
    console.log(ev.target.id);
    var data = ev.dataTransfer.getData("text");
    console.log(data);
    if (ev.target.id.includes('list')){
      ev.target.appendChild(document.getElementById(data));
    } else if(ev.target.id.includes('task')){
      ev.target.parentNode.appendChild(document.getElementById(data));
    }
  }

  // dragover
  allowDrop(ev) {
    ev.preventDefault();
  }
}
