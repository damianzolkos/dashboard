function afterLoad() {
    // things to do after main load is complete
    console.log("afterLoad");
    alarm(config.appName, "Simple and responsive web app interface with modules support.", "img/appIcon.png");
    newNotification("Test notification #1");
    newNotification("Test notification #2");
}