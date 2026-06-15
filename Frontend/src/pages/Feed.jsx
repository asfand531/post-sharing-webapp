import { useState, useEffect } from "react";
import axios from "axios";
import CreatePostModal from "./CreatePostModal";
import { Card } from "antd";
const { Meta } = Card;

function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      await axios.get("http://localhost:3000/posts").then((res) => {
        setPosts(res.data.posts);
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div>
        <CreatePostModal />
      </div>
      <div className="flex flex-col items-center gap-2 mt-5 py-5">
        {posts.map((post) => (
          <Card
            key={post._id}
            hoverable
            variant="borderless"
            style={{ width: 340 }}
            cover={
              <img draggable={false} alt={post.caption} src={post.image} />
            }
          >
            <Meta description={post.caption} />
          </Card>
        ))}
      </div>
    </>
  );
}

export default Feed;
