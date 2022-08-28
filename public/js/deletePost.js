const deletePostBtn = document.querySelector("#delete-post-button")
const UserId = document.querySelector("#user-id").getAttribute("data-UserId");
const PostId = document.querySelector("#post-id").getAttribute("data-PostId");

deletePostBtn.addEventListener("click", e => {
    
    e.preventDefault();
    console.log(PostId)
    fetch(`/api/posts/${PostId}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }

    }).then(
        console.log("DELETED")          
)});
