import {setUsers} from "./action"

describe('setUsers action',()=>{
it('should create an action to setUsers',()=>{
    const expectedAction = {
        type: 'SET_USERS',
      };
    expect(setUsers([])).toEqual(expectedAction);
});
});