function removeElementById(listOfDict: { [key: string]: any }[], id: string): { [key: string]: any }[] {
  return listOfDict.filter((dict) => dict.id !== id);
}
