import Header from "../Header/Header";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-light-bg dark:bg-dark-bg relative">
      <div className="w-full max-w-screen-2xl mx-auto">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default LandingLayout;
