console.log("LINKED")

const updatePageRefresh = document.querySelector("#log-out")
updatePageRefresh.addEventListener("click", e => {
    console.log("Timer started")
    e.preventDefault()
    setTimeout(()=>{
        window.location.href('/')
    },500)
})
