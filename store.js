// store.js
// store.js
import { ActionTypes } from './actions.js';

let data = [
    // Your initial data
    {
        id: 101,
        name: "Folder 1",
        type: "folder",
        children: [
            { name: "File 1.1", type: "file" },
            { name: "File 1.2", type: "file" }
        ]
    },
    {
        id: 201,
        name: "Folder 2",
        type: "folder",
        children: [
            { name: "Subfolder 2.1", type: "folder", children: [] },
            { name: "File 2.1", type: "file" }
        ]
    }
];

function reducer(state = data, action) {
    switch (action.type) {
        case ActionTypes.CREATE_FOLDER:
            // Implement logic to create a folder
            const newFolder = {
                name: action.folderName,
                type: "folder",
                expanded: true,
                children: []
            };
        
            if (action.parent) {
                action.parent.children.push(newFolder);
            } else {
                state.push(newFolder);
            }
            return [...state];

        case ActionTypes.CREATE_FILE:
            // Implement logic to create a file
            const newFile = {
                name: action.fileName,
                type: "file"
            };
        
            if (action.parent) {
                action.parent.children.push(newFile);
            }
            return [...state];

        case ActionTypes.TOGGLE_EXPAND:
            action.item.expanded = !action.item.expanded;
  
            // Implement logic to toggle expand
            return [...state];

        case ActionTypes.DELETE_ITEM:
            const parentChildren = action.item.parent ? action.item.parent.children : state;
            const index = parentChildren.indexOf(action.item);
            
            if (index !== -1) {
                parentChildren.splice(index, 1);
            }
            // Implement logic to delete an item
            return [...state];

        default:
            return state;
    }
}

export { reducer};
export default data;

