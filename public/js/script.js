// filter
let taxSwitch = document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("click", () => {
    let taxInfos = document.getElementsByClassName("taxInfo");
    for (Info of taxInfos) {
        if (Info.style.display != "inline") {
            Info.style.display = "inline";
        }
        else {
            Info.style.display = "none";
        }

    }
})



