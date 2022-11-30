import { useAppDispatch } from '../hooks';
import { toggleComposeTweet } from '../redux/UI/ui.slice';

const DarkOverlay = () => {
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => dispatch(toggleComposeTweet())}
      className='fixed top-0 left-0 z-40 w-full h-full bg-[#1c1c1cd9]'
    ></div>
  );
};

export default DarkOverlay;
