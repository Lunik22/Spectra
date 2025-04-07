import React, { createContext, useContext, useEffect, useState } from 'react';
import { getLoggedInUser, getAvatarURL } from '@/appwrite/authService';
import Cookies from 'js-cookie';

type UserContextType = {
  user: { $id: string; name: string; email: string } | null;
  avatar: string | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ $id: string; name: string; email: string } | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Check cookies for user and avatar data
        const storedUser = Cookies.get('user');
        const storedAvatar = Cookies.get('avatar');

        if (storedUser && storedAvatar) {
          setUser(JSON.parse(storedUser));
          setAvatar(storedAvatar);
        } else {
          // Fetch user and avatar data if not in cookies
          const loggedInUser = await getLoggedInUser();
          setUser(loggedInUser);

          if (loggedInUser) {
            const avatarResponse = await getAvatarURL();
            if (avatarResponse) {
              const base64Avatar = btoa(String.fromCharCode(...new Uint8Array(avatarResponse)));
              setAvatar(base64Avatar);
              Cookies.set('avatar', base64Avatar, { expires: 7 });
            } else {
              setAvatar(null);
            }

            // Store user data in cookies
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
