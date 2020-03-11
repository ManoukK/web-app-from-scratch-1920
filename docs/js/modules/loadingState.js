//Ramon heeft me hiermee geholpen

// id is in dit geval "loading"
function hide(id){
    //hier pas ik een klein beetje css toe met display none
    document.getElementById(id).style.display = "none";
}

function show(id){
    document.getElementById(id).style.display = "block";
}

//hier is Show de fucntion show en die spreek ik in app.ja aan.
export const loading = {
    Show: show,
    Hide: hide
}

