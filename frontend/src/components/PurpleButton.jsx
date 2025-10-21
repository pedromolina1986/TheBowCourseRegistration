const PurpleButton = ({OnClickHandler, label}) =>
    <button className="px-6 py-3 border border-white text-white rounded hover:shadow-lg transition-all duration-300 transform hover:scale-105" onClick={OnClickHandler}>
        {label}
    </button>

export default PurpleButton