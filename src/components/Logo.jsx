import logo from '../assets/Logo-Tpq.png';  // Adjust path if needed

const Logo = () => {
  return (
    <img 
      src={logo} 
      alt="Logo" 
      className={`w-14 h-auto`} // You can pass custom class names for styling
    />
  );
};

export default Logo;
