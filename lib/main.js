'use babel';
const fetchSuggestions = require('./groq');
import { CompositeDisposable } from 'atom';

async function insertTextAfterSelection() {
  const editor = atom.workspace.getActiveTextEditor();
  let grammar = editor.getGrammar().name;
  const cursor = editor.getLastCursor();
  const selection = editor.getSelections()[0]
  const selectionRange = selection.getBufferRange(); // Gets the start and end positions of the selection
  const selectedText = editor.getTextInRange(selectionRange);
  const selectionEnd = selection.getBufferRange().end;
  const textToInsert = await fetchSuggestions(selectedText, grammar).then(r=>r[0].text); // Fetch or compute text asynchronously
  console.log(textToInsert)
  editor.getBuffer().insert(selectionEnd, textToInsert);
}

export default {
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    // Register command that triggers the autocomplete
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'groq-suggestions:trigger-autocomplete': () => this.triggerAutocomplete()
      })
    );
  },
  getProvider() {
    // return a single provider, or an array of providers to use together
    return basicProvider;
  },
  triggerAutocomplete() {
    const editor = atom.workspace.getActiveTextEditor();
    console.log("trying to insert suggestions")
    insertTextAfterSelection()
  }
};
