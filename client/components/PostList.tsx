import PostItem from './PostItem';

import DemoPost1 from '../images/demo-post-1.jpeg';
import DemoPost2 from '../images/demo-post-2.jpg';
import DemoPost3 from '../images/demo-post-3.jpeg';

const PostList = () => {
  return (
    <div>
      <PostItem imageSrc={DemoPost1} />
      <PostItem imageSrc={DemoPost2} />
      <PostItem imageSrc={DemoPost3} />
      <br />
      <br />
    </div>
  );
};

export default PostList;
