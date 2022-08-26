const postBtn = document.querySelector("#create-post-button")

postBtn.addEventListener("click", e => {
    console.log("button")
    e.preventDefault();
    const UserId = e.target.getAttribute("data-UserId");
    console.log(UserId)
    const newPost = {
        title:document.querySelector("#create-post-title").value,
        post_body:document.querySelector("#create-post-body").value,
    }
    fetch("/api/posts",{
        method:"POST",
        body:JSON.stringify(newPost),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            fetch(
                `/api/users/${UserId}`
            ).then((response) => response.json())
            .then((userObj) => {
                console.log(userObj)
                lastPost = userObj.Posts.length-1
                lastPostId = userObj.Posts[lastPost].id
                console.log(`Last Post Id: ${lastPostId}`)
                location.href = `post/${lastPostId}`
            })
        }
    })

    
})