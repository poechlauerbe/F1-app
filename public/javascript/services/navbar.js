function toggleSubnav(subnavId) {
    var subnav = document.getElementById(subnavId);
    if (subnav.style.display === "none" || subnav.style.display === "") {
        subnav.style.display = "block";
    } else {
        subnav.style.display = "none";
    }
	console.log("Navbar test");
}
