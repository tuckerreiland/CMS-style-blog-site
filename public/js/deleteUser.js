const deleteUserBtn = document.querySelector("#delete-user-button")
const UserId = document.querySelector("#update-user-username").getAttribute("data-UserId");


deleteUserBtn.addEventListener("click", e => {
    e.preventDefault();
    console.log(UserId)
    fetch(`/api/users/${UserId}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(
        location.href = ('/account-deleted')          
)});
