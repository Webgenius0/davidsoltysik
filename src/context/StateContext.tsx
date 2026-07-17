import { createContext, useEffect, useState, type ReactNode } from "react";
interface StateContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isSmall: boolean;
  setIsSmall: React.Dispatch<React.SetStateAction<boolean>>;
}

const StateContext = createContext<StateContextType | null>(null);

const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmall(window.innerWidth < 768 ? true : false);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <StateContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        isSmall,
        setIsSmall,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export { StateContextProvider, StateContext };
