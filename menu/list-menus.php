<?php
require('../menu/add-files/connect-db.php'); 
require('ini-menus.php');
require('../menu/add-files/close-db.php'); 
?>
<div id = 'bin' style = 'position:absolute;height:10%;bottom:0;background:red;width:100%;display:none;color:white;text-align:center;font-weight:bold;font-size:1.5em'  ondrop="dropBin(event,this)" ondragover="allowDropForBin(event)" ondragEnter ='this.style.background="black"' ondragLeave='this.style.background="red"'>
	Drag And Drop Here to Delete
</div>