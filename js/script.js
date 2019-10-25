document.getElementById("content").style.minWidth = 100%-250;

function onLoad(){
    for (let i = 1; i < 100; i++) {
        createSidebarMenuItem('Testowy przycisk nr '+i);
        createBox('box '+i);
    }   
}
function createSidebarMenuItem(nameOfMenuItem) {
        var menuElement = document.createElement("li");
        menuElement.innerHTML = nameOfMenuItem;
        menuElement.style.listStyleType = 'none';
        document.getElementById("sidebarMenu").appendChild(menuElement);
}

function createBox(nameOfMenuItem) {
        var menuElement = document.createElement("div");
        menuElement.innerHTML = nameOfMenuItem;
        menuElement.className = "box";
        document.getElementById("allTheThings").appendChild(menuElement);
}