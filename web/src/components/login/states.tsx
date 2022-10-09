import create from 'zustand'

interface LoginState {
  phone: string;
  setPhone: (phone: string) => void;
}

const useLoginStore = create<LoginState>((set) => ({
  phone: '',
  setPhone: (phone) => set(state => ({...state, phone}))
}));

export default useLoginStore;