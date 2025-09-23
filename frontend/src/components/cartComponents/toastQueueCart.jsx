function ToastQueue( {toasts} ) {
    return (
        <div className="hidden md:flex fixed top-5 right-5 flex-col gap-3 w-[400px] h-auto z-10">
            {toasts.map(t => (
                <div key={t.id} className={`grid grid-cols-[1fr_auto] gap-6 items-center rounded-md text-black 
                    bg-white border border-gray-300 py-4 px-6 shadow-md
                    w-[400px] h-[100px] animate-slide-bounce`}
                >
                    <div className='flex items-center justify-center h-full text-sm break-words'>
                        {t.message}
                    </div>
                    {  t.icon === 'check' && (
                        <i className="fa-solid fa-circle-check flex items-center justify-center h-full text-green-500 text-4xl"></i>
                    )}
                    {  t.icon === 'warning' && (
                        <i className="fa-solid fa-triangle-exclamation flex items-center justify-center h-full text-yellow-500 text-4xl"></i>
                    )}
                    {  t.icon === 'trash' && (
                        <i className="fa-solid fa-trash-can flex items-center justify-center h-full text-gray-500 text-4xl"></i>
                    )}
                </div>
            ))}
        </div>
    )
}
export default ToastQueue;