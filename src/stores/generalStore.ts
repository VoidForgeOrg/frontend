import {create} from "zustand";

interface GeneralStoreState {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    selectedMenuItemIndex: number;
    setSelectedMenuItemIndex: (index: number) => void;
}

const useGeneralStore = create<GeneralStoreState>((set) => ({
    isMenuOpen: false,
    toggleMenu: () => {
        set((state) => {
            return {
                isMenuOpen: !state.isMenuOpen
            }
        })
    },
    selectedMenuItemIndex: 0,
    setSelectedMenuItemIndex: (index: number) => {
        set({selectedMenuItemIndex: index});
    }
}))

export default useGeneralStore;
