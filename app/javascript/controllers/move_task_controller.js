import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="move-task"
export default class extends Controller {

  static targets = ['task', 'list']

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
    let dropTarget = document.getElementById(this.hasTaskTarget ? this.taskTarget.id : this.listTarget.id)
    console.log('ev.currentTarget ' + ev.currentTarget.id)
    console.log('drop target ' + dropTarget.id);
    let dragee = document.getElementById(ev.dataTransfer.getData("dragee"));
    console.log('dragee ' + dragee.id);

    if (dropTarget.id.includes('list')){
      dropTarget.appendChild(dragee);
    } else if(dropTarget.id.includes('task')){
      dropTarget.before(dragee);
    }
  }

  // dragover
  allowDrop(ev) {
    ev.preventDefault();
  }

  toggleHidden(ev){
    let btn = ev.currentTarget;
    let storyBit = document.getElementById(btn.id.replace('toggle', 'hide'));
    if (storyBit.hidden){
      storyBit.hidden = false;
      btn.innerText = '-';
    } else {
      storyBit.hidden = true;
      btn.innerText = '+';
    }
  }
}
