var notifications = 0;
var messages = [];

var appName = "Template";

function onLoad(){
    console.log("onLoad");
    // initial config of the app
    window.document.title = appName;
    document.getElementById("logo").innerHTML = appName;
    // ###########################

        for (let i = 0; i<pages.length; i++) {
            createSidebarMenuItem(pages[i]);
            createPages(pages[i]);
        }
        changeScreen(pages[0]);

        for (let i = 0; i<boxes.length; i++) {
            createBox(boxes[i][0], boxes[i][1]);
        }
        notificationsCounterUpdate();
    }
function changeScreen(nameOfScreen) {
        for (let i = 0; i<pages.length; i++) {
            document.getElementById(pages[i]+"_menuItem").className = "inactive";
            document.getElementById(pages[i]).style.display = "none";
        }
        document.getElementById(nameOfScreen+"_menuItem").className = "active";
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
        menuElement.setAttribute("onclick","changeScreen('"+nameOfMenuItem+"');");
        menuElement.id = nameOfMenuItem+"_menuItem";
        menuElement.style.listStyleType = 'none';
        document.getElementById("sidebarMenu").appendChild(menuElement);
}
function createBox(whereToCreate, nameOfMenuItem) {
        var box = document.createElement("div");
        box.innerHTML = nameOfMenuItem;
        box.className = "box";
        document.getElementById(whereToCreate).appendChild(box);
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
    newMessageLi.innerHTML = message;
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