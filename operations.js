// operations.js
import data from './store.js';
import { isNameUnique } from './util.js';

function createItem(item) {
    const listItem = document.createElement("div");
    listItem.classList.add("item");

    const expandIcon = document.createElement("span");
    expandIcon.classList.add("expand-icon");
    expandIcon.textContent = item.expanded ? "▼" : "▶";
    listItem.appendChild(expandIcon);

    const icon = document.createElement("span");
    icon.classList.add(`${item.type}-icon`);
    listItem.appendChild(icon);

    const itemName = document.createElement("span");
    itemName.textContent = item.name;
    listItem.appendChild(itemName);

    const buttonContainer = document.createElement("div");
    listItem.classList.add("button-container");

  
    if (item.type === "folder") {
        const createFolderButton = document.createElement("button");
        createFolderButton.setAttribute("id","btnId");
        createFolderButton.textContent = "Create Folder";
        createFolderButton.addEventListener("click", () => {
            const folderName = prompt("Enter folder name:");
            if (!folderName) {
                alert("Folder Name at least one character");
                return; // User canceled or provided an empty name
            }
            while (!isNameUnique(folderName, item, null)) {
                alert("Folder Name Should be unique...\n Please try again");
                return;
            }

            let uniqueName = folderName;
            //let counter = 1;
           /*  while (!isNameUnique(uniqueName, item)) {
                uniqueName = `${folderName} (${counter})`;
                counter++;
            } */
            const newFolder = {
                name: uniqueName,
                type: "folder",
                expanded: true,
                children: []
            };
            item.children.push(newFolder);
            renderFileExplorer();
        });
        listItem.appendChild(createFolderButton);

        const createFileButton = document.createElement("button");
        createFileButton.setAttribute("id","btnId");
        createFileButton.textContent = "Create File";
        createFileButton.addEventListener("click", () => {
            const fileName = prompt("Enter File name:");
            if (!fileName) {
                alert("File Name at least one character")
                return; // User canceled or provided an empty name
            }
            while (!isNameUnique(fileName, item, null)) {
                alert("Folder Name Should be unique...\n Please try again");
                return;
            }

            let uniqueName = fileName;
            let counter = 1;
            while (!isNameUnique(uniqueName, item)) {
                uniqueName = `${fileName} (${counter})`;
                counter++;
            }
            const newFile = {
                name: uniqueName,
                type: "file"
            };
            item.children.push(newFile);
            renderFileExplorer();
        });
        listItem.appendChild(createFileButton);

        const expandButton = document.createElement("button");
        expandButton.setAttribute("id","btnId");
        expandButton.textContent = item.expanded ? "Collapse" : "Expand";
        expandButton.addEventListener("click", () => {
            item.expanded = !item.expanded;
            renderFileExplorer();
        });
        listItem.appendChild(expandButton);
    }

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id","btnId");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        const parentChildren = item.parent ? item.parent.children : data;
        const index = parentChildren.indexOf(item);
        if (index !== -1) {
            parentChildren.splice(index, 1);
            renderFileExplorer();
        }
    });
    listItem.appendChild(deleteButton);

    return listItem;
}
function renderFileExplorer() {
    const fileExplorer = document.getElementById("file-explorer");
    fileExplorer.innerHTML = '';

    const generateFolderStructure = (parent, items) => {
        const fileExplorer = document.getElementById("file-explorer");
    fileExplorer.innerHTML = '';

    const createTopFolderButton = document.createElement("button");
    createTopFolderButton.textContent = "Create Folder at Root";
    createTopFolderButton.addEventListener("click", () => {
        let newFolderName = prompt("Enter a name for the new folder:");
        if (!newFolderName) {
            alert("Folder name at least one character");
            return; // User canceled or provided an empty name
        }

        while (!isNameUnique(newFolderName, { children: data }, null)) {
            newFolderName = prompt("Folder name already exists. Enter a different name:");
            if (!newFolderName) {
                return; // User canceled or provided an empty name
            }
        }

        const newFolder = {
            name: newFolderName,
            type: "folder",
            expanded: true,
            children: []
        };
        data.push(newFolder);
        renderFileExplorer();
    });
    fileExplorer.appendChild(createTopFolderButton);


        const childrenList = document.createElement("div");
        childrenList.classList.add("children-list");

        items.forEach(item => {
            item.parent = parent ? parent.itemData : null; // Set the parent property

            const listItem = createItem(item);
            listItem.itemData = item; // Store the item data in the DOM element
            childrenList.appendChild(listItem);

            if (item.expanded && item.children.length > 0) {
                generateFolderStructure(listItem, item.children);
            }
        });

        parent.appendChild(childrenList);
    };

    generateFolderStructure(fileExplorer, data);
}

export { createItem, renderFileExplorer };
