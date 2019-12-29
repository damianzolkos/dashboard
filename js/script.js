var dashboardVersion = 0.5.1;
var dashboardAuthor = "Damian Żółkoś <damianzolkos@gmail.com> <http://github.com/damianzolkos";

var notifications = 0;
var messages = [];

function onLoad() {

    console.log("");
    console.log("");
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
    console.log("");
    console.log("");

    // initial config of the app
    window.document.title = appName;
    document.getElementById("logo").innerHTML = appName;
    // ###########################

    for (let i = 0; i < pages.length; i++) {
        createSidebarMenuItem(pages[i]);
        createPages(pages[i]);
    }
    changeScreen(pages[0]);

    for (let i = 0; i < modules.length; i++) {
        createBox(modules[i][0], modules[i][1], modules[i][2]);
    }

    clock();

    notificationsCounterUpdate();
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

function createBox(pageName, boxId, moduleName) {
    var box = document.createElement("div");
    box.className = "box";
    box.id = boxId;
    document.getElementById(pageName).appendChild(box);
    var moduleNameId = "#" + boxId;
    var moduleFile = "modules/" + moduleName + "/" + moduleName + ".html";
    $(moduleNameId).load(moduleFile);
}

function notificationsWindowToggle() {
    var windowState = document.getElementById('notifications').style.visibility;
    if (windowState === "hidden" || windowState === "") {
        document.getElementById('notifications').style.visibility = "visible";
        document.getElementById('notifications').style.opacity = 1;
    } else {
        document.getElementById('notifications').style.visibility = "hidden";
        document.getElementById('notifications').style.opacity = 0;
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
    if (showOrHide == 0) {
        document.getElementById('sidebar').style.transform = 'translate(0px,0px)';
        document.getElementById('content').style.left = "250px";
        document.getElementById('content').style.width = 'calc(100% - 250px)';
        showOrHide = 1;
    } else if (showOrHide == 1) {
        document.getElementById('sidebar').style.transform = 'translate(-250px,0px)';
        document.getElementById('content').style.left = "0px";
        document.getElementById('content').style.width = '100%';
        showOrHide = 0;
    }
}