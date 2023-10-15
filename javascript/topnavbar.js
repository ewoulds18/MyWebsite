function ShowItems() {
    if (window.innerWidth <= 600 ) {
        var x = document.getElementById("responsive-topnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
        console.log("Less then 600px");
    }else{
        console.log("Larger then 600px");
    }
}

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
    ) {
        document.getElementById("responsive-topnav").style.padding = "0px 0px";
    } else {
        document.getElementById("responsive-topnav").style.padding = "10px 5px";
    }
}
