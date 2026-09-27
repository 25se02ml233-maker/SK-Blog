// =========================
// BLOG POST SYSTEM
// ========================//
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import { db } from "./firebase.js";


// =========================
// READ MORE
// =========================

function readPost() {
    alert("Thank you for reading my blog post!");
}

// =========================
// ADD NEW POST
// =========================

document.getElementById("postForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    let title = document.getElementById("postTitle").value.trim();
    let content = document.getElementById("postContent").value.trim();

    if (title === "" || content === "") {
        alert("Please fill in all fields.");
        return;
    }

    try {

        await addDoc(collection(db, "posts"), {

            title: title,
            content: content,
            category: "Personal",
            createdAt: new Date()

        });

        document.getElementById("postForm").reset();

        alert("Your post was saved to Firebase!");

    } catch (error) {

        console.error("Error adding post:", error);

        alert("Error saving post to Firebase.");

    }

});
// =========================
// DISPLAY POSTS FROM FIREBASE
// =========================

async function displayPosts() {

    let container = document.getElementById("postsContainer");

    let oldPosts = container.querySelectorAll(".saved-post");

    oldPosts.forEach(function(post) {
        post.remove();
    });

    try {

        let querySnapshot = await getDocs(
            collection(db, "posts")
        );

        querySnapshot.forEach(function(documentSnapshot) {

            let post = documentSnapshot.data();

            let postElement =
                document.createElement("div");

            postElement.className =
                "post saved-post";

            postElement.setAttribute(
                "data-category",
                post.category || "Personal"
            );

            postElement.innerHTML = `

                <span class="category">
                    ${post.category || "Personal"}
                </span>

                <h3>
                    ${escapeHTML(post.title)}
                </h3>

                <p>
                    ${escapeHTML(post.content)}
                </p>

            `;

            container.appendChild(postElement);

        });

    } catch (error) {

        console.error(
            "Error loading posts:",
            error
        );

    }

}

// =========================
// EDIT POST
// =========================

function editPost(index) {

    let newTitle = prompt(
        "Enter new title:",
        posts[index].title
    );

    if (newTitle === null) {
        return;
    }

    let newContent = prompt(
        "Enter new content:",
        posts[index].content
    );

    if (newContent === null) {
        return;
    }

    newTitle = newTitle.trim();
    newContent = newContent.trim();

    if (newTitle === "" || newContent === "") {
        alert("Title and content cannot be empty.");
        return;
    }

    posts[index].title = newTitle;
    posts[index].content = newContent;

    localStorage.setItem(
        "myBlogPosts",
        JSON.stringify(posts)
    );

    displayPosts();

    alert("Post updated successfully!");
}


// =========================
// DELETE POST
// =========================

function deletePost(index) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
        return;
    }

    posts.splice(index, 1);

    localStorage.setItem(
        "myBlogPosts",
        JSON.stringify(posts)
    );

    displayPosts();

    alert("Post deleted successfully!");
}


// =========================
// SEARCH POSTS
// =========================

function searchPosts() {

    let searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    let allPosts = document.querySelectorAll(".post");

    allPosts.forEach(function(post) {

        let text = post.innerText.toLowerCase();

        if (text.includes(searchText)) {
            post.style.display = "";
        } else {
            post.style.display = "none";
        }

    });
}


// =========================
// FILTER POSTS
// =========================

function filterPosts(category) {

    let allPosts = document.querySelectorAll(".post");

    allPosts.forEach(function(post) {

        let postCategory =
            post.getAttribute("data-category");

        if (
            category === "all" ||
            postCategory === category
        ) {

            post.style.display = "";

        } else {

            post.style.display = "none";

        }

    });
}


// =========================
// SECURITY HELPER
// =========================

function escapeHTML(text) {

    let div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
// =========================
// CONTACT FORM
// =========================

document.getElementById("contactForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let message = document.getElementById("contactMessage");

    message.textContent =
        "✓ Thank you! Your message has been sent successfully.";

    message.style.display = "block";

    this.reset();

});
// =========================
// LOAD FIREBASE POSTS
// =========================

displayPosts();