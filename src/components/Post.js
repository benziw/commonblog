const postStyle = {
  background : '#FFF'
}

export default function Post(props){

  return (
    <div className="post" style={postStyle}>
      <h3>{props.title}</h3>
      <h4>{new Date(props.postid).toString()}</h4>
      <p>{props.content}</p>
    </div>
  );
}