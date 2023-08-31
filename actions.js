// actions.js
const ActionTypes = {
  CREATE_FOLDER: "CREATE_FOLDER",
  CREATE_FILE: "CREATE_FILE",
  TOGGLE_EXPAND: "TOGGLE_EXPAND",
  DELETE_ITEM: "DELETE_ITEM"
};

function createFolder(folderName, parent) {
  return {
      type: ActionTypes.CREATE_FOLDER,
      folderName,
      parent
  };
}

function createFile(fileName, parent) {
  return {
      type: ActionTypes.CREATE_FILE,
      fileName,
      parent
  };
}

function toggleExpand(item) {
  return {
      type: ActionTypes.TOGGLE_EXPAND,
      item
  };
}

function deleteItem(item) {
  return {
      type: ActionTypes.DELETE_ITEM,
      item
  };
}

export { ActionTypes, createFolder, createFile, toggleExpand, deleteItem };
