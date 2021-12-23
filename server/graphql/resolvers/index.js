exports.postQueries = {
    post: (root, {id}, ctx) => {
        return ctx.models.Post.getById(id)
    },
    posts: (root, args, ctx) => {
        return ctx.models.Post.getAll()
    },
    userPosts: (root, args, ctx) => {
        return ctx.models.Post.getAllByUser()
    }
}

exports.postMutations = {
    createPost: async (root, {input}, ctx) => {
        const createdPost = await ctx.models.Post.create(input)
        return createdPost;
    },
    updatePost: async (root, {id, input}, ctx) => {
        const updatedPost = await ctx.models.Post.findAndUpdate(id, input)
        return updatedPost;
    },
    deletePost: async (root, {id}, ctx) => {
        const deletedPost = await ctx.models.Post.findAndDelete(id)
        return deletedPost._id;
    }
}

exports.userQueries = {
    user: (root, args, ctx) => {
        return ctx.models.User.getAuthUser(ctx)
    }
}

exports.userMutations = {
    signUp: async (root, {input}, ctx) => {
        const registeredUser = await ctx.models.User.signUp(input)
        return registeredUser._id
    },
    signIn: (root, {input}, ctx) => {
        return ctx.models.User.signIn(input, ctx)
    },
    signOut: (root, args, ctx) => {
        return ctx.models.User.signOut(ctx)
    }
}
