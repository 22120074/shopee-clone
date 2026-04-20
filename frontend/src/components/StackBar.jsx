import clsx from 'clsx';

function StackBar({ toasts, width = '400px', height = '80px' }) {
  return (
    <div
      className="fixed top-5 left-4 right-4 md:left-auto md:right-5 flex flex-col gap-3 h-auto z-[999]"
      style={{
        '--md-width': width,
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={clsx(
            'grid grid-cols-[1fr_auto] gap-6 items-center justify-center rounded-md text-black',
            'bg-white border border-gray-300 md:py-4 md:px-6 shadow-md animate-slide-bounce',
            'w-full py-4 px-4',
            'md:w-[var(--md-width)] md:h-[var(--md-height)]'
          )}
          style={{
            '--md-width': width,
            '--md-height': height,
          }}
        >
          <div className="flex items-center justify-center h-full text-sm break-words">
            {t.message}
          </div>
          {t.icon === 'check' && (
            <i className="fa-solid fa-circle-check flex items-center justify-center h-full text-green-500 text-3xl"></i>
          )}
          {t.icon === 'warning' && (
            <i className="fa-solid fa-triangle-exclamation flex items-center justify-center h-full text-yellow-500 text-3xl"></i>
          )}
          {t.icon === 'trash' && (
            <i className="fa-solid fa-trash-can flex items-center justify-center h-full text-gray-500 text-3xl"></i>
          )}
        </div>
      ))}
    </div>
  );
}
export default StackBar;
