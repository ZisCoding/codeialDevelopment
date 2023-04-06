{
    // adding the the delete button to all the post as the page loads to delte then dynmically
    let addDynamicDeleteButtonToPost = function (){
        // adding the deletePost event listener to all the button having class delete-post-button
        $('.delete-post-button').each(function(){
            deletePost($(this));
        });
    }
    // when page loads then adding the dynamic comment create function/eventlistener to all the comment forms
    let addDynamicCommebtCreateButton = function(){
        $('.new-comment-form').each(function(){ // if you want to use this then dont use arrow function
            createComment($(this));
        })
    }
    // adding dynamic delete button to all the comments when page get's loaded
    let addDynamicDeleteButtonToComment = function(){
        $('.delete-comment-button').each(function(){
            deleteComment($(this));
        });
    }

    // function to show notification
    let showNotification = function (text){
        new Noty({
            theme: 'relax',
            text: text,
            type: 'success', 
            layout: 'topRight',
            timeout: 1500
        }).show();
    }

    // this function is to create a post in the db amd update the dom with that post
    let createPost = function (){
        
        let newPostForm = $('#new-post-form');
        
        // when the form will be submitted the function below will be triggered
        newPostForm.submit((e)=>{
            // this will stop the default action of the form that is submitting 
            e.preventDefault();

            // now we have to manually submit the form using ajax

            $.ajax({
                type: 'POST',
                url: '/posts/create',
                data: newPostForm.serialize(), // this will make the json string out of the form data
                success: (data)=>{
                    console.log("hi",data);
                    let newPost = newPostDom(data.data);
                
                    // appending the post created in html form the dom
                    $('#post-list-container>ul').prepend(newPost);

                    // calling the showNotification function
                    showNotification(data.flash.success);

                    // adding dynamic comment button/eventlistener to the comment form which got created with this post

                    createComment($(' .new-comment-form', newPost));

                    // adding the delete(eventlistener) button or calling the deletePost function for every delete button inside the newPost which is created 
                    deletePost($(' .delete-post-button', newPost));
                },
                error: (error)=>{
                    console.log(error.responseText);
                }
            })
        });
    }

    // this function will create the post in html form so that we can append it into the dom

    let newPostDom = function (data){
        return $(`
            <li id="post-${data.post._id}" style="border-bottom: 2px solid black;">
                <p>
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${data.post._id}">Delete</a>
                    </small><br>

                    ${data.post.content}
                    <h6>Posted by ${data.post.username}</h6>
                </p>
                <div class="post-comments">

                    <!-- dividing the code into partials -->
                    <h3>Comments</h3>

                    
                    <form class="new-comment-form" action="/comments/create" method="POST" >
                        <textarea name="comment"  cols="30" rows="3" required></textarea>
                        <input type="hidden" name="post" value="${data.post._id}">
                        <input type="submit" value="Comment">
                    </form>

                    <div class="post-comments-list">
                        <ul id="post-comments-${data.post._id}"> 
                            
                        </ul> 
                    </div>
                   

                </div>
            </li>
        `)
    }


    // this function will delete the post from db and update the dom
    let deletePost = function(deleteLink){
        
        //. on clicking the delete button this below function will be called 
        $(deleteLink).click(function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'), // extracting the href
                success: function(data){
                    $(`#post-${data.data.postId}`).remove() // removing the post from dom

                    // calling the showNotification function
                    showNotification(data.flash.success);
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let createComment = function (commentForm){

        commentForm.submit((e)=>{
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url: '/comments/create',
                data: commentForm.serialize(), // this will make the json string out of the form data
                success: function (data){
                    let newComment = newCommentDom(data.data.comment);
                    
                    deleteComment($(' .delete-comment-button',newComment));

                    $(`#post-comments-${data.data.comment.post}`).prepend(newComment);

                    showNotification(data.flash.success);
                },
                error: function(err){
                    console.log("Error in creating post",err.responseText);
                }

            });
        });
    }

    // creating the dom of comment which has been created in db to append it to the browser screen dynaically
    let newCommentDom = function(comment){
            return $(`
                <li id="comment-${comment._id}">
                    <p>
                        <small>
                            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">Delete</a>
                        </small><br>
                            
                        <small>${comment.user.name}</small> <br>
                        ${comment.content}
                    </p>
                </li>
            `);
    }

    let deleteComment = function(link){
        
        link.on("click",(event)=>{
            event.preventDefault();
            $.ajax({
                type:'GET',
                url:link.attr('href'),
                data: link.serialize(),
                success: function(data){

                    $(`#comment-${data.data.commentId}`).remove();
                    showNotification(data.flash.success);
                },
                error: function(error){
                    console.log("Error in deleting commnt",error.responseText);
                }
            });
        });
    }
    createPost();
    addDynamicDeleteButtonToPost();
    addDynamicCommebtCreateButton();
    addDynamicDeleteButtonToComment();

}