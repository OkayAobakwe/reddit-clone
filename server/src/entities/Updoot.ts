import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Updoot extends BaseEntity{
  @Column({type: "int"})
  value: number;

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => User, (user) => user.updoots)
  user: User;

  @ManyToOne(() => Post, (post) => post.updoots)
  post: Post;

}
