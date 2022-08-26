console.log("LINKED")
const newCommentBtn = document.querySelector("#new-comment")

newCommentBtn.addEventListener("click", e => {
    const newCommentEl = document.querySelector("#new-comment")
    newCommentEl.toggle("visible");

})
