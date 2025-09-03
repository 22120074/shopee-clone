function ToastQueue( {toasts} ) {
    return (
        <div className="fixed top-5 right-5 flex flex-col gap-3 w-[400px] h-auto">
            {toasts.map(t => (
                <div key={t.id} className={`flex items-center justify-center rounded-md text-black 
                    bg-white border border-gray-300 p-4 shadow-md
                    w-[400px] h-[100px] animate-slide-bounce`}
                >
                    <div className='flex items-center justify-center w-[300px] h-full'>
                        {t.message}
                    </div>
                    {  t.icon === 'check' && (
                        <i className="fa-solid fa-circle-check flex items-center justify-center flex-1 h-full text-green-500 text-4xl"></i>
                    )}
                    {  t.icon === 'warning' && (
                        <i className="fa-solid fa-triangle-exclamation flex items-center justify-center flex-1 h-full text-yellow-500 text-4xl"></i>
                    )}
                    {  t.icon === 'trash' && (
                        <i className="fa-solid fa-trash-can flex items-center justify-center flex-1 h-full text-gray-500 text-4xl"></i>
                    )}
                </div>
            ))}
        </div>
    )
}
export default ToastQueue;