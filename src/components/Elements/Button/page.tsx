const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="button"
      className={`w-full mt-2 px-3 py-4 text-white bg-teal-800 rounded-md focus:bg-teal-950 focus:outline-none hover:bg-teal-600 transition duration-500 delay-100`}
    >
      {children}
    </button>
  );
};
export default Button;
