const PostId = document.querySelector(`.create-comment-button`).getAttribute('data-PostId')
const commentBtn = document.querySelector(`.create-comment-button`)
console.log(PostId)
console.log("linked")

commentBtn.addEventListener("click", e => {
    console.log("button")  
    e.preventDefault();
    e.stopPropagation()
    const newComment = {
        comment_body:document.querySelector(`.create-comment-body`).value,
    }
    fetch(`/api/comments/${PostId}`,{
        method:"POST",
        body:JSON.stringify(newComment),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        }
    })
})

const deletePostBtn = document.querySelector(".delete-post-button")
const UserId = document.querySelector("#user-id").getAttribute("data-UserId");

deletePostBtn.addEventListener("click", e => {
    
    e.preventDefault();
    console.log(PostId)
    fetch(`/api/posts/${PostId}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }

    }).then(()=>{
        console.log("DELETED")
        location.href = "post-deleted"       
    }  
)});

const updatePostBtn = document.querySelector(".update-post-button")

updatePostBtn.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation()
    console.log("Button")
    const updatedPost = {
        title: document.querySelector(".post-id").value,
        post_body: document.querySelector(".update-post-body").value
    }
    fetch(`/api/posts/${PostId}`,{
        method:"PUT",
        body:JSON.stringify(updatedPost),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            res.json().then(data => {
               console.log(data)
                location.reload()
                        
        })
    }});
})