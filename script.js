document.getElementById("postForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let title = document.getElementById("postTitle").value;
    let content = document.getElementById("postContent").value;

    if (title === "" || content === "") {
        alert("Please fill in all fields.");
        return;
    }

    let post = document.createElement("div");

    post.className = "post";

    post.innerHTML = `
        <span class="category">Personal</span>
        <h3>${title}</h3>
        <p>${content}</p>
    `;

    document.getElementById("postsContainer").appendChild(post);

    document.getElementById("postForm").reset();

    alert("Post added successfully!");
});