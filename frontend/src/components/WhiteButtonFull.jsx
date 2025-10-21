const WhiteButtonFull = ({OnClickHandler, type='button', label}) =>
    <button type={type} className="w-full py-2 px-6 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-lg transition-all duration-300" onClick={OnClickHandler}>
        {label}
    </button>

export default WhiteButtonFull