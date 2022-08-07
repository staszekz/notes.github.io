import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledBar = styled.div`
  width: 100%;
  height: 12vh;
  position: fixed;
  top: 0;
  right: 0%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ isBig }) => (isBig ? '3em' : '1.5em')};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.dark};
  z-index: 2;
`;

export const StyledButtonPlace = styled.div`
  width: 50%;
  height: inherit;
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const StyledButtonIcon = styled(Link)`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  margin-right: 1%;
  background-image: url(${({ icon }) => icon});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 50% 50%;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: white;
  background-color: ${({ active }) => (active ? 'white' : 'transparent')};
  &.active {
    background-color: white;
  }
  ${({ theme }) => theme.media.landscape} {
    width: 30px;
    height: 30px;
  }
`;

// const [unsubscribe, setUnsubscribe] = useState(null);

// useEffect(() => {
//   const unsubscribe = firebase.auth().onAuthStateChanged(user => {
//     // setUser({
//     return user;
//     // });
//   });
//   setUser({
//     user: unsubscribe(),
//   });
//   return () => unsubscribe();
// }, [user]);

//   const [user, setUser] = useState(null);
// // const [unsubscribe, setUnsubscribe] = useState(null);

// const handleSignOutClick = () => {
//   firebase.auth().signOut();
// };

// useEffect(() => {
//   const unsubscribe = firebase.auth().onAuthStateChanged(user => setUser({ user }));
//   // setUnsubscribe({
//   // unsubscribe,
//   // });
//   return () => unsubscribe();
// }, [user]);
