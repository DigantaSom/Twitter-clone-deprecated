import Image from 'next/image';
import { useRouter } from 'next/router';

import constants from '../constants';

const ProfilePicture = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.push('/profile')}>
      <div className='relative w-12 h-12 hover:cursor-pointer'>
        <Image
          src={constants.placeholder_profilePicture}
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
