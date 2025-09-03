import { useState, useRef, useEffect } from "react";

function useToastQueue(limit = 3, duration = 2000) {
    const [toasts, setToasts] = useState([]);
    const queueRef = useRef([]);

    const addToast = (message, type, icon) => {
        const id = Date.now() + Math.random();
        if (toasts.length < limit) {
            setToasts((prev) => [...prev, { id, message, type, icon }]);
            setTimeout(() => removeToast(id), duration);
        } else {
            queueRef.current.push({ id, message, type, icon });
        }
    }

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    useEffect(() => {
        if (toasts.length < limit && queueRef.current.length > 0) {
            const nextToast = queueRef.current.shift();
            setToasts((prev) => [...prev, nextToast]);
            setTimeout(() => removeToast(nextToast.id), duration);
        }
    }, [toasts, limit, duration]);

    return { toasts, addToast };
}

export default useToastQueue;
