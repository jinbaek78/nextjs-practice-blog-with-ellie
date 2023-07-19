type Props = {
  post: string;
};
export default function BlogPost({ post }: Props) {
  return <pre>{post}</pre>;
}
