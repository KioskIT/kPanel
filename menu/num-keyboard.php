<div  class = 'keyboard' id  = 'keyboard-num' style = 'display:block'>
	<div class = 'key-line' style = 'padding-left:15%'>
	<?php
		addKey('7','','keyPress("token","7")');
		addKey('8','','keyPress("token","8")');
		addKey('9','','keyPress("token","9")');
		addKey('Backspace','12','backspace("token")');
	?>
	</div>
	<div class = 'key-line' style  = 'padding-left:15%'>
	<?php
		
		addKey('4','','keyPress("token","4")');
		addKey('5','','keyPress("token","5")');
		addKey('6','','keyPress("token","6")');
		addKey('Cancel','12','cancelNumKeyboardEntry("token")');
	?>
	</div>
	<div class = 'key-line' style = 'padding-left:15%'>
	<?php
		addKey('1','','keyPress("token","1")');
		addKey('2','','keyPress("token","2")');
		addKey('3','','keyPress("token","3")');	
		addKey('Confirm','12','authorizeNurse()');
	?>
	</div>	
</div>
