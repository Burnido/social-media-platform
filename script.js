// small in-memory database stored in localStorage (temporary storage)
let selectedImageData = null;

// Get the hidden file input
const photoInput = document.getElementById('photoInput');
photoInput.addEventListener('change', handlePhotoSelected);

// Wire up the add photo button
const addPhotoBtn = document.getElementById('addPhotoBtn');
if (addPhotoBtn) {
    addPhotoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        photoInput.click();
    });
}

function handlePhotoSelected(e) {
    const file = e.target.files[0];
    if (!file) {
        selectedImageData = null;
        updatePhotoPreview();
        return;
    }
    const reader = new FileReader();
    reader.onload = function(evt) {
        selectedImageData = evt.target.result;
        updatePhotoPreview();
    };
    reader.readAsDataURL(file);
}

function updatePhotoPreview() {
    const preview = document.getElementById('photoPreview');
    preview.innerHTML = '';
    if (selectedImageData) {
        const img = document.createElement('img');
        img.src = selectedImageData;
        preview.appendChild(img);
    }
}

// Create Post Functionality
function createPost() {
    const postInput = document.getElementById('postInput');
    const postText = postInput.value.trim();
    
    if (postText === '' && !selectedImageData) {
        alert('Please write something or choose a photo to post!');
        return;
    }
    
    const postObj = {
        text: postText,
        image: selectedImageData,
        timestamp: new Date().toISOString()
    };

    // save to "database"
    let posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.unshift(postObj);
    localStorage.setItem('posts', JSON.stringify(posts));

    renderPost(postObj, true);

    // clear inputs
    postInput.value = '';
    postInput.style.height = 'auto';
    selectedImageData = null;
    updatePhotoPreview();
    
    console.log('Post created:', postObj);
}

function renderPost(postObj, prepend = false) {
    const newPost = document.createElement('article');
    newPost.classList.add('post');

    const imageHtml = postObj.image ? `<img src="${postObj.image}" alt="Post Image" class="post-media">` : '';

    newPost.innerHTML = `
        <div class="post-header">
            <img src="https://via.placeholder.com/50" alt="User">
            <div class="post-user-info">
                <h3>You</h3>
                <p>@yourhandle • just now</p>
            </div>
            <button class="more-btn"><i class="fas fa-ellipsis-h"></i></button>
        </div>

        <div class="post-content">
            <p>${postObj.text || ''}</p>
            ${imageHtml}
        </div>

        <div class="post-stats">
            <span><i class="fas fa-heart"></i> 0 Likes</span>
            <span><i class="fas fa-comment"></i> 0 Comments</span>
            <span><i class="fas fa-share"></i> 0 Shares</span>
        </div>

        <div class="post-actions">
            <button class="action-btn"><i class="fas fa-heart"></i> Like</button>
            <button class="action-btn"><i class="fas fa-comment"></i> Comment</button>
            <button class="action-btn"><i class="fas fa-share"></i> Share</button>
            <button class="action-btn"><i class="fas fa-bookmark"></i> Save</button>
        </div>
    `;

    const postsContainer = document.getElementById('postsContainer');
    if (prepend) {
        postsContainer.insertBefore(newPost, postsContainer.firstChild);
    } else {
        postsContainer.appendChild(newPost);
    }

    // attach listeners on the new post's buttons
    newPost.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text.includes('Like')) {
                likePost({ target: btn });
            } else if (text.includes('Comment')) {
                commentPost({ target: btn });
            } else if (text.includes('Share')) {
                sharePost({ target: btn });
            } else if (text.includes('Save')) {
                savePost({ target: btn });
            }
        });
    });
}

function loadPostsFromStorage() {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.forEach(p => renderPost(p, false));
}

// Like Post Functionality
function likePost(event) {
    const likeBtn = event.target.closest('.action-btn');
    const postStats = likeBtn.closest('.post').querySelector('.post-stats');
    const likeStat = postStats.querySelector('span:first-child');
    
    likeBtn.classList.toggle('liked');
    
    let likeCount = parseInt(likeStat.textContent.match(/\d+/)[0]);
    if (likeBtn.classList.contains('liked')) {
        likeCount++;
        likeBtn.style.color = '#E74C3C';
    } else {
        likeCount--;
        likeBtn.style.color = '';
    }
    
    likeStat.innerHTML = `<i class="fas fa-heart"></i> ${likeCount} Likes`;
}

// Comment Post Functionality
function commentPost(event) {
    alert('Comment feature coming soon!');
}

// Share Post Functionality
function sharePost(event) {
    const shareBtn = event.target.closest('.action-btn');
    const postStats = shareBtn.closest('.post').querySelector('.post-stats');
    const shareStat = postStats.querySelector('span:nth-child(3)');
    
    let shareCount = parseInt(shareStat.textContent.match(/\d+/)[0]);
    shareCount++;
    shareStat.innerHTML = `<i class="fas fa-share"></i> ${shareCount} Shares`;
    
    alert('Post shared!');
}

// Save Post Functionality
function savePost(event) {
    const saveBtn = event.target.closest('.action-btn');
    saveBtn.classList.toggle('saved');
    
    if (saveBtn.classList.contains('saved')) {
        saveBtn.style.color = '#F39C12';
    } else {
        saveBtn.style.color = '';
    }
    
    alert('Post saved!');
}

// Auto-resize textarea
const postInput = document.getElementById('postInput');
postInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Add enter key functionality for posting
postInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        createPost();
    }
});

// Load existing posts from storage when page loads
window.addEventListener('DOMContentLoaded', function() {
    loadPostsFromStorage();
});

// Delegate click events for the existing buttons (useful for static posts)
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.textContent.trim();
        if (text === 'Like') {
            likePost({ target: this });
        } else if (text === 'Comment') {
            commentPost({ target: this });
        } else if (text === 'Share') {
            sharePost({ target: this });
        } else if (text === 'Save') {
            savePost({ target: this });
        }
    });
});

// Follow button functionality
document.querySelectorAll('.btn-small').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.textContent === 'Follow') {
            this.textContent = 'Following';
            this.style.backgroundColor = '#F0F0F0';
            this.style.color = var('--text-primary');
            this.style.border = '1px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--border-color');
        } else {
            this.textContent = 'Follow';
            this.style.backgroundColor = var('--primary-color');
            this.style.color = 'white';
        }
    });
});

console.log('Basher loaded successfully!');
