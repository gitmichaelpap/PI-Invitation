import { createContext, useState } from 'react';

export const UserContext = createContext();
UserContext.displayName = "User"

export default function UserProvider({ children }) {
  const [engaged, setEngaged] = useState('');
  const [weddingDay, setWeddingDay] = useState('');
  const [dtRegister, setDtRegister] = useState('');

  return (
    <UserContext.Provider
      value={{
        engaged,
        setEngaged,
        weddingDay,
        setWeddingDay,
        dtRegister,
        setDtRegister
      }}
    >
      {children}
    </UserContext.Provider>
  )
}