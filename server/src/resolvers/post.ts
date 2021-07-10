import { Post } from "../entities/Post";
import { Query, Resolver, Int, Arg, Mutation } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return Post.find(Post);
  }

  @Query(() => Post, { nullable: true})
  post(@Arg("id", () => Int) id: number,
  ): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post, )
  async createPost(
    @Arg("title", () => String) title: string,
  ): Promise<Post> {
    const post = Post.create({title});
    return post.save();
  }

  @Mutation(() => Post, { nullable: true})
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true}) title: string,
  ): Promise<Post | null> {
    const post = await Post.findOne(id)
    if(!post){
      return null
    }
    if(typeof title !== undefined){
      post.title = title;
      await Post.update({id}, {title})
    }
    return post
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id") id: number, 
  ): Promise<boolean> {
    await Post.delete(id)
    return true
  }
}