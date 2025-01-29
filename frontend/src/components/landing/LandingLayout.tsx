import Header from "../Header/Header";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto overflow-x-hidden relative">
      <Header />
      {children}
    </div>
  );
};

export default LandingLayout;
