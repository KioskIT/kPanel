var totalSelected = 0;
var total = 3;
var totalDeleted = 0;

function goHome()
{
    document.location = "index.html";    
}

function displaySelectedNo(number)
{
    document.getElementById('noSelected').innerHTML = number;		
}

function selectAll(total)
{
    for(i = 1;i <= total;i++)
    {
        document.getElementById('screen_'+i).style.background = '#094AB2';
        document.getElementById('tick_'+i).style.visibility = 'visible';
        document.getElementById('charms_bar').style.visibility = 'visible';
    }
    displaySelectedNo(total);

}

function cancel(total)
{
    for(i = 1;i <= total;i++)
    {		
        document.getElementById('screen_'+i).style.background = '#9C9C9C';
        document.getElementById('tick_'+i).style.visibility = 'hidden';
    }
    
    displaySelectedNo(0);
    enableAddScreen();
}

function tickScreen(id)
{
        document.getElementById('screen_'+id).style.background = '#094AB2';
        document.getElementById('tick_'+id).style.visibility = 'visible';		
}

function untickScreen(id)
{
        document.getElementById('screen_'+id).style.background = '#9C9C9C';
        document.getElementById('tick_'+id).style.visibility = 'hidden';			
}

function tick(id,totalSelected)
{		
    if(document.getElementById('tick_'+id).style.visibility == 'hidden')
    {
        tickScreen(id);
        document.getElementById('charms_bar').style.visibility = 'visible';
        totalSelected = totalSelected+1;
        displaySelectedNo(totalSelected);
        disableAddScreen();
        return totalSelected;
    }else{
        untickScreen(id);
        totalSelected = totalSelected - 1;
        displaySelectedNo(totalSelected);
        if(totalSelected == 0)
        {
            enableAddScreen();
        }
        return totalSelected;
    }
}

function enableAddScreen()
{
    document.getElementById('addScreen').style.background = 'black';
    document.getElementById('addScreen').style.cursor='pointer';		
}
function disableAddScreen()
{
    document.getElementById('addScreen').style.background = '#9C9C9C';
    document.getElementById('addScreen').style.cursor='default';		
}

function deleteScreen(totalSelected,total)
{
    totalDeleted = 0;
    for(i = 1;i <=total;i++)
    {
        var screen = document.getElementById('screen_' + i);
        if(document.getElementById('tick_'+i).style.visibility != 'hidden'){					
            document.getElementById('screen_' + i).style.display = 'none';
            untickScreen(i);
            totalSelected=totalSelected-1
            displaySelectedNo(totalSelected);
            totalDeleted = totalDeleted + 1;

        }
    };
    return totalDeleted;
}
function addH3() {
      // creates a H3 element, class and html content
      var new_h3 = document.createElement('h3');
      new_h3.className = 'cls';
      new_h3.innerHTML = 'The <i>html text</i> content';

      // gets the reference tag
      var reference = document.getElementById('idiv');

      // add 'new_h3' before 'reference', inside body
      document.body.insertBefore(new_h3, reference);
}
