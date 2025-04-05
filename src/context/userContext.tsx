import React, { createContext, useContext, useEffect, useState } from 'react';
import { getLoggedInUser, getAvatarURL } from '@/appwrite/authService';
import Cookies from 'js-cookie';

type UserContextType = {
  user: { name: string; email: string } | null;
  avatar: string | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Check cookies for user and avatar data
        const storedUser = Cookies.get('user');
        const storedProfilePicture = Cookies.get('profile-picture');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        if (storedProfilePicture) {
          setAvatar(storedProfilePicture); // Load profile picture from cookies
        } else {
          const loggedInUser = await getLoggedInUser();
          setUser(loggedInUser);

          if (loggedInUser) {
            const avatarResponse = await getAvatarURL();
            if (avatarResponse) {
              const avatarBase64 = Buffer.from(avatarResponse).toString('base64');
              const avatarData = `data:image/png;base64,${avatarBase64}`;
              setAvatar(avatarData);
              Cookies.set('avatar', avatarData, { expires: 7 });
            } else {
              setAvatar(null);
            }

            Cookies.set('user', JSON.stringify(loggedInUser), { expires: 7 });
          } else {
            setAvatar(null);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user or avatar:', error);
        setUser(null);
        setAvatar(null);
      }
    }

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, avatar }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
