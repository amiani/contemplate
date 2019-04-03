document.onkeydown = e => {
  e = e || window.event
  if (focused === currNoteInput) {
    saveNote(currNoteInput.value)
  }
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
const copyButton = document.getElementById('copyButton')
const copyText = document.getElementById('copyText')
const cycleThoughtButton = document.getElementById('cycleThought')

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
}

editButton.onclick = e => {
  focused = currNewThoughtInput
  currThoughtInput.value = currThought.value
}
copyButton.onclick = e => {
  writeToClipboard()
}

let currThoughtIndex = 0
const data = [{ thought:'' , note: '' }]

const saveNote = note => {
  data[currThoughtIndex].note = note
}

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
    data.push({ thought, note: '' })
    newThoughtInput.value = ''
    currNoteInput.focus()
    focused = currNotInput
    showNextThoughtInstructions()
  }
}

const switchFocus = () => {
  if (focused === currNoteInput) {
    focused = newThoughtInput
    newThoughtInput.focus()
  } else if (focused === newThoughtInput) {
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
  showCopyInstructions()
}
cycleThoughtButton.onclick = cycle

const writeToClipboard = () => {
  data.forEach(async thoughtData => {
    console.log(thoughtData)
    await navigator.clipboard.writeText(thoughtData.thought+'\n\n'+thoughtData.note+'\n\n')
  })
}

const showCopyInstructions = () => {
  copyText.classList.add('infront')
}

const showNextThoughtInstructions = () => {
  document.getElementById('nextThoughtText').classList.add('infront')
}
