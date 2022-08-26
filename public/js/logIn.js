const postBtn = document.querySelector("#log-in-user-button")
console.log("LINKED!")

postBtn.addEventListener("click", e => {
    console.log("button")
    e.preventDefault();
    const logInObj = {
        email:document.querySelector("#log-in-user-email").value,
        password:document.querySelector("#log-in-user-password").value,
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