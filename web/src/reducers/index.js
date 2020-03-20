import { combineReducers } from 'redux';
import userRducer from './user.reducer';
import roleRducer from './role.reducer';
import tableRducer from './table.reducer';
import floorRducer from './floor.reducer';

export default combineReducers({
    user: userRducer,
    role: roleRducer,
    table: tableRducer,
    floor: floorRducer
});
