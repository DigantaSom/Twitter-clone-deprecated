import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import constants from '../constants';

interface ProfilePictureProps {
  uri: string;
  disableGoToProfile?: boolean;
}

const ProfilePicture: FC<ProfilePictureProps> = ({
  uri,
  disableGoToProfile,
}) => {
  const router = useRouter();

  const handleGotToProfile = () => {
    if (!disableGoToProfile) {
      router.push('/profile');
    }
  };

  return (
    <div onClick={handleGotToProfile}>
      <div className='relative w-10 h-10 ph_sm:w-12 ph_sm:h-12 hover:cursor-pointer'>
        <Image
          src={uri ? uri : constants.placeholder_profilePicture}
          alt='User'
          fill
          sizes='100%'
          className='rounded-full'
        />
      </div>
    </div>
  );
};

export default ProfilePicture;
