const configAddress = "config.json";
//const configAddres = "http://localhost:1880/config";

var notifications = 0;
var messages = [];

// avaiable variables:
//
// appName, modules, pages, config, notifications, messages
//
// date and time:
//      hour: h
//      minute: m
//      year: y
//      month: mo
//      day: da

$.getJSON(configAddress, function (json) {
    parseConfig(JSON.stringify(json));
});

function onLoad() {
    console.log("");
    console.log("%c ###############################", "font-weight: bold;");
    console.log("           " + appName);
    console.log("%c ###############################", "font-weight: bold;");
    console.log("");
    console.log("%c Pages:", "font-weight: bold;");
    console.table(pages);
    console.log("");
    console.log("%c Modules:", "font-weight: bold;");
    console.table(modules);
    console.log("");

    window.document.title = appName;
    document.getElementById("logo").innerHTML = appName;

    clock();
    notificationsCounterUpdate();
}

function parseConfig(newJson) {
    config = JSON.parse(newJson);
    pages = config.pages;
    modules = config.modules;
    appName = config.appName;

    for (let i = 0; i < pages.length; i++) {
        createSidebarMenuItem(pages[i]);
        createPages(pages[i]);
    }
    changeScreen(pages[0]);

    for (let i = 0; i < config.activeModules.length; i++) {
        module_name = config["activeModules"][i];
        module = config["modules"][module_name];
        createBox(module.page, module.id, module.name, module.visibility);
    }
}

function clock() {
    getTime();
    setTimeout(clock, 1000);
}

function changeScreen(nameOfScreen) {
    for (let i = 0; i < pages.length; i++) {
        document.getElementById(pages[i] + "_menuItem").className = "inactive";
        document.getElementById(pages[i]).style.display = "none";
    }
    document.getElementById(nameOfScreen + "_menuItem").className = "active";
    document.getElementById(nameOfScreen).style.display = "";
}

function createPages(nameOfPage) {
    var newPage = document.createElement("div");
    newPage.id = nameOfPage;
    newPage.className = "page";
    document.getElementById("wrapper").appendChild(newPage);
}

function createSidebarMenuItem(nameOfMenuItem) {
    var menuElement = document.createElement("li");
    menuElement.innerHTML = nameOfMenuItem;
    menuElement.setAttribute("onclick", "changeScreen('" + nameOfMenuItem + "');");
    menuElement.id = nameOfMenuItem + "_menuItem";
    menuElement.style.listStyleType = 'none';
    document.getElementById("sidebarMenu").appendChild(menuElement);
}

function createBox(pageName, boxId, moduleName, moduleVisibility) {
    var box = document.createElement("div");
    box.className = "box";
    box.id = boxId;
    document.getElementById(pageName).appendChild(box);
    var moduleNameId = "#" + boxId;
    var moduleFile = "modules/" + moduleName + "/" + moduleName + ".html";
    $(moduleNameId).load(moduleFile);

    if (moduleVisibility == "none") {
        box.style.display = "none";
    } else if (moduleVisibility == "visible") {
        box.style.display = "inline-block";
    }
}

function notificationsWindowToggle() {
    var notificationsWindow = document.getElementById('notifications');
    var windowState = notificationsWindow.style.visibility;
    if (windowState === "hidden" || windowState === "") {
        notificationsWindow.style.visibility = "visible";
        notificationsWindow.style.opacity = 1;
    } else {
        notificationsWindow.style.visibility = "hidden";
        notificationsWindow.style.opacity = 0;
    }
}

function notificationsCounterUpdate() {
    var notification_counter = document.getElementById('notifications_counter');
    var noNotifications = document.getElementById('noNotifications');
    var clearNotifications = document.getElementById('clear_notifications');

    if (notifications == 0) {
        notification_counter.style.visibility = "hidden";
        noNotifications.style.display = "block";
        clearNotifications.style.visibility = "hidden";
    } else {
        notification_counter.style.visibility = "visible";
        clearNotifications.style.visibility = "visible";
        noNotifications.style.display = "none";
    }
    notification_counter.innerHTML = notifications;
}

function newNotification(message) {
    messages[notifications] = message;
    notifications++;
    var newMessageLi = document.createElement("li");
    newMessageLi.innerHTML = h + ":" + m + " - " + message;
    document.getElementById("notifications_list").appendChild(newMessageLi);
    notificationsCounterUpdate();
}

function clearNotifications() {
    notifications = 0;
    while (messages.length > 0) {
        messages.pop();
    }
    $("#notifications_list").children(":not(#noNotifications)").remove();
    notificationsCounterUpdate();
    notificationsWindowToggle();
}

const mq = window.matchMedia("(max-width: 500px)");
if (mq.matches == true) {
    showOrHide = 0;
} else showOrHide = 1;

function showSidebar() {
    var sidebar = document.getElementById('sidebar');
    var content = document.getElementById('content');
    if (showOrHide == 0) {
        sidebar.style.transform = 'translate(0px,0px)';
        content.style.left = "250px";
        content.style.width = 'calc(100% - 250px)';
        showOrHide = 1;
    } else if (showOrHide == 1) {
        sidebar.style.transform = 'translate(-250px,0px)';
        content.style.left = "0px";
        content.style.width = '100%';
        showOrHide = 0;
    }
}