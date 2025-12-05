const ColorButtonFull = ({OnclickHandler, type='button', label}) => 
  <button className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-101" type={type} onClick={OnclickHandler}>
      {label}
  </button>


export default ColorButtonFull;