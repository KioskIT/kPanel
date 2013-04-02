function showAddElementPopup()
{
    document.getElementById("popup_bg").style.display = "block";
}

function hideAddElementPopup()
{
    document.getElementById("popup_bg").style.display = "none";
}

function configureFields(element)
{
    if (element.value != "" && element.value != "patient_orders_summary")
    {
        document.getElementById("floor").style.display = "block";
    }
    else
    {
        
        document.getElementById("floor").style.display = "none";
    }
}

function addElement()
{
    document.getElementById("form").style.display = "none";
    document.getElementById("loading").style.display = "block";
}
