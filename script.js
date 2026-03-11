// Create Post Functionality
function createPost() {
    const postInput = document.getElementById('postInput');
    const postText = postInput.value.trim();
    
    if (postText === '') {
        alert('Please write something to post!');
        return;
    }
    
    // Create new post element
    const newPost = document.createElement('article');
    newPost.classList.add('post');
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
            <p>${postText}</p>
        </div>

        <div class="post-stats">
            <span><i class="fas fa-heart"></i> 0 Likes</span>
            <span><i class="fas fa-comment"></i> 0 Comments</span>
            <span><i class="fas fa-share"></i> 0 Shares</span>
        </div>

        <div class="post-actions">
            <button class="action-btn" onclick="likePost(event)"><i class="fas fa-heart"></i> Like</button>
            <button class="action-btn" onclick="commentPost(event)"><i class="fas fa-comment"></i> Comment</button>
            <button class="action-btn" onclick="sharePost(event)"><i class="fas fa-share"></i> Share</button>
            <button class="action-btn" onclick="savePost(event)"><i class="fas fa-bookmark"></i> Save</button>
        </div>
    `;
    
    // Insert new post at the top
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.insertBefore(newPost, postsContainer.firstChild);
    
    // Clear input
    postInput.value = '';
    postInput.style.height = 'auto';
    
    console.log('Post created:', postText);
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

// Add click listeners to existing posts
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

console.log('SocialHub loaded successfully!');
