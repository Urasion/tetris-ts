import { useAtom } from 'jotai';
import { userAtom } from '../store/atom';

export default function useUser() {
  const [user, setUser] = useAtom(userAtom);

  const startPlay = () => {
    setUser((prev) => ({ ...prev, isPlay: true }));
  };

  const endPlay = () => {
    setUser((prev) => ({ ...prev, isPlay: false }));
  };

  return { user, startPlay, endPlay };
}
