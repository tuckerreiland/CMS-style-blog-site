const commentBtn = document.querySelector("#create-comment-button")

commentBtn.addEventListener("click", e => {
    console.log("button")
    e.preventDefault();
    const newComment = {
        comment_body:document.querySelector("#create-comment-body").value,
        PostId:id
    }
    fetch("/api/comments",{
        method:"POST",
        body:JSON.stringify(newComment),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            // location.href = "/post/:id"
        }
    })

    
})