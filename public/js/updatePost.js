const updatePostBtn = document.querySelector(".update-post-button")

updatePostBtn.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation()
    console.log("Button")
    const PostId = document.querySelector(".post-id").getAttribute("data-PostId");
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