import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

type Props = {
    /**
     * Current user ID
     */
    userId: string,
    /**
     * Token, which is needed for resetting the password
     */
    resetPasswordToken?: string | null
};

export function UpdatePasswordComponent({userId, resetPasswordToken}: Props) {
    const history = useHistory();

    useEffect(() => {
        if (!resetPasswordToken || !userId) return;

        history.replace({
            pathname: '/account/reset-password',
            search: `?token=${resetPasswordToken}&id=${userId}`
        });
    }, [resetPasswordToken, userId, history]);

    // Prevent navigating to any route until password is updated
    useEffect(() => {
        const unblock = history.block(() => false);

        return () => unblock();
    }, [history]);

    return null;
}
