import React, {
    useState,
    useEffect,
    useRef
} from 'react';

type Props = {
    /**
     * Time in seconds to start count down
     */
    expiredInterval: number,
    /**
     * A callback function that should be fired when time is over
     */
    onExpiredTime?: () => void
};

export function CountdownComponent({expiredInterval, onExpiredTime}: Props) {
    const [count, setCount] = useState(expiredInterval);
    const timeoutRef = useRef();

    useEffect(() => {
        if (count === 0) {
            onExpiredTime();
            return;
        }
        timeoutRef.current = setTimeout(() => setCount(prevCount => prevCount - 1), 1000);

        return () => clearTimeout(timeoutRef.current);
    }, [count, onExpiredTime]);

    return (
        <span className="countdown-component">
            (
            {count}
            )
        </span>
    );
}
