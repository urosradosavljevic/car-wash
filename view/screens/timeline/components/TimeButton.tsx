import { FC } from 'react'
import clsx from 'clsx';

import styles from './Timeline.module.scss'
import { Time } from '../../../../models/Time';
import { timeToString } from '../../../../shared/util/helpers';

interface Props {
    onClick: () => void;
    startTime: Time;
    selected: boolean;
}

export const TimeButton: FC<Props> = ({
    onClick,
    selected,
    startTime,
    ...props
}) => {

    const btnClassNames = clsx(
        styles.time__btn,
        selected && styles.time_selected
    );

    return (
        <div
            role="button"
            onClick={() => onClick}
            className={btnClassNames}
            {...props}
        >
            <span>
                {timeToString(startTime)}
            </span>
        </div>
    )
}
