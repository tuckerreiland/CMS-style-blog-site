const udpateUserBtn = document.querySelector("#update-user-button")
const confirmUpdate = document.querySelector("#update-confirm")

udpateUserBtn.addEventListener("click", e => {
    e.preventDefault();
    const UserId = document.querySelector("#update-user-username").getAttribute("data-UserId");
    console.log(UserId)
    const updatedUser = {
        username:document.querySelector("#update-user-username").value,
        email:document.querySelector("#update-user-email").value,
        newPassword:document.querySelector("#update-user-password").value,
        oldPassword:document.querySelector("#confirm-user-password").value,
    }
    fetch(`/api/users/${UserId}`,{
        method:"PUT",
        body:JSON.stringify(updatedUser),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            res.json().then(user => {
               console.log(user)
                location.reload()
                        
        })
    }});
})