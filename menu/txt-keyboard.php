<?php
	function addKey($char,$width,$event)
	{
		echo "<div class = 'key' style = 'width:$width%' onClick = '$event'>$char</div>";
	}
?>
<div  class = 'keyboard' id  = 'keyboard-text' style = 'display:block'>
	<div class = 'key-line' style = 'padding-left:8%'>
	<?php
		addKey('Q','','keyPress("name","Q")');
		addKey('W','','keyPress("name","W")');
		addKey('E','','keyPress("name","E")');
		addKey('R','','keyPress("name","R")');
		addKey('T','','keyPress("name","T")');
		addKey('Y','','keyPress("name","Y")');
		addKey('U','','keyPress("name","U")');
		addKey('I','','keyPress("name","I")');
		addKey('O','','keyPress("name","O")');
		addKey('P','','keyPress("name","P")');
		addKey('Backspace','12','backspace("name")');
	?>
	</div>
	<div class = 'key-line' style  = 'padding-left:5%'>
	<?php
		addKey('Cancel','10','cancelKeyboardEntry("name")');
		addKey('A','','keyPress("name","A")');
		addKey('S','','keyPress("name","S")');
		addKey('D','','keyPress("name","D")');
		addKey('F','','keyPress("name","F")');
		addKey('G','','keyPress("name","G")');
		addKey('H','','keyPress("name","H")');
		addKey('J','','keyPress("name","J")');
		addKey('K','','keyPress("name","K")');
		addKey('L','','keyPress("name","L")');
		addKey('Enter','10','enter()');
	?>
	</div>
	<div class = 'key-line' style = 'padding-left:20%'>
	<?php
		addKey('Z','','keyPress("name","Z")');
		addKey('X','','keyPress("name","X")');
		addKey('C','','keyPress("name","C")');
		addKey('V','','keyPress("name","V")');
		addKey('B','','keyPress("name","B")');
		addKey('N','','keyPress("name","N")');
		addKey('M','','keyPress("name","M")');
		
	?>
	</div>
	<div class = 'key-line' style = 'padding-left:20%'>
	<?php
		addKey('SPACE','50','keyPress("name"," ")');
	?>
	</div>		
</div>
