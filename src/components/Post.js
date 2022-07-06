import { motion } from 'framer-motion';
import '../css/Post.css';

const postStyle = {
  display: 'flex',
  flexDirection: 'column',

  background: '#FEFFFF',

  width: '600px',

  borderRadius: '25px',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',

  padding: '0px 1em',
  margin: '1em',
}

const expand = {
  hidden: {
    scale : 0.1
  },
  visible: {
    scale : 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
};

export default function Post(props) {

  const formatDate = date => {
    let formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours() % 12 || 12}:${date.getMinutes()} ${date.getHours() > 11 ? 'pm' : 'am'}`;
    //console.log(formattedDate);
    return formattedDate;
  }

  return (
    <motion.div
        onClick={(e) => e.stopPropagation()}  // Prevent click from closing modal
        variants={expand}
        initial="hidden"
        animate="visible"
    >
      <div className="post">

        <div className="postHeader"
          style={{
            width: '100%',
          }}
        >
          <h3 style={{ float: 'left' }}>{props.title}</h3>
          <h4 style={{ float: 'right' }}>{formatDate(new Date(props.postid))}</h4>
        </div>

        <p>{props.content}</p>
      </div>
    </motion.div>
  );
}