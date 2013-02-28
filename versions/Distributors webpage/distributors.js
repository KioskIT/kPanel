function switchToMap()
{
document.getElementById("list-content").style.display="none";
document.getElementById("map").style.display="block";
document.getElementById("toMap").style.display="none";
document.getElementById("toList").style.display="block";
}

function switchToList()
{
document.getElementById("list-content").style.display="block";
document.getElementById("map").style.display="none";
document.getElementById("toMap").style.display="block";
document.getElementById("toList").style.display="none";
}
