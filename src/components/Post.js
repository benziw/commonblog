

const postStyle = {
  background : '#FFF',
  height : '400px',
  width : '600px',
}

export default function Post(props){

  const formatDate = date => {
    let formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours() % 12 || 12}:${date.getMinutes()} ${date.getHours() > 11 ? 'pm' : 'am'}`;
    //console.log(formattedDate);
    return formattedDate;
  }

  return (
    <div className="post" style={postStyle}>
      <h3>{props.title}</h3>
      <h4>{formatDate(new Date(props.postid))}</h4>
      <p>{props.content}</p>
    </div>
  );
}