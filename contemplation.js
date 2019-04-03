document.onkeydown = e => {
  e = e || window.event
  switch (e.code) {
    case 'Enter':
      if (focused === newThoughtInput) {
        submitNewThought(newThoughtInput.value)
      } else if (focused === currThoughtInput) {
        submitThoughtEdit(currThoughtInput.value)
      }
      break
    case 'Tab':
      e.preventDefault()
      e.shiftKey ? cycle() : switchFocus()
      break
  }
}

const currThought = document.getElementById('currThought')
const currThoughtInput = document.getElementById('currThoughtInput')
const currNoteInput = document.getElementById('currNoteInput')
const newThoughtInput = document.getElementById('newThoughtInput')
const editDeleteContainer = document.getElementById('editDeleteContainer')
const editButton = document.getElementById('edit')
const deleteButton = document.getElementById('delete')

let focused = currThoughtInput
currNoteInput.onfocus = e => {
  focused = currNoteInput
}
newThoughtInput.onfocus = e => {
  focused = newThoughtInput
}

const toggleEditMode = () => {
  currThought.classList.toggle('behind')
  currThoughtInput.classList.toggle('behind')
  editDeleteContainer.classList.add('behind')
}

editButton.onclick = e => {
  focused = currNewThoughtInput
  currNewThoughtInput.value = currThought.value
}

let currThoughtIndex = 0
const data = [{ thought:'' , note: '' }]

const submitThoughtEdit = thought => {
  if (thought !== '') {
    data[currThoughtIndex].thought = thought
    currThought.innerHTML = thought
    toggleEditMode()
    currNoteInput.classList.remove('behind')
    newThoughtInput.classList.remove('behind')
    currNoteInput.focus()
    focused = currNoteInput
  }
}

const submitNewThought = thought => {
  if (thought !== '') {
    data.push({ thought })
    newThoughtInput.value = ''
  }
}

const switchFocus = () => {
  if (focused === currNoteInput) {
    focused = newThoughtInput
    newThoughtInput.focus()
  } else if (focused === currNoteInput) {
    currNoteInput.focus()
    focused = currNoteInput
  }
}

const cycle = () => {
  data[currThoughtIndex].note = currNoteInput.value
  currThoughtIndex++
  currThoughtIndex >= data.length && (currThoughtIndex = 0)
  const thoughtData = data[currThoughtIndex]
  currThought.innerHTML = thoughtData.thought
  currNoteInput.value = thoughtData.note ? thoughtData.note : ''
}
