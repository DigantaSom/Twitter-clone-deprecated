import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { toggleComposeTweet, toggleAuthModal } from '../features/ui/ui.slice';

const DarkOverlay = () => {
  const { isComposeTweetShown, authModal } = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    if (isComposeTweetShown) {
      dispatch(toggleComposeTweet());
    } else if (authModal.isShown) {
      dispatch(toggleAuthModal(''));
    }
  };

  return (
    <div
      onClick={handleCloseModal}
      className='fixed top-0 left-0 z-40 w-full h-full bg-[#1c1c1cd9]'
    ></div>
  );
};

export default DarkOverlay;
