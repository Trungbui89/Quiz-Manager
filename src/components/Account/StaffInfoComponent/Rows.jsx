/* eslint-disable eqeqeq */
import { IconButton, TableCell, TableRow } from '@mui/material';
import * as React from 'react';

export default function Rows(props) {
    const { roleDetail, postAddPerToUser } = props;
    const [addPerToUser, setAddPerToUser] = React.useState();
    
    React.useEffect(() => {
        if(addPerToUser){
            postAddPerToUser(addPerToUser)
        }
    }, [addPerToUser])

    const renderIcon = (key, value) => {
        if (key === 'quiz') {
            const perQuiz = roleDetail?.find((i) => i.name === 'Quiz');
            if (value === 'create' && perQuiz && perQuiz.can_create == 'true') {
                return <img src="/icon/On.svg" alt="" />;
            }
            if (value === 'read' && perQuiz && perQuiz.can_read == 'true') {
                return <img src="/icon/On.svg" alt="" />;
            }
            if (value === 'update' && perQuiz && perQuiz.can_update == 'true') {
                return <img src="/icon/On.svg" alt="" />;
            }
            return <img src="/icon/Off.svg" alt="" />;
        }
        if (key === 'question') {
            const perQuestion = roleDetail?.find((i) => i.name === 'Question');
            if (
                value === 'create' &&
                perQuestion &&
                perQuestion.can_create == 'true'
            ) {
                return <img src="/icon/On.svg" alt="" />;
            }
            if (
                value === 'read' &&
                perQuestion &&
                perQuestion.can_read == 'true'
            ) {
                return <img src="/icon/On.svg" alt="" />;
            }
            if (
                value === 'update' &&
                perQuestion &&
                perQuestion.can_update == 'true'
            ) {
                return <img src="/icon/On.svg" alt="" />;
            }
            return <img src="/icon/Off.svg" alt="" />;
        }
        if (key === 'user') {
            const perUser = roleDetail?.find((i) => i.name === 'User');
            if (value === 'create' && perUser && perUser.can_create == 'true') {
                return <img src="/icon/On.svg" alt="" />;
            }
            if (value === 'read' && perUser && perUser.can_read == 'true') {
                return <img src="/icon/On.svg" alt="" />;
            }
            if (value === 'update' && perUser && perUser.can_update == 'true') {
                return <img src="/icon/On.svg" alt="" />;
            }
            return <img src="/icon/Off.svg" alt="" />;
        }
    };
    // console.log(roleDetail, "roleDetail")

    const handleAddPermission = (key, value) => {
        if (key === 'quiz') {
            const perQuiz = roleDetail?.find((i) => i.name === 'Quiz');
            if (value === 'create') {
                setAddPerToUser({
                    account_id: perQuiz?.account_id,
                    permissions_id: perQuiz.permissions_id,
                    can_create: perQuiz?.can_create == 'true' ? 'false' : 'true',
                });
            }
            if (value === 'read') {
                setAddPerToUser({
                    account_id: perQuiz?.account_id,
                    permissions_id: perQuiz.permissions_id,
                    can_read: perQuiz?.can_read == 'true' ? 'false' : 'true',
                });
            }
            if (value === 'update') {
                setAddPerToUser({
                    account_id: perQuiz?.account_id,
                    permissions_id: perQuiz.permissions_id,
                    can_update: perQuiz?.can_update == 'true' ? 'false' : 'true',
                });
            }
        }
        if (key === 'question') {
            const perQuestion = roleDetail?.find((i) => i.name === 'Question');
            if (value === 'create') {
                setAddPerToUser({
                    account_id: perQuestion?.account_id,
                    permissions_id: perQuestion?.permissions_id,
                    can_create: perQuestion?.can_create == 'true' ? 'false' : 'true',
                });
            }
            if (value === 'read') {
                setAddPerToUser({
                    account_id: perQuestion?.account_id,
                    permissions_id: perQuestion?.permissions_id,
                    can_read: perQuestion?.can_read == 'true' ? 'false' : 'true',
                });
            }
            if (value === 'update') {
                setAddPerToUser({
                    account_id: perQuestion?.account_id,
                    permissions_id: perQuestion?.permissions_id,
                    can_update: perQuestion?.can_update == 'true' ? 'false' : 'true',
                });
            }
        }
        if (key === 'user') {
            const perUser = roleDetail?.find((i) => i.name === 'User');
            if (value === 'create') {
                setAddPerToUser({
                    account_id: perUser?.account_id,
                    permissions_id: perUser?.permissions_id,
                    can_create: perUser?.can_create == 'true' ? 'false' : 'true',
                });
            }
            if (value === 'read') {
                setAddPerToUser({
                    account_id: perUser?.account_id,
                    permissions_id: perUser?.permissions_id,
                    can_read: perUser?.can_read == 'true' ? 'false' : 'true',
                });
            }
            if (value === 'update') {
                setAddPerToUser({
                    account_id: perUser?.account_id,
                    permissions_id: perUser?.permissions_id,
                    can_update: perUser?.can_update == 'true' ? 'false' : 'true',
                });
            }
        }
    };

    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row">
                    Quiz
                </TableCell>
                <TableCell align="center">
                    <IconButton
                        onClick={() => handleAddPermission('quiz', 'create')}
                    >
                        {renderIcon('quiz', 'create')}
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <IconButton
                        onClick={() => handleAddPermission('quiz', 'read')}
                    >
                        {renderIcon('quiz', 'read')}
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <IconButton
                        onClick={() => handleAddPermission('quiz', 'update')}
                    >
                        {renderIcon('quiz', 'update')}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                    Question
                </TableCell>
                <TableCell align="center">
                    <IconButton
                        onClick={() =>
                            handleAddPermission('question', 'create')
                        }
                    >
                        {renderIcon('question', 'create')}
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <IconButton
                        onClick={() =>
                            handleAddPermission('question', 'read')
                        }
                    >
                        {renderIcon('question', 'read')}
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <IconButton
                        onClick={() =>
                            handleAddPermission('question', 'update')
                        }
                    >
                        {renderIcon('question', 'update')}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                    User
                </TableCell>
                <TableCell align="center">
                    <IconButton
                        onClick={() => handleAddPermission('user', 'create')}
                    >
                        {renderIcon('user', 'create')}
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <IconButton
                        onClick={() => handleAddPermission('user', 'read')}
                    >
                        {renderIcon('user', 'read')}
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <IconButton
                        onClick={() => handleAddPermission('user', 'update')}
                    >
                        {renderIcon('user', 'update')}
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
}
