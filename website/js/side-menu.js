var animatingMenuButton = false;
var timer;
var line1 = 100, line2 = 1, line3 = 600;
var open = true; //more like canOpen = true
function $id(obj) { 
    return document.getElementById(obj);
}

function closeMenu() {
    clearTimeout(timer);
    if(!open ){
        animatingMenuButton=false;
        animateMenuButton();
    }
}

function animateMenuButton() {

    if (!animatingMenuButton) {
        animatingMenuButton = true;
        if (open) {
            line1 = 100; line2 = 1; line3 = 600;
            $id("books").getElementsByTagName("div")[1].style.transform = "rotate(90deg)";
            $id("books").getElementsByTagName("div")[0].style.transform = "rotate(45deg)";
        }
        else {
            line3 = 100; line2 = 0; line1 = 600;
        }

        open = !open;
        timer = setInterval(animateMenuButton, 30);

    }

    var main = $id("main-container").className = !open ? "opened" : "closed";

    line1 += ((!open ? 600 : 100) - line1) / 3;
    line2 += ((!open ? 0 : 1) - line2) / 3;
    line3 += ((!open ? 100 : 600) - line3) / 3;
    var lines = $id("menu").getElementsByTagName("line");
    lines[0].setAttribute("y2", line1);
    lines[1].style.opacity = line2;
    lines[2].setAttribute("y2", line3);

    if (Math.abs(((!open ? 600 : 100) - line1) / 3 < 0.01) && Math.abs(((!open ? 0 : 1) - line2) / 3) < 0.01 && Math.abs((!open ? 100 : 600) - line3) / 3 < 0.01) {
        clearTimeout(timer);
        animatingMenuButton = false;
    }
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function switchStates(href) {
    href = href.split("/");
    href = href[href.length - 1] || href[href.length-2];

    if(href=="prometheus") {
        $id("prometheus").className="visible";
        $id("menu").className="topmost";
        closeMenu();
        return;
    }
    else
    {
        $id("prometheus").removeAttribute("class");
        $id("menu").removeAttribute("class");
    }
    if(href=="") {
        href="home";
    }

    loadPage(href);

    $id("table_items").className=href;
    if(href=="home"){
        if($id("logo").className == "small night")
            $id("logo").className = "night";
        else if($id("logo").className == "small")
            $id("logo").removeAttribute("class");
        $id("chair").removeAttribute("class");
        $id("page_title").innerHTML = " ";
    }
    else {
        if($id("logo").className == "night")
            $id("logo").className = "small night";
        else
            $id("logo").className = "small";
        $id("chair").className = "hidden";
        $id("page_title").innerHTML = capitaliseFirstLetter(href);
    }
    closeMenu();
}

function addClicker(link) {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        switchStates(link.href);
        //history.pushState(null, null, link.href);
    }, false);
}