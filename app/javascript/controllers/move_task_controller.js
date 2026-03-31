import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="move-task"
export default class extends Controller {

  static targets = ['task', 'list']
  buster = new Object()

  connect() {
    console.log('Hello from task mover')
  }

  startDrag(ev) {
    console.log(' clicked ' + ev.currentTarget.id)
    console.log('taskTarget ' + this.taskTarget.id)
    ev.dataTransfer.setData("dragee", ev.currentTarget.id);
  }

  // drop
  dragDrop(ev) {
    ev.preventDefault()
    console.log('ev.target ' + ev.target.id);
    console.log('ev.currentTarget ' + ev.currentTarget.id);
    console.log('listTarget ' + this.listTarget.id);
    if( this.hasTaskTarget ) { console.log('taskTarget ' + this.taskTarget.id) };
    this.#getTarget(ev.target);
    var dropTarget = document.getElementById(this.buster);
    console.log('dropTarget ' + dropTarget.id);
    let dragee = document.getElementById(ev.dataTransfer.getData("dragee"));
    console.log('dragee ' + dragee.id);

    // this.#fumble(dropTarget, dragee)
    this.grumble(dropTarget, dragee)
  }

  // dragover
  allowDrop(ev) {
    ev.preventDefault();
  }

  toggleHidden(ev) {
    let btn = ev.currentTarget;
    let storyBit = document.getElementById(btn.id.replace('toggle', 'hide'));
    if (storyBit.hidden) {
      storyBit.hidden = false;
      btn.innerText = '-';
    } else {
      storyBit.hidden = true;
      btn.innerText = '+';
    }
  }

  #getTarget(node) {
    //console.log('Node.id "' + node.id +'"')
    if (node.id.match(/^list_/) || node.id.match(/^task_/)) {
      console.log('found ' + node.id);
      if (node.id !== '') { this.buster = node.id }
    } else if (node.id.includes('lists')) {
      throw ('too high up the chain');
    } else {
      this.#getTarget(node.parentElement);
    }
  }

  #fumble(dropTarget, dragee) {
    if (dropTarget.id.includes('list_')) {
          dropTarget.appendChild(dragee);
        } else if (dropTarget.id.includes('task_')) {
          dropTarget.after(dragee);
        }
  }

  grumble(dropTarget, dragee) {
    let dropTargetType = dropTarget.id.split('_')[0]
    let dropTargetId = dropTarget.id.split('_')[1]
    let drageeId = dragee.id.split('_')[1]
    let targetListId = this.listTarget.id.split('_')[1]

    let url = '/lists/' + targetListId + '/tasks/' + drageeId + '/move'

    let token = document.querySelector('meta[name="csrf-token"]').content

    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
        "Accept": "text/vnd.turbo-stream.html"
      },
      body: JSON.stringify({
        task: {
          target_id: dropTargetId,
          target_type: dropTargetType
        }
      })
    })
    .then(responce => responce.text())
    .then(turboStreamHTML => {
      Turbo.renderStreamMessage(turboStreamHTML)
    })

  }
}
