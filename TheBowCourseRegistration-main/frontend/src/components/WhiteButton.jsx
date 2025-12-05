const WhiteButton = ({OnclickHandler, type='button', label}) =>
    <button type={type} className="px-6 py-2.5 bg-white text-gray-700 border-2 border-gray-200 font-bold rounded-lg hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105" onClick={OnclickHandler} >
        {label}
    </button>

export default WhiteButton