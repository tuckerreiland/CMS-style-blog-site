const postBtn = document.querySelector("#create-user-button")
console.log("LINKED!")

postBtn.addEventListener("click", e => {
    console.log("button")
    e.preventDefault();
    const newUser = {
        username:document.querySelector("#create-user-username").value,
        email:document.querySelector("#create-user-email").value,
        password:document.querySelector("#create-user-password").value,
    }
    fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(newUser),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            res.json().then(user => {
                const logInObj = {
                    email:user.email,
                    password:document.querySelector("#create-user-password").value,
                }
                fetch("/api/users/login",{
                    method:"POST",
                    body:JSON.stringify(logInObj),
                    headers:{
                        "Content-Type":"application/json"
                    }
                }).then(res=>{
                    if(res.ok){
                        console.log(res)
                        res.json().then(json => {
                            console.log(json.id);
                                location.href=`user/${json.id}`
                        
                        })
                    }});
                })
            }})
        })
