const ColorButton = ({OnclickHandler, type='button', label}) => 
  <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105" type={type} onClick={OnclickHandler}>
      {label}
  </button>


export default ColorButton;