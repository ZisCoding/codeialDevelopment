{
    // this function is to create a post in the db
    let createPost = function (){
        
        let newPostForm = $('#new-post-form');
        
        newPostForm.submit((e)=>{
            // this will stop the default action of the form that is submitting 
            e.preventDefault();

            // now we have to manually submit the form using ajax

            $.ajax({
                type: 'POST',
                url: '/posts/create',
                data: newPostForm.serialize(), // this will make the json string out of the form data
                success: (data)=>{
                    
                    let newPost = newPostDom(data.data.post);
                    console.log(newPost);
                    // appending the post created in html form the dom
                    $('#post-list-container>ul').prepend(newPost);
                },
                error: (error)=>{
                    console.log(error.responseText);
                }
            })
        });
    }

    // this function will create the post in html form so that we can append it into the dom

    let newPostDom = function (post){
        return $(`
            <li id="post-${post._id}" style="border-bottom: 2px solid black;">
                <p>
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post.id}">Delete</a>
                    </small><br>

                    ${post.content}
                    <h6>Posted by ${post.user.name}</h6>
                </p>
                <div class="post-comments">

                    <!-- dividing the code into partials -->
                    <h3>Comments</h3>

                    
                    <form action="/comments/create" method="POST" >
                        <textarea name="comment"  cols="30" rows="3" required></textarea>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Comment">
                    </form>

                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}"> 
                            
                        </ul> 
                    </div>
                   

                </div>
            </li>
        `)
    }

    createPost();
}