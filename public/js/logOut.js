const postBtn = document.querySelector("#log-out")

postBtn.addEventListener("click", e => {
    const UserId = e.target.getAttribute("data-UserId");
    console.log(UserId);
    e.preventDefault();
    fetch(`/api/users/logout/${UserId}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log(res)
            res.json().then(json => {
            console.log(json.id);
            location.reload(true);
            location.href = ('/')
            return false;
            })}
    })
})