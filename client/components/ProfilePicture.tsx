import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ProfilePictureProps {
  uri: string;
}

const ProfilePicture: FC<ProfilePictureProps> = ({ uri }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push('/profile')}>
      <div className='relative w-10 h-10 ph_sm:w-12 ph_sm:h-12 hover:cursor-pointer'>
        <Image
          src={uri}
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
