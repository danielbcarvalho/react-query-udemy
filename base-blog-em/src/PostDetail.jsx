import { useMutation, useQuery } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const { data, isError, isLoading, error} = useQuery(
    ["comments", post.id], () => fetchComments(post.id)
  )

  const deleteMutation = useMutation((postId) => deletePost(postId));

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  if (isError) {
    return <h3>{error.toString()}</h3>
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button> <button>Update title</button>
      {deleteMutation.isLoading && <h3>Deleting...</h3>}
      {deleteMutation.isError && <h3>{deleteMutation.error.toString()}</h3>}
      {deleteMutation.isSuccess && <h3>Post has (not) been deleted! </h3>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
